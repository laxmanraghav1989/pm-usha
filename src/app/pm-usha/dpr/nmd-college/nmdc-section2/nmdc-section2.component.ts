import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ViewportScroller } from "@angular/common";
import { MasterService } from "src/app/service/master.service";
import { NotificationService } from "src/app/service/notification.service";
import { ApiService } from "src/app/service/api.service";
import { GetService } from "src/app/service/get.service";
import { SharedService } from "src/app/shared/shared.service";
import { Common } from "src/app/shared/common";
import { PostService } from "src/app/service/post.service";
import { CustomErrorStateMatcher } from "src/app/utility/validators";
import { BooleanEntity } from "src/app/pm-usha/Entity/boolean-entity";
import { DeleteService } from "src/app/service/delete.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "cfs-nmdc-section2",
  templateUrl: "./nmdc-section2.component.html",
  styleUrls: ["./nmdc-section2.component.scss"],
})
export class NmdcSection2Component implements OnInit {
  @ViewChild("fileInput", { static: false }) myVar1: ElementRef | undefined;
  infraConstructionList: Array<any> = [];
  uploadedMedia: any;
  infraConstruction: FormGroup;
  equipment: FormGroup;
  equipmentList: Array<any> = [];
  changeDoc: boolean = false;
  proposedArea: number = 0;
  perUnitCost: number = 0;
  totalCost: number = 0;
  quantity: number = 0;
  selectedIndex: any = 0;
  insType: string;
  isFormInvalid: boolean = false;
  addUpdate: boolean = false;
  hideButton: boolean = true;
  addUpdateButton: string = "Save";
  stateCode: String;
  formDataMdcBasicDetails: FormGroup;
  districtCode: string;
  disabledPage: boolean = false;
  hideItem: boolean = true;
  fileSizeUnit: number = 5120;
  myFiles1: string[] = [];
  myFiles2: string[] = [];
  myFiles3: string[] = [];
  myFiles: string[] = [];
  myFiles4: string[] = [];
  myFiles5: string[] = [];
  myFilesName1: any = "";
  myFilesName2: any = "";
  myFilesName3: any = "";
  myFilesName: any = "";
  myFilesName4: any = "";
  myFilesName5: any = "";
  fileSizeExceed: any;
  fileSize: any = 0;
  blob: any;
  blob2: any;
  blob3: any;
  blob4: any;
  isOrganogramUploaded: boolean = false
  organogramDoc: string
  organogramFile: any
  basicId: any = 0
  paramId: number;
  isInfraDisabled: boolean = false;
  isEquoDisabled: boolean = false;
  aisheCode: string;
  FinalLockKey: any;
  oldIdArrFilter:any = []
  updateIdArrFilter:any = []
  deleteFilterArr:any = []
  newFilterArr:any = []
  newArray:any = [];
  existingRecordFilter:any = []
  item1FilterArray:any = []
  totalArr:any = []
  itemList: Array<any> = []
  constructor(
    public api: ApiService,
    public fb: FormBuilder,
    public notification: NotificationService,
    public common: Common,
    public viewportScroller: ViewportScroller,
    public masterService: MasterService,
    public sharedService: SharedService,
    public getService: GetService,
    public postService: PostService,
    public errorMatcher: CustomErrorStateMatcher,
    public booleanEntity: BooleanEntity, public deleteService: DeleteService, public post: PostService,  private route: ActivatedRoute
  ) {
    this.stateCode = sessionStorage.getItem("stateCode");
    this.districtCode = sessionStorage.getItem("districtCode");
    this.aisheCode = sessionStorage.getItem("userName");

    this.formDataMdcBasicDetails = this.fb.group({
      visionMission: [null, [Validators.required]],
      boardOfGovernance: [null, [Validators.required]],
      broadObjective: [null, [Validators.required]],
      // declarationOfFreeLandByStateGovt: false,
      existingLandAvailability: [null, [Validators.required]],
      id: 0,
      isLandOwnerCertificateUploaded: [null, []],
      isLocationCertificateUploaded: [null, []],
      latitude: [null, [Validators.required]],
      locationOfLand: [null, []],
      longitude: [null, [Validators.required]],
      mdcDistrictCode: [null, []],
      organizationalStructure: [null, []],
      pmuDetail: [null, [Validators.required]],
      roleAndResponsibility: [null, [Validators.required]],
      mapofthelanddurlysigned: [null, []],
    });

    this.infraConstruction = this.fb.group({
      description: [null, [Validators.required]],
      id: 0,
      justification: [null, [Validators.required]],
      perUnitCost: [null, [Validators.required]],
      proposedArea: [null, [Validators.required]],
      purpose: [null, [Validators.required]],
      totalCost: [null, [Validators.required]],
      location: [null, [Validators.required]],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []]
    });
    this.equipment = this.fb.group({
      name: [null, [Validators.required]],
      id: 0,
      justification: [null, [Validators.required]],
      perUnitCost: [null, [Validators.required]],
      quantity: [null, [Validators.required]],
      totalCost: [null, [Validators.required]],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []]
    });
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
  }
  ngOnInit(): void {
    this.getLandBasicData();
    this.getBooleanData()
    this.getPageStatusList();
  }


  isList(event, array) {
    if (array && array.length) {
      this.notification.showValidationMessage('Please delete all row');
      event.preventDefault()
    } else {
      this.close();
    }
  }
  saveBooleanValue(value, menu, key) {
    if (value !== null) {
      let payload = {
        // "aisheCode": '',
        "componentId": this.sharedService.nmdcComponentId,
        "districtCode": this.districtCode,
        "menu": menu
      }
      payload[key] = value
      this.postService.saveBoolean(payload).subscribe(res => {
        if (res.status === 200) {
          this.getBooleanData()
        }
      }, err => {

      })
    } else {
      this.notification.showValidationMessage(`Please choose 'YES/NO'`)
    }

  }
  tabSelected(event) {
    this.resetTotal()
    this.selectedIndex = event.index;
    this.getBooleanData();
    this.close();
    this.isFormInvalid = false;

  }
  getBooleanData() {
    this.getService.getBooleanList('', this.sharedService.nmdcComponentId, this.districtCode).subscribe(res => {
      if (this.selectedIndex === 1) {
        this.booleanEntity.isInfraConstruction = res['0'].isInfraConstruction;
        if (this.booleanEntity.isInfraConstruction) {
          this.getInfraCons();
        } else {
          this.addUpdate = false
        }
      } if (this.selectedIndex === 2) {
        this.booleanEntity.isEquipment = res['0'].isEquipment;
        if (this.booleanEntity.isEquipment) {
          this.getEquipment();
        } else {
          this.addUpdate = false
        }

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }

  getPageStatusList() {
    this.api.getPageStatus(this.sharedService.nmdcComponentId).subscribe(
      (res) => {
        if (res.data && res.data.length) {
          for (let index = 0; index < res.data.length; index++) {

            if (res.data[index].moduleName === this.common.nmdcFinal) {
               if (this.paramId === this.sharedService.revPrposal && (this.selectedIndex === 1 || this.selectedIndex === 2)) {
                this.disabledPage = false
              }
              else {
                this.disabledPage = true
              }
            }

          }
        }
      },
      (err) => { }
    );
  }
  async getFileDetails(e: any) {
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
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFiles.push(e.target.files[i]);
        this.myFilesName1 += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesName += ",";
      }
    }
    const target = e.target as HTMLInputElement;
    this.processFiles(target.files);
  }

  async getFileDetails1(e: any) {
    this.myFiles1 = [];
    this.myFilesName1 = "";
    this.uploadedMedia = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage(
          "File size should be less than 25MB."
        );
        return;
      } else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFiles1.push(e.target.files[i]);
        this.myFilesName1 += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesName1 += ",";
      }
    }
    const target = e.target as HTMLInputElement;
    this.processFiles1(target.files);
  }
  async getFileDetails2(e: any) {
    this.myFiles2 = [];
    this.myFilesName2 = "";
    this.uploadedMedia = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage(
          "File size should be less than 25MB."
        );
        return;
      } else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFiles2.push(e.target.files[i]);
        this.myFilesName2 += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesName2 += ",";
      }
    }
    const target = e.target as HTMLInputElement;
    this.processFiles2(target.files);
  }
  async getFileDetails3(e: any) {
    this.myFiles3 = [];
    this.myFilesName3 = "";
    this.uploadedMedia = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage(
          "File size should be less than 25MB."
        );
        return;
      } else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFiles3.push(e.target.files[i]);
        this.myFilesName3 += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesName3 += ",";
      }
    }
    const target = e.target as HTMLInputElement;
    this.processFiles3(target.files);
  }
  getFileDetails4(e: any): void {
    this.myFiles4 = [];
    this.myFilesName4 = "";
    this.uploadedMedia = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        this.fileSizeExceed = true;
        this.notification.showValidationMessage(
          "File size should be less than 25MB."
        );
        return;
      } else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFiles4.push(e.target.files[i]);
        this.myFilesName4 += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesName4 += ",";
      }
    }
    const target = e.target as HTMLInputElement;
    this.processFiles4(target.files);
  }
  processFiles4(files: any) {
    for (const file of files) {
      if (file.type != "application/pdf") {
        this.notification.showValidationMessage(
          "Please upload pdf file only!!!"
        );
        this.myFilesName4 = "";
        this.myFiles4 = [];
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.myFilesName4 = file.name;
      };
    }
  }
  processFiles1(files: any) {
    for (const file of files) {
      if (file.type != "application/pdf") {
        this.notification.showValidationMessage(
          "Please upload pdf file only!!!"
        );
        this.myFilesName1 = "";
        this.myFiles1 = [];
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.myFilesName1 = file.name;
      };
    }
  }
  processFiles2(files: any) {
    for (const file of files) {
      if (file.type != "application/pdf") {
        this.notification.showValidationMessage(
          "Please upload pdf file only!!!"
        );
        this.myFilesName2 = "";
        this.myFiles2 = [];
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.myFilesName2 = file.name;
      };
    }
  }
  processFiles3(files: any) {
    for (const file of files) {
      if (file.type != "application/pdf") {
        this.notification.showValidationMessage(
          "Please upload pdf file only!!!"
        );
        this.myFilesName3 = "";
        this.myFiles3 = [];
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.myFilesName3 = file.name;
      };
    }
  }

  processFiles(files: any) {
    for (const file of files) {
      if (file.type != "application/pdf") {
        this.notification.showValidationMessage(
          "Please upload pdf file only!!!"
        );
        this.myFilesName1 = "";
        this.myFiles = [];
        return;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        this.myFilesName1 = file.name;
      };
    }
  }

  getInfraCons() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.getService
      .getInfraCnstructionRevision(
        this.districtCode,
        this.sharedService.nmdcComponentId, this.sharedService.pabStatus
      )
      .subscribe(
        (res) => {
          this.processInfraResponse(res)
          this.saveLockStatus()
          // this.infraConstructionList = [];
          // this.infraConstructionList = res.data;
         
        },
        (err) => { }
      );
    }
    else {
      this.getService
      .getInfraCnstruction(
        this.districtCode,
        this.sharedService.nmdcComponentId
      )
      .subscribe(
        (res) => {
          this.processInfraResponse(res)
          // this.infraConstructionList = [];
          // this.infraConstructionList = res.data;
         
        },
        (err) => { }
      );
    }
    
  }

  processInfraResponse(res) {
    this.infraConstructionList = [];
    this.newArray = []
    if (this.paramId === this.sharedService.revPrposal) {
      this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null)
      this.newFilterArr = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
          this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldId === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
    this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.infraConstructionList.filter(item => item.activeStatus == true)
}
    
    else{
      this.infraConstructionList = res.data
      this.totalArr = this.infraConstructionList

    }
    this.itemList = [];
    res.data.forEach(ele => {
      this.itemList.push({
        id: ele.id,
        name: ele.description
      });
    });

    this.proposedArea = this.totalArr.reduce(
      (sum, item) => sum + Number(item.proposedArea),
      0
    );

    this.perUnitCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.totalCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
}


  saveTab1() {
    if (this.infraConstruction.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true;
      return;
    } else {
      this.isFormInvalid = false;
    }

    let temp = [];
    if (this.paramId === this.sharedService.revPrposal) {
      temp.push({
        componentId: this.sharedService.nmdcComponentId,
        description: this.infraConstruction.controls["description"].value,
        id: this.infraConstruction.controls["id"].value,
        justification: this.infraConstruction.controls["justification"].value,
        perUnitCost: this.infraConstruction.controls["perUnitCost"].value,
        proposedArea: this.infraConstruction.controls["proposedArea"].value,
        purpose: this.infraConstruction.controls["purpose"].value,
        stateCode: this.stateCode,
        districtCode: this.districtCode,
        totalCost: this.infraConstruction.controls["totalCost"].value,
        location: this.infraConstruction.controls["location"].value,
        pabStatus: 1,
        recordStatus: this.infraConstruction.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.infraConstruction.controls["recordStatus"].value,
        activeStatus: this.infraConstruction.controls["activeStatus"].value ? this.infraConstruction.controls["activeStatus"].value : true,
        oldId:this.infraConstruction.controls["oldId"].value ? this.infraConstruction.controls["oldId"].value : null
      });
    }
    else {
      temp.push({
        componentId: this.sharedService.nmdcComponentId,
        description: this.infraConstruction.controls["description"].value,
        id: this.infraConstruction.controls["id"].value,
        justification: this.infraConstruction.controls["justification"].value,
        perUnitCost: this.infraConstruction.controls["perUnitCost"].value,
        proposedArea: this.infraConstruction.controls["proposedArea"].value,
        purpose: this.infraConstruction.controls["purpose"].value,
        stateCode: this.stateCode,
        districtCode: this.districtCode,
        totalCost: this.infraConstruction.controls["totalCost"].value,
        location: this.infraConstruction.controls["location"].value,
      });
    }

    this.postService
      .saveInfrastructureData(temp, this.common.nmdcBuilding)
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.saveBooleanValue(this.booleanEntity.isInfraConstruction, this.common.nmdcBuilding, this.sharedService.isInfraConstruction)
            this.notification.showSuccess();
            this.reset();
            this.getInfraCons();
          }
        },
        (err) => { }
      );
  }

  saveTab2() {
    if (this.equipment.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true;
      return;
    } else {
      this.isFormInvalid = false;
    }
    let temp = [];
    if (this.paramId === this.sharedService.revPrposal) {
      temp.push({
        componentId: this.sharedService.nmdcComponentId,
        name: this.equipment.controls["name"].value,
        id: 
        this.equipment.controls["id"].value === null
          ? 0
          : this.equipment.controls["id"].value,
        justification: this.equipment.controls["justification"].value,
        perUnitCost: this.equipment.controls["perUnitCost"].value,
        quantity: this.equipment.controls["quantity"].value,
        stateCode: this.stateCode,
        districtCode: this.districtCode,
        totalCost: this.equipment.controls["totalCost"].value,
        pabStatus: this.sharedService.revAddId,
        recordStatus: this.equipment.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.equipment.controls["recordStatus"].value,
        activeStatus: this.equipment.controls["activeStatus"].value ? this.equipment.controls["activeStatus"].value : true,
        oldId:this.equipment.controls["oldId"].value ? this.equipment.controls["oldId"].value : null
      });
    }
    else {
      temp.push({
        componentId: this.sharedService.nmdcComponentId,
        name: this.equipment.controls["name"].value,
        id: this.equipment.controls["id"].value,
        justification: this.equipment.controls["justification"].value,
        perUnitCost: this.equipment.controls["perUnitCost"].value,
        quantity: this.equipment.controls["quantity"].value,
        stateCode: this.stateCode,
        districtCode: this.districtCode,
        totalCost: this.equipment.controls["totalCost"].value,
      });
    }
    

    this.postService
      .saveEquipmentData(temp, this.common.nmdcEquipment)
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.saveBooleanValue(this.booleanEntity.isEquipment, this.common.nmdcEquipment, this.sharedService.isEquipment)
            this.notification.showSuccess();
            this.reset();
            this.getEquipment();
            this.equipment.get('id').setValue(0);
          }
        },
        (err) => { }
      );
  }
  getEquipment() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getEquipmentGenderEquityRevision(this.districtCode, this.sharedService.nmdcComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processEquoResponse(res)
          this.saveLockStatus()
        },
        (err) => { }
      );
    }
    else {
      if (this.paramId === this.sharedService.revPrposal) {
        this.getService.getEquipmentList(this.districtCode, this.sharedService.nmdcComponentId).subscribe(
          (res) => {
            this.processEquoResponse(res)
          },
          (err) => { }
        );
    }
    }
    // this.getService
    //   .getEquipmentList(this.districtCode, this.sharedService.nmdcComponentId)
    //   .subscribe(
    //     (res) => {
    //       this.equipmentList = [];
    //       this.equipmentList = res.data;
    //       this.quantity = this.equipmentList.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //       );
    //       this.perUnitCost = this.equipmentList.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //       );
    //       this.totalCost = this.equipmentList.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //       );
    //     },
    //     (err) => { }
    //   );
  }

  processEquoResponse(res) {
    this.equipmentList = [];
    this.newArray = []
    if (this.paramId === this.sharedService.revPrposal) {this.newArray = []
      this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null)
      this.newFilterArr = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
          this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldId === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
    this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.equipmentList.filter(item => item.activeStatus == true)
  
    }
    else{
      this.equipmentList = res.data
      this.totalArr = this.equipmentList
    }
    this.itemList = [];
    res.data.forEach(ele => {
      this.itemList.push({
        id: ele.id,
        name: ele.name
      });
    });
    this.quantity = this.totalArr.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    this.perUnitCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.totalCost = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }
  add() {
    this.addUpdate = true;
    this.hideButton = false;
    this.addUpdateButton = "Save";
  }
  editRow(item: any) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.addUpdate = true;
    this.addUpdateButton = "Update";
    if (this.selectedIndex === 1) {
      this.infraConstruction.patchValue(item);
    } else if (this.selectedIndex === 2) {
      this.equipment.patchValue(item);
    }
  }
  close() {
    this.addUpdateButton = "Save";
    this.addUpdate = false;
    this.hideButton = true;
    if (!this.basicId) {
      this.reset();
    }
    //this.reset();
  }
  reset() {
    this.addUpdateButton = "Save";
    this.isFormInvalid = false;
    if (this.selectedIndex === 0) {
      this.myFiles1 = []
      this.myFiles2 = []
      this.myFiles3 = []
      this.myFiles4 = []
      this.myFiles5 = []
      this.myFilesName1 = "";
      this.myFilesName2 = "";
      this.myFilesName3 = "";
      this.myFilesName = "";
      this.myFilesName4 = "";
      this.myFilesName5 = "";
      this.formDataMdcBasicDetails.reset()
    }
    if (this.selectedIndex === 1) {
      this.infraConstruction.reset();
      this.infraConstruction.get("id")?.setValue(0);
    }
    if (this.selectedIndex === 2) {
      this.equipment.reset();
      this.equipment.get("id")?.setValue(0);
    }
  }
  getLandBasicData() {
    this.getService
      .getNmdcBasic(this.districtCode, this.sharedService.nmdcComponentId)
      .subscribe(
        (res) => {
          if (res && res.length) {
            this.basicId = res['0'].id
            this.formDataMdcBasicDetails.patchValue(res["0"]);
            this.isOrganogramUploaded = res['0'].isOrganogramUploaded
            if (this.isOrganogramUploaded) {
              this.getDocument()
            }

            // this.myFilesName1 = res[0]?.certificateoflocationFileName;
            // this.myFilesName2 = res[0]?.landownershipcertificateFileName;
            // this.myFilesName3 = res[0]?.locationloflandFileName;
            // this.myFilesName4 = res[0]?.mapofthelanddurlysignedFileName;

            this.myFilesName1 = res[0]?.landownershipcertificateFileName;
            this.myFilesName2 = res[0]?.locationloflandFileName;
            this.myFilesName3 = res[0]?.certificateoflocationFileName;
            this.myFilesName4 = res[0]?.mapofthelanddurlysignedFileName;
            if (this.myFilesName1) {
              this.downloadPdf(res[0]?.landownershipcertificate);
            } if (this.myFilesName2) {
              this.downloadPdf2(res[0]?.locationlofland);
            } if (this.myFilesName3) {
              this.downloadPdf3(res[0]?.certificateoflocation);
            } if (this.myFilesName4) {
              this.downloadPdf4(res[0]?.mapofthelanddurlysigned);
            }
          }
        },
        (err) => { }
      );
  }
  getDocument() {
    let payload = {
      districtCode: this.districtCode,
      componentId: this.sharedService.nmdcComponentId,
      documentType: this.common.organogram,
    }
    this.common.downloadPDFProposalNMDC(payload).then((result: any) => {
      this.organogramDoc = result.name
      this.organogramFile = result.file
    })
  }
  download() {
    this.common.viewPdf(this.organogramFile, this.organogramDoc)
  }

  downloadPdf(data: any) {
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
  downloadPdf2(data: any) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob2 = new Blob([ba], { type: "application/pdf" });
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
  downloadPdf3(data: any) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob3 = new Blob([ba], { type: "application/pdf" });
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
  downloadPdf4(data: any) {
    let uint8_data = _base64ToArrayBuffer(data);
    var ba = new Uint8Array(uint8_data);
    this.blob4 = new Blob([ba], { type: "application/pdf" });
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
  replaceSpecialCharactersWithEncoded(input) {
    // Define a regular expression pattern to match special characters
    var pattern = /[!@#$%^&*()_+={}\[\]:;"'<>,.?/|\\`~]/g;

    // Use the replace method to replace special characters with their URL-encoded representations
    var encodedString = input.replace(pattern, function (match) {
      return encodeURIComponent(match);
    });

    return encodedString;
  }
  saveBasicMdcData() {
    if (this.formDataMdcBasicDetails.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning();
      return;
    } else {
      this.isFormInvalid = false;
    }
    var latitude = null;
    var longitude = null;
    if (this.formDataMdcBasicDetails.value.latitude || this.formDataMdcBasicDetails.value.longitude) {
      let c: boolean = this.validationLatLong(this.formDataMdcBasicDetails.value.latitude, this.formDataMdcBasicDetails.value.longitude);
      if (!c) {
        return;
      } else {
        latitude = this.formDataMdcBasicDetails.value.latitude
        longitude = this.formDataMdcBasicDetails.value.longitude
      }
    }
    const formdata: FormData = new FormData();
    if (this.changeDoc) {
      if (this.myFiles1.length && this.myFiles1) {
        for (var i = 0; i < this.myFiles1.length; i++) {
          formdata.append("landownershipcertificate", this.myFiles1[i]);
        }
      } else {
        if (this.blob) {
          formdata.append('landownershipcertificate', this.blob, this.myFilesName1);
        }
      }

      if (this.myFiles2.length && this.myFiles2) {
        for (var i = 0; i < this.myFiles2.length; i++) {
          formdata.append("locationlofland", this.myFiles2[i]);
        }
      } else {
        if (this.blob2) {
          formdata.append('locationlofland', this.blob2, this.myFilesName2);

        }
      }
      if (this.myFiles3.length && this.myFiles3) {
        for (var i = 0; i < this.myFiles3.length; i++) {
          formdata.append("certificateoflocation", this.myFiles3[i]);
        }
      } else {
        if (this.blob3) {
          formdata.append('certificateoflocation', this.blob3, this.myFilesName3);

        }
      }
      if (this.myFiles4.length && this.myFiles4) {
        for (var i = 0; i < this.myFiles4.length; i++) {
          formdata.append("mapofthelanddurlysigned", this.myFiles4[i]);
        }
      } else {
        if (this.blob4) {
          formdata.append('mapofthelanddurlysigned', this.blob4, this.myFilesName4);

        }
      }
    } else {
      // if (!this.blob) {
      //   this.notification.showValidationMessage('Please upload document !!!')
      //   return;
      // }
      if (this.blob) {
        formdata.append('landownershipcertificate', this.blob, this.myFilesName1);
      }
      if (this.blob2) {
        formdata.append('locationlofland', this.blob2, this.myFilesName2);
      }
      if (this.blob3) {
        formdata.append('certificateoflocation', this.blob3, this.myFilesName3);
      }
      if (this.blob4) {
        formdata.append('mapofthelanddurlysigned', this.blob4, this.myFilesName4);
      }
    }
    const input1 = document.getElementById(
      'visionMission',
    ) as HTMLInputElement | null;

    if (input1 != null) {
      var visionMission = input1.value
    }
    const input2 = document.getElementById(
      'broadObjectives',
    ) as HTMLInputElement | null;

    if (input2 != null) {
      var broadObjectives = input2.value
    }
    const input3 = document.getElementById(
      'organizationalStructure',
    ) as HTMLInputElement | null;

    if (input3 != null) {
      var organizationalStructure = input3.value
    }
    const input4 = document.getElementById(
      'roleAndResponsibility',
    ) as HTMLInputElement | null;

    if (input4 != null) {
      var roleAndResponsibility = input4.value
    }
    const input5 = document.getElementById(
      'boardOfGovernance',
    ) as HTMLInputElement | null;

    if (input5 != null) {
      var boardOfGovernance = input5.value
    }
    const input6 = document.getElementById(
      'pmuDetail',
    ) as HTMLInputElement | null;

    if (input6 != null) {
      var pmuDetail = input6.value
    }
    let payload = {
      isOrganogramUploaded: this.isOrganogramUploaded,
      id: this.basicId,
      componentId: this.sharedService.nmdcComponentId,
      districtCode: this.districtCode,
      visionMission: this.replaceSpecialCharactersWithEncoded(visionMission),
      broadObjective: this.replaceSpecialCharactersWithEncoded(broadObjectives),
      organizationalStructure: this.replaceSpecialCharactersWithEncoded(organizationalStructure),
      roleAndResponsibility: this.replaceSpecialCharactersWithEncoded(roleAndResponsibility),
      boardOfGovernance: this.replaceSpecialCharactersWithEncoded(boardOfGovernance),
      pmuDetail: this.replaceSpecialCharactersWithEncoded(pmuDetail),
      existingLandAvailability: this.formDataMdcBasicDetails.controls["existingLandAvailability"].value,
      isLandOwnerCertificateUploaded: this.formDataMdcBasicDetails.controls["isLandOwnerCertificateUploaded"].value,
      locationOfLand: this.formDataMdcBasicDetails.controls["locationOfLand"].value,
      latitude: latitude,
      longitude: longitude,
      isLocationCertificateUploaded: this.formDataMdcBasicDetails.controls["isLocationCertificateUploaded"].value,
      mapofthelanddurlysigned: this.formDataMdcBasicDetails.controls["mapofthelanddurlysigned"].value,
      stateCode: this.stateCode,
    };
    this.api
      .saveLandbasic(payload, formdata, this.common.nmdcAbout)
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.notification.showSuccess();
            this.getLandBasicData();
          }
        },
        (err) => { }
      );
  }
  delete(item: any) {
    this.hideButton = true;
    this.common.delete().subscribe(res => {
      if (res) {
        if (this.selectedIndex === 1) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteInfraNMDCGenderRevision(item, this.sharedService.nmdcComponentId, this.sharedService.revAddId, false).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getInfraCons();
                this.getBooleanData()
              }
            }, err => {
  
            })
           }
          else {
            this.deleteService.deleteInfraNMDCGender(item, this.sharedService.nmdcComponentId).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getInfraCons();
                this.getBooleanData()
              }
            }, err => {
  
            })
          }
         
        }

        if (this.selectedIndex === 2) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteEquipmentNMDCGenderRevision(item, this.sharedService.nmdcComponentId, this.sharedService.revAddId, false).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getEquipment();
                this.getBooleanData()
              }
            }, err => {
  
            })
          }
          else {
            this.deleteService.deleteEquipmentNMDCGender(item, this.sharedService.nmdcComponentId).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getEquipment();
                this.getBooleanData()
              }
            }, err => {
  
            })
          }
          
        }

      }
    })
  }
  async getFileDetails5(e: any) {
    this.myFiles5 = [];
    this.myFilesName5 = '';
    this.uploadedMedia = [];
    for (var i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 26214400) {
        // this.fileSizeExceed = true;
        this.notification.showValidationMessage('File size should be less than 25MB.')
        return;
      }
      else {
        this.changeDoc = true;
        this.fileSizeExceed = false;
        this.myFiles5.push(e.target.files[i]);
        this.myFilesName5 += e.target.files[i].name;
      }
      if (!(e.target.files.length - 1 === i)) {
        this.myFilesName5 += ',';
      }
    }
    const target = e.target as HTMLInputElement;
    if (this.myFiles5 && this.myFiles5.length) {
      this.uploadDocument()

    }
  }
  uploadDocument() {
    const formdata: FormData = new FormData();
    for (var i = 0; i < this.myFiles5.length; i++) {
      formdata.append('file', this.myFiles5[i]);
    }
    let payload = {
      districtCode: this.districtCode,
      componentId: this.sharedService.nmdcComponentId,
      documentType: this.common.organogram,
      id: 0,
    }
    this.post.uploadDocumentsProposalNMDC(payload, formdata).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccessMessage('Document Uploaded');
        this.myFiles = [];
        this.myFilesName5 = ''
        this.getDocument()
        this.isOrganogramUploaded = true
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  resetTotal() {
    this.quantity = 0;
    this.proposedArea = 0;
    this.perUnitCost = 0

  }

  getClass(item: any): any {
    return {
      // 'revision-row': item?.recordStatus?.id === 3 && item?.activeStatus === true,
      // 'revision-row1': item?.recordStatus?.id === 1,
      'delete-row': item?.recordStatus?.id === 2 && (item?.activeStatus === false && this.paramId === this.sharedService.revPrposal),
      'update-row': item?.recordStatus?.id === 3 && (item?.activeStatus === true && this.paramId === this.sharedService.revPrposal),
      'old-update-row': item?.recordStatus?.id === 3 && (item?.activeStatus === false && this.paramId === this.sharedService.revPrposal),
      'disabled-row1': item?.recordStatus?.id === 1 && this.paramId === this.sharedService.revPrposal,
    };
  }

  getTitle(item: any): string {
    if (item?.recordStatus?.id === 3 && item?.activeStatus === true && this.paramId === this.sharedService.revPrposal) {
      return 'Existing Record Updated';
    } else if (item?.recordStatus?.id === 1 && this.paramId === this.sharedService.revPrposal) {
      return 'New Addition';
    }
    else if (item?.recordStatus?.id === 2 && (item?.activeStatus === false && this.paramId === this.sharedService.revPrposal)) {
      return 'Deleted Record';
    }
    else if (item?.recordStatus?.id === 3 && (item?.activeStatus === false && this.paramId === this.sharedService.revPrposal)) {
      return 'Old Existing Record';
    }
    return '';
  }

  restore(item: any) {
    this.hideButton = true;
    this.common.delete().subscribe(res => {
      if (res) {
        if (this.selectedIndex === 1) {
          this.deleteService.deleteInfraNMDCGenderRevision(item, this.sharedService.nmdcComponentId, this.sharedService.revAddId, true).subscribe(res => {
            if (res.status === 200) {
              this.notification.showRestore()
              this.resetTotal()
              this.getInfraCons();
              this.getBooleanData()
            }
          }, err => {

          })
          
        } 
        if (this.selectedIndex === 2) {
          this.deleteService.deleteEquipmentNMDCGenderRevision(item, this.sharedService.nmdcComponentId, this.sharedService.revAddId, true).subscribe(res => {
            if (res.status === 200) {
              this.resetTotal()
              this.notification.showRestore()
              this.getEquipment();
              this.getBooleanData()
            }
          }, err => {

          })
        }
    //     if (this.selectedIndex === 1) {
    //           this.deleteService.deleteRenovatedNMDCGenderRevision(item, this.sharedService.genderComponentId, "1", true).subscribe(res => {
    //             if (res.status === 200) {
    //               this.getRenovationData();
    //               this.resetTotal()
    //               this.notification.showRestore()
    //               this.getBooleanData()
    //             }
    //           }, err => {
    
    //           })
    //         }
          
    //      if (this.selectedIndex === 2) {
    //       this.deleteService.deleteEquipmentNMDCGenderRevision(item, this.sharedService.genderComponentId, this.sharedService.revAddId, true).subscribe(res => {
    //         if (res.status === 200) {
    //           this.resetTotal()
    //           this.notification.showRestore()
    //           this.getEquipmentData();
    //           this.getBooleanData()
    //         }
    //       }, err => {

    //       })
    //     } if (this.selectedIndex === 3) {
    //           this.deleteService.deleteWorkshopRevision(item, this.sharedService.revAddId, true).subscribe(res => {
    //             if (res.status === 200) {
    //               this.resetTotal()
    //               this.notification.showRestore()
    //               this.getWorkshop1();
    //               this.getBooleanData()
    //             }
    //           }, err => {
    
    //           })
            
    //     } if (this.selectedIndex === 4) {
    //       this.deleteService.deleteRemedialRevision(item, this.sharedService.revAddId, true).subscribe(res => {
    //         if (res.status === 200) {
    //           this.resetTotal()
    //           this.notification.showRestore()
    //           this.getRemedialData();
    //           this.getBooleanData()
    //         }
    //       }, err => {

    //       })
    //     }
    //     if (this.selectedIndex === 5) {
    //       this.deleteService.deleteSTEMCourse(item).subscribe(res => {
    //         if (res.status === 200) {
    //           this.resetTotal()
    //           this.notification.showDelete()
    //           this.getStemCourseData();
    //           this.getBooleanData()
    //         }
    //       }, err => {

    //       })
    //     } if (this.selectedIndex === 6) {
    //       this.deleteService.deleteVocationalRevision(item, this.sharedService.revAddId, true).subscribe(res => {
    //         if (res.status === 200) {
    //           this.resetTotal()
    //           this.notification.showRestore()
    //           this.getVocational();
    //           this.getBooleanData()
    //         }
    //       }, err => {

    //       })
    //     } if (this.selectedIndex === 7) {
    //       this.deleteService.deleteActivityRevision(item, this.sharedService.revAddId, true).subscribe(res => {
    //         if (res.status === 200) {
    //           this.resetTotal()
    //           this.notification.showRestore()
    //           this.getActivitiesData();
    //           this.getBooleanData()
    //         }
    //       }, err => {

    //       })
    //     }
    //     if (this.selectedIndex === 8) {
    //       this.deleteService.deleteTimeLineRevision(item, this.sharedService.revAddId, true).subscribe(res => {
    //         if (res.status === 200) {
    //           this.resetTotal()
    //           this.notification.showRestore()
    //           this.getDataTimeLine();

    //         }
    //       }, err => {

    //       })
    //     }
    //     if (this.selectedIndex === 9) {
    //       this.deleteService.deleteFinancialRevision(item, this.sharedService.revAddId, true).subscribe(res => {
    //         if (res.status === 200) {
    //           this.resetTotal()
    //           this.notification.showRestore()
    //           this.getDataFinancialEstimate();

    //         }
    //       }, err => {

    //       })
    //     }
    //   }
    // })
      }
    })
  }
  saveLockStatus() {
    this.getService.getLockListStatus(this.aisheCode, this.sharedService.nmdcComponentId).subscribe(res => {
      if (res) {
        this.FinalLockKey = res[0]
        if (this.FinalLockKey) {
          if (this.FinalLockKey.infraConstruction) {
            this.isInfraDisabled = true;
          }
          if (this.FinalLockKey.equipment) {
            this.isEquoDisabled = true;
          }
        }
        
      }

    })
  }

  LockProposal(lockValue) {
    let commonObj = this.common.newObj
    let filterObjt = Object.entries(commonObj).filter(([key]) => key === lockValue)
    let filterObjValue = filterObjt[0][1]
    let characters = this.aisheCode.split(/[\W\d]+/).join("");
    let temp = {
        aisheCode: this.aisheCode,
        componentId: this.sharedService.nmdcComponentId,
        constant: lockValue,
        districtCode: sessionStorage.getItem("districtCode"),
        // instituteCategory: characters,
        stateCode: this.stateCode,
        status: true
      }
    this.api.postProposalRevisionLock(temp).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccessMessage(`${filterObjValue} has been Loked successfully!!!`);
        this.saveLockStatus();
        this.reset();
        this.close()
      }
    });
}
}
