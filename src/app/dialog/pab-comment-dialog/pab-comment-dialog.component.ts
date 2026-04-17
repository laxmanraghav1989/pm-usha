import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-pab-comment-dialog',
  templateUrl: './pab-comment-dialog.component.html',
  styleUrls: ['./pab-comment-dialog.component.scss']
})
export class PabCommentDialogComponent implements OnInit {

  pabForm: FormGroup;
  remarks: string = ''
  scoreCorrect: null
  isFormInvalid: boolean = false;
  aisheCode: any;
  componentId: any;
  userTypeId: string;
  selectedIndex: any = 0;
  selectedCar: string;
  eligibleList: Array<any>=[]
  asterik:boolean;
  viewId: MatDialogRef<PabCommentDialogComponent, any>;
  viewIdValue:any;
  UpdatedropList: any;
  formattedDate: any;
  dateFromString: Date;
  currentDate: Date = new Date();
  constructor(
    public dialogRef: MatDialogRef<PabCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public notification: NotificationService, public postService: PostService, public sharedService: SharedService, public common: Common,  public masterService: MasterService, private datepipe: DatePipe) {
    this.componentId = parseInt(sessionStorage.getItem("componentIdV"));
    this.aisheCode = sessionStorage.getItem("aisheCode");
    this.userTypeId = sessionStorage.getItem('userTypeId');
    const dateString = data?.pabDateInString;
    if (dateString) {
    const dateParts = dateString.split('/');
    this.dateFromString = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
    }
    else {
      if (!(dialogRef.id == 'view' || dialogRef.id == 'gview')) {
      this.dateFromString = this.currentDate
      }
    }

    
  }

  ngOnInit(): void {
    this.viewIdValue = this.dialogRef.id;
    this.eligibleList = this.data.eligibleList
    this.viewId = this.dialogRef;
    this.pabForm = this.fb.group({
      finalProposalStatusId: [this.data.id],
      pabActionId: [this.data.pabActionId, [Validators.required]],
      pabNumber: [this.data.pabNumber, [Validators.required]],
      pabDateInString: [this.dateFromString, [Validators.required]],
      pabRemarks: [this.data.pabRemarks, [Validators.required]],
    });

    if (this.viewIdValue == 'view' || this.viewIdValue == 'gview'){
      this.pabForm.get('pabRemarks').disable();
      this.pabForm.get('pabActionId').disable();
      this.pabForm.get('pabNumber').disable();
      this.pabForm.get('pabDateInString').disable();
    }
    this.getPABDropValue()

    
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }


getPABDropValue() {
  this.masterService.getNPDAction().subscribe(
    (res: any[]) => {
      if (res && res.length) {
        // ❌ id = 4 remove
        this.UpdatedropList = res.filter(item => item.id !== 4);
      }
    },
    err => {
      console.error('Error fetching page status:', err);
    }
  );
}

  

  onConfirmClick() {
    if (this.pabForm.invalid) {
        this.notification.showWarning();
        this.isFormInvalid = true;
        return;
    } else {
        this.isFormInvalid = false;
    }

      const inputDate = new Date(this.pabForm.value.pabDateInString); // Assuming input date is in MM/DD/YYYY format
      this.formattedDate = this.datepipe.transform(inputDate, 'dd/MM/yyyy');
    
      let payload = {
        finalProposalStatusId: this.viewIdValue == 'Edit' || this.viewIdValue == 'gEdit'? [this.pabForm.value.finalProposalStatusId]: this.pabForm.value.finalProposalStatusId,
        pabActionId: this.pabForm.value.pabActionId,
        pabNumber: this.pabForm.value.pabNumber,
        pabDateInString: this.formattedDate,
        pabRemarks: this.pabForm.value.pabRemarks,
      }
      this.postService.savePABActions(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(true);
        }
        }, err => {
    
      })

     
  }
    getUpdatedValue(value){
      if (value == 1 || value == 2){
        this.pabForm.get('pabRemarks').clearValidators();
        this.pabForm.get('pabRemarks').updateValueAndValidity();
        this.asterik = false;
      }
      else {
        this.asterik = true;
        this.pabForm.get('pabRemarks')?.setValidators(Validators.required);
        this.pabForm.get('pabRemarks').updateValueAndValidity();
      }
      // if(value){
      //   this.overallForm.get('proposalNotEligibleRemarkId').setValue(null);
      //   this.overallForm.get('proposalNotEligibleRemarkId').clearValidators();
      //   this.overallForm.get('proposalNotEligibleRemarkId').updateValueAndValidity();
      // }else{
      //   this.overallForm.get('proposalNotEligibleRemarkId').setValidators(Validators.required);
      //   this.overallForm.get('proposalNotEligibleRemarkId').updateValueAndValidity();

      // }
    }
}