import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-score-comment-dialog',
  templateUrl: './score-comment-dialog.component.html',
  styleUrls: ['./score-comment-dialog.component.scss']
})
export class ScoreCommentDialogComponent implements OnInit {
  scoreForm: FormGroup;
  facForm: FormGroup;
  infraForm: FormGroup;
  outForm: FormGroup;
  basicForm: FormGroup;
  activityForm: FormGroup;
  aisheCode: any;
  componentId: any;
  consultantUserId: string = 'ALL';
  userTypeId: string;
  userId: string;
  isFormInvalid: boolean = false
  viewId:any;
  facilityId: any;
  UpdatedropList: Array<any> = [];
  newArray: any[] = [];
  criteriaIdValue: any;
  regexForInput:any;
  applyDirective: any;
  dropListFocuse:any = [{id:1, name:"Situated in Focus Districts"}, {id:2, name:"Not Situated in Focus Districts"}]
  constructor(
    public dialogRef: MatDialogRef<ScoreCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public notify: NotificationService, public notification: NotificationService, public postService: PostService, public sharedService: SharedService, public masterService: MasterService) {
    this.componentId = parseInt(sessionStorage.getItem("componentIdV"));
    this.aisheCode = sessionStorage.getItem("aisheCode");
    this.userTypeId = sessionStorage.getItem('userTypeId');
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id) {

      this.userId = sessionStorage.getItem('userName')
    } 
    if (this.userTypeId === this.sharedService.userTypeList['7'].id) {
      this.consultantUserId = sessionStorage.getItem('userName')
    }
    if (this.data.criteriaId == 9){
      this.getScoreDropValue()
    }

  }

  ngOnInit(): void {
    this.viewId = this.dialogRef.id;
    this.criteriaIdValue = this.data.criteriaId
    //Score Form Control:-
    this.scoreForm = this.fb.group({
      criteriaName: [this.data.criteriaName, []],
      valueForScore: [this.data.valueForScore, []],
      score: [this.data.score, []],
      consultantValue: [this.data.consultantValue, []],
      consultantScore: [this.data.consultantScore, []],
      consultantRemark: [this.data.consultantRemarks, [Validators.required]],
    });
    //Facility Form Control:-
    this.facForm = this.fb.group({
      isDocumentVerified: [this.data.isDocumentVerified, [Validators.required]],
      isActivityUnder: [this.data.isActivityUnderProposalActivityDetails, []],
      consultantRemark: [this.data.consultantRemark, [Validators.required]],
    });

    // Infra Construction Form Control:-
    if (this.viewId == 1 || this.viewId == 'infraView' || this.viewId == 2 || this.viewId == 'renvoView' || this.viewId == 3 || this.viewId == 'equioView' || this.viewId == 4 || this.viewId == 'softView' || this.viewId == 9 || this.viewId == 'propView' || this.viewId == 10 || this.viewId == 'timeView' || this.viewId == 11 || this.viewId == 'propOutcomeView' || this.viewId == 12 || this.viewId == 'actDetailView' || this.viewId == 13 || this.viewId == 14 || this.viewId == 8 || this.viewId == 7 || this.viewId == 6 || this.viewId == 5){
      this.infraForm = this.fb.group({
        consultantSummary: [this.data[0]?.consultantSummary, [Validators.required]],
      });
    }

    // Other Sources of funds dialog box Data Form Control:-
    else if (this.viewId == 'otherSourceEdit' || this.viewId == 'otherSourceView'){
      this.outForm = this.fb.group({
        otherSourceOfFundGoi: [this.data.otherSourceOfFundGoi, [Validators.required]],
        otherSourceOfFundGoiRemark: [this.data.otherSourceOfFundGoiRemark, [Validators.required]],
      });
    }
    else if (this.viewId == 'basicDetailsEdit' || this.viewId == 'basicDetailsEditView'){
      this.basicForm = this.fb.group({
        accrediationScoreWebsite: [this.data.accrediationScoreWebsite, [Validators.required]],
        multiDisciplinaryComment: [this.data.multiDisciplinaryComment, [Validators.required]],
      });
    }
    else if (this.viewId == 'activityTableEdit' || this.viewId == 'activityTableView'){
      this.activityForm = this.fb.group({
        consultantRemark: [this.data.consultantRemark, [Validators.required]],
        costForActivity: this.data.costForActivity,
        detailOfHowActivityToBeUndertaken: this.data.detailOfHowActivityToBeUndertaken,
        districtCode: this.data.districtCode,
        howHasItBeenIncluded: this.data.howHasItBeenIncluded,
        id: this.data.id,
        instituteCategory: this.data.instituteCategory,
        isActivityUnderProposalActivityDetails: [this.data.isActivityUnderProposalActivityDetails, [Validators.required]],
        proposalWithItem: this.data.proposalWithItem,
        stateCode: this.data.stateCode,
        timelineForImplementationOfActivity: this.data.timelineForImplementationOfActivity
      });
    }
      //Facility Form Control:-
      if (this.viewId == 'facView') {
        this.facForm.get('consultantRemark').disable();
        this.facForm.get('isDocumentVerified').disable();
        this.facForm.get('isActivityUnder').disable();
      }
      //Score Form Control:-
      else if (this.viewId == 'scoreView') {
        this.scoreForm.get('consultantValue').disable();
        this.scoreForm.get('consultantScore').disable();
        this.scoreForm.get('consultantRemark').disable();
      }
      // infra Form Control
      else if (this.viewId == 'infraView' || this.viewId == 'renvoView' || this.viewId == 'equioView' || this.viewId == 'softView' || this.viewId == 'propView' || this.viewId == 'timeView' || this.viewId == 'propOutcomeView' ||  this.viewId == 'actDetailView') {
        this.infraForm.get('consultantSummary').disable();
      }
      // Other Sources of funds dialog box Data Form Control:-
      else if (this.viewId == 'otherSourceView') {
        this.outForm.get('otherSourceOfFundGoi').disable();
        this.outForm.get('otherSourceOfFundGoiRemark').disable();
      }
      //Basic Details of Unversity From Control:-
      else if (this.viewId == 'basicDetailsEditView') {
        this.basicForm.get('accrediationScoreWebsite').disable();
        this.basicForm.get('multiDisciplinaryComment').disable();
      }
      else if (this.viewId == 'activityTableView') {
        this.activityForm.get('isActivityUnderProposalActivityDetails').disable();
        this.activityForm.get('consultantRemark').disable();
      }

  }

  getScoreDropValue(){
    this.masterService.getProposalScore(this.componentId).subscribe(res => {
      if (res && res.length) {
        this.UpdatedropList = res;
      }
         }, err => {
      console.error('Error fetching page status:', err);
    })

  }

  onConfirmClick() {
    //Score Save Form Control:-
    if (this.viewId == 'scoreEdit') {
      if (this.scoreForm.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
      let payload = [{
        aisheCode: this.aisheCode,
        baseId: this.data.criteriaId,
        componentId: this.componentId,
        consultantRemark: this.scoreForm.value.consultantRemark,
        consultantScore: this.scoreForm.value.consultantScore,
        consultantStatus: true,
        consultantUserId: this.consultantUserId,
        consultantValue: this.scoreForm.value.consultantValue,
        score: this.scoreForm.value.score,
        value: this.scoreForm.value.valueForScore
      }]
      this.postService.saveScoreComment(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(true);
        }
      }, err => {

      })
    }
    //Facility Save Form Control:-
    else if (this.viewId == 'facEdit') {
      if (this.facForm.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
      let payload = {
        activityId: this.data.activityId,
        activityUnderProposalActivityDetail: this.facForm.value.isActivityUnder,
        aisheCode: this.aisheCode,
        componentId: this.componentId,
        consultantRemark: this.facForm.value.consultantRemark,
        consultantUserId: this.consultantUserId,
        isDocumentVerified: this.facForm.value.isDocumentVerified
      }
      this.postService.savefacilityComment(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(true);
        }
      }, err => {

      })
    }
    // Other Sources of funds save dialog box Data Form Control:-
    else if (this.viewId == 'otherSourceEdit') {
      if (this.outForm.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
      let payload = {
        aisheCode: this.aisheCode,
        componentId: this.componentId,
        otherSourceOfFundGoi: this.outForm.value.otherSourceOfFundGoi,
        otherSourceOfFundGoiRemark: this.outForm.value.otherSourceOfFundGoiRemark,
      }
      // let paramsData = new HttpParams()
      // let body=new HttpParams({fromObject:payload})
      this.postService.saveOtherSource(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(true);
        }
      }, err => {

      })
    }
    //Basic Details of Unversity save From Control:-
    else if (this.viewId == 'basicDetailsEdit') {
      if (this.basicForm.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
      let payload = {
        accrediationScoreWebsite: this.basicForm.value.accrediationScoreWebsite,
        multiDisciplinaryComment: this.basicForm.value.multiDisciplinaryComment,
        aisheCode: this.aisheCode,
        componentId: this.componentId,
      }
      this.postService.saveBasicScore(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(true);
        }
      }, err => {

      })
    }
     //Basic Details of Unversity save From Control:-
     else if (this.viewId == 'activityTableEdit') {
      if (this.activityForm.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
      let payload = [
        {
          activityId: this.data.activityId,
          aisheCode: this.componentId == 4 || this.componentId == 5 ? null : this.aisheCode,
          componentId: this.componentId,
          consultantRemark: this.activityForm.value.consultantRemark,
          consultantUserId: this.consultantUserId,
          costForActivity: this.activityForm.value.costForActivity,
          detailOfHowActivityToBeUndertaken: this.activityForm.value.detailOfHowActivityToBeUndertaken,
          districtCode: this.activityForm.value.districtCode,
          howHasItBeenIncluded: this.activityForm.value.howHasItBeenIncluded,
          id: this.activityForm.value.id,
          instituteCategory: this.activityForm.value.instituteCategory,
          isActivityUnderProposalActivityDetails: this.activityForm.value.isActivityUnderProposalActivityDetails,
          proposalWithItem: this.activityForm.value.proposalWithItem,
          stateCode: this.activityForm.value.stateCode,
          timelineForImplementationOfActivity: this.activityForm.value.timelineForImplementationOfActivity
        }
      ]
      this.postService.saveActDetailsData(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(true);
        }
      }, err => {

      })
    }
    else {
      if (this.infraForm.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
      let payload = {
        aisheCode: this.aisheCode,
        componentId: this.componentId,
        consultantCost: 0,
        consultantSummary: this.infraForm.value.consultantSummary,
        consultantUserId: this.consultantUserId,
        proposalActivityId: this.viewId,
        status: true
      }
      this.postService.saveCostComment(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(true);
        }
      }, err => {

      })
    }

  
  }

  confirmMsg(){
    this.dialogRef.close(true);
  }

  closeDialog(event: Event): void {
    this.dialogRef.close();
  }
}
