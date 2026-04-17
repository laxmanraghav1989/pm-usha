import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetService } from 'src/app/service/get.service';
// import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { SharedService } from 'src/app/shared/shared.service';
import { CustomErrorStateMatcher } from 'src/app/utility/validators';
@Component({
  selector: 'cfs-ins-comment-dialog',
  templateUrl: './ins-comment-dialog.component.html',
  styleUrls: ['./ins-comment-dialog.component.scss']
})
export class InsCommentDialogComponent implements OnInit {

  infraForm: FormGroup;
  otherForm: FormGroup;
  otherFormProposed: FormGroup;
  progressForm: FormGroup;
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
  stateCode: string;
  districtCode: string;
  initialTotals: { approved: any; released: any; utilised: any; };
  stateShareReleasedVisible: boolean;
  centralShareReleasedVisible: boolean;
  centralShareUtilisedVisible: boolean;
  stateShareUtilisedVisible: boolean;
  projectStatusList: Array<any> = [];
  outcomeIndicatorId: any;
  constructor(
    public dialogRef: MatDialogRef<InsCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public notify: NotificationService, public notification: NotificationService, public postService: PostService, public sharedService: SharedService, public masterService: MasterService, public getService: GetService, public errorMatcher: CustomErrorStateMatcher) {
    this.componentId = parseInt(sessionStorage.getItem("componentIdDiolog"));
    this.aisheCode = sessionStorage.getItem("aisheCode");
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.stateCode = sessionStorage.getItem("stateCode")
    this.districtCode = sessionStorage.getItem("districtCode");

  }

  ngOnInit(): void {
    this.viewId = this.dialogRef.id;
    this.criteriaIdValue = this.data;
    this.outcomeIndicatorId = this.data.outcomeIndicatorId;
    //Score Form Control:-
    if (this.viewId == 1 || this.viewId == 2) {
      this.infraForm = this.fb.group({
        physicalProgress: [
          '',
          [
            Validators.required,
            Validators.max(100),
            Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/), // Allows numbers with up to 2 decimals
          ],
        ],
        progressRemarks: [''],
        projectStatusId: ['', [Validators.required]],
        latitude:[''],
        longitude:[''],
      });
      
      this.infraLoad()
    }
    
    else if (this.viewId == 22) {
    this.progressForm = this.fb.group({
      centralShareApproved: [''],
      stateShareApproved: [''], 
      centralShareReleased: [''],
      stateShareReleased: [''],
      centralShareUtilised: [''],
      stateShareUtilised: [''],
      totalAmountApproved: [''],
      totalAmountReleased: [''],
      totalUtilisation: [''],
      physicalProgressTotal: ['',[Validators.required,
        Validators.max(100), 
        Validators.pattern(/^\d{1,3}(\.\d{1,2})?$/) // Allows numbers with up to 2 decimals
      ]],
      rusaProjectStatusId:['',Validators.required]
      });
      this.loadData()
      }
    else if (this.viewId == 3 || this.viewId == 4 || this.viewId == 9 || this.viewId == 12 || this.viewId == 5 || this.viewId == 6 || this.viewId == 8 || this.viewId == 99) {
      this.otherForm = this.fb.group({
        progressRemarks: [''],
        projectStatusId: ['', [Validators.required]],
     
      });
      this.otherLoad()
    }
    else if (this.viewId == 11) {
      this.otherFormProposed = this.fb.group({
        progressRemarks: [''],
        targetFor2024: ['', [Validators.required]],
        targetFor2025: ['', [Validators.required]],
        targetFor2026: ['', [Validators.required]],
    });
      this.otherLoadProposed()
    }
    this.getProjectStatus();
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

  // validatePercentage(event: any): void {
  //   const value = parseFloat(event.target.value);
  //   if (value > 100) {
  //     event.target.value = 100; // Reset the value to 100 if it exceeds
      // this.progressForm.controls['physicalProgress'].setValue(100);
      // this.progressForm.controls['physicalProgressTotal'].setValue(100); // Update the form control value
       // Update the form control value
  //   }
  // }
  loadData() {
    this.progressForm.patchValue(this.data);
    this.initialTotals = {
      approved: this.data.totalAmountApproved || 0,
      released: this.data.totalAmountReleased || 0,
      utilised: this.data.totalUtilisation || 0
    };
  }
  getProjectStatus() {
    this.getService.getprojectStatusList().subscribe(res => {
     
        let filterArr = res.data.filter(item => item.id != 4)
        this.projectStatusList = filterArr;
      
     
    
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  infraLoad(){
    this.infraForm.patchValue(this.data);
    // const latitudeControl = this.infraForm.get('latitude');
    // const longitudeControl = this.infraForm.get('longitude');

    // if (latitudeControl?.value) {
    //   latitudeControl.disable(); // Disable if value already exists
    // }
    //  if (longitudeControl?.value) {
    //   longitudeControl.disable(); // Disable if value already exists
    // }

  }
  otherLoad(){
    this.otherForm.patchValue(this.data);
  }
  otherLoadProposed(){
    this.otherFormProposed.patchValue(this.data);
  }

  onConfirmClick() {
    
    //Score Save Form Control:-
    if (this.viewId == 1) {
      if (!this.districtCode) {
      this.notification.showValidationMessage("District Code is missing.");
      return;
      }
      if (this.infraForm.value.physicalProgress > 100){
        this.notification.showValidationMessage("Physical Progress should not be more then 100")
     
      }

      else {
      if (this.infraForm.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
        let payload = [{
          aisheCode: this.aisheCode,
          componentId: this.criteriaIdValue.componentId ? this.criteriaIdValue.componentId: this.componentId,
          districtCode: this.districtCode,
          id: Number(this.criteriaIdValue?.year) === Number(this.criteriaIdValue?.prevYear) && Number(this.criteriaIdValue?.month) === Number(this.criteriaIdValue?.previousMonth) && this.criteriaIdValue?.idValue != null ? this.criteriaIdValue.idValue : 0,
          // id: this.criteriaIdValue.idValue ? this.criteriaIdValue.idValue : 0,
          itemId: this.criteriaIdValue.id,
          month: this.criteriaIdValue.month,
          physicalProgress: this.infraForm.value.physicalProgress,
          progressRemarks: this.infraForm.value.progressRemarks,
          projectStatusId: this.infraForm.value.projectStatusId,
          proposalActivityId: this.viewId,
          stateCode: this.criteriaIdValue.stateCode,
          targetAchieved: "",
          year: this.criteriaIdValue.year,
          activityPhoto: this.criteriaIdValue?.activityPhoto
        }]
        this.postService.saveMonthlyProgressRemark(payload).subscribe(res => {
          if (res.status === 200) {
            const latitude = this.infraForm.value.latitude;
            const longitude = this.infraForm.value.longitude;
            if (latitude && longitude) {
              this.latLong(this.viewId);
            }
            else if ((latitude && !longitude) || (!latitude && longitude)) {
                  this.notification.showValidationMessage("Please fill both Latitude and Longitude or leave both empty.");
            return; // Stop further execution
            }
            // ✅ Case 3: both empty → normal success flow
            else {
              this.notification.showSuccess();
              this.dialogRef.close(this.viewId);
            }
          }
        }, err => {

        })
      }
    }
    else if (this.viewId == 2) {
      if (!this.districtCode) {
        this.notification.showValidationMessage("District Code is missing.");
        return;
      }
      if (this.infraForm.value.physicalProgress > 100){
        this.notification.showValidationMessage("Physical Progress should not be more then 100")
     
      }

      else {
      if (this.infraForm.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
        let payload = [{
          aisheCode: this.aisheCode,
          componentId: this.criteriaIdValue.componentId ? this.criteriaIdValue.componentId: this.componentId,
          districtCode: this.districtCode,
          id: Number(this.criteriaIdValue?.year) === Number(this.criteriaIdValue?.prevYear) && Number(this.criteriaIdValue?.month) === Number(this.criteriaIdValue?.previousMonth) && this.criteriaIdValue?.idValue != null ? this.criteriaIdValue.idValue : 0,
          itemId: this.criteriaIdValue.id,
          month: this.criteriaIdValue.month,
          physicalProgress: this.infraForm.value.physicalProgress,
          progressRemarks: this.infraForm.value.progressRemarks,
          projectStatusId: this.infraForm.value.projectStatusId,
          proposalActivityId: this.viewId,
          stateCode: this.criteriaIdValue.stateCode,
          targetAchieved: "",
          year: this.criteriaIdValue.year,
        }]
        this.postService.saveMonthlyProgressRemark(payload).subscribe(res => {
          if (res.status === 200) {
            this.notification.showSuccess();
            this.dialogRef.close(this.viewId);
          }
        }, err => {

        })
      }
    }
    else if (this.viewId == 3 || this.viewId == 5 || this.viewId == 6 || this.viewId == 8 || this.viewId == 99) {
      if (!this.districtCode) {
        this.notification.showValidationMessage("District Code is missing.");
        return;
      }
     
      if (this.otherForm.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
      let payload = [{
        aisheCode: this.aisheCode,
        componentId: this.criteriaIdValue.componentId,
        districtCode: this.districtCode,
        id: Number(this.criteriaIdValue?.year) === Number(this.criteriaIdValue?.prevYear) && Number(this.criteriaIdValue?.month) === Number(this.criteriaIdValue?.previousMonth) && this.criteriaIdValue?.idValue != null ? this.criteriaIdValue.idValue : 0,
        itemId: this.criteriaIdValue.id,
        month: this.criteriaIdValue.month,
        physicalProgress: '',
        progressRemarks: this.otherForm.value.progressRemarks,
        projectStatusId: this.otherForm.value.projectStatusId,
        proposalActivityId: this.viewId,
        stateCode: this.criteriaIdValue.stateCode,
        targetAchieved: "",
        year: this.criteriaIdValue.year,
        activityPhoto: this.criteriaIdValue?.activityPhoto ? this.criteriaIdValue?.activityPhoto : null
      }]
      this.postService.saveMonthlyProgressRemark(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(this.viewId);
        }
      }, err => {

      })
    }
    else if (this.viewId == 22) {
      if (!this.districtCode) {
        this.notification.showValidationMessage("District Code is missing.");
        return;
      }
      if(this.progressForm.value.physicalProgressTotal>100){
        this.notification.showValidationMessage("Physical Progress should not be more then 100")
      }
      if (this.progressForm.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
      if (
        // +this.progressForm.get('centralShareApproved').value === 0 ||
        // +this.progressForm.get('stateShareApproved').value === 0 ||
        +this.progressForm.get('totalAmountApproved').value === 0
      ) {
        this.notification.showValidationMessage(
          'Central Share Approved, State Share Approved and Total Amount Approved should not be 0'
        );
        return;
      }
      if(this.componentId !== 11 ? +this.progressForm.controls['centralShareReleased'].value > +this.progressForm.controls['centralShareApproved'].value: ''){
        this.notification.showValidationMessage('Central Share Released value should not be greater than the central share approved amount')
        return
      }
      if(+this.progressForm.controls['stateShareReleased'].value > +this.progressForm.controls['stateShareApproved'].value){
        this.notification.showValidationMessage('State Share Released value should not be greater than the state share approved amount')
        return
      }
      if(+this.progressForm.controls['centralShareUtilised'].value > +this.progressForm.controls['centralShareReleased'].value){
        this.notification.showValidationMessage('Central Share Utilised value should not be greater than the central share released amount')
        return
      }
      if(+this.progressForm.controls['stateShareUtilised'].value > +this.progressForm.controls['stateShareReleased'].value){
        this.notification.showValidationMessage('State Share Utilised value should not be greater than the state share released amount')
        return
      }

      let payload =[{
        aisheCode:  this.aisheCode,
        centralShareApproved: this.progressForm.get('centralShareApproved').value,
        centralShareReleased: this.progressForm.get('centralShareReleased').value,
        centralShareUtilised: this.progressForm.get('centralShareUtilised').value,
        componentId: this.criteriaIdValue.componentId,
        districtId: this.districtCode,
        id: Number(this.criteriaIdValue?.year) === Number(this.criteriaIdValue?.prevYear) && Number(this.criteriaIdValue?.month) === Number(this.criteriaIdValue?.previousMonth) && this.criteriaIdValue?.id != null ? this.criteriaIdValue.id : 0,
        month: this.criteriaIdValue.month,
        rusaLegacyDataId: this.criteriaIdValue.rusaLegacyDataId,
        stateId: this.criteriaIdValue.stateId,
        stateShareApproved: this.progressForm.get('stateShareApproved').value,
        stateShareReleased: this.progressForm.get('stateShareReleased').value,
        stateShareUtilised: this.progressForm.get('stateShareUtilised').value,
        totalAmountApproved: this.progressForm.get('totalAmountApproved').value,
        totalAmountReleased: this.progressForm.get('totalAmountReleased').value,
        totalUtilisation: this.progressForm.get('totalUtilisation').value,
        year: this.criteriaIdValue.year,
        physicalProgressTotal:this.progressForm.get('physicalProgressTotal').value,
        rusaProjectStatusId:this.progressForm.get('rusaProjectStatusId').value
    }]
      this.postService.savePMushaMonthlyFinancialProgress(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(this.viewId);
        }
      }, err => {

      })
    }
    else if (this.viewId == 11){
      if (!this.districtCode) {
        this.notification.showValidationMessage("District Code is missing.");
        return;
      }
      if (this.otherFormProposed.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
      let payload = [{
        aisheCode: this.aisheCode,
        componentId: this.viewId === 4?this.criteriaIdValue.componentId.id : this.criteriaIdValue.componentId,
        districtCode: this.districtCode,
        id: Number(this.criteriaIdValue?.year) === Number(this.criteriaIdValue?.prevYear) && Number(this.criteriaIdValue?.month) === Number(this.criteriaIdValue?.previousMonth) && this.criteriaIdValue?.idValue != null ? this.criteriaIdValue.idValue : 0,
        itemId: this.criteriaIdValue.id,
        month: this.criteriaIdValue.month,
        physicalProgress: '',
        progressRemarks: this.otherFormProposed.value.progressRemarks,
        // projectStatusId: this.otherForm.value.projectStatusId,
        proposalActivityId: this.viewId,
        stateCode: this.stateCode,
        targetAchieved: "",
        targetFor2024: this.otherFormProposed.value.targetFor2024,
        targetFor2025: this.otherFormProposed.value.targetFor2025,
        targetFor2026: this.otherFormProposed.value.targetFor2026,
        year: this.criteriaIdValue.year
      }]
      this.postService.saveMonthlyProgressRemark(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(this.viewId);
        }
      }, err => {

      })
    }
     else {
      if (!this.districtCode) {
        this.notification.showValidationMessage("District Code is missing.");
        return;
      }
      if (this.otherForm.invalid) {
        this.notify.showWarning();
        this.isFormInvalid = true;
        return;
      } else {
        this.isFormInvalid = false;
      }
      let payload = [{
        aisheCode: this.aisheCode,
        componentId: this.viewId === 4?this.criteriaIdValue.componentId.id : this.criteriaIdValue.componentId,
        districtCode: this.districtCode,
        id: Number(this.criteriaIdValue?.year) === Number(this.criteriaIdValue?.prevYear) && Number(this.criteriaIdValue?.month) === Number(this.criteriaIdValue?.previousMonth) && this.criteriaIdValue?.idValue != null ? this.criteriaIdValue.idValue : 0,
        itemId: this.criteriaIdValue.id,
        month: this.criteriaIdValue.month,
        physicalProgress: '',
        progressRemarks: this.otherForm.value.progressRemarks,
        projectStatusId: this.otherForm.value.projectStatusId,
        proposalActivityId: this.viewId,
        stateCode: this.stateCode,
        targetAchieved: "",
        year: this.criteriaIdValue.year,
        activityPhoto: this.criteriaIdValue?.activityPhoto ? this.criteriaIdValue?.activityPhoto : null
      }]
      this.postService.saveMonthlyProgressRemark(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(this.viewId);
        }
      }, err => {

      })
    }
    
  }

  latLong(viewId:any){
    let latitude = null;
    let longitude = null;
    if (this.infraForm.value.latitude || this.infraForm.value.longitude) {
      let c: boolean = this.validationLatLong(this.infraForm.value.latitude, this.infraForm.value.longitude);
      if (!c) {
        return;
      } else {
        latitude = this.infraForm.value.latitude
        longitude = this.infraForm.value.longitude
      }
    }
     let payload = {
        id: this.criteriaIdValue.id,
        proposalActivityId: viewId,
        latitude: latitude ? latitude : null,
        longitude: longitude ? longitude : null,
      }
    this.postService.latLong(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.dialogRef.close(viewId);
        }
      }, err => {

      })
    }

  addition(form: FormGroup) {
    const approvedCentral = parseFloat(form.value.centralShareApproved) || 0;
    const approvedState = parseFloat(form.value.stateShareApproved) || 0;
    const totalapproved = approvedCentral + approvedState
    form.controls['totalAmountApproved'].setValue(totalapproved);
  
    const releasedCentral = parseFloat(form.value.centralShareReleased) || 0;
    const releasedState = parseFloat(form.value.stateShareReleased) || 0;
    const totalRealeased = releasedCentral + releasedState
    form.controls['totalAmountReleased'].setValue(totalRealeased);
  
    const utilisedCentral = parseFloat(form.value.centralShareUtilised) || 0;
    const utilisedState = parseFloat(form.value.stateShareUtilised) || 0;
    form.controls['totalUtilisation'].setValue(utilisedCentral + utilisedState);
    let centralShareUtilised =  +form.controls['centralShareUtilised'].value
    let centralShareReleased = +form.controls['centralShareReleased'].value
    let stateShareUtilised =  +form.controls['stateShareUtilised'].value
    let stateShareReleased = +form.controls['stateShareReleased'].value
    if (stateShareReleased > approvedState) {
      this.stateShareReleasedVisible = true
    }
    else {
      this.stateShareReleasedVisible = false
    }

    if(centralShareReleased > approvedCentral) {

      this.centralShareReleasedVisible = true

    }
    else {
      this.centralShareReleasedVisible = false
    }
    if(centralShareUtilised >  centralShareReleased){
      this.centralShareUtilisedVisible = true
    }
    else{
      this.centralShareUtilisedVisible = false
    }
  
    if(stateShareUtilised >  stateShareReleased){
      this.stateShareUtilisedVisible = true
    }
    else{
      this.stateShareUtilisedVisible = false
    }
  }

  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }

  validationLatLong(latitude, longitude) {
    // latitude 6-38
    // longitude 68 - 98
    if (latitude) {
      var lat = latitude.toString().split('.');
      let l = 0;
      if (lat[1]) {
        l = lat[1].length;
      }
      if (parseInt(lat[0]) < 6 || parseInt(lat[0]) > 38 || l < 5) {
        this.notification.showValidationMessage('Latitude [Range: 6.00000 - 38.00000] ,Values must contain minimum of 5 digits after the decimal point.')
        return false;
      }
    } if (longitude) {
      var long = longitude.toString().split('.');

      let lg = 0;

      if (long[1]) {
        lg = long[1].length;
      }
      if (parseInt(long[0]) < 68 || parseInt(long[0]) > 98 || lg < 5) {
        this.notification.showValidationMessage('Longitude [Range: 68.00000 - 98.00000] ,Values must contain minimum of 5 digits after the decimal point.')

        return false;
      }
    }

    return true;
  }

  getUpdatedValue(value){
    if(value){
      this.infraForm.get('projectStatusId').setValue(null);
      this.infraForm.get('projectStatusId').clearValidators();
      this.infraForm.get('projectStatusId').updateValueAndValidity();
      this.infraForm.get('latitude').clearValidators();
      this.infraForm.get('latitude').updateValueAndValidity();
      this.otherForm.get('projectStatusId').setValue(null);
      this.otherForm.get('projectStatusId').clearValidators();
      this.otherForm.get('projectStatusId').updateValueAndValidity();
      this.otherFormProposed.get('targetFor2024').setValue(null);
      this.otherFormProposed.get('targetFor2024').clearValidators();
      this.otherFormProposed.get('targetFor2024').updateValueAndValidity();
    }else{
      this.infraForm.get('projectStatusId').setValidators(Validators.required);
      this.infraForm.get('projectStatusId').updateValueAndValidity();
      this.otherForm.get('projectStatusId').setValidators(Validators.required);
      this.otherForm.get('projectStatusId').updateValueAndValidity();
       this.otherFormProposed.get('targetFor2024').setValidators(Validators.required);
      this.otherFormProposed.get('targetFor2024').updateValueAndValidity();

    }
  }

  confirmMsg(){
    this.dialogRef.close(true);
  }

  closeDialog(event: any): void {
    this.dialogRef.close();
  }
}
