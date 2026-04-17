import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/service/notification.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'cfs-email-sms-dialog',
  templateUrl: './email-sms-dialog.component.html',
  styleUrls: ['./email-sms-dialog.component.scss']
})
export class EmailSmsDialogComponent implements OnInit {
  sendEmailForm!:FormGroup;
  selectedList: any;
  allSelected: any;
  uploadedFiles: any[] = [];
  fileName: any;
  preview: any;
  currentFile: any;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  isSubmitted: boolean=false;
  formData: FormData;
  ccAllowed: any;
  institutionHeadEmail: any;
  isFormInvalid: boolean = false

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<EmailSmsDialogComponent>, public notification: NotificationService, private fb: FormBuilder, private postservice:PostService) { 

  }

  ngOnInit(): void {
    this.selectedList=this.data;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     this.sendEmailForm = this.fb.group({
      emails:['',[Validators.required]],
      subject:['',[Validators.required]],
      ccto:['', [this.mailOrEmailsValidator]],
      message:['',[Validators.required]],
      uploadDoc:[''],
    })
     this.institutionHeadEmail = this.selectedList
    .filter((ele: any) =>
      ele.emailId !== null &&
      ele.emailId !== undefined &&
      ele.emailId !== ''
    )
    .map((ele: any) => {
      if (ele.emailId.length > 100) {
        ele.emailId = ele.emailId;
      }
      return ele;
    })
    .filter((ele: any) => emailRegex.test(ele.emailId))
    .map((ele: any) => ele.emailId);

     if(this.institutionHeadEmail.length>0){
      let getHeadEmails='';
        this.institutionHeadEmail.forEach((element:any) => {
             getHeadEmails+=element+',';
        });
      getHeadEmails= getHeadEmails.replace(/,$/, '');
      this.sendEmailForm.get('emails')?.setValue(getHeadEmails);
      this.sendEmailForm.get('emails')?.disable();
    }else{
        this.sendEmailForm.get('emails')?.setValidators(null);
        this.sendEmailForm.get('emails')?.updateValueAndValidity();

    }
    // this.createForm()

  }

    editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '200px',
      minHeight: '200px',
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

  // createForm(){
  //   this.sendEmailForm = this.fb.group({
  //     emails:['',[Validators.required]],
  //     subject:['',[Validators.required]],
  //     ccto:['',[Validators.required]],
  //     message:['',[Validators.required]],
  //     uploadDoc:[''],
  //   })
  // }

  checkIfAllSelected() {
    this.allSelected = this.selectedList.every((item:any) => item.selected);
  }

    onUpload(event: any) {
    this.uploadedFiles = [];
    this.fileName='';
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'application/pdf'];
      const maxSize = 2 * 1024 * 1024; // 2 MB
      if (!allowedTypes.includes(file.type)) {
        this.notification.showErrorMessage('Only .jpeg, .jpg, .gif, and .pdf files are allowed.');
        this.clearFileInput();
        this.fileName='';
      } else if (file.size > maxSize) {
        this.notification.showErrorMessage('File size should be less than 2 MB.');
        this.uploadedFiles = [];
        this.clearFileInput();
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

  clearFileInput() {
    this.fileName = null;
    this.fileInput.nativeElement.value = '';
  }

  private toEmailArray(value: string): string[] {
  if (!value) {
    return [];
  }
  return value
    .split(',')
    .map(v => v.trim())
    .filter(v => v.length > 0);
}

   submit(){
     if (this.sendEmailForm.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true;
      return;
    } else {
      this.isFormInvalid = false;
      this.formData = new FormData();
      if (this.uploadedFiles.length) {
        this.uploadedFiles.forEach((file) => {
          this.formData.append('file', file, file.name);
        })
    }

  const payload = {
    recipientsTO: this.toEmailArray(this.sendEmailForm.getRawValue().emails),
    recipientsCC: this.toEmailArray(this.sendEmailForm.getRawValue().ccto),
    subject: this.sendEmailForm.getRawValue().subject,
    body: this.sendEmailForm.getRawValue().message
  };

  this.formData.append('requestVo', JSON.stringify(payload));
    //  this.formData.append('requestVo',JSON.stringify(
    //         { 
    //           'recipientsCC':this.sendEmailForm.getRawValue().ccto,
    //           'recipientsTO':this.sendEmailForm.getRawValue().emails,
    //           'subject':this.sendEmailForm.getRawValue().subject,
    //           'body':this.sendEmailForm.getRawValue().message
    //   }));
       this.postservice.sendEmailToNadals(this.formData).subscribe((res)=>{
        if(res.status==200){
          let totalSendEmail=res.data?.['Sent To'].length;
          let totalNotSentEmail=res.data?.['Sent Not To'].length;
          this.notification.showSuccessMessage('Total successfully sent emails are '+totalSendEmail+' and Total not sent emails are '+totalNotSentEmail+'.');
          this.closed();
        }
      },err=>{

      })
    }

}

mailOrEmailsValidator(
  control: AbstractControl
): ValidationErrors | null {

  if (!control.value || control.value.trim() === '') {
    return null; // empty allowed
  }

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const emails = control.value
    .split(',')
    .map((e: string) => e.trim())
    .filter((e: string) => e.length > 0);

  const invalidEmail = emails.find(email => !emailRegex.test(email));

  return invalidEmail ? { invalidEmail: true } : null;
}

  get f() {
    return this.sendEmailForm.controls;
  }

   closed() {
    this.dialogRef.close(true)
  }

  errorHandling(controlName: string, errorName: string) {
    return this.sendEmailForm.controls[controlName].hasError(errorName);
  }

}
