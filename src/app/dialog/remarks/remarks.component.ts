import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

interface Car {
  id: Number;
  name: string;
}

@Component({
  selector: 'cfs-remarks',
  templateUrl: './remarks.component.html',
  styleUrls: ['./remarks.component.scss']
})
export class RemarksComponent implements OnInit {
  overallForm: FormGroup;
  remarks: string = ''
  scoreCorrect: null
  isFormInvalid: boolean = false;
  aisheCode: any;
  componentId: any;
  userTypeId: string;
  selectedIndex: any = 0;
  selectedCar: string;
  eligibleList: Array<any>=[]
  viewId: MatDialogRef<RemarksComponent, any>;
  pabActionId: any;
  consulatantStatus: any;
  constructor(
    public dialogRef: MatDialogRef<RemarksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public notification: NotificationService, public postService: PostService, public sharedService: SharedService, public common: Common,) {
      this.componentId = parseInt(sessionStorage.getItem("componentIdV"));
    this.aisheCode = sessionStorage.getItem("aisheCode");
    this.userTypeId = sessionStorage.getItem('userTypeId');

  }
  ngOnInit(): void {
    this.eligibleList = this.data.eligibleList
    this.viewId = this.dialogRef;
    this.pabActionId = this.data?.pabActionId
    this.consulatantStatus = this.data?.updteConsultantStatus
    this.overallForm = this.fb.group({
      isProposalEligibleAsGuideline: [this.data.isProposalEligibleAsGuideline, [Validators.required]],
      proposalNotEligibleRemarkId: [this.data.proposalNotEligibleRemarkId, []],
      scoreCorrect: [this.data.scoreCorrect, [Validators.required]],
      consultantScore: [this.data.consultantScore, [Validators.required]],
      proposalStrength: [this.data.proposalStrength, [Validators.required]],
      proposalWeakness: [this.data.proposalWeakness, [Validators.required]],
      consultantRemarks: [this.data.consultantComment, [Validators.required]],
    });

    this.overallForm.get('consultantScore').disable();
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }

  

  onConfirmClick() {
    // if (this.overallForm.invalid) {
    //   this.notification.showWarning();
    //   this.isFormInvalid = true;
    //   return;
    // } else {
    //   this.isFormInvalid = false;
    // }
    // let payload = {
    //   aisheCode: this.aisheCode,
    //   componentId: this.componentId,
    //   consultantScore: this.overallForm.value.consultantScore,
    //   isProposalEligibleAsGuideline: this.overallForm.value.isProposalEligibleAsGuideline,
    //   proposalNotEligibleRemarkId: this.overallForm.value.proposalNotEligibleRemarkId,
    //   proposalStrength: this.overallForm.value.proposalStrength,
    //   proposalWeakness: this.overallForm.value.proposalWeakness,
    //   scoreCorrect: this.overallForm.value.scoreCorrect
    // }
    // this.postService.saveOverallRemarks(payload).subscribe(res => {
    //   if (res.status === 200) {
    //     this.notification.showSuccess();
    //     this.dialogRef.close(true);
    //   }
    // }, err => {

    // })
      // this.common.scoreViewComment('value', 'overallSubmitWarn').subscribe(res => {
        // if (res) {
          if (this.overallForm.invalid) {
            this.notification.showWarning();
            this.isFormInvalid = true;
            return;
          } else {
            this.isFormInvalid = false;
          }
    
          let payload = {
            aisheCode: this.aisheCode,
            componentId: this.componentId,
            consultantScore: this.overallForm.value.consultantScore,
            isProposalEligibleAsGuideline: this.overallForm.value.isProposalEligibleAsGuideline,
            proposalNotEligibleRemarkId: this.overallForm.value.proposalNotEligibleRemarkId,
            proposalStrength: this.overallForm.value.proposalStrength,
            proposalWeakness: this.overallForm.value.proposalWeakness,
            scoreCorrect: this.overallForm.value.scoreCorrect,
            consultantComment:this.overallForm.value.consultantRemarks
          }
          this.postService.saveOverallRemarks(payload).subscribe(res => {
            if (res.status === 200) {
              this.notification.showSuccess();
              this.dialogRef.close(true);
            }
          }, err => {
    
          })
        // }
      // })
    
     
  }
    getUpdatedValue(value){
      if(value){
        this.overallForm.get('proposalNotEligibleRemarkId').setValue(null);
        this.overallForm.get('proposalNotEligibleRemarkId').clearValidators();
        this.overallForm.get('proposalNotEligibleRemarkId').updateValueAndValidity();
      }else{
        this.overallForm.get('proposalNotEligibleRemarkId').setValidators(Validators.required);
        this.overallForm.get('proposalNotEligibleRemarkId').updateValueAndValidity();

      }
    }
}