import { Component, OnInit, Inject, ViewChild  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Subject } from 'rxjs/internal/Subject';
import { DeleteService } from 'src/app/service/delete.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, tap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss']
})
export class UploadImageDialogComponent implements OnInit {
  uploadList: any[] = [];
  avtivityId: string;
  itemData: any;
  insType: any;
  instituteCategory: string;
  isShowUpload: boolean = true;
  displayedColumns = ['no', 'fileName', 'preview', 'upload', 'delete'];
  myFilesNameDPR1: any;
  myFileArrayDPR: any;
  blob: any;
  tab: any
  fileSizeUnit: number = 5120;
  myFiles: File[] = [];
  myFilesName: string = '';
  uploadedMedia: Array<any> = [];
  fileSizeExceed: any;
  changeDoc: boolean = false;
  fileSize: any = 0
  hideView: boolean = true;
  showForm: boolean;
  addUpdateButton: string = "Save";
  hideButton: boolean = false;
  activityPhoto: any;
  infraConstructionList: any;
  instituteCategory1: string;
  editDocumentId: any;
  // hideview: boolean = true;
  @ViewChild('fileInput') fileInput: any;
  stateCode: string;
  componentId: any;
  districtCode: string;
  softComponentList: any;
  equipmentList: any;
  equipmentData: any;
  isInfraConstruction: any;
  getremarkData: any;
  monthList1: string[];
  V3Elegibal: boolean;
  oldIdArrFilter:any = []
  updateIdArrFilter:any = []
  deleteFilterArr:any = []
  newFilterArr:any = []
  newArray:any = [];
  totalArr:any = []
  existingRecordFilter:any = []
  item1FilterArray:any = []
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UploadImageDialogComponent>, public postService: PostService, public notification: NotificationService, private getService: GetService, private deleteService: DeleteService, public common: Common, public sharedService: SharedService, private api: ApiService, private route: ActivatedRoute, private encrypt: EncryptDecrypt) {
    this.stateCode = sessionStorage.getItem("stateCode")
    this.componentId = this.route.snapshot.paramMap.get('id');
    this.districtCode = sessionStorage.getItem("districtCode");
    if (this.data?.componentId === this.sharedService.collegeComponentId || this.data?.componentId === this.sharedService.universityComponentId || this.data?.componentId === this.sharedService.meruComponentId) {
      this.insType = this.data?.aisheCode.split(/[\W\d]+/).join("");
      this.instituteCategory = this.insType === "C" ? "C" : "U";
    }
    this.monthList1 = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];


  }

 ngOnInit(): void {
  this.avtivityId = this.dialogRef.id;
  this.itemData = this.data;
  this.getV3Elegibal()
  // Load existing uploaded images
  if (this.itemData.activityPhoto?.length > 0) {
    this.loadExistingImages();
  }

  // Always keep one blank row for upload
  // this.addRow();
}

getV3Elegibal() {
  let payload = null
  const isAisheCode = this.itemData?.componentId === this.sharedService.genderComponentId || this.itemData?.componentId === this.sharedService.nmdcComponentId ? this.itemData?.actionBy : this.itemData?.aisheCode;
  const encryptedAishe = isAisheCode ? this.encrypt.getEncryptedValue(isAisheCode) : '';
  payload = {
    componentId: this.avtivityId == '1' || this.avtivityId == '3' ? this.itemData?.componentId : this.itemData?.componentId?.id,
    aisheCode: encryptedAishe
  }
  this.getService.getfinalSubmitProposal(payload).subscribe(res => {

      if (res.data.length > 0) {
        if (res?.data[0]?.isV3ForwardedToNpd) {
          this.V3Elegibal = true;
        }
        else {
          this.V3Elegibal = false;
        }
       } 

    });
}

triggerFile(index: number) {
  document.getElementById(`fileInput${index}`).click();
}

viewImage(url: string) {
  window.open(url, "_blank");
}

loadExistingImages() {
  this.uploadList = [];

  if (this.itemData?.activityPhoto?.length) {
    this.itemData.activityPhoto.forEach(photo => {
      this.uploadList.push({
        file: photo.documentName,
        preview: null,
        documentId: photo.documentId,
        dateTime: photo.dateTime
      });
    });
  }
}

// getImageUrl(documentId: number) {
//   return this.postService.getImageUrl(documentId);
// }

getImageUrl(fileName: string): string {
  return `https://demo.he.nic.in/pmusha/institute/photo-document/${fileName}`;
}

// addRow() {
//   this.uploadList.push({ file: null, preview: null, documentId: null });
// }

// removeRow(i: number) {
//   this.uploadList.splice(i, 1);
//     if (this.uploadList.length === 0) {
//       this.addRow();
//     }
// }

onFileSelect(event: any) {
  const file = event.target.files[0];

  if (file) {
    this.uploadList.push({
      fileName: file.name,
      fileObj: file
    });
  }
}

uploadSingle() {
 const formdata: FormData = new FormData();
  if (this.changeDoc) {
      for (var i = 0; i < this.myFiles.length; i++) {
        if (!this.myFiles[i].type.startsWith('image/')) {
        this.notification.showValidationMessage(
          'Only image files are allowed'
        );
        return;
      }
        formdata.append('file', this.myFiles[i]);
      }
    } else {
      if (!this.blob) {
        this.notification.showValidationMessage('Please upload document !!!')
        return;
      }
    if (!this.blob.type.startsWith('image/')) {
      this.notification.showValidationMessage(
        'Only image files are allowed'
      );
      return;
    }
      formdata.append('file', this.blob, this.myFilesName);
    }
  
  let temp = {
    id: this.editDocumentId ? this.editDocumentId : 0,
    stateCode: this.avtivityId == '1' || this.avtivityId == '3' ? this.itemData?.stateCode : this.stateCode,
    districtCode: this.avtivityId == '1' || this.avtivityId == '3' ? this.itemData?.districtCode : this.districtCode,
    instituteCategory: this.instituteCategory ? this.instituteCategory : '',
    aisheCode: this.itemData?.componentId === this.sharedService.genderComponentId || this.itemData?.componentId === this.sharedService.nmdcComponentId ? '' : this.itemData?.aisheCode,
    componentId: this.avtivityId == '1' || this.avtivityId == '3' ? this.itemData?.componentId : this.itemData?.componentId?.id,
    documentType: "ACTIVITY_PHOTO",
    proposalActivityId: this.avtivityId,
    primaryId: this.itemData?.idValue ? this.itemData?.idValue : 0
  };

  this.postService.savePhotoDocument(temp, formdata)
    .subscribe((res) => {
      if (res.status === 200) {
        if (this.avtivityId == '1') {
          if (this.itemData?.componentId === this.sharedService.genderComponentId || this.itemData?.componentId === this.sharedService.nmdcComponentId) {
            this.getInfraConsEquip()
          }
          else {
            this.getInfraCons()
          }
          
        }
        else if (this.avtivityId == '4') {
          this.getSoftCompoenent()
        }
        else {
          if (this.itemData?.componentId === this.sharedService.genderComponentId || this.itemData?.componentId === this.sharedService.nmdcComponentId) {
            this.getEquipmentGenderEquity()
          }
          else {
            this.getEquipment()
          }
        }
        this.hideView =  true;
        this.hideButton = false;
        this.notification.showSuccessMessage("Image Upload Successfully");

        // convert new upload to existing row
      //  this.uploadList[index].documentId = res.data.documentId;
      }
    });
}

onConfirmClick(){
  this.dialogRef.close(this.avtivityId);
}

view(item) {
  let temp = {
    documentId: item.documentId,
   
  }
  this.getService.viewUCDocument(temp).subscribe((res) => {
    if (res) {
      this.viewPdfInNewTab(res.data[0].documentFile, res.data[0].name)
    }
  })
}


downloadFile(item) {
  let temp = {
    documentId: item.documentId,
   
  }
  this.getService.viewUCDocument(temp).subscribe((res) => {
    if (res) {
      this.downloadPdf1(res.data[0].documentFile, res.data[0].name)
    }
  })
}


viewPdfInNewTab(data, fileName) {
  // Convert base64 string to Uint8Array
  let uint8_data = this.base64ToUint8Array(data);

  // Create a Blob from the Uint8Array data
  let blob = new Blob([uint8_data], { type: 'image/jpeg' });

  // Create a URL for the Blob
  let url = URL.createObjectURL(blob);

  // Open the URL in a new tab
  window.open(url, '_blank');

  // Optionally, revoke the object URL after some time to free memory
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

downloadPdf1(data, fileName) {
  // Convert base64 string to Uint8Array
  let uint8_data = this.base64ToUint8Array(data);

  // Create a Blob from the Uint8Array data
  let blob = new Blob([uint8_data], { type: 'image/jpeg' });

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
  
base64ToUint8Array(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}

 async getFileDetails(e: any) {
    this.myFiles = [];
    this.myFilesName = '';
    this.uploadedMedia = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }

      else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFiles.push(e.target.files[i]);
        this.myFilesName += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesName += ',';
      }
    }
    const target = e.target as HTMLInputElement;
    // this.processFiles(target.files);
  }

  editDocument(item, value) {
  value === 'Edit' ? this.hideView = false : this.hideView = true
  this.hideButton = true;
  this.addUpdateButton = 'Update'
  this.myFilesName = item.file;
  this.editDocumentId = item.documentId;
    // this.documentForm.patchValue(item);
  }

  deleteDoc(itemId) {
    this.activityPhoto = this.itemData?.activityPhoto
    this.activityPhoto = this.activityPhoto.filter(x => x.documentId !== itemId)
    this.deleteService.deleteDocuments(itemId).subscribe((res => {

    if (res.status == 200) {
      this.activityPhoto = this.itemData?.activityPhoto
      this.activityPhoto = this.activityPhoto.filter(x => x.documentId !== itemId)
      if (this.avtivityId == '1') {
          this.saveTabInfra(this.activityPhoto);
      }
      else if (this.avtivityId == '4') {
        this.saveTabSoft(this.activityPhoto)
      }
      else {
        // if (this.itemData?.componentId === this.sharedService.genderComponentId) {
        //   this.saveTabEquipEquity(this.activityPhoto)
        // }
        // else {
          this.saveTabEquip(this.activityPhoto)
        // }

      }
    }
  }))
}

  saveTabInfra(itemValue:any) {
     let payload = [{
          aisheCode: this.itemData?.componentId === this.sharedService.genderComponentId || this.itemData?.componentId === this.sharedService.nmdcComponentId ? this.itemData?.actionBy : this.itemData?.aisheCode,
          componentId: this.itemData?.componentId,
          districtCode: this.itemData?.districtCode,
          id: this.itemData?.idValue,
          itemId: this.itemData?.id,
          month: this.itemData?.month,
          physicalProgress: this.itemData?.physicalProgress,
          progressRemarks: this.itemData?.progressRemarks,
          projectStatusId: this.itemData?.projectStatusId,
          proposalActivityId: this.avtivityId,
          stateCode: this.itemData?.stateCode,
          targetAchieved: "",
          year: this.itemData?.year,
          activityPhoto: itemValue
        }]
        this.postService.saveMonthlyProgressRemark(payload).subscribe(res => {
        if (res.status === 200) {
          this.latLong(this.avtivityId);
        }
      },
      (err) => { }
    );
  }

    latLong(viewId:any){
     let payload = {
        id: this.itemData?.id,
        proposalActivityId: viewId,
        latitude: this.itemData?.latitude,
        longitude:this.itemData?.longitude,
      }
    this.postService.latLong(payload).subscribe(res => {
        if (res.status === 200) {
          if (this.itemData?.componentId === this.sharedService.genderComponentId || this.itemData?.componentId === this.sharedService.nmdcComponentId){
            this.getInfraConsEquip()
          }
          else {
            this.getInfraCons()
          }

          this.notification.showDelete();
        }
      }, err => {

      })
    }

  saveTabSoft(itemValue:any) {
      let payload = [{
          aisheCode: this.itemData?.aisheCode,
          componentId: this.itemData?.componentId?.id,
          districtCode: this.itemData?.districtCode,
          id: this.itemData?.idValue,
          itemId: this.itemData?.id,
          month: this.itemData?.month,
          physicalProgress: this.itemData?.physicalProgress,
          progressRemarks: this.itemData?.progressRemarks,
          projectStatusId: this.itemData?.projectStatusId,
          proposalActivityId: this.avtivityId,
          stateCode: this.itemData?.stateCode,
          targetAchieved: "",
          year: this.itemData?.year,
          activityPhoto: itemValue
        }]
        this.postService.saveMonthlyProgressRemark(payload).subscribe(res => {
        if (res.status === 200) {
          this.getSoftCompoenent()
          this.notification.showDelete();
        }
      },
      (err) => { }
    );
  }

  saveTabEquip(itemValue:any) {
     let payload = [{
          aisheCode: this.itemData?.componentId === this.sharedService.genderComponentId || this.itemData?.componentId === this.sharedService.nmdcComponentId ? this.itemData?.actionBy : this.itemData?.aisheCode,
          componentId: this.itemData?.componentId,
          districtCode: this.itemData?.districtCode,
          id: this.itemData?.idValue,
          itemId: this.itemData?.id,
          month: this.itemData?.month,
          physicalProgress: this.itemData?.physicalProgress,
          progressRemarks: this.itemData?.progressRemarks,
          projectStatusId: this.itemData?.projectStatusId,
          proposalActivityId: this.avtivityId,
          stateCode: this.itemData?.stateCode,
          targetAchieved: "",
          year: this.itemData?.year,
          activityPhoto: itemValue
        }]
        this.postService.saveMonthlyProgressRemark(payload).subscribe(res => {
        if (res.status === 200) {
           if (this.itemData?.componentId === this.sharedService.genderComponentId || this.itemData?.componentId === this.sharedService.nmdcComponentId){
              this.getEquipmentGenderEquity()
           }
           else {
              this.getEquipment()
           }
          this.notification.showDelete();
        }
      },
      (err) => { }
    );
  }

  saveTabEquipEquity(itemValue:any) {
    let temp = [];
      temp.push({
        id: this.itemData?.id,
        componentId: this.itemData?.componentId,
        description: this.itemData?.description,
        districtCode: this.itemData?.districtCode,
        justification: this.itemData?.justification,
        location: this.itemData?.location,
        perUnitCost: this.itemData?.perUnitCost,
        proposedArea: this.itemData?.proposedArea,
        purpose: this.itemData?.purpose,
        stateCode: this.itemData?.stateCode,
        totalCost: this.itemData?.totalCost,
        recordStatusId: this.itemData?.recordStatusId,
        rsV3: this.itemData?.rsV3,
        oldId:this.itemData?.oldId,
        oldIdV3:this.itemData?.oldIdV3,
        v1:this.itemData?.v1,
        v2:this.itemData?.v2,
        v3:this.itemData?.v3,
        activityPhoto: itemValue
      });
    // this.postService.saveInfraConstructionGenderRevision(temp, this.itemData?.componentId, this.itemData?.stateCode, this.itemData?.districtCode, this.common.genderEquityInfroConstruction, FormData).subscribe(
    //   (res) => {
    //     if (res.status === 200) {
    //       this.getEquipmentGenderEquity()
    //       this.notification.showDelete();
    //     }
    //   },
    //   (err) => { }
    // );
  }

getInfraCons() {

  if (this.itemData?.instituteCategory === 'C') {
    this.instituteCategory1 = 'COLLEGE';
  } else {
    this.instituteCategory1 = 'UNIVERSITY';
  }

  this.api
    .getInfraCnstructionRevision(
      this.itemData?.aisheCode,
      this.instituteCategory1,
      this.itemData?.componentId,
      null,
      this.sharedService.pabStatus
    )
    .pipe(
      tap(res => {
         const infraData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = infraData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = infraData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = infraData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = infraData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.infraConstructionList = infraData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }

            this.infraConstructionList = this.infraConstructionList.map(item => ({
               ...item,
                month: this.itemData?.month,
                year: this.itemData?.year
            }));
        // this.infraConstructionList = res.data || [];
        // this.infraConstructionList = this.infraConstructionList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
        //   if (this.infraConstructionList) {
        //     this.infraConstructionList = res.data.map(item => {
        //       item.month = this.itemData?.month; // Months are zero-based, so add 1
        //       item.year = this.itemData?.year;
        //       return item;
        //     });
        //   }
      }),

      switchMap(() =>
        this.getService.getRemarkListUpdate(
        this.avtivityId,
        this.itemData?.componentId,
        this.itemData?.aisheCode,
        this.itemData?.month,
        this.itemData?.year
        )
      ),

      tap(res => {
        this.getremarkData = res.data;

        // this.infraConstructionList = this.infraConstructionList.filter(
        //   x =>
        //     (
        //       (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
        //       x?.recordStatus?.id === 1 ||
        //       (x?.recordStatus === null && x?.activeStatus === true)
        //     ) &&
        //     (x.v3 === null || x.v3 === false)
        // );

        this.getMergedData(this.infraConstructionList);
        const updateItem = this.infraConstructionList.filter(
          x => x.id === this.itemData?.id
        );

        this.itemData = updateItem[0];
        this.loadExistingImages();
      }),

      catchError(err => {
        console.error('Error in getInfraCons()', err);
        return of(null);
      })
    )
    .subscribe();
}


    getInfraConsEquip() {
       this.api.getInfraConstructionGenderRevision(this.itemData?.districtCode, this.itemData?.componentId, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          const infraData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = infraData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = infraData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = infraData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = infraData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
            this.isInfraConstruction = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
            this.isInfraConstruction = infraData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true)
          }

            this.isInfraConstruction = this.isInfraConstruction.map(item => ({
               ...item,
                month: this.itemData?.month,
                year: this.itemData?.year
            }));
          // this.isInfraConstruction = res.data || [];
          // this.isInfraConstruction = this.isInfraConstruction.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          // if (this.isInfraConstruction) {
          //   this.isInfraConstruction = res.data.map(item => {
          //     item.month = this.itemData?.month; // Months are zero-based, so add 1
          //     item.year = this.itemData?.year;
          //     return item;
          //   });
          // }
        }),
        switchMap(() => this.getService.getRemarkListUpdate(this.avtivityId, this.itemData?.componentId, this.itemData?.actionBy, this.itemData?.month, this.itemData?.year)),
        tap(res => {
          this.getremarkData = res.data;
          // this.isInfraConstruction = this.isInfraConstruction.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          this.getMergedData(this.isInfraConstruction);
          const updateItem = this.isInfraConstruction.filter(x => x.id === this.itemData?.id)
          this.itemData = updateItem[0];
          this.loadExistingImages()
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
      // this.api.getInfraConstructionGenderRevision(this.itemData?.districtCode, this.itemData?.componentId, this.sharedService.pabStatus).subscribe(res => {
      //   if (res) {
      //     this.isInfraConstruction = res.data || [];
      //     const updateItem = this.isInfraConstruction.filter(x => x.id === this.itemData?.id)
      //     this.itemData = updateItem[0];
      //     this.loadExistingImages()
      //   }
      // }
      // )
    }
    getSoftCompoenent() {
     if (this.itemData?.instituteCategory === "C") {
      this.instituteCategory1 = "COLLEGE";
      } else {
      this.instituteCategory1 = "UNIVERSITY";
      }
       this.api.getPhotoSoftCompoenentListRevision(this.itemData?.aisheCode, this.instituteCategory1, this.itemData?.componentId?.id, null, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
           const softData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = softData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = softData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = softData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = softData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.softComponentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.softComponentList = softData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }

            this.softComponentList = this.softComponentList.map(item => ({
               ...item,
                month: this.itemData?.month,
                year: this.itemData?.year
            }));
          // this.softComponentList = res.data || [];
          // this.softComponentList = this.softComponentList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          // if (this.softComponentList) {
          //   this.softComponentList = res.data.map(item => {
          //     item.month = this.itemData?.month; // Months are zero-based, so add 1
          //     item.year = this.itemData?.year;
          //     return item;
          //   });
          // }
        }),
        switchMap(() => this.getService.getRemarkListUpdate(this.avtivityId,
        this.itemData?.componentId?.id,
        this.itemData?.aisheCode,
        this.itemData?.month,
        this.itemData?.year)),
        tap(res => {
          this.getremarkData = res.data;
          // this.softComponentList = this.softComponentList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          this.getMergedData(this.softComponentList);
           const updateItem = this.softComponentList.filter(x => x.id === this.itemData?.id)
          this.itemData = updateItem[0];
          this.loadExistingImages()
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
    }


    getEquipment() {
      if (this.itemData?.instituteCategory === "C") {
        this.instituteCategory1 = "COLLEGE";
      } else {
        this.instituteCategory1 = "UNIVERSITY";
      }
       this.api.getPhotoEquipmentListRevision(this.itemData?.aisheCode, this.instituteCategory1, this.itemData?.componentId, null, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
        const equipmentData = res?.data || [];
          if (this.V3Elegibal) {
            this.updateIdArrFilter = equipmentData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = equipmentData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = equipmentData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = equipmentData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.equipmentList = equipmentData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }

            this.equipmentList = this.equipmentList.map(item => ({
               ...item,
                month: this.itemData?.month,
                year: this.itemData?.year
            }));
          // this.equipmentList = res.data || [];
          // this.equipmentList = this.equipmentList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          // if (this.equipmentList) {
          //   this.equipmentList = res.data.map(item => {
          //     item.month = this.itemData?.month; // Months are zero-based, so add 1
          //     item.year = this.itemData?.year;
          //     return item;
          //   });
          // }
        }),
        switchMap(() => this.getService.getRemarkListUpdate(this.avtivityId,
        this.itemData?.componentId,
        this.itemData?.aisheCode,
        this.itemData?.month,
        this.itemData?.year)),
        tap(res => {
          this.getremarkData = res.data;
          // this.equipmentList = this.equipmentList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          this.getMergedData(this.equipmentList);
          const updateItem = this.equipmentList.filter(x => x.id === this.itemData?.id)
            this.itemData = updateItem[0];
            this.loadExistingImages()
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
    }

    getEquipmentGenderEquity() {
      this.api.getEquipmentGenderEquityRevision(this.itemData?.districtCode, this.itemData?.componentId, this.sharedService.pabStatus)
      .pipe(
        tap(res => {
          this.equipmentData = res.data || [];
          this.equipmentData = this.equipmentData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          if (this.equipmentData) {
            this.equipmentData = res.data.map(item => {
              item.month = this.itemData?.month; // Months are zero-based, so add 1
              item.year = this.itemData?.year;
              return item;
            });
          }
        }),
        switchMap(() => this.getService.getRemarkListUpdate(this.avtivityId,  this.itemData?.componentId,
        this.itemData?.aisheCode,
        this.itemData?.month,
        this.itemData?.year)),
        tap(res => {
          this.getremarkData = res.data;
          this.equipmentData = this.equipmentData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
          this.getMergedData(this.equipmentData);
          const updateItem = this.equipmentData.filter(x => x.id === this.itemData?.id)
          this.itemData = updateItem[0];
          this.loadExistingImages()
        }),
        catchError(err => {
          // Handle errors here, perhaps logging them or showing a user-friendly message.
          return of(null);
        })
      ).subscribe();
      // this.api.getEquipmentGenderEquityRevision(this.itemData?.districtCode, this.itemData?.componentId, this.sharedService.pabStatus).subscribe(res => {
      //   if (res) {
      //     this.equipmentData = res.data || [];
      //     const updateItem = this.equipmentData.filter(x => x.id === this.itemData?.id)
      //     this.itemData = updateItem[0];
      //     this.loadExistingImages()
      //   }
      // }
      // )
    }

getMergedData(dataValue){
    dataValue.forEach(ele => {
      this.getremarkData.forEach(obj => {
        if (ele.id === obj.itemId) {
          ele['idValue'] = obj?.id,
          ele['projectStatusId'] = obj?.projectStatusId,
            ele['physicalProgress'] = obj?.physicalProgress,
            ele['progressRemarks'] = obj?.progressRemarks
            ele['targetFor2024'] = obj?.targetFor2024,
            ele['targetFor2025'] = obj?.targetFor2025,
            ele['targetFor2026'] = obj?.targetFor2026,
            ele['activityPhoto'] = obj?.activityPhoto,
            ele['previousMonth'] = obj?.month,
            ele['prevYear'] = obj?.year,
            ele['monthName'] = this.getMonthName(obj?.month)
        }
    });
  })
  }

  close(){
    this.hideView = true;
    this.hideButton = false;
    this.myFilesName = '';
    this.blob = null;
    this.changeDoc = false;
  }

  add() {
    this.hideButton = true;
    this.myFilesName = '';
    this.blob = null;
    this.changeDoc = false;
    this.editDocumentId = '';
  }

  reset(){
  this.myFilesName = '';      // clear input text
  // this.uploadList = [];       // clear your list (if needed)

  // Clear file input
  if (this.fileInput) {
    this.fileInput.nativeElement.value = "";
  }
    this.changeDoc = false;
  }

  getMonthName(monthNumber: number): string {
  return monthNumber ? this.monthList1[monthNumber - 1] : '';
}

}