import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cfs-updation-rusa-dialog',
  templateUrl: './updation-rusa-dialog.component.html',
  styleUrls: ['./updation-rusa-dialog.component.scss']
})
export class UpdationRusaDialogComponent implements OnInit {


  formRemarks: FormGroup
  isFormInvalid: boolean
  editData:any =[]
  projectStatusList: Array<any> = [];
  formattedDate: any;
constructor(public dialogRef: MatDialogRef<UpdationRusaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any, public sharedService: SharedService,private datepipe: DatePipe,public fb: FormBuilder, public api: ApiService, public notification: NotificationService, public getSrevice:GetService) {
    this.editData=this.element;
    let status=this.element.rusaProjectStatusId

     this.formRemarks = this.fb.group({
          remarks: ['', [Validators.required]],
          projectstatus: [this.element.rusaProjectStatusId],
          pabMeetingNumber:['', [Validators.required]],
          pabDate:['', [Validators.required]],
        })
        this.formRemarks.get('remarks')?.setValue(this.element.remarks);

        if (this.element.rusaProjectStatusId === 4) {
          this.formRemarks.controls['projectstatus'].disable();
        } else {
          this.formRemarks.controls['projectstatus'].enable();
        }
        this.formRemarks.get('pabMeetingNumber')?.setValue(this.element.pabMeetingNumber);

        if (this.element.pabDate) {
          const [datePart, timePart] =this.element.pabDate?.split('T');
          let split_dateAsString1 = datePart?.split("-");
          let final_format1 =
            `${split_dateAsString1[1]}/${split_dateAsString1[0]}/${split_dateAsString1[2]}`;

          this.formRemarks.get('pabDate')?.setValue(new Date(final_format1));
          // this.formRemarks.get('pabDate')?.setValue(final_format1);

        }
               
  }

  ngOnInit(): void {
    this.getProjectStatus();
    // let abc=this.formRemarks.patchValue(this.element.rusaProjectStatusId)
  }

  getProjectStatus() {
    this.getSrevice.getprojectStatusList().subscribe(res => {
 
        let filterArr = res.data.filter(item => item.id != 1)
        this.projectStatusList = filterArr;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  compareUCDocumentData(temp: any): any {
    let updatedTemp = { ...temp };
    if (this.editData.rusaProjectStatusId !== updatedTemp.projectStatusId) {
      updatedTemp['projectStatusIdOld'] = this.editData.rusaProjectStatusId;
    }
    if (this.editData.remarks !== updatedTemp.projectUpdationRemarks) {
      updatedTemp['projectUpdationRemarksOld'] = this.editData.remarks;
    }
    if (this.editData.pabMeetingNumber !== updatedTemp.pabMeetingNumber) {
      updatedTemp['pabMeetingNumberOld'] = this.editData.pabMeetingNumber;
    }
    if (this.editData.pabDate !== updatedTemp.pabDate) {
      updatedTemp['pabDateOld'] = this.editData.pabDate;
    }
    return updatedTemp;
  }

  
  save() { 
  if(this.formRemarks.invalid){
    this.notification.showWarning()
    return
  }

  if (this.formRemarks.value.pabDate) {
    const inputDate = new Date(this.formRemarks.value.pabDate);
    const adjustedDate = new Date(inputDate.getTime() - (inputDate.getTimezoneOffset() * 60000));
    const inputDateString = this.datepipe.transform(adjustedDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ');
  
    const datePart = inputDateString.split("T")[0]; // "2024-01-25"
    const [year, month, day] = datePart.split("-").map(Number);
  
    // Format as DD-MM-YYYY with leading zeros
    this.formattedDate = `${String(day).padStart(2, "0")}-${String(month).padStart(2, "0")}-${year}`;
  }
  
  else {
    this.formattedDate = '';
  }
   let  temp={
     
      "id": this.element.id,
      "projectStatusId": this.formRemarks.value.projectstatus?this.formRemarks.value.projectstatus:this.element.rusaProjectStatusId,
      "projectUpdationRemarks": this.formRemarks.value.remarks,
      "pabMeetingNumber": this.formRemarks.value.pabMeetingNumber,
      "pabDate": this.formattedDate,
      "projectStatusIdOld":'',
      "projectUpdationRemarksOld":'',
      "pabMeetingNumberOld":'',
      "pabDateOld":''
    }

    temp = this.compareUCDocumentData(temp);

    this.api.rusaLegacyDataUpdateId(temp).subscribe(res => {
      if (res) {
        this.notification.showSuccess()
        this.dialogRef.close(true)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }

  @ViewChild('picker')
  datepicker!: MatDatepicker<Date>
  dateOpen() {
    this.datepicker.open();
  }
}

