import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NotificationService } from 'src/app/service/notification.service';
import { GetService } from 'src/app/service/get.service';
import { PostService } from 'src/app/service/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatDatepicker } from '@angular/material/datepicker';
import { MasterService } from 'src/app/service/master.service';
import { SharedService } from 'src/app/shared/shared.service';
import { CustomErrorStateMatcher } from 'src/app/utility/validators';
import { Common } from 'src/app/shared/common';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cfs-state-issues',
  templateUrl: './state-issues.component.html',
  styleUrls: ['./state-issues.component.scss']
})
export class StateIssuesComponent implements OnInit {

 @Input() idPass: any;
    showForm: boolean = false;
    isFormInvalid: boolean = false;
    datePipe: DatePipe = new DatePipe('en-GB');
    addUpdateButton: string = "Save";
    myFiles: string[] = [];
    myFilesName: any = '';
    stateName:any = 'ALL'
    documentList: any;
    documentForm: FormGroup;
    userTypeList: Array<any> = [];
    filterStateList: Array<any> = [];
    filterStatusList: Array<any> = [];
    stateList: Array<any> = [];
    filterArray:any = []
    stateCode:any = "";
    minDate = moment().startOf('day').toDate(); // Example min date
    maxDate = moment().add(1, 'year').endOf('day').toDate(); // Example max date
    userTypeId: string;
    documentType: any;
    eventTypeName: any = '';
    stateListArr: any;
    filterStateListArr: any = [];
    paginatedData: any[] = []; // Data for the current page
    currentPage = 1;
    pageSize = 10;
    totalPages = 0;
    pages: number[] = [];
    StateGroup: boolean = true;
    isStatus: boolean = true
    isactive: boolean;
    addHide: boolean = true;
    sortDir = 1;//1= 'ASE' -1= DSC
    searchText: any;
  tempList: any[];
    sortDirection: 'asc' | 'desc' = 'asc';
    // date time end
    constructor(public notification: NotificationService, private masterService: MasterService, private getService: GetService, private postService: PostService, private fb: FormBuilder, public sharedService: SharedService, public errorMatcher: CustomErrorStateMatcher, public common: Common, private dialog : MatDialog) {
      this.stateCode = sessionStorage.getItem('stateCode');
      this.userTypeId = sessionStorage.getItem('userTypeId');
      // this.StateGroup = this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['3'].id
      // if ( this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id){
      //   this.stateName = this.stateCode
      // }
      // else{
      //   this.stateName = 'ALL'
      // }
      
      
  
    }
  
    ngOnInit(): void {
      this.refUserType();
      this.getSateData();
      this.refStateIssue()
      this.documentForm = this.fb.group({
        id: [0],
        state : ['', [Validators.required]],
        subject : ['', Validators.required],
        issueDetails :['', Validators.required],
        issueDateStr : ['', Validators.required],
        issueStatusId : ['', Validators.required],
        createdBy: [''],
        createdOn: [''],
        disposeBy: [''],
        disposeOn: [''],
        progressUpdate: [''],
        progressUpdateRemarks: ['']
  
      })
      this.getStateIssueDetails()
   
    }

    onSortClick(event, colName) {
      let target = event.currentTarget,
        classList = target.classList;
  
      if (classList.contains('fa-chevron-up')) {
        classList.remove('fa-chevron-up');
        classList.add('fa-chevron-down');
        this.sortDir = -1;
      } else {
        classList.add('fa-chevron-up');
        classList.remove('fa-chevron-down');
        this.sortDir = 1;
      }
      this.sortArr(colName);
    }
  
    sortArr(colName: any) {
      this.documentList.sort((a, b) => {
        a = a[colName]?.toLowerCase();
        b = b[colName]?.toLowerCase();
        return a?.localeCompare(b) * this.sortDir;
      });
    }
 sortAscending = true;
sortBy1(colName: string) {
  this.documentList.sort((a, b) => {
    let valA = a[colName] ?? '';
    let valB = b[colName] ?? '';
    let comparison = 0;

    const isDateField = colName === 'issueDateStr';

    if (isDateField) {
      const dateA = this.parseDate(valA); // convert to real date
      const dateB = this.parseDate(valB);
      comparison = dateA.getTime() - dateB.getTime();
    } else {
      // String comparison fallback
      comparison = valA.toString().toLowerCase().localeCompare(valB.toString().toLowerCase());
    }

    return this.sortAscending ? comparison : -comparison;
  });

  this.sortAscending = !this.sortAscending;
  this.sortDirection = this.sortAscending ? 'asc' : 'desc';
}

// ✅ Add this helper method in your component
parseDate(dateStr: string): Date {
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // JS months start at 0
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  return new Date(dateStr); // fallback, may return Invalid Date
}
  
  
  
    
  
    refUserType() {
      this.getService.getUserRole().subscribe(res => {
        this.userTypeList = res
      })
    }
 
    refStateIssue() {
     this.getService.getStateIssue().subscribe(res => {
       this.filterStatusList = res
     })
   }
  
    getSateData() {
      this.masterService.getStateData().subscribe((res) => {
        this.stateList = res;
        this.stateListArr = res
        this.filterStateList = this.stateList.slice();
        this.filterStateListArr = this.stateListArr.slice()
      }, () => { })
    }
   
  
  
  
    documentFilter(e:any){
        //this.getDocument()
      
    }
  
    
    add() {
      this.showForm = true;
      this.isStatus = true;
      this.addHide = false;
      this.documentForm.get('issueStatusId').setValue(this.filterStatusList[0]?.id)
      this.getEnaDisable()
    }
    @ViewChild('picker1')
    datepicker!: MatDatepicker<Date>
    dateOpen() {
      this.datepicker.open();
    }
    
  
    fakeWaiter(ms: number) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
  
    save() {
      // this.documentForm.get('state').clearValidators();
      // this.documentForm.get('state').updateValueAndValidity();
      if (this.documentForm.invalid) {
        this.isFormInvalid = true
        this.notification.showValidationMessage('Please fill in all details!')
        return;
      }
 
        let issueDate = this.datePipe.transform(this.documentForm.controls['issueDateStr']?.value, 'dd/MM/yyyy');
        const temp = {
           id: this.documentForm.value.id ? this.documentForm.value.id : 0,
           issueDateStr: issueDate,
           issueDetails: this.documentForm.controls['issueDetails']?.value,
           issueStatusId: this.documentForm.controls['issueStatusId']?.value ? this.documentForm.controls['issueStatusId']?.value : 0,
           state: {
             stCode: this.documentForm.controls['state'].value === '' ? [] : this.documentForm.controls['state'].value
           },
           subject: this.documentForm.controls['subject'].value,
           active: true,
           createdBy: this.documentForm.controls['createdBy'].value ? this.documentForm.controls['createdBy'].value : null,
           createdOn: this.documentForm.controls['createdOn'].value ? this.documentForm.controls['createdOn'].value : null,
           disposeBy: this.documentForm.controls['disposeBy'].value ? this.documentForm.controls['disposeBy'].value : null,
           disposeOn: this.documentForm.controls['disposeOn'].value ? this.documentForm.controls['disposeOn'].value : null,
           progressUpdate: this.documentForm.controls['progressUpdate'].value ? this.documentForm.controls['progressUpdate'].value : null,
           progressUpdateRemarks: this.documentForm.controls['progressUpdateRemarks'].value ? this.documentForm.controls['progressUpdateRemarks'].value : null
      
          }
          this.postService.saveStateIssue(temp).subscribe(res => {
            if (res.status === 200) {
              this.notification.showSuccessMessage(res.message)
              this.documentForm.reset();
               this.addUpdateButton = "Save";
               this.myFiles = [];
               this.myFilesName = '';
               this.documentForm.reset();
               this.showForm = false;
               this.addHide = true;
               this.getStateIssueDetails()
               this.handlePageChange(this.sharedService.page = 1)
            }
             }, err => {
            console.error('Error fetching page status:', err);
          })
     
    }
  
  
    reset(reasetvalue:boolean) {
      if (reasetvalue) {
        this.myFiles = [];
        this.myFilesName = '';
        this.documentForm.reset();
        this.showForm = true;
      }
      else {
        this.myFiles = [];
        this.myFilesName = '';
        this.documentForm.get('progressUpdateRemarks')?.reset();
        this.documentForm.get('issueStatusId')?.reset();
        // this.documentForm.reset();
        this.showForm = true;
      }
     
     
    }


  
    resetFilter(){
        this.stateName = 'ALL'
        this.searchText = ''
        this.getStateIssueDetails()
    }

    viewIssues(e) {
      this.common.stateIssue(e).subscribe(res => {
        // if (res) {
        //   this.getClickValue(res)
        // }
      })
    }

  
  
  
    close() {
      this.addUpdateButton = 'Save'
      this.documentForm.reset();
      this.showForm = false;
      this.addHide = true;
    }
  
    handlePageChange(event: any) {
      this.sharedService.page = event
      this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
        this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
      var a = Math.ceil(this.documentList.length / Number(this.sharedService.pageSize));
      if (a === event) {
        this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.documentList.length);
      } else {
        this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.documentList.length - 1);
      }
    }
    onChange(event: any) {
      this.sharedService.pageSize = parseInt(event);
      this.handlePageChange(this.sharedService.page = 1)
    }
  
    onSelectionChangeDoc(event:any){
    }
    // filterStateList = [...this.stateList];
    allSelected = false;
    onSelectionChange(event: any) {
      const selectedValues = event.value;
      this.allSelected = selectedValues.length-1 === this.stateList.length;
    }
  
  
  
  getStateIssueDetails(){
    this.isactive = true;
    const stateUpdate = this.stateName === 'ALL' ? null : this.stateName
    this.getService.getStateIssueDetails(this.isactive, stateUpdate).subscribe(res =>{
       if(res){
         this.documentList = res
         this.documentList = this.documentList.map(item => ({
          ...item,
          stCode: item.state?.stCode,
          name: item.state?.name
        }));
        this.tempList = [...this.documentList]
         this.handlePageChange(this.sharedService.page = 1)
       }
   
   
     })
   }

   async updateResults() {
    this.documentList = []
    this.documentList = this.searchByValue( this.tempList);
    this.handlePageChange(this.sharedService.page = 1)
  }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.name?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.subject?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.issueDetails?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.issueDateStr?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))

      }
    })
  }
  
  
   
  editDocument(item) {
      this.showForm = true;
      this.addUpdateButton = 'Update'
      this.isStatus = false;
      this.addHide = false;
      this.documentForm.patchValue(item);
      this.documentForm.get('state').setValue(item.state?.stCode) 
      this.documentForm.get('issueDateStr')?.setValue(
            moment(item?.issueDateStr, 'DD/MM/YYYY').toDate()
          );
      this.getEnaDisable()
 }
  
 
  
  
  deleteDoc(item) {
 
   item.active = false; // Set active to false before sending to API
   const dialogRef = this.dialog.open(ConfirmDialogComponent, {
           width: '25%',
           data: {
             message: 'Are you sure you want to UnLock ?',
           }
         })
         dialogRef.afterClosed().subscribe(res =>{
           if(res){
   this.postService.saveStateIssue(item).subscribe((res => {
     if (res.status == 200) {
       this.getStateIssueDetails();
       this.notification.showDelete();
       this.handlePageChange(this.sharedService.page = 1)
     }
   }));
  }})
 }
 
 
  ChangesStatus(e:any){
 
  }
 
  toggleSelectAll() {
   if (this.allSelected) {
     // Deselect all items
     this.documentForm.get('state')?.setValue([]);
     this.allSelected = false;
   } else {
     // Select all items
     const allValues = this.stateList.map(item => item.stCode);
     this.documentForm.get('state')?.setValue(allValues);
     this.allSelected = true;
   }
 }


 ChangesState(data:any){
  this.stateName = data.value;
  this.getStateIssueDetails()
}

getEnaDisable() {
  if (!this.isStatus) {
    this.documentForm.get('subject')?.disable();
    this.documentForm.get('issueDetails')?.disable();
    this.documentForm.get('issueDateStr')?.disable();
  }
  else {
    this.documentForm.get('subject')?.enable();
    this.documentForm.get('issueDetails')?.enable();
    this.documentForm.get('issueDateStr')?.enable();
  }
}
  
  }
  
  
  