import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { PostService } from 'src/app/service/post.service';
import { NotificationService } from 'src/app/service/notification.service';
import { GetService } from 'src/app/service/get.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cfs-unlock-message',
  templateUrl: './unlock-message.component.html',
  styleUrls: ['./unlock-message.component.scss']
})
export class UnlockMessageComponent implements OnInit {
  formRemarks: FormGroup
  message: string = ""
  stateName: string = "";
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  remarks: any;
  unlockComponent: any;
  aisheCode: any;
  districtName: any;
  instituteName: any;
  isFormInvalid: boolean
  userTypeId: string;
  showHideApproved: boolean
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public apiPost: PostService, public notification: NotificationService, public getService: GetService,
    public common: Common, public sharedService: SharedService, public fb: FormBuilder, public cdRef: ChangeDetectorRef) {


    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
    this.formRemarks = this.fb.group({
      remarks: ['', [Validators.required]],
      radioOptions: ''
    })
  }
  ngOnInit(): void {
    this.userTypeId = sessionStorage.getItem('userTypeId');

    if (this.data.componentId === this.sharedService.collegeComponentId || this.data.componentId === this.sharedService.meruComponentId || this.data.componentId === this.sharedService.universityComponentId || this.data.componentId === 0) {
      this.data.stateCode = this.data.stateCode
    } else {
      this.data.stateCode = this.data.stCode
    }
    this.stateName = this.data.name;
    this.aisheCode = this.data.aisheCode;
    this.districtName = this.data.districtName;
    this.instituteName = this.data.instituteName
    if (this.data.isSaaApproved) {
      this.showHideApproved = true
    } if (this.data.isSaaApproved === null) {
      this.showHideApproved = false
    }
    if(this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['10'].id ){
      // if(this.data.requestForUnlockBySaa){
      //   this.showHideApproved=true;
      // }
      
      if(this.data.isSaaApproved){
        this.showHideApproved=true
      }
      
    }
    
  }
  postunlockState(): void {
    if (this.formRemarks.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true;
      return
    } else {
      this.isFormInvalid = false;
    }
    if (this.userTypeId === this.sharedService.userTypeList['3'].id || this.userTypeId === this.sharedService.userTypeList['4'].id || this.userTypeId === this.sharedService.userTypeList['5'].id) {

      this.unlockComponent = this.common.userRequestUnlock
    } if (this.data.componentId === 0) {
      this.unlockComponent = this.common.stateRequestUnlock
    }
    if (this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['10'].id) {
      if (this.data.pageSAA) {
        this.unlockComponent = this.common.unlockBYNPD
      }
    }
    if (!this.unlockComponent) {
      this.notification.showWarning();
      this.isFormInvalid = true;
      return
    }
    // if (this.data.componentId == undefined) {
    //   this.unlockComponent = this.common.unlockStateProfile;
    // } else if (this.data.componentId === this.sharedService.meruComponentId) {
    //   this.unlockComponent = this.common.unlockMERU;
    // } else if (this.data.componentId === this.sharedService.universityComponentId) {
    //   this.unlockComponent = this.common.unlockUniversity;
    // } else if (this.data.componentId === this.sharedService.collegeComponentId) {
    //   this.unlockComponent = this.common.unlockCollege;
    // } else if (this.data.componentId === this.sharedService.nmdcComponentId) {
    //   this.unlockComponent = this.common.UnlockNMDC;
    // } else if (this.data.componentId === this.sharedService.genderComponentId) {
    //   this.unlockComponent = this.common.UnlockEquity;
    // }


    let temp = {
      "aisheCode": this.data.aisheCode === undefined ? null : this.data.aisheCode,
      "componentId": this.data.componentId === undefined || this.data.componentId === 0 ? null : this.data.componentId,
      "districtCode": this.data.districtCode === undefined || this.data.districtCode === "null" ? null : this.data.districtCode,
      "remarks": this.formRemarks.controls['remarks'].value,
      "stateCode": this.data.stateCode === undefined ? null : this.data.stateCode,
      "unlockComponent": this.unlockComponent

    }

    this.apiPost.unlockState(temp).subscribe((res) => {
      if (res.status === 200) {
        if (this.formRemarks.controls['radioOptions'].value === 1) {
          this.notification.showSuccessMessage('This record has been Successfully unlocked');
        } if (this.formRemarks.controls['radioOptions'].value === 2) {
          this.notification.showSuccessMessage('This record has been Approved Successfully');
        } if (this.formRemarks.controls['radioOptions'].value === 3) {
          this.notification.showSuccessMessage('This record has been Successfully Rejected');
        } if (this.formRemarks.controls['radioOptions'].value === 4) {
          this.notification.showSuccessMessage(`This record has been forword to ${this.sharedService.userTypeList['0'].userType}`);
        }
        this.dialogRef.close(true);
      }

    })

  }

  onRadioButtonChange(value): void {
    if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id) {
      if (value === 1) {
        this.message = 'Are you sure you want to Unlock this record?'
        if (this.data.requestForUnlock) {
          this.unlockComponent = this.common.unlockSAA
        } else {
          this.unlockComponent = this.common.unlockSAA
        }
      } if (value === 2) {
        this.unlockComponent = this.common.approvedBySAA
        this.message = 'Are you sure you want to Approved this record?'
      } if (value === 3) {
        this.unlockComponent = this.common.rejectedSAA
        this.message = 'Are you sure you want to Reject this record?'
      } if (value === 4) {
        this.unlockComponent = this.common.requesttoUnlockNPD
        this.message = `Are you sure you want to Request to Unlock from ${this.sharedService.userTypeList['0'].userType} ?`
      }
    } if (this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['10'].id) {
      if (value === 1) {
        this.message = 'Are you sure you want to Unlock this record?'
        if (this.data.requestForUnlockByNPD) {
          this.unlockComponent = this.common.unlockBYNPD
        } else {
          this.unlockComponent = this.common.unlockBYNPD
        }
      } if (value === 2) {
        this.unlockComponent = this.common.approvedByNPD
        this.message = 'Are you sure you want to Approved this record?'
      } if (value === 3) {
        this.unlockComponent = this.common.rejectedByNPD
        this.message = 'Are you sure you want to Reject this record?'
      }
    }

  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }
  // APPROVED_BY_SAA(195, "Approved by SAA"),
  //   DISAPPROVED_OR_REJECTED_APPROVED_BY_SAA(196, "Disapproved/Rejected by SAA"),
  //   APPROVED_BY_NPD(197, "Approved by NPD"),
  //   DISAPPROVED_OR_REJECTED_APPROVED_BY_NPD(198, "Disapproved/Rejected by NPD"),
  //   Request_For_Unlocking_Scheme(47, "Request For Unlock Scheme"),

  //   Request_For_Unlocking_State(-1, "Request For Unlock State"),

  //   Request_to_Unlock_From_NPD(194, "Request to Unlock From NPD"),

  //   Unlock_By_NPD(0, "Unlock by NPD"),
  //   Unlock_Scheme(48, "Unlock Scheme");
}
