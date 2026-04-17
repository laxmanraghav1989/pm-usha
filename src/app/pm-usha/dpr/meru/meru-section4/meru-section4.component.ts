import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { BooleanEntity } from 'src/app/pm-usha/Entity/boolean-entity';
import { ApiService } from 'src/app/service/api.service';
import { DeleteService } from 'src/app/service/delete.service';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/utility/format-datepicker.service';
import { CustomErrorStateMatcher } from 'src/app/utility/validators';
import { CollegeService } from '../../strength-college/service/college.service';

@Component({
  selector: 'cfs-meru-section4',
  templateUrl: './meru-section4.component.html',
  styleUrls: ['./meru-section4.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ],
})
export class MeruSection4Component implements OnInit {

  addDepartmentData: boolean = false;
  infraConstructionList: Array<any> = [];
  infraConstruction: FormGroup;
  equipment: FormGroup;
  infraRenovated: FormGroup;
  formDataTimeLine: FormGroup;
  formDataFinancialEstimates: FormGroup;
  dataFinancialEstimateList: any
  softComponent: FormGroup;
  formDataCourse: FormGroup;
  aisheCode: string;
  addUpdate: boolean = false;
  showPage: boolean = false
  dataTimeLineList: any;
  hideButton: boolean = true;
  addUpdateButton: string = "Save";
  departmentList: any;
  isFormInvalid: boolean = false
  courseData: any[] = [];
  itemData: any;
  programmeList: any;
  dataListProposalActivity: Array<any> = [];
  componentList: Array<any> = [];
  renovatedList: Array<any> = [];
  equipmentList: Array<any> = [];
  softComponentList: Array<any> = [];
  levelList: Array<any> = [];
  proposedArea: number = 0;
  perUnitCost: number = 0;
  totalCost: number = 0;
  quantity: number = 0;
  selectedIndex: any = 0;
  disabledPage: boolean = false;
  districtName: string;
  collegeName: string;
  insType: string;
  stateCode: string;
  districtCode: string;
  instituteCategory: string;
  hideItem: boolean = true
  variables: Array<any> = [];
  variables1: Array<any> = [];
  phaseCount: any = 0;
  phaseList: Array<any> = [];
  itemList: Array<any> = []
  targetNumber: any;
  start: any;
  startFinance: any;
  paramId: number = 0;
  maxDate: Date;
  isInfraDisabled:boolean = false;
  isRenvoDisabled:boolean = false;
  isEquoDisabled:boolean = false;
  isSoftDisabled:boolean = false;
  istimelineDisabled:boolean = false;
  isProposedDisabled:boolean = false;
  isOtherDisabled:boolean = false;
  isFinicialEstimateDisabled:boolean = false;
  FinalLockKey: any;
  StatusValue: any[];
  oldIdArrFilter:any = []
  updateIdArrFilter:any = []
  deleteFilterArr:any = []
  newFilterArr:any = []
  newArray:any = [];
  totalArr:any = []
  existingRecordFilter:any = []
  item1FilterArray:any = []
  maxDate1 = new Date(2026, 2, 31);
  UpdatedataTimeLineList: any;
  constructor(
    public fb: FormBuilder,
    public viewportScroller: ViewportScroller,
    public errorMatcher: CustomErrorStateMatcher,
    public notification: NotificationService,
    public sharedService: SharedService,
    public api: ApiService,
    public common: Common, public postService: PostService,
    public getService: GetService, public deleteService: DeleteService, public booleanEntity: BooleanEntity, private route: ActivatedRoute, public auth: CollegeService,
  ) {
    this.infraConstruction = this.fb.group({
      description: ["", [Validators.required]],
      id: 0,
      justification: ["", [Validators.required]],
      perUnitCost: ["", []],
      proposedArea: ["", []],
      purpose: ["", [Validators.required]],
      totalCost: ["", [Validators.required]],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []],
      oldIdV3: ["", []],
      rsV3: ["", []],
      v1: ["", []],
      v2: ["", []],
      v3: ["", []],
    });
    this.infraRenovated = this.fb.group({
      description: ["", [Validators.required]],
      id: 0,
      justification: ["", [Validators.required]],
      perUnitCost: ["", []],
      proposedArea: ["", []],
      detail: ["", [Validators.required]],
      totalCost: ["", [Validators.required]],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []],
      oldIdV3: ["", []],
      rsV3: ["", []],
      v1: ["", []],
      v2: ["", []],
      v3: ["", []],
    });
    this.equipment = this.fb.group({
      name: ["", [Validators.required]],
      id: 0,
      justification: ["", [Validators.required]],
      perUnitCost: ["", []],
      quantity: ["", []],
      totalCost: ["", [Validators.required]],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []],
      oldIdV3: ["", []],
      rsV3: ["", []],
      v1: ["", []],
      v2: ["", []],
      v3: ["", []],
    });
    this.softComponent = this.fb.group({
      activity: ["", [Validators.required]],
      costPerUnit: ["", []],
      detail: ["", [Validators.required]],
      expectedOutcome: ["", [Validators.required]],
      id: 0,
      purpose: ["", [Validators.required]],
      targetNumberOfBeneficiary: ["", [Validators.required]],
      totalCost: ["", [Validators.required]],
      unit: ["", []],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []],
      oldIdV3: ["", []],
      rsV3: ["", []],
      v1: ["", []],
      v2: ["", []],
      v3: ["", []],
    });
    this.formDataCourse = this.fb.group({
      id: [0, []],
      departmentId: [null, [Validators.required]],
      courseLevelId: [null, [Validators.required]],
      enrolmentTargetFifthYear: [null, []],
      enrolmentTargetFourthYear: [null, []],
      enrolmentTargetThirdYear: [null, []],
      enrolmentTargetSecondYear: [null, []],
      enrolmentTargetFirstYear: [null, []],
      programmeId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      isApprovedByUgc: ["", [Validators.required]],
      isSufficientFacultySanctioned: ["", [Validators.required]],
      durationMont: [null, [Validators.required]],
      durationYear: [null, [Validators.required]],
    });
    this.formDataTimeLine = this.fb.group({
      proposalActivityId: [null, [Validators.required]],
      phase: [null, [Validators.required]],
      itemId: [null, [Validators.required]],
      id: 0,
      percentageOfCompletion: [null, [Validators.required]],
      physicalTargetEndDateString: [null, [Validators.required]],
      physicalTargetStartDateString: [null, []],
      financialTargetEndDateString: [null, [Validators.required]],
      financialTargetStartDateString: [null, []],
      recordStatus: ["", []],
      activeStatus: ["", []]
    });
    this.formDataFinancialEstimates = this.fb.group({
      proposalActivityId: [null, [Validators.required]],
      itemId: [null, [Validators.required]],
      id: 0,
      amount2023: [null, [Validators.required]],
      amount2024: [null, [Validators.required]],
      amount2025: [null, [Validators.required]],
      recordStatus: ["", []],
      activeStatus: ["", []]
    });
    this.aisheCode = sessionStorage.getItem("userName");
    this.districtName = sessionStorage.getItem('districtName')
    this.collegeName = sessionStorage.getItem('insName')
    this.insType = this.aisheCode.split(/[\W\d]+/).join("");
    this.stateCode = sessionStorage.getItem("stateCode")
    this.districtCode = sessionStorage.getItem("districtCode");
    if (this.insType === 'U') {
      this.instituteCategory = 'UNIVERSITY'
    }

    this.paramId = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.getBooleanData();
    this.getComponentList();
    this.getDepartmentData();
    this.getLevelData();
    this.getProposalActivity();
    this.getDataFinancialEstimate();
    this.getDataTimeLine();
    this.getPageStatusList()
    if (this.paramId){
    this.saveLockStatus()
    }



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
        "aisheCode": this.aisheCode,
        "componentId": this.sharedService.meruComponentId,
        "districtCode": this.districtCode,
        "menu": menu
      }
      payload[key] = value
      this.postService.saveBoolean(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess()
          this.getBooleanData()
        }
      }, err => {

      })
    } else {
      this.notification.showValidationMessage(`Please choose 'YES/NO'`)
    }

  }

  getBooleanData() {
    this.getService.getBooleanList(this.aisheCode, this.sharedService.meruComponentId, this.districtCode).subscribe(res => {
      if (this.selectedIndex === 0) {
        this.booleanEntity.isInfraConstruction = res['0'].isInfraConstruction;
        if (this.booleanEntity.isInfraConstruction) {
          this.getInfraCons();
        } else {
          this.addUpdate = false
        }
      } if (this.selectedIndex === 1) {
        this.booleanEntity.isInfraRenovation = res['0'].isInfraRenovation;
        if (this.booleanEntity.isInfraRenovation) {
          this.getRenovated();
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
      } if (this.selectedIndex === 3) {
        this.booleanEntity.isSoftComponent = res['0'].isSoftComponent;
        if (this.booleanEntity.isSoftComponent) {
          this.getSoftCompoenent();
        } else {
          this.addUpdate = false
        }
      } if (this.selectedIndex === 4) {
        this.booleanEntity.isProposedCourse = res['0'].isProposedCourse;
        if (this.booleanEntity.isProposedCourse) {
          this.getProposedCourseData();
        } else {
          this.addUpdate = false
        }
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  saveLockStatus(){
    this.getService.getLockListStatus(this.aisheCode, this.sharedService.meruComponentId).subscribe(res => {
      if (res) {
        this.FinalLockKey = res[0]
        if (this.FinalLockKey){
          if (this.FinalLockKey.infraConstruction){
            this.isInfraDisabled = true;
          }
          if (this.FinalLockKey.infraRenovation){
            this.isRenvoDisabled = true;
          }
          if (this.FinalLockKey.equipment){
            this.isEquoDisabled = true;
          }
          if (this.FinalLockKey.softComponent){
            this.isSoftDisabled = true;
          }
          if (this.FinalLockKey.timeline){
            this.istimelineDisabled = true;
          }
          if (this.FinalLockKey.proposedOutcome){
            this.isProposedDisabled = true;
          }
          if (this.FinalLockKey.otherInformation){
            this.isOtherDisabled = true;
          }
          if (this.FinalLockKey.financialEstimate) {
            this.isFinicialEstimateDisabled = true;
          }
        }
        // 
        // this.saveBooleanValue(this.booleanEntity.isProposedCourse, this.insType === 'U' ? this.common.strengthUnivProposed : this.common.strengthClgProposed, this.sharedService.isProposedCourse)
        // this.reset();
      }
     
    })
  }
  savePhase() {
    if (this.phaseCount === 0 || this.phaseCount === undefined || this.phaseCount === null) {
      this.notification.showValidationMessage('Please enter non zero(0) value !!!');
      return;
    }
    if (this.phaseCount < this.dataTimeLineList.length) {
      this.notification.showValidationMessage('Number of phase should not be less than Timeline details !!!')
      return;
    }
    let payload = {
      "aisheCode": this.aisheCode,
      "componentId": this.sharedService.meruComponentId,
      "districtCode": this.districtCode,
      "phaseCount": this.phaseCount
    }
    this.api.savePhaseCount(payload).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.showPage = true
        this.getPhase();

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getPhase() {
    this.api.getPhaseCount(this.aisheCode, this.sharedService.meruComponentId, '').subscribe(res => {
      this.phaseCount = res['Phase Count'];
      this.phaseList = [];
      var count = 1;
      for (let index = 0; index < this.phaseCount; index++) {
        this.phaseList.push(count++)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getPageStatusList() {
    this.api.getPageStatus(this.sharedService.meruComponentId).subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].moduleName === this.common.meruFinal) {

            if ((this.paramId === this.sharedService.revPrposal && this.selectedIndex === 0) || (this.paramId === this.sharedService.revPrposal && this.selectedIndex === 1) || (this.paramId === this.sharedService.revPrposal && this.selectedIndex === 2) || (this.paramId === this.sharedService.revPrposal && this.selectedIndex === 3) || (this.paramId === this.sharedService.revPrposal && this.selectedIndex === 5)) {
              this.disabledPage = false
            }
            else {
              this.disabledPage = true
            }
            // this.disabledPage = true
          }

        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getProposalActivity() {
    this.getService.getProposalActivity().subscribe((res) => {
      res.forEach(e => {
        if (e.isMeruActivity) {
          this.dataListProposalActivity.push(e)
        }
      })


       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getItemUpdateData(data: any) {
    this.hideItem = false
    if (data === 4) {
      this.getSoftCompoenent();
    }
    if (data === 1) {
      this.getInfraCons();
    }
    if (data === 2) {
      this.getRenovated();
    }
    if (data === 3) {
      this.getEquipment();
    } if (data === 9) {
      this.getProposedCourseData()
    }
  }
  getItemData(data: any) {
    this.hideItem = false
    this.formDataFinancialEstimates.get('itemId').reset();
    this.formDataTimeLine.get('itemId').reset();
    if (data === 4) {
      this.getSoftCompoenent();
    }
    if (data === 1) {
      this.getInfraCons();
    }
    if (data === 2) {
      this.getRenovated();
    }
    if (data === 3) {
      this.getEquipment();
    } if (data === 9) {
      this.getProposedCourseData()
    }
  }
  //this.formDtatimeLine
  getDepartmentData() {

    this.api
      .getDepartment(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId)
      .subscribe((res) => {
        this.departmentList = res.data;
      }, err => {

      });
  }
  getLevelData() {
    this.api.getLevel().subscribe((res) => {
      this.variables = res;
      this.levelList = this.variables.slice();
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getProgramData() {
    this.api
      .getProgramme(this.formDataCourse.value.courseLevelId)
      .subscribe((res) => {
        this.variables1 = res,
          this.programmeList = this.variables1.slice();
      }, err => {

      });
  }

  getComponentList() {
    this.getService.getComponent().subscribe(
      (res) => {
        this.componentList = res;
      },
      (err) => { }
    );
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }

  dateChangePhysicalEnd(event) {
    const m = event.value;
    if (m) {
      const date = new Date(m);
      const year = date.getFullYear();
      if (year > 2026) {
        this.notification.showValidationMessage("End year value should not be greator then 2026 !")
        this.formDataTimeLine.get('physicalTargetEndDateString').setValue(null)
      }
      // this.formDataTimeLine.get('financialTargetEndDateString').setValue(null)
      // this.startFinance = m;
      this.maxDate = new Date('2026-12-31');
    }
  }
  dateChangeFinanceEnd(event) {
    const m = event.value;
    if (m) {
      const date = new Date(m);
      const year = date.getFullYear();
      if (year > 2026) {
        this.notification.showValidationMessage("End year value should not be greator then 2026 !")
        this.formDataTimeLine.get('financialTargetEndDateString').setValue(null)
      }
      // this.formDataTimeLine.get('financialTargetEndDateString').setValue(null)
      // this.startFinance = m;
      this.maxDate = new Date('2026-12-31');
    }
  }
  getInfraCons() {

    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getInfraCnstructionRevision(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId, this.districtCode, this.sharedService.pabStatus).subscribe(
        (res) => {
          this.infraConstructionList = []
          this.newArray = []
          this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
          this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
          this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null && (item.v3 === null || item.v3 === false))
          this.newFilterArr = res.data.filter(item => item.v3 !== true && item.activeStatus == true && item.recordStatus?.id === 1 && (item.v3 === null || item.v3 === false))
          this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                if (item1.oldId === item2.id) {
                    this.newArray.push(item2, item1);
                }
              });
            });
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
          this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          this.totalArr = this.infraConstructionList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
          // this.infraConstructionList = res.data;
          this.saveLockStatus()
          this.itemList = []
          res.data.forEach(ele => {
            this.itemList.push({
              id: ele.id,
              name: ele.description
            })

          })
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
        },
        (err) => { }
      );
    } else {

      this.api.getInfraCnstruction(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId).subscribe(
        (res) => {
          this.infraConstructionList = []
          this.infraConstructionList = res.data;
          this.itemList = []
          res.data.forEach(ele => {
            this.itemList.push({
              id: ele.id,
              name: ele.description
            })

          })
          // if (this.infraConstructionList.length === 0) {
          //   this.saveBooleanValue(this.booleanEntity.isInfraConstruction, this.common.meruInfrastructureConstruction, this.sharedService.isInfraConstruction)
          // }
          this.proposedArea = this.infraConstructionList.reduce(
            (sum, item) => sum + Number(item.proposedArea),
            0
          );
          this.perUnitCost = this.infraConstructionList.reduce(
            (sum, item) => sum + Number(item.perUnitCost),
            0
          );
          this.totalCost = this.infraConstructionList.reduce(
            (sum, item) => sum + Number(item.totalCost),
            0
          );
        },
        (err) => { }
      );

    }
  }
  tabSelected(event) {
    this.selectedIndex = event.index;
    this.resetTotal()
    this.getBooleanData()
    this.close();
    if (this.selectedIndex === 5) {
      this.getPhase()
    }
  }
  saveTab1() {
    if (this.infraConstruction.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true
      return;
    } else {
      this.isFormInvalid = false
    }
    let temp = [];
    if (this.paramId === this.sharedService.revPrposal) {
      temp.push({
        componentId: this.sharedService.meruComponentId,
        description: this.infraConstruction.controls["description"].value,
        id: this.infraConstruction.controls["id"].value,
        justification: this.infraConstruction.controls["justification"].value,
        perUnitCost: this.infraConstruction.controls["perUnitCost"].value,
        proposedArea: this.infraConstruction.controls["proposedArea"].value,
        purpose: this.infraConstruction.controls["purpose"].value,
        stateCode: sessionStorage.getItem("stateCode"),
        districtCode: sessionStorage.getItem("districtCode"),
        totalCost: this.infraConstruction.controls["totalCost"].value,
        instituteCategory: this.insType,
        aisheCode: this.aisheCode,
        pabStatus: this.sharedService.pabStatus,
        recordStatus: this.infraConstruction.controls["id"].value == 0 ? { id: this.sharedService.revAddId, name: this.sharedService.revAdd } : this.infraConstruction.controls["recordStatus"].value,
        rsV3: this.infraConstruction.controls["rsV3"].value ? this.infraConstruction.controls["rsV3"].value : null,
        activeStatus: this.infraConstruction.controls["activeStatus"].value ? this.infraConstruction.controls["activeStatus"].value : true,
        oldId:this.infraConstruction.controls["oldId"].value ? this.infraConstruction.controls["oldId"].value : null,
        oldIdV3:this.infraConstruction.controls["oldIdV3"].value ? this.infraConstruction.controls["oldIdV3"].value : null,
        v1:this.infraConstruction.controls["v1"].value,
        v2:this.infraConstruction.controls["id"].value == 0 ? true : this.infraConstruction.controls["v2"].value,
        v3:this.infraConstruction.controls["v3"].value,
      });
    } else {
      temp.push({
        componentId: this.sharedService.meruComponentId,
        description: this.infraConstruction.controls["description"].value,
        id: this.infraConstruction.controls["id"].value,
        justification: this.infraConstruction.controls["justification"].value,
        perUnitCost: this.infraConstruction.controls["perUnitCost"].value,
        proposedArea: this.infraConstruction.controls["proposedArea"].value,
        purpose: this.infraConstruction.controls["purpose"].value,
        stateCode: sessionStorage.getItem("stateCode"),
        districtCode: sessionStorage.getItem("districtCode"),
        totalCost: this.infraConstruction.controls["totalCost"].value,
        instituteCategory: this.insType,
        aisheCode: this.aisheCode,
      });
    }
    this.api.saveInfraConstruction(temp, this.common.meruInfrastructureConstruction).subscribe(
      (res) => {
        if (res.status === 200) {
          this.saveBooleanValue(this.booleanEntity.isInfraConstruction, this.common.meruInfrastructureConstruction, this.sharedService.isInfraConstruction)
          this.notification.showSuccess();
          this.reset();
          this.getInfraCons();
        }
      },
      (err) => { }
    );
  }
  saveTab2() {
    if (this.infraRenovated.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true
      return;
    } else {
      this.isFormInvalid = false
    }
    let temp = [];
    if (this.paramId === this.sharedService.revPrposal) {
      temp.push({
        componentId: this.sharedService.meruComponentId,
        description: this.infraRenovated.controls["description"].value,
        id: this.infraRenovated.controls["id"].value,
        justification: this.infraRenovated.controls["justification"].value,
        perUnitCost: this.infraRenovated.controls["perUnitCost"].value,
        proposedArea: this.infraRenovated.controls["proposedArea"].value,
        detail: this.infraRenovated.controls["detail"].value,
        stateCode: sessionStorage.getItem("stateCode"),
        districtCode: sessionStorage.getItem("districtCode"),
        totalCost: this.infraRenovated.controls["totalCost"].value,
        instituteCategory: this.insType,
        aisheCode: this.aisheCode,
        pabStatus: this.sharedService.pabStatus,
        recordStatus: this.infraRenovated.controls["id"].value == 0 ? { id: this.sharedService.revAddId, name: this.sharedService.revAdd } : this.infraRenovated.controls["recordStatus"].value,
        rsV3: this.infraRenovated.controls["rsV3"].value ? this.infraRenovated.controls["rsV3"].value : null,
        activeStatus: this.infraRenovated.controls["activeStatus"].value ? this.infraRenovated.controls["activeStatus"].value : true,
        oldId:this.infraRenovated.controls["oldId"].value ? this.infraRenovated.controls["oldId"].value : null,
        oldIdV3:this.infraRenovated.controls["oldIdV3"].value ? this.infraRenovated.controls["oldIdV3"].value : null,
        v1:this.infraRenovated.controls["v1"].value,
        v2:this.infraRenovated.controls["id"].value == 0 ? true : this.infraRenovated.controls["v2"].value,
        v3:this.infraRenovated.controls["v3"].value,
      });
    } else {
      temp.push({
        componentId: this.sharedService.meruComponentId,
        description: this.infraRenovated.controls["description"].value,
        id: this.infraRenovated.controls["id"].value,
        justification: this.infraRenovated.controls["justification"].value,
        perUnitCost: this.infraRenovated.controls["perUnitCost"].value,
        proposedArea: this.infraRenovated.controls["proposedArea"].value,
        detail: this.infraRenovated.controls["detail"].value,
        stateCode: sessionStorage.getItem("stateCode"),
        districtCode: sessionStorage.getItem("districtCode"),
        totalCost: this.infraRenovated.controls["totalCost"].value,
        instituteCategory: this.insType,
        aisheCode: this.aisheCode,
      });
    }
    this.api.saveRenovated(temp, this.common.meruRenovation).subscribe(
      (res) => {
        if (res.status === 200) {
          this.saveBooleanValue(this.booleanEntity.isInfraRenovation, this.common.meruRenovation, this.sharedService.isInfraRenovation)
          this.notification.showSuccess();
          this.reset();
          this.getRenovated();
        }
      },
      (err) => { }
    );
  }
  saveTab3() {
    if (this.equipment.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true
      return;
    } else {
      this.isFormInvalid = false
    }
    let temp = [];
    if (this.paramId === this.sharedService.revPrposal) {
      temp.push({
        componentId: this.sharedService.meruComponentId,
        name: this.equipment.controls["name"].value,
        id: this.equipment.controls["id"].value,
        justification: this.equipment.controls["justification"].value,
        perUnitCost: this.equipment.controls["perUnitCost"].value,
        quantity: this.equipment.controls["quantity"].value,
        stateCode: sessionStorage.getItem("stateCode"),
        districtCode: sessionStorage.getItem("districtCode"),
        totalCost: this.equipment.controls["totalCost"].value,
        instituteCategory: this.insType,
        aisheCode: this.aisheCode,
        pabStatus: this.sharedService.pabStatus,
        recordStatus: this.equipment.controls["id"].value == 0 ? { id: this.sharedService.revAddId, name: this.sharedService.revAdd } : this.equipment.controls["recordStatus"].value,
        rsV3: this.equipment.controls["rsV3"].value ? this.equipment.controls["rsV3"].value : null,
        activeStatus: this.equipment.controls["activeStatus"].value ? this.equipment.controls["activeStatus"].value : true,
        oldId:this.equipment.controls["oldId"].value ? this.equipment.controls["oldId"].value : null,
        oldIdV3:this.equipment.controls["oldIdV3"].value ? this.equipment.controls["oldIdV3"].value : null,
        v1:this.equipment.controls["v1"].value,
        v2:this.equipment.controls["id"].value == 0 ? true : this.equipment.controls["v2"].value,
        v3:this.equipment.controls["v3"].value,
      });
    } else {
      temp.push({
        componentId: this.sharedService.meruComponentId,
        name: this.equipment.controls["name"].value,
        id: this.equipment.controls["id"].value,
        justification: this.equipment.controls["justification"].value,
        perUnitCost: this.equipment.controls["perUnitCost"].value,
        quantity: this.equipment.controls["quantity"].value,
        stateCode: sessionStorage.getItem("stateCode"),
        districtCode: sessionStorage.getItem("districtCode"),
        totalCost: this.equipment.controls["totalCost"].value,
        instituteCategory: this.insType,
        aisheCode: this.aisheCode,
      });
    }

    this.api.saveEquipment(temp, this.common.meruEquipment).subscribe(
      (res) => {
        if (res.status === 200) {
          this.saveBooleanValue(this.booleanEntity.isEquipment, this.common.meruEquipment, this.sharedService.isEquipment)
          this.notification.showSuccess();
          this.reset();
          this.getEquipment();
        }
      },
      (err) => { }
    );
  }
  saveTab4() {
    if (this.softComponent.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true
      return;
    } else {
      this.isFormInvalid = false
    }
    let temp = [];
    if (this.paramId === this.sharedService.revPrposal) {
      temp.push({
        activity: this.softComponent.value.activity,
        aisheCode: this.aisheCode,
        componentId: {
          id: this.sharedService.meruComponentId,
        },
        costPerUnit: this.softComponent.value.costPerUnit,
        detail: this.softComponent.value.detail,
        expectedOutcome: this.softComponent.value.expectedOutcome.toString(),
        id: this.softComponent.value.id,
        instituteCategory: this.insType,
        purpose: this.softComponent.value.purpose,
        targetNumberOfBeneficiary:
          this.softComponent.value.targetNumberOfBeneficiary,
        totalCost: this.softComponent.value.totalCost,
        unit: this.softComponent.value.unit,
        pabStatus:1,
        recordStatus: this.softComponent.controls["id"].value == 0?{id:1,name:"Addition"}:this.softComponent.controls["recordStatus"].value,
        rsV3: this.softComponent.controls["rsV3"].value ? this.softComponent.controls["rsV3"].value : null,
        activeStatus: this.softComponent.controls["activeStatus"].value ? this.softComponent.controls["activeStatus"].value : true,
        oldId:this.softComponent.controls["oldId"].value ? this.softComponent.controls["oldId"].value : null,
        oldIdV3:this.softComponent.controls["oldIdV3"].value ? this.softComponent.controls["oldIdV3"].value : null,
        v1:this.softComponent.controls["v1"].value,
        v2:this.softComponent.controls["id"].value == 0 ? true : this.softComponent.controls["v2"].value,
        v3:this.softComponent.controls["v3"].value,
      });
    } else {
      temp.push({
        activity: this.softComponent.value.activity,
        aisheCode: this.aisheCode,
        componentId: {
          id: this.sharedService.meruComponentId,
        },
        costPerUnit: this.softComponent.value.costPerUnit,
        detail: this.softComponent.value.detail,
        expectedOutcome: this.softComponent.value.expectedOutcome.toString(),
        id: this.softComponent.value.id,
        instituteCategory: this.insType,
        purpose: this.softComponent.value.purpose,
        targetNumberOfBeneficiary:
          this.softComponent.value.targetNumberOfBeneficiary,
        totalCost: this.softComponent.value.totalCost,
        unit: this.softComponent.value.unit,
      });
    }

    this.api.saveSoftCompoenent(temp, this.common.meruSoftComponent).subscribe(
      (res) => {
        if (res.status === 200) {
          this.saveBooleanValue(this.booleanEntity.isSoftComponent, this.common.meruSoftComponent, this.sharedService.isSoftComponent)
          this.notification.showSuccess();
          this.reset();
          this.getSoftCompoenent();
        }
      },
      (err) => { }
    );
  }

  private formatDate(date) {
    if (date) {
      let split_dateAsString1 = date.split('/')
      let final_format1 = new Date(`${split_dateAsString1[2]}-${split_dateAsString1[1]}-${split_dateAsString1[0]}`);
      return final_format1;
    }
  }

  parseDateUpdate(dateStr: string): Date | null {
    if (!dateStr) return null;
    let parts = dateStr.split('/');
    if (parts.length !== 3) return null;  // Ensure the date string is properly formatted
    return new Date(+parts[2], +parts[1] - 1, +parts[0]);
  }

  getDataTimeLine() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.getService.getDataTimeRevision(this.aisheCode, this.sharedService.meruComponentId, this.districtCode, this.sharedService.pabStatus).subscribe(
        (res) => {
          this.dataTimeLineList = []
          this.newArray = []
          this.deleteFilterArr = res.filter(item => item.recordStatus?.id === 2)
          this.updateIdArrFilter = res.filter(item => item.activeStatus == true && item.recordStatus?.id === 3)
          this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
          this.existingRecordFilter = res.filter(item => item.activeStatus == true && item.recordStatus == null)
          this.newFilterArr = res.filter(item => item.activeStatus == true && item.recordStatus?.id === 1)
          this.oldIdArrFilter = res.filter(item => item.activeStatus == false && item.recordStatus?.id === 3)
              this.updateIdArrFilter.forEach(item1 => {
            this.oldIdArrFilter.forEach(item2 => {
                if (item1.oldId === item2.id) {
                    this.newArray.push(item2, item1);
                }
            });
        });
        this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
        this.dataTimeLineList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          this.saveLockStatus()
          let CompareDate = '31/03/2026';
          let compareDateObject = this.parseDateUpdate(CompareDate);
          this.UpdatedataTimeLineList = this.dataTimeLineList.filter(item => item.activeStatus);
          this.StatusValue = this.UpdatedataTimeLineList.map(item => {
            let itemDateFinEnd = item.financialTargetEndDateString;
            let itemDatePhyEnd = item.physicalTargetEndDateString;
            let itemDatePhyStart = item.physicalTargetStartDateString;
            let itemDateFinStart = item.financialTargetStartDateString;
            let itemDateObjectFinEnd = this.parseDateUpdate(itemDateFinEnd);
            let itemDateObjectPhyEnd = this.parseDateUpdate(itemDatePhyEnd);
            let itemDateObjectPhyStart = this.parseDateUpdate(itemDatePhyStart);
            let itemDateObjectFinStart = this.parseDateUpdate(itemDateFinStart);
            item['trueId'] = itemDateObjectPhyStart > compareDateObject;
            item['trueId1'] = itemDateObjectFinStart > compareDateObject;
            item['trueId2'] = itemDateObjectFinEnd > compareDateObject;
            item['trueId3'] = itemDateObjectPhyEnd > compareDateObject;
            return item;
          });

        },
        (error) => { }
      );
    } else {
      this.getService.getDataTime(this.aisheCode, this.sharedService.meruComponentId).subscribe(
        (res) => {
          this.dataTimeLineList = res;
        },
        (error) => { }
      );
    }

  }
  saveTimeLine() {
    if (this.formDataTimeLine.invalid) {
      if (this.formDataTimeLine.controls.physicalTargetEndDateString.status === 'INVALID' || this.formDataTimeLine.controls.physicalTargetStartDateString.status === 'INVALID' || this.formDataTimeLine.controls.financialTargetStartDateString.status === 'INVALID' || this.formDataTimeLine.controls.financialTargetEndDateString.status === 'INVALID'){
        this.notification.showValidationMessage("Date Should not be greator then '31/03/2026' !!!")
      }
      this.notification.showWarning();
      this.isFormInvalid = true
      return;
    } else {
      this.isFormInvalid = false
    }
    if (this.addUpdateButton === 'Save') {
      for (let index = 0; index < this.dataTimeLineList.length; index++) {
        if (parseInt(this.dataTimeLineList[index].phase) === this.formDataTimeLine.value.phase && this.dataTimeLineList[index].proposalActivityId === this.formDataTimeLine.value.proposalActivityId && this.dataTimeLineList[index].itemId === this.formDataTimeLine.value.itemId) {
          this.notification.showValidationMessage(this.sharedService.duplicates);
          return;
        }

      }
    } else {
      for (let index = 0; index < this.dataTimeLineList.length; index++) {
        if (this.dataTimeLineList[index].id !== this.formDataTimeLine.value.id) {
          if (parseInt(this.dataTimeLineList[index].phase) === this.formDataTimeLine.value.phase && this.dataTimeLineList[index].proposalActivityId === this.formDataTimeLine.value.proposalActivityId && this.dataTimeLineList[index].itemId === this.formDataTimeLine.value.itemId) {
            this.notification.showValidationMessage(this.sharedService.duplicates);
            return;
          }
        }


      }
    }
    let physicalTargetStartDateString = null;
    let physicalTargetEndDateString = null;
    let financialTargetStartDateString = null;
    let financialTargetEndDateString = null;
    if (this.formDataTimeLine.value.physicalTargetStartDateString) {
      let day: string = this.formDataTimeLine.value.physicalTargetStartDateString.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (this.formDataTimeLine.value.physicalTargetStartDateString.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = this.formDataTimeLine.value.physicalTargetStartDateString.getFullYear();
      physicalTargetStartDateString = `${day}/${month}/${year}`;
      physicalTargetStartDateString.toString();
    }
    if (this.formDataTimeLine.value.physicalTargetEndDateString) {
      let day: string = this.formDataTimeLine.value.physicalTargetEndDateString.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (this.formDataTimeLine.value.physicalTargetEndDateString.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = this.formDataTimeLine.value.physicalTargetEndDateString.getFullYear();
      physicalTargetEndDateString = `${day}/${month}/${year}`;
      physicalTargetEndDateString.toString();
    }
    if (this.formDataTimeLine.value.financialTargetStartDateString) {
      let day: string = this.formDataTimeLine.value.financialTargetStartDateString.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (this.formDataTimeLine.value.financialTargetStartDateString.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = this.formDataTimeLine.value.financialTargetStartDateString.getFullYear();
      financialTargetStartDateString = `${day}/${month}/${year}`;
      financialTargetStartDateString.toString();
    }
    if (this.formDataTimeLine.value.financialTargetEndDateString) {
      let day: string = this.formDataTimeLine.value.financialTargetEndDateString.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      let month: string = (this.formDataTimeLine.value.financialTargetEndDateString.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      let year = this.formDataTimeLine.value.financialTargetEndDateString.getFullYear();
      financialTargetEndDateString = `${day}/${month}/${year}`;
      financialTargetEndDateString.toString();
    }
    let component = this.componentList.find((ele) => ele.id === 3);
    let activityName = this.dataListProposalActivity.find(
      (ele) => ele.id === this.formDataTimeLine.value.proposalActivityId
    );
    let temp = [];

    if (this.paramId === this.sharedService.revPrposal) {
      if (this.formDataTimeLine.value.id === 0){
        this.notification.showValidationMessage("Addition Not Allowed")
      }
      else {
      temp.push({
        aisheCode: this.aisheCode,
        componentId: this.sharedService.meruComponentId,
        // componentName: component.componentName,
        districtCode: sessionStorage.getItem("districtCode"),
        financialTargetEndDateString: financialTargetEndDateString,
        financialTargetStartDateString: financialTargetStartDateString,
        id: this.formDataTimeLine.value.id,
        instituteCategory: this.insType,
        itemId: this.formDataTimeLine.value.itemId,
        percentageOfCompletion:
          this.formDataTimeLine.value.percentageOfCompletion,
        phase: this.formDataTimeLine.value.phase,
        physicalTargetEndDateString: physicalTargetEndDateString,
        physicalTargetStartDateString: physicalTargetStartDateString,
        proposalActivityId: this.formDataTimeLine.value.proposalActivityId,
        proposalActivityName: activityName.activityName,
        stateCode: sessionStorage.getItem("stateCode"),
        pabStatus: this.sharedService.pabStatus,
        recordStatus: this.formDataTimeLine.controls["recordStatus"].value,
        activeStatus: this.formDataTimeLine.controls["activeStatus"].value ? this.formDataTimeLine.controls["activeStatus"].value : true
      })
    }
    } else {
      temp.push({
        aisheCode: this.aisheCode,
        componentId: this.sharedService.meruComponentId,
        // componentName: component.componentName,
        districtCode: sessionStorage.getItem("districtCode"),
        financialTargetEndDateString: financialTargetEndDateString,
        financialTargetStartDateString: financialTargetStartDateString,
        id: this.formDataTimeLine.value.id,
        instituteCategory: this.insType,
        itemId: this.formDataTimeLine.value.itemId,
        percentageOfCompletion:
          this.formDataTimeLine.value.percentageOfCompletion,
        phase: this.formDataTimeLine.value.phase,
        physicalTargetEndDateString: physicalTargetEndDateString,
        physicalTargetStartDateString: physicalTargetStartDateString,
        proposalActivityId: this.formDataTimeLine.value.proposalActivityId,
        proposalActivityName: activityName.activityName,
        stateCode: sessionStorage.getItem("stateCode"),
      })
    }
    this.api.saveTimeLineData(temp, this.common.meruTimeLine).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getDataTimeLine();
        this.reset();
        if (this.paramId === this.sharedService.revPrposal){
          this.close()
        }
      }
    });
  }

  getDataFinancialEstimate() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getFinancialEstimateRevision(this.aisheCode, this.sharedService.meruComponentId, this.districtCode, this.sharedService.pabStatus).subscribe((res) => {
        this.dataFinancialEstimateList = res;

      }, (err) => { })
    } else {
      this.api.getFinancialEstimate(this.aisheCode, this.sharedService.meruComponentId).subscribe((res) => {
        this.dataFinancialEstimateList = res;

      }, (err) => { })
    }

  }
  saveFinancialEstimates() {
    if (this.formDataFinancialEstimates.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true
      return;
    } else {
      this.isFormInvalid = false
    }
    for (let index = 0; index < this.dataFinancialEstimateList.length; index++) {
      if (this.addUpdateButton === 'Save') {
        if (this.dataFinancialEstimateList[index].proposalActivityId === this.formDataFinancialEstimates.value.proposalActivityId && this.dataFinancialEstimateList[index].itemId === this.formDataFinancialEstimates.value.itemId) {
          this.notification.showValidationMessage(this.sharedService.duplicates);
          return;
        }
      } else {
        if (this.formDataFinancialEstimates.value.id !== this.dataFinancialEstimateList[index].id) {
          if (this.dataFinancialEstimateList[index].proposalActivityId === this.formDataFinancialEstimates.value.proposalActivityId && this.dataFinancialEstimateList[index].itemId === this.formDataFinancialEstimates.value.itemId) {
            this.notification.showValidationMessage(this.sharedService.duplicates);
            return;
          }
        }

      }


    }
    let activityName = this.dataListProposalActivity.find(
      (ele) =>
        ele.id === this.formDataFinancialEstimates.value.proposalActivityId
    );
    let temp = {};
    if (this.paramId === this.sharedService.revPrposal) {
      temp = {
        aisheCode: this.aisheCode,
        amount2023: this.formDataFinancialEstimates.value.amount2023,
        amount2024: this.formDataFinancialEstimates.value.amount2024,
        amount2025: this.formDataFinancialEstimates.value.amount2025,
        componentId: this.sharedService.meruComponentId,
        // componentName: component.componentName,
        districtCode: sessionStorage.getItem("districtCode"),
        id: this.formDataFinancialEstimates.value.id,
        instituteCategory: this.insType,
        itemId: this.formDataFinancialEstimates.value.itemId,
        proposalActivityId:
          this.formDataFinancialEstimates.value.proposalActivityId,
        proposalActivityName: activityName.activityName,
        stateCode: sessionStorage.getItem("stateCode"),
        pabStatus: this.sharedService.pabStatus,
        recordStatus: this.formDataFinancialEstimates.controls["id"].value == 0 ? { id: this.sharedService.revAddId, name: this.sharedService.revAdd } : this.formDataFinancialEstimates.controls["recordStatus"].value,
        activeStatus: this.formDataFinancialEstimates.controls["activeStatus"].value ? this.formDataFinancialEstimates.controls["activeStatus"].value : true
      };
    } else {
      temp = {
        aisheCode: this.aisheCode,
        amount2023: this.formDataFinancialEstimates.value.amount2023,
        amount2024: this.formDataFinancialEstimates.value.amount2024,
        amount2025: this.formDataFinancialEstimates.value.amount2025,
        componentId: this.sharedService.meruComponentId,
        // componentName: component.componentName,
        districtCode: sessionStorage.getItem("districtCode"),
        id: this.formDataFinancialEstimates.value.id,
        instituteCategory: this.insType,
        itemId: this.formDataFinancialEstimates.value.itemId,
        proposalActivityId:
          this.formDataFinancialEstimates.value.proposalActivityId,
        proposalActivityName: activityName.activityName,
        stateCode: sessionStorage.getItem("stateCode"),
      };
    }


    this.api.postFinancial(temp, this.common.meruFinancial).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getDataFinancialEstimate();
        this.reset();
      }
    });
  }
  editFinancial(data: any): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.formDataFinancialEstimates.patchValue(data);
    this.addDepartmentData = true;
    this.addUpdateButton = "Update";
    this.hideButton = false
    this.getItemUpdateData(data.proposalActivityId);
    // this.getDataFinancialEstimate()
  }

  editTimeLine(data: any): void {
    this.showPage = true
    this.viewportScroller.scrollToPosition([0, 0]);
    this.formDataTimeLine.patchValue(data);
    this.formDataTimeLine.get('phase')?.setValue(parseInt(data.phase));
    this.formDataTimeLine.get('physicalTargetStartDateString')?.setValue(this.formatDate(data.physicalTargetStartDateString))
    this.formDataTimeLine.get('physicalTargetEndDateString')?.setValue(this.formatDate(data.physicalTargetEndDateString))
    this.formDataTimeLine.get('financialTargetStartDateString')?.setValue(this.formatDate(data.financialTargetStartDateString))
    this.formDataTimeLine.get('financialTargetEndDateString')?.setValue(this.formatDate(data.financialTargetEndDateString))
    this.addDepartmentData = true;
    this.addUpdateButton = "Update";
    this.hideButton = false
    this.getItemUpdateData(data.proposalActivityId);
  }

  editSofComponent(data: any): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.softComponent.patchValue(data);
    this.addUpdate = true;
    this.hideButton = false
    this.addUpdateButton = "Update";
  }
  add() {
    this.addUpdate = true;
    this.hideButton = false;
    this.addUpdateButton = "Save";
    this.addDepartmentData = true;
    if (this.phaseCount && this.phaseCount !== 0) {
      this.showPage = true
    }
  }
  editRow(item: any) {
    this.hideButton = false
    this.viewportScroller.scrollToPosition([0, 0]);
    this.addUpdate = true;
    this.addUpdateButton = "Update";
    if (this.selectedIndex === 0) {
      this.infraConstruction.patchValue({
        description: item.description,
        id: item.id,
        justification: item.justification,
        perUnitCost: item.perUnitCost,
        proposedArea: item.proposedArea,
        purpose: item.purpose,
        totalCost: item.totalCost,
        recordStatus: item.recordStatus ? item.recordStatus : null,
        pabStatus: item.pabStatus,
        rsV3: item.rsV3 ? item.rsV3 : null,
        activeStatus: item.activeStatus,
        oldId: item.oldId,
        oldIdV3: item.oldIdV3,
        v1:item.v1,
        v2:item.v2,
        v3:item.v3,
      });
    } else if (this.selectedIndex === 1) {
      this.infraRenovated.patchValue({
        description: item.description,
        id: item.id,
        justification: item.justification,
        perUnitCost: item.perUnitCost,
        proposedArea: item.proposedArea,
        detail: item.detail,
        totalCost: item.totalCost,
        recordStatus: item.recordStatus ? item.recordStatus : null,
        pabStatus: item.pabStatus,
        rsV3: item.rsV3 ? item.rsV3 : null,
        activeStatus: item.activeStatus,
        oldId: item.oldId,
        oldIdV3: item.oldIdV3,
        v1:item.v1,
        v2:item.v2,
        v3:item.v3,
      });
    } else if (this.selectedIndex === 2) {
      this.equipment.patchValue({
        name: item.name,
        id: item.id,
        justification: item.justification,
        perUnitCost: item.perUnitCost,
        quantity: item.quantity,
        totalCost: item.totalCost,
        recordStatus: item.recordStatus ? item.recordStatus : null,
        pabStatus: item.pabStatus,
        rsV3: item.rsV3 ? item.rsV3 : null,
        activeStatus: item.activeStatus,
        oldId: item.oldId,
        oldIdV3: item.oldIdV3,
        v1:item.v1,
        v2:item.v2,
        v3:item.v3,
      });
    }
  }
  // viewRow(item:any){
  //   this.hideButton = true;
  //   this.addUpdate = true;
  //   this.viewportScroller.scrollToPosition([0, 0]);
  // }
  close() {
    this.addUpdateButton = "Save";
    this.addUpdate = false;
    this.hideButton = true;
    this.reset();
    this.addDepartmentData = false;
    this.showPage = false
    this.isFormInvalid = false

  }
  reset() {
    this.addUpdateButton = "Save";
    this.isFormInvalid = false;
    this.hideItem = true
    if (this.selectedIndex === 0) {
      this.infraConstruction.reset();
      this.infraConstruction.get("id")?.setValue(0);
    } if (this.selectedIndex === 1) {
      this.infraRenovated.reset();
      this.infraRenovated.get("id")?.setValue(0);
    } if (this.selectedIndex === 2) {
      this.equipment.reset();
      this.equipment.get("id")?.setValue(0);
    } if (this.selectedIndex === 3) {
      this.softComponent.reset();
      this.softComponent.get("id")?.setValue(0);
    } if (this.selectedIndex === 4) {
      this.formDataCourse.reset();
      this.formDataCourse.get('id')?.setValue(0)
    }
    if (this.selectedIndex === 5) {
      this.formDataTimeLine.reset();
      this.formDataTimeLine.get("id").setValue(0);
    } if (this.selectedIndex === 6) {
      this.formDataFinancialEstimates.reset();
      this.formDataFinancialEstimates.get('id')?.setValue(0)
    }
  }
  getRenovated() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getRenovatedListRevision(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId, this.districtCode, this.sharedService.pabStatus).subscribe(
        (res) => {
          this.renovatedList = []
          this.newArray = []
          this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
          this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
          this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null && (item.v3 === null || item.v3 === false))
          this.newFilterArr = res.data.filter(item => item.v3 !== true && item.activeStatus == true && item.recordStatus?.id === 1 && (item.v3 === null || item.v3 === false))
          this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                if (item1.oldId === item2.id) {
                    this.newArray.push(item2, item1);
                }
              });
            });
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
          this.renovatedList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          this.totalArr = this.renovatedList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
          this.saveLockStatus()
          this.itemList = []
          res.data.forEach(ele => {
            this.itemList.push({
              id: ele.id,
              name: ele.description
            })

          })
          // if (this.renovatedList.length === 0) {
          //   this.saveBooleanValue(this.booleanEntity.isInfraRenovation, this.common.meruRenovation, this.sharedService.isInfraRenovation)
          // }
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
        },
        (err) => { }
      );
    } else {
      this.api.getRenovatedList(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId).subscribe(
        (res) => {
          this.renovatedList = []
          this.renovatedList = res.data;
          this.itemList = []
          res.data.forEach(ele => {
            this.itemList.push({
              id: ele.id,
              name: ele.description
            })

          })
          // if (this.renovatedList.length === 0) {
          //   this.saveBooleanValue(this.booleanEntity.isInfraRenovation, this.common.meruRenovation, this.sharedService.isInfraRenovation)
          // }
          this.proposedArea = this.renovatedList.reduce(
            (sum, item) => sum + Number(item.proposedArea),
            0
          );
          this.perUnitCost = this.renovatedList.reduce(
            (sum, item) => sum + Number(item.perUnitCost),
            0
          );
          this.totalCost = this.renovatedList.reduce(
            (sum, item) => sum + Number(item.totalCost),
            0
          );
        },
        (err) => { }
      )
    }
  }
  getEquipment() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getEquipmentListRevision(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId, this.districtCode, this.sharedService.pabStatus).subscribe(
        (res) => {
          this.equipmentList = []
          this.newArray = []
          this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
          this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
          this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null && (item.v3 === null || item.v3 === false))
          this.newFilterArr = res.data.filter(item => item.v3 !== true && item.activeStatus == true && item.recordStatus?.id === 1 && (item.v3 === null || item.v3 === false))
          this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                if (item1.oldId === item2.id) {
                    this.newArray.push(item2, item1);
                }
              });
            });
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
          this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          this.totalArr = this.equipmentList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
          this.saveLockStatus()
          this.itemList = []
          res.data.forEach(ele => {
            this.itemList.push({
              id: ele.id,
              name: ele.name
            })

          })
          // if (this.equipmentList.length === 0) {
          //   this.saveBooleanValue(this.booleanEntity.isEquipment, this.common.meruEquipment, this.sharedService.isEquipment)
          // }
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
        },
        (err) => { }
      );
    } else {
      this.api.getEquipmentList(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId).subscribe(
        (res) => {
          this.equipmentList = []
          this.equipmentList = res.data;
          this.itemList = []
          res.data.forEach(ele => {
            this.itemList.push({
              id: ele.id,
              name: ele.name
            })

          })
          // if (this.equipmentList.length === 0) {
          //   this.saveBooleanValue(this.booleanEntity.isEquipment, this.common.meruEquipment, this.sharedService.isEquipment)
          // }
          this.quantity = this.equipmentList.reduce(
            (sum, item) => sum + Number(item.quantity),
            0
          );
          this.perUnitCost = this.equipmentList.reduce(
            (sum, item) => sum + Number(item.perUnitCost),
            0
          );
          this.totalCost = this.equipmentList.reduce(
            (sum, item) => sum + Number(item.totalCost),
            0
          );
        },
        (err) => { }
      );
    }
  }
  getSoftCompoenent() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.auth.getSoftCompoenentListRevision(this.aisheCode, this.sharedService.meruComponentId , "1").subscribe(
        (res) => {
          this.softComponentList = [];
          this.newArray = []
          this.deleteFilterArr = res.data.filter(item => item.recordStatus?.id === 2)
          this.updateIdArrFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
          this.existingRecordFilter = res.data.filter(item => item.activeStatus == true && item.recordStatus == null && (item.v3 === null || item.v3 === false))
          this.newFilterArr = res.data.filter(item => item.v3 !== true && item.activeStatus == true && item.recordStatus?.id === 1 && (item.v3 === null || item.v3 === false))
          this.oldIdArrFilter = res.data.filter(item => item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
          this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                if (item1.oldId === item2.id) {
                    this.newArray.push(item2, item1);
                }
              });
            });
          this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
          this.softComponentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          this.totalArr = this.softComponentList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
          this.saveLockStatus()
          this.itemList = []
          res.data.forEach(ele => {
            this.itemList.push({
              id: ele.id,
              name: ele.activity
            })
          })
          // if (this.softComponentList.length === 0) {
          //   this.saveBooleanValue(this.booleanEntity.isSoftComponent, this.common.meruSoftComponent, this.sharedService.isSoftComponent)
          // }
          this.quantity = this.totalArr.reduce(
            (sum, item) => sum + Number(item.unit),
            0
          );
          this.perUnitCost = this.totalArr.reduce(
            (sum, item) => sum + Number(item.costPerUnit),
            0
          );
          this.totalCost = this.totalArr.reduce(
            (sum, item) => sum + Number(item.totalCost),
            0
          );
          this.targetNumber = this.totalArr.reduce(
            (sum, item) => sum + Number(item.targetNumberOfBeneficiary),
            0
          );
        },
        (err) => { }
      );
    } else {
      this.api.getSoftCompoenentList(this.aisheCode, this.instituteCategory, this.sharedService.meruComponentId).subscribe(
        (res) => {
          this.softComponentList = [];
          this.softComponentList = res.data;
          this.itemList = []
          res.data.forEach(ele => {
            this.itemList.push({
              id: ele.id,
              name: ele.activity
            })
          })
          // if (this.softComponentList.length === 0) {
          //   this.saveBooleanValue(this.booleanEntity.isSoftComponent, this.common.meruSoftComponent, this.sharedService.isSoftComponent)
          // }
          this.quantity = this.softComponentList.reduce(
            (sum, item) => sum + Number(item.unit),
            0
          );
          this.perUnitCost = this.softComponentList.reduce(
            (sum, item) => sum + Number(item.costPerUnit),
            0
          );
          this.totalCost = this.softComponentList.reduce(
            (sum, item) => sum + Number(item.totalCost),
            0
          );
          this.targetNumber = this.softComponentList.reduce(
            (sum, item) => sum + Number(item.targetNumberOfBeneficiary),
            0
          );
        },
        (err) => { }
      );
    }

  }

  // getCourseData() {
  //   let characters = this.aisheCode.split(/[\W\d]+/).join("");
  //   let instituteCategory = "";
  //   if (characters === "C") {
  //     instituteCategory = "COLLEGE";
  //   }
  //   this.api.getCourse(this.aisheCode, instituteCategory).subscribe((res) => {
  //     this.courseData = res.data;
  //   });
  // }
  getProposedCourseData() {
    this.getService.getProposedCourse(this.aisheCode, this.sharedService.meruComponentId).subscribe(
      (res) => {
        this.courseData = [];
        this.courseData = res;
        this.itemList = []
        res.forEach(ele => {
          this.itemList.push({
            id: ele.id,
            name: ele.name
          })
        })
        // if (this.courseData.length === 0) {
        //   this.saveBooleanValue(this.booleanEntity.isProposedCourse, this.common.meruProposed, this.sharedService.isProposedCourse)
        // }

      },
      (error) => { }
    );
  }
  saveCourse(data: any) {
    if (this.formDataCourse.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true
      return;
    } else {
      this.isFormInvalid = false
    }
    let temp = [];
    let characters = this.aisheCode.split(/[\W\d]+/).join("");
    // let c = this.componentList.find((ele) => ele.id == 3);
    if (this.formDataCourse.controls['name'].value.trim() === "") {
      this.notification.showValidationMessage('Please enter course !!!');
      return;
    }

    for (let index = 0; index < this.courseData.length; index++) {
      if (this.addUpdateButton !== 'Update') {
        if (this.courseData[index].departmentId === data.departmentId && this.courseData[index].courseLevelId === data.courseLevelId && this.courseData[index].programmeId === data.programmeId && this.courseData[index].name.trim().toUpperCase() === data.name.trim().toUpperCase()) {
          this.notification.showValidationMessage(this.sharedService.duplicates);
          return;
        }
      } else {
        if (this.courseData[index].id !== data.id) {
          if (this.courseData[index].departmentId === data.departmentId && this.courseData[index].courseLevelId === data.courseLevelId && this.courseData[index].programmeId === data.programmeId && this.courseData[index].name.trim().toUpperCase() === data.name.trim().toUpperCase()) {
            this.notification.showValidationMessage(this.sharedService.duplicates);
            return;
          }
        }
      }
    }
    let departmentName = this.departmentList.find(
      (ele) => ele.id == this.formDataCourse.value.departmentId
    );

    temp = [
      {
        aisheCode: this.aisheCode,
        componentId: this.sharedService.meruComponentId,
        // componentName: c.componentName,
        courseLevelId: this.formDataCourse.value.courseLevelId,
        departmentId: this.formDataCourse.value.departmentId,
        departmentName: departmentName.name,
        durationMonth: this.formDataCourse.value.durationMont,
        durationYear: this.formDataCourse.value.durationYear,
        districtCode: this.districtCode,
        enrolmentTargetFifthYear:
          this.formDataCourse.value.enrolmentTargetFifthYear,
        enrolmentTargetFirstYear:
          this.formDataCourse.value.enrolmentTargetFirstYear,
        enrolmentTargetFourthYear: this.formDataCourse.value.enrolmentTargetFourthYear,
        enrolmentTargetThirdYear: this.formDataCourse.value.enrolmentTargetThirdYear,
        enrolmentTargetSecondYear: this.formDataCourse.value.enrolmentTargetSecondYear,
        id: this.formDataCourse.value.id,
        instituteCategory: characters,
        isApprovedByUgc: this.formDataCourse.value.isApprovedByUgc,
        isSufficientFacultySanctioned:
          this.formDataCourse.value.isSufficientFacultySanctioned,
        name: this.formDataCourse.value.name,
        programmeId: this.formDataCourse.value.programmeId,
        stateCode: this.stateCode,
      },
    ];
    this.api.postProposalCourse(temp, this.common.meruCourse).subscribe((res) => {
      if (res.status === 200) {
        this.saveBooleanValue(this.booleanEntity.isProposedCourse, this.common.meruProposed, this.sharedService.isProposedCourse)
        this.notification.showSuccess();
        this.getProposedCourseData();
        this.reset();
      }
    });
  }
  editCourse(data: any) {
    this.viewportScroller.scrollToPosition([0, 0]);
    this.addUpdateButton = "Update";
    this.addDepartmentData = true;
    this.hideButton = false
    this.formDataCourse.get("id")?.setValue(data.id);
    this.formDataCourse.get("departmentId")?.setValue(data.departmentId);
    this.formDataCourse.get("programmeId")?.setValue(data.programmeId);
    this.formDataCourse.get("name")?.setValue(data.name);
    this.formDataCourse.get("durationYear")?.setValue(data.durationYear);
    this.formDataCourse.get("durationMont")?.setValue(data.durationMonth);
    this.formDataCourse
      .get("enrolmentTargetFifthYear")
      ?.setValue(data.enrolmentTargetFifthYear);
    this.formDataCourse
      .get("isSufficientFacultySanctioned")
      ?.setValue(data.isSufficientFacultySanctioned);
    this.formDataCourse.get("isApprovedByUgc")?.setValue(data.isApprovedByUgc);
    this.formDataCourse.get("courseLevelId")?.setValue(data.courseLevelId);
    this.getProgramData();
  }

  delete(item: any) {
    this.hideButton = true;

    this.common.delete().subscribe(res => {
      if (res) {
        if (this.selectedIndex === 0) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteInfraRevision(item, this.sharedService.meruComponentId, this.sharedService.pabStatus, false).subscribe(res => {
              if (res.status === 200) {
                this.getInfraCons();
                this.resetTotal()
                this.notification.showDelete()
              }
            }, err => {

            })
          } else {
            this.deleteService.deleteInfra(item, this.sharedService.meruComponentId).subscribe(res => {
              if (res.status === 200) {
                this.getInfraCons();
                this.resetTotal()
                this.notification.showDelete()
              }
            }, err => {

            })
          }
        } if (this.selectedIndex === 1) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteRenovatedRevision(item, this.sharedService.meruComponentId, this.sharedService.pabStatus, false).subscribe(res => {
              if (res.status === 200) {
                this.getRenovated();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          } else {
            this.deleteService.deleteRenovated(item, this.sharedService.meruComponentId).subscribe(res => {
              if (res.status === 200) {
                this.getRenovated();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          }

        } if (this.selectedIndex === 2) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteEquipmentRevision(item, this.sharedService.meruComponentId, this.sharedService.pabStatus, false).subscribe(res => {
              if (res.status === 200) {
                this.getEquipment();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          } else {
            this.deleteService.deleteEquipment(item, this.sharedService.meruComponentId).subscribe(res => {
              if (res.status === 200) {
                this.getEquipment();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          }

        } if (this.selectedIndex === 3) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteSoftRevision(item, this.sharedService.meruComponentId, this.sharedService.pabStatus, false).subscribe(res => {
              if (res.status === 200) {
                this.getSoftCompoenent();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          } else {
            this.deleteService.deleteSoft(item, this.sharedService.meruComponentId).subscribe(res => {
              if (res.status === 200) {
                this.getSoftCompoenent();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          }

        } if (this.selectedIndex === 4) {
          this.deleteService.deleteProposedCourse(item, this.sharedService.meruComponentId).subscribe(res => {
            if (res.status === 200) {
              this.getProposedCourseData();
              this.resetTotal()

              this.notification.showDelete()
            }
          }, err => {

          })
        }
        if (this.selectedIndex === 5) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteTimeLineRevision(item, this.sharedService.pabStatus, false).subscribe(res => {
              if (res.status === 200) {
                this.getDataTimeLine();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          } else {
            this.deleteService.deleteTimeLine(item).subscribe(res => {
              if (res.status === 200) {
                this.getDataTimeLine();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          }

        }
        if (this.selectedIndex === 6) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteFinancialRevision(item, "1", false).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getDataFinancialEstimate();
                this.resetTotal()

              }
            }, err => {

            })
          }
          else {
            this.deleteService.deleteFinancial(item).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getDataFinancialEstimate();
                this.resetTotal()

              }
            }, err => {

            })
          }

        }
        // if (this.selectedIndex === 6) {
        //   this.deleteService.deleteFinancial(item).subscribe(res => {
        //     if (res.status === 200) {
        //       this.getDataFinancialEstimate();
        //       this.resetTotal()

        //       this.notification.showDelete()
        //     }
        //   }, err => {

        //   })
        // }
      }
    })
  }
  restore(item: any) {
    this.hideButton = true;

    this.common.restoreDelete("delete").subscribe(res => {
      if (res) {
        if (this.selectedIndex === 0) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteInfraRevision(item, this.sharedService.meruComponentId, this.sharedService.pabStatus, true).subscribe(res => {
              if (res.status === 200) {
                this.getInfraCons();
                this.resetTotal()
                this.notification.showRestore()
              }
            }, err => {

            })
          } else {
            this.deleteService.deleteInfra(item, this.sharedService.meruComponentId).subscribe(res => {
              if (res.status === 200) {
                this.getInfraCons();
                this.resetTotal()
                this.notification.showDelete()
              }
            }, err => {

            })
          }
        } if (this.selectedIndex === 1) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteRenovatedRevision(item, this.sharedService.meruComponentId, this.sharedService.pabStatus, true).subscribe(res => {
              if (res.status === 200) {
                this.getRenovated();
                this.resetTotal()

                this.notification.showRestore()
              }
            }, err => {

            })
          } else {
            this.deleteService.deleteRenovated(item, this.sharedService.meruComponentId).subscribe(res => {
              if (res.status === 200) {
                this.getRenovated();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          }

        } if (this.selectedIndex === 2) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteEquipmentRevision(item, this.sharedService.meruComponentId, this.sharedService.pabStatus, true).subscribe(res => {
              if (res.status === 200) {
                this.getEquipment();
                this.resetTotal()

                this.notification.showRestore()
              }
            }, err => {

            })
          } else {
            this.deleteService.deleteEquipment(item, this.sharedService.meruComponentId).subscribe(res => {
              if (res.status === 200) {
                this.getEquipment();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          }

        } if (this.selectedIndex === 3) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteSoftRevision(item, this.sharedService.meruComponentId, this.sharedService.pabStatus, true).subscribe(res => {
              if (res.status === 200) {
                this.getSoftCompoenent();
                this.resetTotal()
                this.notification.showRestore()
              }
            }, err => {

            })
          } else {
            this.deleteService.deleteSoft(item, this.sharedService.meruComponentId).subscribe(res => {
              if (res.status === 200) {
                this.getSoftCompoenent();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          }

        } if (this.selectedIndex === 4) {
          this.deleteService.deleteProposedCourse(item, this.sharedService.meruComponentId).subscribe(res => {
            if (res.status === 200) {
              this.getProposedCourseData();
              this.resetTotal()

              this.notification.showDelete()
            }
          }, err => {

          })
        }
        if (this.selectedIndex === 5) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteTimeLineRevision(item, this.sharedService.pabStatus, true).subscribe(res => {
              if (res.status === 200) {
                this.getDataTimeLine();
                this.resetTotal()

                this.notification.showRestore()
              }
            }, err => {

            })
          } else {
            this.deleteService.deleteTimeLine(item).subscribe(res => {
              if (res.status === 200) {
                this.getDataTimeLine();
                this.resetTotal()

                this.notification.showDelete()
              }
            }, err => {

            })
          }

        }
        if (this.selectedIndex === 6) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteFinancialRevision(item, "1", true).subscribe(res => {
              if (res.status === 200) {
                this.notification.showRestore()
                this.getDataFinancialEstimate();
                this.resetTotal()

              }
            }, err => {

            })
          }
          else {
            this.deleteService.deleteFinancial(item).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getDataFinancialEstimate();
                this.resetTotal()

              }
            }, err => {

            })
          }

        }
        // if (this.selectedIndex === 6) {
        //   this.deleteService.deleteFinancial(item).subscribe(res => {
        //     if (res.status === 200) {
        //       this.getDataFinancialEstimate();
        //       this.resetTotal()

        //       this.notification.showDelete()
        //     }
        //   }, err => {

        //   })
        // }
      }
    })
  }

  resetTotal() {
    this.perUnitCost = 0;
    this.proposedArea = 0;
    this.totalCost = 0;
    this.quantity = 0
    this.targetNumber = 0
  }
  dateChangeP(event) {
    const m = event.value;
    if (m) {
      this.formDataTimeLine.get('physicalTargetEndDateString').setValue(null)
      this.start = m;
    }
  }
  dateChangeFinance(event) {
    const m = event.value;
    if (m) {
      this.formDataTimeLine.get('financialTargetEndDateString').setValue(null)
      this.startFinance = m;
    }
  }
  numberOnly(event, inputLength): boolean {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  LockProposal(lockValue){
      let commonObj = this.common.newObj
      let filterObjt = Object.entries(commonObj).filter(([key]) => key === lockValue)
      let filterObjValue = filterObjt[0][1]
      let characters = this.aisheCode.split(/[\W\d]+/).join("");
      let temp = {
          aisheCode: this.aisheCode,
          componentId: this.sharedService.meruComponentId,
          constant: lockValue,
          districtCode: sessionStorage.getItem("districtCode"),
          instituteCategory: characters,
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

  LockProposaltime(lockValue){
    this.StatusValue = this.dataTimeLineList.filter(item => {
      return (item.trueId === true || item.trueId1 === true || item.trueId2 === true || item.trueId3 === true)
    });
    if (this.StatusValue.length > 0) {
       this.notification.showValidationMessage("Date Should not be greator then '31/03/2026' !!!");;
    }
    else {
      let commonObj = this.common.newObj
      let filterObjt = Object.entries(commonObj).filter(([key]) => key === lockValue)
      let filterObjValue = filterObjt[0][1]
      let characters = this.aisheCode.split(/[\W\d]+/).join("");
      let temp = {
          aisheCode: this.aisheCode,
          componentId: this.sharedService.meruComponentId,
          constant: lockValue,
          districtCode: sessionStorage.getItem("districtCode"),
          instituteCategory: characters,
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

  trackById(index: number, item: any) {
  return item.id;
}

}
