import { Component, OnInit } from '@angular/core';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-email-management-submit',
  templateUrl: './email-management-submit.component.html',
  styleUrls: ['./email-management-submit.component.scss']
})
export class EmailManagementSubmitComponent implements OnInit {
  month:any;
  year:any;
  state:any;
  blob: Blob;
  arrMonths: any = [];
  monthList: any[] = [];
  filterStateList: Array<any> = [];
  stateList: Array<any> = [];
  sendEmailForm!:FormGroup;
  uploadedFiles: any[];
  fileName: string;
  currentFile: any;
  preview: string;
  emailDetail:boolean=false
  fileArray: any[];
  selectedFile: any;
  constructor(private postservice:PostService,private notification:NotificationService,public sharedService: SharedService,private masterService:MasterService,private fb: FormBuilder) {
    this.arrMonths = [
      { monthCode: '1', name: 'January', lastDate: '31' },
      { monthCode: '2', name: 'February', lastDate: '28' },
      { monthCode: '3', name: 'March', lastDate: '31' },
      { monthCode: '4', name: 'April', lastDate: '30' },
      { monthCode: '5', name: 'May', lastDate: '31' },
      { monthCode: '6', name: 'June', lastDate: '30' },
      { monthCode: '7', name: 'July', lastDate: '31' },
      { monthCode: '8', name: 'August', lastDate: '31' },
      { monthCode: '9', name: 'September', lastDate: '30' },
      { monthCode: '10', name: 'October', lastDate: '31' },
      { monthCode: '11', name: 'November', lastDate: '30' },
      { monthCode: '12', name: 'December', lastDate: '31' },
      
    ];
   }

  ngOnInit(): void {
    this.getSateData();
    this.monthList = this.arrMonths;

    this.sendEmailForm = this.fb.group({
      ccMail:['',[Validators.required]],
      toMail:['',[Validators.required]],
      content:['',[Validators.required]],
      files:[''],
    })
  }

  
  submitEmail(){
    if(this.year && this.month && this.state){
      this.sendEmailForm.reset()
      this.fileArray = []
      this.notification.showSuccessMessage('Please confirm your email content !!');
      let payload1 = {
        year:this.year,
        month:this.month,
        stateCode:this.state
      }
      this.postservice.checkEmailContent(payload1).subscribe(res =>{
        if (res) {
          this.emailDetail=true;
          res.content = res.content.replace(/\r\n/g, '<br>');
          this.sendEmailForm.patchValue(res)
          this.fileArray = []
          res.files.forEach((v, i) => {
          let obj = {}
           obj["document"] = 'document' + '_' + i,
           obj['file'] = v
           this.fileArray.push(obj)
          });
        }
         }, err => {
        console.error('Error fetching page status:', err);
      })
    }else{
      this.notification.showValidationMessage("Month and Year Field are Mandantory !!!")
    }
   
  }

  submitMail(){
     let payload={
        year:this.year,
        month:this.month,
      }
      this.postservice.emailManagement(payload).subscribe({
        next: (response) => {
          console.log('API completed successfully.');
        },
        error: (error) => {
          console.error('Error occurred while calling API', error);
        }
      });
    
      // Show message immediately
      this.notification.showSuccessMessage('Email has been send successfully');
      this.resetSearch()
      this.emailDetail=false;
      //   this.postservice.emailManagement(payload).subscribe(res =>{
      //     if (res.status === 200) {
      //       this.notification.showSuccessMessage('Email has been send successfully');
      //       this.emailDetail=false;
      //       this.resetSearch()
      //     }
      //   }, 
      //   err => {
        
      //   })

  }
  onFileSelected(event: any): void {
    const file = event.file;
  
    // Convert base64 string to Uint8Array
    const uint8_data = this.base64ToUint8Array(file);
  
    // Create a Blob from the Uint8Array data
    const blob = new Blob([uint8_data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
  
    // Open the URL in a new tab or download it
    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.xlsx'; // you can change the filename
    link.click();
  
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
  
  base64ToUint8Array(base64: string): Uint8Array {
    const binary_string = window.atob(base64);
    const len = binary_string.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }
  


  
  
  getSateData() {
    this.masterService.getStateData().subscribe((res) => {
      this.stateList = res;
      this.filterStateList = this.stateList.slice();
    }, () => { })
  }
  resetSearch(){
    this.year = '';
    this.month = '';
    this.state = '';
    this.emailDetail = false;
  }

  onUpload(event: any) {
    this.uploadedFiles = [];
    this.fileName='';
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'application/pdf'];
      const maxSize = 2 * 1024 * 1024; // 2 MB
      if (!allowedTypes.includes(file.type)) {
        this.fileName='';
      } else if (file.size > maxSize) {

        this.uploadedFiles = [];
      } else {
        // this.uploadedFiles = file;
   
          this.uploadedFiles.push(file); 
            this.preview = '';
            this.currentFile = file;
      
            const reader = new FileReader();
      
            reader.onload = (e: any) => {
              this.preview = e.target.result;
            };
      
            reader.readAsDataURL(this.currentFile);
            this.fileName = this.uploadedFiles[0].name;
      }
    }

  }


  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '100',
      minHeight: '100',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    // uploadUrl: 'v1/image',
    // upload: (file: File) => { ... },
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

}
