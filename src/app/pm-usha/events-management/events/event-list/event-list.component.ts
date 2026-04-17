import { Component, Input, OnInit } from '@angular/core';
import { GetService } from 'src/app/service/get.service';
import { SharedService } from 'src/app/shared/shared.service';
import { DatePipe } from "@angular/common";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NotificationService } from 'src/app/service/notification.service';
import * as moment from "moment";
import { DeleteService } from 'src/app/service/delete.service';
import { MasterService } from 'src/app/service/master.service';
import { PostService } from 'src/app/service/post.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'cfs-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  datePipe: DatePipe = new DatePipe("en-GB");
  panelOpenState = true;
  eventTypeList:any=[];
  meetingDataType:boolean = false;
  stateVisitsType:boolean = false;
  physicalInspectionType:boolean = false;
  workShopType:boolean = false;
  userTypeId: string;
  @Input() dataList: any[] = []; 
  meetingData: any;
  stateVisits: any;
  physicalInspection: any;
  workShop: any;
  eventTypeListArray: any[] = [{id: '', name: 'ALL'}, {id: 1, name: 'Meetings'},{id: 2, name: 'State Visits'},{id: 4, name: 'Workshops'}]
  eventsFormData: FormGroup;
  isToggled: boolean = false;
  showForm: boolean = false;
  myFiles: string[] = [];
  myFilesName: any = "";
  stateList2: any;
  stateListArr: any;
  filterStateList: any;
  filterStateListArr: Array<any> = [];
  selectedStateCode: any;
  uploadedMedia: Array<any> = [];
  fileSizeExceed: any;
  changeDoc: boolean = false;
  documentTypeId: any;
  blob: Blob;
  documentFile: any;
  addButton: string = "Save";
  addUpdateButton: string = "Save";
  filterFormData:FormGroup;
  showFormMeeting:boolean = false;
  paginatedDataMeeting = [];
  paginatedDataState = [];
  paginatedDataWork = [];
  pageSize = 15;
  pageIndex = 0;
  pageSizeState = 15;
  pageIndexState = 0;
  pageSizeWork = 15;
  pageIndexWork = 0;
  tab: Window;
  documentShow:boolean;
  sortDir = 1;//1= 'ASE' -1= DSC
  sortDirection: 'asc' | 'desc' = 'asc';
  constructor(private getService: GetService, public sharedService: SharedService, public notification: NotificationService, private deleteService: DeleteService, public masterService: MasterService, public postService: PostService) {

    this.userTypeId = sessionStorage.getItem("userTypeId");
    this.eventsFormData = new FormGroup({
          eventName: new FormControl(""),
          formDate: new FormControl(""),
          toDate: new FormControl(""),
          meetingChairedby: new FormControl(""),
          participants: new FormControl([]),
          actionablePoints: new FormControl(""),
          nameofOfficial: new FormControl(""),
          placeVenue: new FormControl(""),
          conductedBy: new FormControl(""),
          workshopTraining: new FormControl(""),
          purpose: new FormControl(""),
          targetGroup: new FormControl(""),
          id: new FormControl({ value: null, disabled: true }),
          stateCode: new FormControl(""),
        });
    
    this.filterFormData = new FormGroup({
          fromDate: new FormControl(""),
          toDate: new FormControl(""),
          eventTypeId: new FormControl("")
        });
   }

  ngOnInit(): void {
    this.eventType()
    this.find()
    // this.eventsData()
    this.getSateDataList()
  }
  eventType(): void {
    this.getService.getEventType().subscribe((res) => {
      if (res) {
        const filterArray = res.data;
        this.eventTypeList = filterArray.filter(e=> e.id !== 3);
      }
    });
  }

  eventsData(){
    this.getService.getEvent1().subscribe((res) => {
      if (res.status === 200) {
        this.dataList = res?.data;
        this.dataList.forEach(ele => {
          this.eventTypeListArray.forEach(obj => {
            if (ele.eventTypeId === obj.id) {
              ele['eventTypeName'] = obj.name
            }
          })
        })
        
        this.meetingData = this.dataList.filter(x => x?.eventTypeId === 1);
        this.stateVisits = this.dataList.filter(x => x?.eventTypeId === 2);
        this.physicalInspection = this.dataList.filter(x => x?.eventTypeId === 3);
        this.workShop = this.dataList.filter(x => x?.eventTypeId === 4);
        this.updatePaginatedData()
        this.updatePaginatedDataState()
        this.updatePaginatedDataWork()
        this.eventsFormData.get("formDate").reset();
        this.eventsFormData.get("toDate").reset();
        this.eventsFormData.get("meetingChairedby").reset();
        this.eventsFormData.get("participants").reset();
        this.eventsFormData.get("actionablePoints").reset();
        this.eventsFormData.get("nameofOfficial").reset();
        this.eventsFormData.get("placeVenue").reset();
        this.eventsFormData.get("conductedBy").reset();
        this.eventsFormData.get("workshopTraining").reset();
        this.eventsFormData.get("purpose").reset();
        this.eventsFormData.get("targetGroup").reset();
        this.eventsFormData.get("stateCode").reset();
        this.handlePageChange(this.sharedService.page = 1)
        // this.meetingDataType = true;
        // this.stateVisitsType = true;
        // this.physicalInspectionType = true;
        // this.workShopType = true;
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getDocument(data) {
    let tem = {
      documentId: data,
    };
    this.getService.getDocumentData(tem).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.data[0]?.documentFile && res.data[0]?.id) {
          this.myFilesName = res.data[0]?.name;
          this.documentTypeId = res.data[0]?.id;
          this.downloadPdf2(res.data[0]?.documentFile);
        }

        // const fileInput = document.getElementById(
        //   "uploadFile"
        // ) as HTMLInputElement;
        // if (fileInput) {
        //   fileInput.value = this.myFilesName; // Clear file input
        // }
      }
    });
  }
  getDocumentFile(id:any,data:any){
    let tem = {
      documentId: data?.inspectionReportDocumentId,
    };
    this.getService.getDocumentData(tem).subscribe((res: any) => {
      if (res.status === 200) {
        this.viewPdfInNewTab(res.data[0]?.documentFile,res.data[0]?.name);
      }
    });
  }

  downloadFile(id: any, data: any) {
    let tem = {
      documentId: data?.inspectionReportDocumentId,
    };
    this.getService.getDocumentData(tem).subscribe((res: any) => {
      if (res.status === 200) {
        this.downloadPdf1(res.data[0]?.documentFile, res.data[0]?.name);
        // if (res.data[0]?.documentFile && res.data[0]?.id) {
        //   this.myFilesName = res.data[0]?.name;
        //   this.documentTypeId = res.data[0]?.id;

        // }
      }
    });
  }

  downloadPdf1(data, fileName) {
    // Convert base64 string to Uint8Array
    let uint8_data = this.base64ToUint8Array(data);

    // Create a Blob from the Uint8Array data
    let blob = new Blob([uint8_data], { type: 'application/pdf' });

    // Create a URL for the Blob
    let url = URL.createObjectURL(blob);

    // Create a link element to trigger the download
    let a = document.createElement('a');
    a.href = url;
    a.download = fileName; // You can set the filename here
    document.body.appendChild(a);

    // Trigger the download
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  viewPdfInNewTab(data, fileName) {
    // Convert base64 string to Uint8Array
    let uint8_data = this.base64ToUint8Array(data);
  
    // Create a Blob from the Uint8Array data
    let blob = new Blob([uint8_data], { type: 'application/pdf' });
  
    // Create a URL for the Blob
    let url = URL.createObjectURL(blob);
  
    // Open the URL in a new tab
    window.open(url, '_blank');
  
    // Optionally, revoke the object URL after some time to free memory
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }


  downloadPdf2(data: any) {
    if (!data) {
      return;
    }
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob = new Blob([ba], { type: "application/pdf" });
    function _base64ToArrayBuffer(base64: any) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }
  }
  base64ToUint8Array(base64) {
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

  viewPdf(data: any, fileName: string) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob = new Blob([ba], { type: "application/pdf" });
    function _base64ToArrayBuffer(base64: any) {
      var binary_string = window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }
  }
  find() {
    if (this.filterFormData.invalid) {
      this.notification.showValidationMessage("Please enter a valid event");
      return;
    }
    // Format the date values
    // const formattedDateFrom = this.datePipe.transform(
    //   this.filterFormData.controls["fromDate"]?.value?.toLocaleString(),
    //   "dd/MM/yyyy"
    // );
    // const formattedDateTo = this.datePipe.transform(
    //   this.filterFormData.controls["toDate"]?.value?.toLocaleString(),
    //   "dd/MM/yyyy"
    // );
     let formattedDateFrom = this.datePipe.transform(
      this.filterFormData.controls["fromDate"]?.value,
      "dd/MM/yyyy"
      );
      let formattedDateTo = this.datePipe.transform(
      this.filterFormData.controls["toDate"]?.value,
      "dd/MM/yyyy"
      );
  
    // Prepare the payload
    const payload = {
      fromDate: formattedDateFrom,
      toDate: formattedDateTo,
      eventTypeId: this.filterFormData.controls["eventTypeId"]?.value,
    };
  
    // Fetch data using the service
    this.getService.getEventDate(payload).subscribe(
      (res) => {
        if (res.status === 200) {
          this.dataList = res.data;
          
          // Map eventTypeId to eventTypeName
          this.dataList.forEach((event) => {
            const matchedType = this.eventTypeListArray.find(
              (type) => type.id === event.eventTypeId
            );
            if (matchedType) {
              event["eventTypeName"] = matchedType.name;
            }
          }); 
          this.dataList.sort((a, b) => a.eventTypeId - b.eventTypeId);
          const eventTypeId = this.filterFormData.controls["eventTypeId"]?.value;
          // Filter data based on eventTypeId
          this.meetingDataType = this.stateVisitsType = this.workShopType = false;
  
          if (!eventTypeId || eventTypeId === "") {
            // this.meetingDataType = this.stateVisitsType = this.physicalInspectionType = this.workShopType = true;
            this.meetingData = this.dataList.filter((x) => x.eventTypeId === 1);
            if (this.meetingData.length > 0){
              this.meetingDataType = true;
            }
            this.stateVisits = this.dataList.filter((x) => x.eventTypeId === 2);
            if (this.stateVisits.length > 0){
              this.stateVisitsType = true;
            }
            this.workShop = this.dataList.filter((x) => x.eventTypeId === 4);
            if (this.workShop.length > 0) {
              this.workShopType = true;
            }
            this.updatePaginatedData();
            this.updatePaginatedDataState()
            this.updatePaginatedDataWork()
          } else {
            switch (eventTypeId) {
              case 1:
                this.meetingData = this.dataList.filter((x) => x.eventTypeId === 1);
                if (this.meetingData.length > 0){
                  this.meetingDataType = true;
                }
                break;
              case 2:
                this.stateVisits = this.dataList.filter((x) => x.eventTypeId === 2);
                if (this.stateVisits.length > 0){
                  this.stateVisitsType = true;
                }
                break;
              case 4:
                this.workShop = this.dataList.filter((x) => x.eventTypeId === 4);
                if (this.workShop.length > 0) {
                  this.workShopType = true;
                }
                break;
            }
          }
          this.updatePaginatedData()
          this.updatePaginatedDataState()
          this.updatePaginatedDataWork()
          this.handlePageChange(this.sharedService.page = 1)
        }
      },
      (err) => {
        this.notification.showValidationMessage("An error occurred while fetching event data.");
      }
    );
  }

  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }

  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.dataList.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.dataList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.dataList.length - 1);
    }

  }

  // reset(){
  //   this.eventsFormData.controls["fromDate"]?.reset()
  //   this.eventsFormData.controls["toDate"]?.reset()
  //   this.eventsFormData.controls["eventTypeId"]?.setValue('')
  //   // this.find()
  // }

    editChecklist(id: any, data: any) {
      this.addButton = "Update";
      this.myFilesName = ""; // Reset file name
      const fileInput = document.getElementById("uploadFile") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ""; // Clear file input
      }
      if (data.eventTypeId === 1) {
        // this.showFormMeeting = true
        this.showForm = true;
        this.eventsFormData
          .get("formDate")
          ?.setValue(moment(data?.formDate, "DD/MM/YYYY hh:mm:ss A").toDate());
        this.eventsFormData
          .get("toDate")
          ?.setValue(moment(data?.toDate, "DD/MM/YYYY hh:mm:ss A").toDate());
        this.eventsFormData.get("id")?.setValue(data?.id);
        this.eventsFormData.get("eventTypeId")?.setValue(data?.eventTypeId);
        this.eventsFormData.get("meetingChairedby")?.setValue(data?.chairedBy);
        let Arr = data?.participant[0];
        this.eventsFormData.get("participants")?.setValue(Arr);
        this.eventsFormData.get("actionablePoints")?.setValue(data?.actionPoint);
        this.eventsFormData.controls["eventName"]?.setValue(data?.eventTypeId)
        this.getDocument(data?.inspectionReportDocumentId);
        this.eventsDataUpdate(data?.eventTypeId)
        this.documentShow = true;
      } else if (data.eventTypeId === 2) {
        this.showForm = true;
        this.eventsFormData
          .get("formDate")
          ?.setValue(moment(data?.formDate, "DD/MM/YYYY hh:mm:ss A").toDate());
        this.eventsFormData
          .get("toDate")
          ?.setValue(moment(data?.toDate, "DD/MM/YYYY hh:mm:ss A").toDate());
        this.eventsFormData.get("id")?.setValue(data?.id);
        this.eventsFormData.get("eventTypeId")?.setValue(data?.eventTypeId);
        this.eventsFormData.get("meetingChairedby")?.setValue(data?.chairedBy);
        this.eventsFormData.get("stateCode")?.setValue(data?.stateCode);
        let Arr = data?.participant[0];
        this.eventsFormData.get("participants")?.setValue(Arr);
        this.eventsFormData.get("actionablePoints")?.setValue(data?.actionPoint);
        this.eventsFormData.controls["eventName"]?.setValue(data?.eventTypeId)
        this.getDocument(data?.inspectionReportDocumentId);
        this.eventsDataUpdate(data?.eventTypeId)
        this.documentShow = true;
      } else if (data.eventTypeId === 4) {
        this.showForm = true;
        this.eventsFormData
          .get("formDate")
          ?.setValue(moment(data?.formDate, "DD/MM/YYYY hh:mm:ss A").toDate());
        this.eventsFormData
          .get("toDate")
          ?.setValue(moment(data?.toDate, "DD/MM/YYYY hh:mm:ss A").toDate());
        this.eventsFormData.get("purpose")?.setValue(data?.purposeOfWorkshop);
        this.eventsFormData.get("targetGroup")?.setValue(data?.targetGroup);
        this.eventsFormData.get("id")?.setValue(data?.id);
        this.eventsFormData.get("eventTypeId")?.setValue(data?.eventTypeId);
        this.eventsFormData
          .get("workshopTraining")
          ?.setValue(data?.nameOfWorkshop);
        this.eventsFormData
          .get("conductedBy")
          ?.setValue(data?.workshopConductedBy);
          this.eventsFormData.controls["eventName"]?.setValue(data?.eventTypeId)
        this.getDocument(data?.inspectionReportDocumentId);
        this.eventsDataUpdate(data?.eventTypeId)
        this.documentShow = true;
      }
    }

    deleteEvent1(i, id: any) {
      let temp = id;
      this.deleteService.deleteEvent(temp).subscribe((res) => {
        if (res.status === 200) {
          let dataList1 = this.dataList.filter((data) => data.id !== id);
          this.dataList = dataList1;
          this.notification.showDelete();
          this.eventsData();
          this.find()
        }
      });
    }

    add(e:any) {
        this.showForm = !this.showForm
    }

    eventsData1(e: any) {
      if (!e.value) {
        // this.getEventData(e.value);
        return;
      }
      this.myFilesName = ""; // Reset file name
      const fileInput = document.getElementById("uploadFile") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ""; // Clear file input
      }
      this.eventsFormData.get("id").setValue(null);
      // this.getEventData(e.value);
      const formDateControl = this.eventsFormData.get("formDate");
      const toDateControl = this.eventsFormData.get("toDate");
      const eventNameControl = this.eventsFormData.controls["eventName"];
      const meetingChairedbyControl = this.eventsFormData.get("meetingChairedby");
      const actionablePointsControl = this.eventsFormData.get("actionablePoints");
      const participantsControl = this.eventsFormData.get("participants");
      const nameofOfficialControl = this.eventsFormData.get("nameofOfficial");
      const conductedByControl = this.eventsFormData.get("conductedBy");
      const workshopTrainingControl = this.eventsFormData.get("workshopTraining");
      const purposeControl = this.eventsFormData.get("purpose");
      const targetGroupControl = this.eventsFormData.get("targetGroup");
      const stateCodeControl = this.eventsFormData.get("stateCode");
      const clearValidators = (control: AbstractControl) => {
        control.clearValidators();
        control.updateValueAndValidity();
        control.setValue(null);
      };
  
      if (e.value === 1) {
        meetingChairedbyControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        formDateControl.setValidators([
          Validators.required,
        ]);
        toDateControl.setValidators([
          Validators.required,
        ]);
        // meetingChairedbyControl.setValidators(Validators.required,this.noSpecialCharsValidator());
        actionablePointsControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        participantsControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        
  
        nameofOfficialControl.clearValidators();
        clearValidators(conductedByControl);
        clearValidators(workshopTrainingControl);
        clearValidators(purposeControl);
        clearValidators(targetGroupControl);
        clearValidators(stateCodeControl);
  
        this.eventsFormData.get("nameofOfficial").reset();
        this.eventsFormData.get("placeVenue").reset();
        this.eventsFormData.get("conductedBy").reset();
        this.eventsFormData.get("workshopTraining").reset();
        this.eventsFormData.get("purpose").reset();
        this.eventsFormData.get("targetGroup").reset();
        this.eventsFormData.get("stateCode").reset();
      }
      else if (e.value === 2) {
        meetingChairedbyControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        formDateControl.setValidators([
          Validators.required,
        ]);
        toDateControl.setValidators([
          Validators.required,
        ]);
        // meetingChairedbyControl.setValidators(Validators.required,this.noSpecialCharsValidator());
        actionablePointsControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        participantsControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        stateCodeControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        nameofOfficialControl.clearValidators();
        clearValidators(conductedByControl);
        clearValidators(workshopTrainingControl);
        clearValidators(purposeControl);
        clearValidators(targetGroupControl);
  
        this.eventsFormData.get("nameofOfficial").reset();
        this.eventsFormData.get("placeVenue").reset();
        this.eventsFormData.get("conductedBy").reset();
        this.eventsFormData.get("workshopTraining").reset();
        this.eventsFormData.get("purpose").reset();
        this.eventsFormData.get("targetGroup").reset();
      }
       else {
        conductedByControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        workshopTrainingControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        purposeControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        targetGroupControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        formDateControl.setValidators([
          Validators.required,
        ]);
        toDateControl.setValidators([
          Validators.required,
        ]);
        clearValidators(meetingChairedbyControl);
        clearValidators(actionablePointsControl);
        clearValidators(participantsControl);
        clearValidators(nameofOfficialControl);
        clearValidators(stateCodeControl);
  
        this.eventsFormData.get("meetingChairedby").reset();
        this.eventsFormData.get("participants").reset();
        this.eventsFormData.get("actionablePoints").reset();
        this.eventsFormData.get("nameofOfficial").reset();
        this.eventsFormData.get("placeVenue").reset();
        this.eventsFormData.get("stateCode").reset();
      }
      formDateControl.updateValueAndValidity();
      toDateControl.updateValueAndValidity();
      meetingChairedbyControl.updateValueAndValidity();
      actionablePointsControl.updateValueAndValidity();
      participantsControl.updateValueAndValidity();
      nameofOfficialControl.updateValueAndValidity();
      conductedByControl.updateValueAndValidity();
      workshopTrainingControl.updateValueAndValidity();
      purposeControl.updateValueAndValidity();
      targetGroupControl.updateValueAndValidity();
      stateCodeControl.updateValueAndValidity();
    }

    eventsDataUpdate(e: any) {
      if (!e) {
        // this.getEventData(e.value);
        return;
      }
      this.myFilesName = ""; // Reset file name
      const fileInput = document.getElementById("uploadFile") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ""; // Clear file input
      }
      // this.eventsFormData.get("id").setValue(null);
      // this.getEventData(e.value);
      const formDateControl = this.eventsFormData.get("formDate");
      const toDateControl = this.eventsFormData.get("toDate");
      const eventNameControl = this.eventsFormData.controls["eventName"];
      const meetingChairedbyControl = this.eventsFormData.get("meetingChairedby");
      const actionablePointsControl = this.eventsFormData.get("actionablePoints");
      const participantsControl = this.eventsFormData.get("participants");
      const nameofOfficialControl = this.eventsFormData.get("nameofOfficial");
      const conductedByControl = this.eventsFormData.get("conductedBy");
      const workshopTrainingControl = this.eventsFormData.get("workshopTraining");
      const purposeControl = this.eventsFormData.get("purpose");
      const targetGroupControl = this.eventsFormData.get("targetGroup");
      const stateCodeControl = this.eventsFormData.get("stateCode");
      const clearValidators = (control: AbstractControl) => {
        control.clearValidators();
        control.updateValueAndValidity();
        control.setValue(null);
      };
  
      if (e === 1) {
        meetingChairedbyControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        formDateControl.setValidators([
          Validators.required,
        ]);
        toDateControl.setValidators([
          Validators.required,
        ]);
        // meetingChairedbyControl.setValidators(Validators.required,this.noSpecialCharsValidator());
        actionablePointsControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        participantsControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        
  
        nameofOfficialControl.clearValidators();
        clearValidators(conductedByControl);
        clearValidators(workshopTrainingControl);
        clearValidators(purposeControl);
        clearValidators(targetGroupControl);
        clearValidators(stateCodeControl);
  
        this.eventsFormData.get("nameofOfficial").reset();
        this.eventsFormData.get("placeVenue").reset();
        this.eventsFormData.get("conductedBy").reset();
        this.eventsFormData.get("workshopTraining").reset();
        this.eventsFormData.get("purpose").reset();
        this.eventsFormData.get("targetGroup").reset();
        this.eventsFormData.get("stateCode").reset();
      }
      else if (e === 2) {
        meetingChairedbyControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        formDateControl.setValidators([
          Validators.required,
        ]);
        toDateControl.setValidators([
          Validators.required,
        ]);
        // meetingChairedbyControl.setValidators(Validators.required,this.noSpecialCharsValidator());
        actionablePointsControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        participantsControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        stateCodeControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        nameofOfficialControl.clearValidators();
        clearValidators(conductedByControl);
        clearValidators(workshopTrainingControl);
        clearValidators(purposeControl);
        clearValidators(targetGroupControl);
  
        this.eventsFormData.get("nameofOfficial").reset();
        this.eventsFormData.get("placeVenue").reset();
        this.eventsFormData.get("conductedBy").reset();
        this.eventsFormData.get("workshopTraining").reset();
        this.eventsFormData.get("purpose").reset();
        this.eventsFormData.get("targetGroup").reset();
      }
      else if (e === 4) {
        conductedByControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        workshopTrainingControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        purposeControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        targetGroupControl.setValidators([
          Validators.required,
          // this.noSpecialCharsValidator(),
        ]);
        formDateControl.setValidators([
          Validators.required,
        ]);
        toDateControl.setValidators([
          Validators.required,
        ]);
        clearValidators(meetingChairedbyControl);
        clearValidators(actionablePointsControl);
        clearValidators(participantsControl);
        clearValidators(nameofOfficialControl);
        clearValidators(stateCodeControl);
  
        this.eventsFormData.get("meetingChairedby").reset();
        this.eventsFormData.get("participants").reset();
        this.eventsFormData.get("actionablePoints").reset();
        this.eventsFormData.get("nameofOfficial").reset();
        this.eventsFormData.get("placeVenue").reset();
        this.eventsFormData.get("stateCode").reset();
      }
      formDateControl.updateValueAndValidity();
      toDateControl.updateValueAndValidity();
      meetingChairedbyControl.updateValueAndValidity();
      actionablePointsControl.updateValueAndValidity();
      participantsControl.updateValueAndValidity();
      nameofOfficialControl.updateValueAndValidity();
      conductedByControl.updateValueAndValidity();
      workshopTrainingControl.updateValueAndValidity();
      purposeControl.updateValueAndValidity();
      targetGroupControl.updateValueAndValidity();
      stateCodeControl.updateValueAndValidity();
    }
  
    getSateDataList() {
      this.masterService.getStateData().subscribe((res) => {
        this.stateList2 = res;
        this.stateListArr = res
        this.filterStateList = this.stateList2.slice();
        this.filterStateListArr = this.stateListArr.slice()
      }, () => { })
    }

    stateFilterChanges(value: any) {
      this.selectedStateCode = value;
    }

    async inspectionReport(e: any, eunm: any) {
      if (e.target.files.length <= 0) {
        return;
      }
      this.myFiles = [];
      this.myFilesName = "";
      this.uploadedMedia = [];
      for (var i = 0; i < e.target.files.length; i++) {
        if (e.target.files[i].size > 26214400) {
          this.fileSizeExceed = true;
          this.notification.showValidationMessage(
            "File size should be less than 25MB."
          );
          return;
        } else {
          const file = e.target.files[i];
          const fileName = file.name;
  
          // Validate for double extension
          if (this.hasDoubleExtension(fileName)) {
            this.notification.showValidationMessage(
              "Invalid file: double extensions are not allowed."
            );
            this.myFilesName = "";
            const fileInput = document.getElementById(
              "uploadFile"
            ) as HTMLInputElement;
            if (fileInput) {
              fileInput.value = ""; // Clear file input
            }
            return;
          }
  
          // Validate for allowed extension
          if (!fileName.toLowerCase().endsWith(".pdf")) {
            this.notification.showValidationMessage(
              "Invalid file: only PDF files are allowed."
            );
            this.myFilesName = "";
            const fileInput = document.getElementById(
              "uploadFile"
            ) as HTMLInputElement;
            if (fileInput) {
              fileInput.value = ""; // Clear file input
            }
            return;
          }
          this.changeDoc = true;
          this.fileSizeExceed = false;
          this.myFiles.push(e.target.files[i]);
          this.myFilesName += e.target.files[i].name;
        }
        if (!(e.target.files.length - 1 === i)) {
          this.myFilesName += ",";
        }
      }
      const target = e.target as HTMLInputElement;
      for (var i = 0; i < this.myFiles.length; i++) {
        this.documentFile = this.myFiles[i];
      }
      if (this.documentFile && eunm) {
        this.saveFile(eunm);
      }
    }

    saveFile(eunm) {
      this.documentTypeId = 0;
      let formdata: FormData = new FormData();
      if (this?.blob && !this.changeDoc) {
        formdata.append("file", this.blob);
      } else {
        formdata.append("file", this.documentFile, this?.myFilesName);
      }
      let temp = {
        stateCode: "",
        documentTypeId: eunm,
        componentId: 0,
        id: this.documentTypeId ? this.documentTypeId : 0,
      };
      this.postService.saveInstituteDocument(temp, formdata).subscribe((res) => {
        this.documentTypeId = res.data;
        this.documentShow = false;
      });
    }

    hasDoubleExtension(fileName: string): boolean {
      const splitName = fileName?.split(".");
      return splitName?.length > 2; // If more than one period exists, it's a double extension
    }

    save(): void {
      let formattedDate;
      let formattedDateFrom = this.datePipe.transform(
      this.eventsFormData.controls["formDate"]?.value,
      "dd/MM/yyyy"
      );

      let formattedDateto = this.datePipe.transform(
      this.eventsFormData.controls["toDate"]?.value,
      "dd/MM/yyyy"
      );
  
      if (this.eventsFormData.invalid) {
        this.notification.showValidationMessage("please enter a valid event");
        return;
      }
  
      let temp = {
        actionPoint: this.eventsFormData.controls["actionablePoints"].value
          ? this.eventsFormData.controls["actionablePoints"].value
          : null,
        chairedBy: this.eventsFormData.controls["meetingChairedby"].value
          ? this.eventsFormData.controls["meetingChairedby"].value
          : null,
        formDate: this.eventsFormData.controls["formDate"].value ? formattedDateFrom : null,
        toDate: this.eventsFormData.controls["toDate"].value ? formattedDateto : null,
        participant: (this.eventsFormData.controls["eventName"].value === 2 || this.eventsFormData.controls["eventName"].value === 1) ? [this.eventsFormData.controls["participants"].value] : this.eventsFormData.controls["participants"].value,
        eventTypeId: this.eventsFormData.controls["eventName"].value,
        id: this.eventsFormData.controls["id"].value
          ? this.eventsFormData.controls["id"].value
          : 0,
        inspectionReportDocumentId: this.documentTypeId
          ? this.documentTypeId
          : null,
        inspectionReportDocumentName: this.myFilesName ? this.myFilesName : null,
        nameOfOfficial: this.eventsFormData.controls["nameofOfficial"].value
          ? this.eventsFormData.controls["nameofOfficial"].value
          : null,
        placeVenue: this.eventsFormData.controls["placeVenue"].value
          ? this.eventsFormData.controls["placeVenue"].value
          : null,
  
        nameOfWorkshop: this.eventsFormData.controls["workshopTraining"].value
          ? this.eventsFormData.controls["workshopTraining"].value
          : null,
        purposeOfWorkshop: this.eventsFormData.controls["purpose"].value
          ? this.eventsFormData.controls["purpose"].value
          : null,
        targetGroup: this.eventsFormData.controls["targetGroup"].value
          ? this.eventsFormData.controls["targetGroup"].value
          : null,
        workshopConductedBy: this.eventsFormData.controls["conductedBy"].value
          ? this.eventsFormData.controls["conductedBy"].value
          : null,
        stateCode: this.eventsFormData.controls["stateCode"].value
        ? this.eventsFormData.controls["stateCode"].value
        : null,
      };
      this.postService.saveEvent(temp).subscribe((res) => {
        if (res.status === 200) {
          this.reset()
          this.resetFilter()
          this.eventsDataUpdate(this.eventsFormData.controls["eventName"].value)
          // this.getEventData(this.eventsFormData.controls["eventName"].value);
          this.eventsData();
          this.find();
          this.blob = null;
          this.addButton = "Save";
          this.notification.showSuccess();
          
        }
      });
    }

    reset() {
      this.myFiles = [];
      this.myFilesName = '';
      // this.documentForm.reset();
      this.showForm = true;
      this.eventsFormData.get("formDate").reset();
      this.eventsFormData.get("toDate").reset();
      this.eventsFormData.get("meetingChairedby").reset();
      this.eventsFormData.get("participants").reset();
      this.eventsFormData.get("actionablePoints").reset();
      this.eventsFormData.get("nameofOfficial").reset();
      this.eventsFormData.get("placeVenue").reset();
      this.eventsFormData.get("stateCode").reset();
      this.eventsFormData.get("conductedBy").reset();
      this.eventsFormData.get("workshopTraining").reset();
      this.eventsFormData.get("purpose").reset();
      this.eventsFormData.get("targetGroup").reset();
    }

    resetFilter(){
      this.filterFormData.get("fromDate").reset();
      this.filterFormData.get("toDate").reset();
      this.filterFormData.get("eventTypeId").setValue('');
      this.find()
    }
  
    close() {
      this.addUpdateButton = 'Save'
      // this.documentForm.reset();
      this.showForm = false;
      this.showFormMeeting = false;
    }

    onPageChange(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.updatePaginatedData();
    }

    onPageChangeState(event: PageEvent) {
      this.pageIndexState = event.pageIndex;
      this.pageSizeState = event.pageSize;
      this.updatePaginatedDataState();
    }

    onPageChangeWork(event: PageEvent) {
      this.pageIndexWork = event.pageIndex;
      this.pageSizeWork = event.pageSize;
      this.updatePaginatedDataWork();
    }

    updatePaginatedData() {
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedDataMeeting = this.meetingData.slice(startIndex, endIndex);
      // this.paginatedDataState = this.stateVisits.slice(startIndex, endIndex);
    }

   onSortClick(event: any, colName: string, dataArray: any) {
    const target = event.currentTarget;
    const classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }

    this.sortArrayByColumn(colName, dataArray);
}

sortArrayByColumn(colName: any, dataArray: any) {
  dataArray.sort((a, b) => {
    const valA = a[colName]?.toLowerCase() || '';
    const valB = b[colName]?.toLowerCase() || '';
    return valA.localeCompare(valB) * this.sortDir;
  });
}

    updatePaginatedDataState() {
      const startIndex = this.pageIndexState * this.pageSizeState;
      const endIndex = startIndex + this.pageSizeState;
      this.paginatedDataState = this.stateVisits.slice(startIndex, endIndex);
    }
    updatePaginatedDataWork() {
      const startIndex = this.pageIndexWork * this.pageSizeWork;
      const endIndex = startIndex + this.pageSizeWork;
      this.paginatedDataWork = this.workShop.slice(startIndex, endIndex);
    }

  sortAscending = true;
sortBy(dataArray: any[], colName: string) {
  dataArray.sort((a, b) => {
    let valA = a[colName] ?? '';
    let valB = b[colName] ?? '';
    let comparison = 0;

    const isDateField = ['formDate', 'toDate'].includes(colName);

    if (isDateField) {
      const dateA = this.parseDate(valA);
      const dateB = this.parseDate(valB);
      comparison = dateA.getTime() - dateB.getTime();
    } else {
      comparison = valA.toString().localeCompare(valB.toString());
    }

    return this.sortAscending ? comparison : -comparison;
  });

  this.sortAscending = !this.sortAscending;
  this.sortDirection = this.sortAscending ? 'asc' : 'desc';
}




// Helper function to parse DD/MM/YYYY or DD/MM/YYYY HH:MM:SS format
parseDate(dateStr: string): Date {
  if (!dateStr) return new Date(0);

  const parts = dateStr.split(' ')[0].split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  return new Date(dateStr);
}

trackById(index: number, item: any) {
  return item.id;
}

}
