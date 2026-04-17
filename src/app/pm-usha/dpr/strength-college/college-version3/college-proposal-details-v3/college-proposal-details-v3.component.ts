import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, } from "@angular/forms";
import { CustomErrorStateMatcher } from "src/app/utility/validators";
import { ViewportScroller } from "@angular/common";
import { NotificationService } from "src/app/service/notification.service";
import { CollegeService } from "../../service/college.service";
import { SharedService } from "src/app/shared/shared.service";
import { ApiService } from "src/app/service/api.service";
import { Common } from "src/app/shared/common";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { AppDateAdapter, APP_DATE_FORMATS } from "src/app/utility/format-datepicker.service";
import { DeleteService } from "src/app/service/delete.service";
import { GetService } from "src/app/service/get.service";
import { BooleanEntity } from "src/app/pm-usha/Entity/boolean-entity";
import { PostService } from "src/app/service/post.service";
import { ActivatedRoute} from "@angular/router";
import { EncryptDecrypt } from "src/app/utility/encrypt-decrypt";
interface MyDataType {
  aisheCode: string,
  componentId: 0,
  constant: string,
  districtCode: string,
  instituteCategory: string,
  stateCode: string,
  status: true
}


@Component({
  selector: 'cfs-college-proposal-details-v3',
  templateUrl: './college-proposal-details-v3.component.html',
  styleUrls: ['./college-proposal-details-v3.component.scss']
})
export class CollegeProposalDetailsV3Component implements OnInit {

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
  start: any
  startFinance: any
  paramId: any;
  isYearGreaterThan2026: boolean = false;
  maxDate: Date;
  isInfraDisabled: boolean = false;
  isRenvoDisabled: boolean = false;
  isEquoDisabled: boolean = false;
  isSoftDisabled: boolean = false;
  istimelineDisabled: boolean = false;
  isProposedDisabled: boolean = false;
  isOtherDisabled: boolean = false;
  isInfraDeleteDisabled:boolean = false
  isFinicialEstimateDisabled:boolean = false;
  FinalLockKey: any;
  StatusValue: any[];
  oldIdArrFilter:any = []
  updateIdArrFilter:any = []
  deleteFilterArr:any = []
  newFilterArr:any = []
  newArray:any = [];
  existingRecordFilter:any = []
  item1FilterArray:any = []
  totalArr:any = []
  maxDate1 = new Date(2026, 2, 31);
  UpdatedataTimeLineList: any;
  iscloseTimeLine:boolean = true;
  statusId: any;
  FinalLockKey1: boolean;
  constructor(
    public fb: FormBuilder,
    public viewportScroller: ViewportScroller,
    public errorMatcher: CustomErrorStateMatcher,
    public notification: NotificationService,
    public auth: CollegeService,
    public sharedService: SharedService,
    public api: ApiService,
    public getService: GetService, public postService: PostService, public cdRef: ChangeDetectorRef,
    public common: Common, public deleteService: DeleteService, public booleanEntity: BooleanEntity, private route: ActivatedRoute, private encrypt: EncryptDecrypt
  ) {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
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
      versionNo: ["", []]
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
      versionNo: ["", []]
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
      versionNo: ["", []]
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
      versionNo: ["", []]
    });
    this.formDataCourse = this.fb.group({
      id: [0, []],
      departmentId: [null, [Validators.required]],
      courseLevelId: [null, [Validators.required]],
      enrolmentTargetFifthYear: [null, [Validators.required]],
      enrolmentTargetFourthYear: [null, [Validators.required]],
      enrolmentTargetThirdYear: [null, [Validators.required]],
      enrolmentTargetSecondYear: [null, [Validators.required]],
      enrolmentTargetFirstYear: [null, [Validators.required]],
      programmeId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      isApprovedByUgc: ["", [Validators.required]],
      isSufficientFacultySanctioned: ["", [Validators.required]],
      durationMont: [null, [Validators.required]],
      durationYear: [null, [Validators.required]],
      activeStatus: ["", []],
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
      itemName: ['']
    });
    this.aisheCode = sessionStorage.getItem("userName");
    this.districtName = sessionStorage.getItem('districtName')
    this.collegeName = sessionStorage.getItem('insName')
    this.insType = this.aisheCode.split(/[\W\d]+/).join("");
    this.stateCode = sessionStorage.getItem("stateCode")
    this.districtCode = sessionStorage.getItem("districtCode");
    if (this.insType === 'C') {
      this.instituteCategory = 'COLLEGE'
    } else {
      this.instituteCategory = 'UNIVERSITY'
    }

  }

  ngOnInit(): void {
    this.getBooleanData()
    this.getComponentList();
    this.getDepartmentData();
    this.getLevelData();
    this.getProposalActivity();
    this.getDataFinancialEstimate();
    this.getDataTimeLine();
    this.getPageStatusList()
    if (this.paramId) {
      this.getPropsalStatus()
    }
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
      this.maxDate = new Date('2026-03-31');
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
      this.maxDate = new Date('2026-03-31');
    }
  }
  isList(event, array) {
    if (array && array.length) {
      this.notification.showValidationMessage('Please delete all row');
      event.preventDefault()
    } else {
      this.close()
    }
  }
  saveBooleanValue(value, menu, key) {
    if (value !== null) {
      let payload = {
        "aisheCode": this.aisheCode,
        "componentId": this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
        "districtCode": this.districtCode,
        "menu": menu
      }
      payload[key] = value
      this.postService.saveBoolean(payload).subscribe(res => {
        if (res.status === 200) {
          // if (!res.data.isEquipment && !value) {
          this.notification.showSuccess()
          // }
          this.getBooleanData()
        }
      }, err => {

      })
    } else {
      this.notification.showValidationMessage(`Please choose 'YES/NO'`)
    }

  }

  getPropsalStatus() {
    const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
    let payload = {
      aisheCode: encryptedAishe
    }
    this.getService.getfinalSubmitProposal(payload).subscribe(res => {
        if (res.data.length && res.data) {
          const StatusFilter = res.data.filter(e=> e.isEligibleForV3);
          this.statusId = StatusFilter[0]?.id;
          this.FinalLockKey1 = StatusFilter[0].isV3Locked ? true : false

         
        }
      },
      (err) => {}
    );
    //   this.progressMonitoring = res[0]
    // })
  }

  saveLockStatus() {
    this.getService.getLockListStatus(this.aisheCode, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId).subscribe(res => {
      if (res) {
        this.FinalLockKey = res[0]
        if (this.FinalLockKey) {
          if (this.FinalLockKey.infraConstruction) {
            this.isInfraDisabled = true;
          }
          if (this.FinalLockKey.infraRenovation) {
            this.isRenvoDisabled = true;
          }
          if (this.FinalLockKey.equipment) {
            this.isEquoDisabled = true;
          }
          if (this.FinalLockKey.softComponent) {
            this.isSoftDisabled = true;
          }
          if (this.FinalLockKey.timeline) {
            this.istimelineDisabled = true;
          }
          if (this.FinalLockKey.financialEstimate) {
            this.isFinicialEstimateDisabled = true;
          }
          // if (this.FinalLockKey.proposedOutcome){
          //   this.isProposedDisabled = true;
          // }
          // if (this.FinalLockKey.otherInformation){
          //   this.isOtherDisabled = true;
          // }
        }
        // 
        // this.saveBooleanValue(this.booleanEntity.isProposedCourse, this.insType === 'U' ? this.common.strengthUnivProposed : this.common.strengthClgProposed, this.sharedService.isProposedCourse)
        // this.reset();
      }

    })
  }
  getBooleanData() {
    this.getService.getBooleanList(this.aisheCode, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.districtCode).subscribe(res => {
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
          this.addDepartmentData = false
        }
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  submitTimeline() {
    let duplicate = []
    for (let i = 0; i < this.dataTimeLineList.length; i++) {
      for (let j = i + 1; j < this.dataTimeLineList.length; j++) {
        if (this.dataTimeLineList[i].proposedActivityId === this.dataTimeLineList[j].dataTimeLineList) {
          if (this.dataTimeLineList[i].itemId === this.dataTimeLineList[j].itemId) {
            duplicate.push({
              percentage: parseInt(this.dataTimeLineList[i].percentageOfCompletion) + parseInt(this.dataTimeLineList[j].percentageOfCompletion)
            })
          }
        }
      }
    }
    let per = []
    per = duplicate.filter(e => e.percentage !== 100);
    if (per.length !== 0) {
      this.notification.showValidationMessage('Please')
      return;

    }

  }
  savePhase() {
    if (this.phaseCount === 0 || this.phaseCount === undefined || this.phaseCount === null) {
      this.notification.showValidationMessage('Please enter non zero(0) value !!!');
      return;
    }
    let array = []
    for (let index = 0; index < this.dataTimeLineList.length; index++) {
      array.push(this.dataTimeLineList[index].phase)
    }
    let maximumVal = Math.max(...array);
    if (this.phaseCount < maximumVal) {
      this.notification.showValidationMessage('Number of phase should not be less than Timeline details !!!')
      return;
    }
    let payload = {
      "aisheCode": this.aisheCode,
      "componentId": this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
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
    this.api.getPhaseCount(this.aisheCode, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, '').subscribe(res => {
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
    this.api.getPageStatus(this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId).subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {
          if (this.insType === 'C') {
            if (res.data[index].moduleName === this.common.strengthClgFinal) {
              if (this.paramId === this.sharedService.revPrposal && (this.selectedIndex === 0 || this.selectedIndex === 4 || this.selectedIndex === 1 || this.selectedIndex === 2 || this.selectedIndex === 3 || this.selectedIndex === 5)) {
                this.disabledPage = false
              }
              else {
                this.disabledPage = true
              }
              // else{
              //   this.disabledPage = true
              // }
            }
          } else {
            if (res.data[index].moduleName === this.common.strengthUniv) {
              if (this.paramId === this.sharedService.revPrposal && (this.selectedIndex === 0 || this.selectedIndex === 1 || this.selectedIndex === 2 || this.selectedIndex === 3 || this.selectedIndex === 5)) {
                this.disabledPage = false
              }
              else {
                this.disabledPage = true
              }
            }
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
        if (this.insType === 'U') {
          if (e.isStrengthenUniversityActivity) {
            this.dataListProposalActivity.push(e)
          }
        }
        if (this.insType === 'C') {
          if (e.isStrengthenCollegeActivity) {
            this.dataListProposalActivity.push(e)
          }
        }
      })


       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getItemData(data: any) {
    this.hideItem = false
    this.formDataTimeLine.get('itemId').reset();
    this.formDataFinancialEstimates.get('itemId').reset();
    
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
  getItemDataUpdate(data: any) {
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
  //this.formDtatimeLine
  getDepartmentData() {

    this.api
      .getDepartment(this.aisheCode, this.instituteCategory, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId)
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
  getInfraCons() {
      this.auth.getInfraCnstructionRevision(this.aisheCode, this.instituteCategory, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.districtCode, this.sharedService.pabStatus).subscribe(
        (res) => {
          this.processInfraResponse(res)
          this.saveLockStatus()
        },
        (err) => { }
      );
  }

  processInfraResponse(res) {
      this.infraConstructionList = [];
      this.newArray = []
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
          this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
          this.totalArr = this.infraConstructionList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))
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

  tabSelected(event) {
    this.selectedIndex = event.index;
    this.perUnitCost = 0;
    this.proposedArea = 0;
    this.totalCost = 0;
    this.quantity = 0
    this.targetNumber = 0
    this.close();
    this.proposedArea = 0;
    this.perUnitCost = 0;
    this.totalCost = 0;
    this.quantity = 0;
    this.getBooleanData()
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
      temp.push({
        componentId: this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
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
        recordStatus: this.infraConstruction.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.infraConstruction.controls["recordStatus"].value,
        rsV3: this.infraConstruction.controls["id"].value == 0 ? { id: this.sharedService.revAddId, name: this.sharedService.revAdd } : (this.infraConstruction.controls["rsV3"].value === '' ? null : this.infraConstruction.controls["rsV3"].value),
        activeStatus: this.infraConstruction.controls["activeStatus"].value ? this.infraConstruction.controls["activeStatus"].value : true,
        oldId:this.infraConstruction.controls["oldId"].value ? this.infraConstruction.controls["oldId"].value : null,
        oldIdV3:this.infraConstruction.controls["oldIdV3"].value ? this.infraConstruction.controls["oldIdV3"].value : null,
        v1:this.infraConstruction.controls["v1"].value,
        v2:this.infraConstruction.controls["v2"].value,
        v3:this.infraConstruction.controls["v3"].value,
        versionNo: this.sharedService.pabStatusV3
      });
    this.auth.saveInfraConstruction(temp, this.insType === 'U' ? this.common.strengthUnivInfraCons : this.common.strengthClgInfraCons).subscribe(
      (res) => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.saveBooleanValue(this.booleanEntity.isInfraConstruction, this.insType === 'U' ? this.common.strengthUnivInfraCons : this.common.strengthClgInfraCons, this.sharedService.isInfraConstruction)
          this.reset();

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
      temp.push({
        componentId: this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
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
        recordStatus: this.infraRenovated.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.infraRenovated.controls["recordStatus"].value,
        rsV3: this.infraRenovated.controls["id"].value == 0 ? { id: this.sharedService.revAddId, name: this.sharedService.revAdd } : (this.infraRenovated.controls["rsV3"].value === '' ? null : this.infraRenovated.controls["rsV3"].value),
        activeStatus: this.infraRenovated.controls["activeStatus"].value ? this.infraRenovated.controls["activeStatus"].value : true,
        oldId:this.infraRenovated.controls["oldId"].value ? this.infraRenovated.controls["oldId"].value : null,
        oldIdV3:this.infraRenovated.controls["oldIdV3"].value ? this.infraRenovated.controls["oldIdV3"].value : null,
        v1:this.infraRenovated.controls["v1"].value,
        v2:this.infraRenovated.controls["v2"].value,
        v3:this.infraRenovated.controls["v3"].value,
        versionNo: this.sharedService.pabStatusV3
      });
    this.auth.saveRenovated(temp, this.insType === 'U' ? this.common.strengthUnivReno : this.common.strengthClgReno).subscribe(
      (res) => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.saveBooleanValue(this.booleanEntity.isInfraRenovation, this.insType === 'U' ? this.common.strengthUnivReno : this.common.strengthClgReno, this.sharedService.isInfraRenovation)
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
      temp.push({
        componentId: this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
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
        recordStatus: this.equipment.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.equipment.controls["recordStatus"].value,
        rsV3: this.equipment.controls["id"].value == 0 ? { id: this.sharedService.revAddId, name: this.sharedService.revAdd } : (this.equipment.controls["rsV3"].value === '' ? null : this.equipment.controls["rsV3"].value),
        activeStatus: this.equipment.controls["activeStatus"].value ? this.equipment.controls["activeStatus"].value : true,
        oldId:this.equipment.controls["oldId"].value ? this.equipment.controls["oldId"].value : null,
        oldIdV3:this.equipment.controls["oldIdV3"].value ? this.equipment.controls["oldIdV3"].value : null,
        v1:this.equipment.controls["v1"].value,
        v2:this.equipment.controls["v2"].value,
        v3:this.equipment.controls["v3"].value,
        versionNo: this.sharedService.pabStatusV3
      });
    this.auth.saveEquipment(temp, this.insType === 'U' ? this.common.strengthUnivEquip : this.common.strengthClgEquip).subscribe(
      (res) => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.saveBooleanValue(this.booleanEntity.isEquipment, this.insType === 'U' ? this.common.strengthUnivEquip : this.common.strengthClgEquip, this.sharedService.isEquipment)
          this.reset();

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
    let component = this.componentList.find((ele) => ele.id === 3);
    let temp = [];
      temp.push({
        activity: this.softComponent.value.activity,
        aisheCode: this.aisheCode,
        componentId: {
          id: this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
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
        recordStatus: this.softComponent.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.softComponent.controls["recordStatus"].value,
        rsV3: this.softComponent.controls["id"].value == 0 ? { id: this.sharedService.revAddId, name: this.sharedService.revAdd } : (this.softComponent.controls["rsV3"].value === '' ? null : this.softComponent.controls["rsV3"].value),
        activeStatus: this.softComponent.controls["activeStatus"].value ? this.softComponent.controls["activeStatus"].value : true,
        oldId:this.softComponent.controls["oldId"].value ? this.softComponent.controls["oldId"].value : null,
        oldIdV3:this.softComponent.controls["oldIdV3"].value ? this.softComponent.controls["oldIdV3"].value : null,
        v1:this.softComponent.controls["v1"].value,
        v2:this.softComponent.controls["v2"].value,
        v3:this.softComponent.controls["v3"].value,
        versionNo: this.sharedService.pabStatusV3
      });
    this.auth.saveSoftCompoenent(temp, this.insType === 'U' ? this.common.strengthUnivSoft : this.common.strengthClgSoft).subscribe(
      (res) => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.reset();
          this.saveBooleanValue(this.booleanEntity.isSoftComponent, this.insType === 'U' ? this.common.strengthUnivSoft : this.common.strengthClgSoft, this.sharedService.isSoftComponent)
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

  parseDateUpdate1(dateStr: string): Date | null {
    if (!dateStr) return null;
    let parts = dateStr.split(' '); // Split by space
    if (parts.length !== 6) return null;  // Ensure the date string is properly formatted
    // Joining parts other than the first (day of the week) with a space
    let newDateStr = parts.slice(1).join(' ');
    return new Date(newDateStr);
}

  getDataTimeLine() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.getService.getDataTimeRevision(this.aisheCode, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.districtCode, "1").subscribe(
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
         
          // this.dataTimeLineList = res;
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

              
              // item.trueId || item.trueId1 || item.trueId2 || item.trueId3)
              
            
            return item;
          });

          // let data = this.StatusValue .filter(item =>  { return item.trueId || item.trueId1 || item.trueId2 || item.trueId3 } )
        },
        (err) => { }
      );
    }
    else {
      this.getService.getDataTime(this.aisheCode, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId).subscribe(
        (res) => {
          this.dataTimeLineList = res;
        },
        (error) => { }
      );
    }

  }
  // getDataTimeLine() {
  //   this.getService.getDataTime(this.aisheCode, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId).subscribe(
  //     (res) => {
  //       this.dataTimeLineList = res;
  //     },
  //     (error) => { }
  //   );
  // }
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
          componentId: this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
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
          pabStatus: 1,
          recordStatus: this.formDataTimeLine.controls["recordStatus"].value,
          activeStatus: this.formDataTimeLine.controls["activeStatus"].value ? this.formDataTimeLine.controls["activeStatus"].value : true
        });
      }
   
    }
    else {
      temp.push({
        aisheCode: this.aisheCode,
        componentId: this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
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
        activeStatus: this.formDataTimeLine.controls["activeStatus"].value ? this.formDataTimeLine.controls["activeStatus"].value : true
      });
    }

    this.api.saveTimeLineData(temp, this.insType === 'U' ? this.common.strengthUnivTimeline : this.common.strengthClgTimeline).subscribe((res) => {
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
    this.api.getFinancialEstimate(this.aisheCode, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId).subscribe((res) => {
      this.dataFinancialEstimateList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  saveFinancialEstimates() {
    if (this.formDataFinancialEstimates.invalid) {
      this.notification.showWarning();
      this.isFormInvalid = true
      return;
    } else {
      this.isFormInvalid = false
    }
    let component = this.componentList.find((ele) => ele.id === 3);
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
    let temp = {
      aisheCode: this.aisheCode,
      amount2023: this.formDataFinancialEstimates.value.amount2023,
      amount2024: this.formDataFinancialEstimates.value.amount2024,
      amount2025: this.formDataFinancialEstimates.value.amount2025,
      componentId: this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
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
    this.api.postFinancial(temp, this.insType === 'U' ? this.common.strengthUnivFinance : this.common.strengthClgFinance).subscribe((res) => {
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
    this.formDataFinancialEstimates.patchValue(data.proposalActivityId);
    this.addDepartmentData = true;
    this.addUpdateButton = "Update";
    this.hideButton = false
    this.getItemDataUpdate(data.proposalActivityId);
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
    this.getItemDataUpdate(data.proposalActivityId);
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
        activeStatus: item.activeStatus,
        rsV3: item.rsV3,
        oldId : item.oldId,
        oldIdV3: item.oldIdV3,
        v1:item.v1,
        v2:item.v2,
        v3:item.v3,
        versionNo: item.versionNo
        
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
        activeStatus: item.activeStatus,
        rsV3: item.rsV3,
        oldId : item.oldId,
        oldIdV3: item.oldIdV3,
        v1:item.v1,
        v2:item.v2,
        v3:item.v3,
        versionNo: item.versionNo
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
        activeStatus: item.activeStatus,
        rsV3: item.rsV3,
        oldId : item.oldId,
        oldIdV3: item.oldIdV3,
        v1:item.v1,
        v2:item.v2,
        v3:item.v3,
        versionNo: item.versionNo
      });
     } else if (this.selectedIndex === 3) {
      this.softComponent.patchValue({
      activity: item.activity,
      costPerUnit: item.costPerUnit,
      detail: item.detail,
      expectedOutcome: item.expectedOutcome,
      id: item.id,
      purpose: item.purpose,
      targetNumberOfBeneficiary: item.targetNumberOfBeneficiary,
      totalCost: item.totalCost,
      unit: item.unit,

        recordStatus: item.recordStatus ? item.recordStatus : null,
        pabStatus: item.pabStatus,
        activeStatus: item.activeStatus,
        rsV3: item.rsV3,
        oldId : item.oldId,
        oldIdV3: item.oldIdV3,
        v1:item.v1,
        v2:item.v2,
        v3:item.v3,
        versionNo: item.versionNo
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
      this.auth.getRenovatedListReviosn(this.aisheCode, this.instituteCategory, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.districtCode, "1").subscribe(
        (res) => {
          
          this.processRenovResponse(res)
          this.saveLockStatus()
        },
        (err) => { }
      );

  }

  processRenovResponse(res) {
    this.renovatedList = [];
    this.newArray = []
    this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
    this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
    this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
    this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
    this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
    this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
    this.updateIdArrFilter.forEach(item1 => {
    this.oldIdArrFilter.forEach(item2 => {
        if (item1.oldIdV3 === item2.id) {
            this.newArray.push(item2, item1);
        }
      });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
    this.renovatedList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.renovatedList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))
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

  getEquipment() {
      this.auth.getEquipmentListRevision(this.aisheCode, this.instituteCategory, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.districtCode, "1").subscribe(
        (res) => {
          this.processEquoResponse(res)
          this.saveLockStatus()
        },
        (err) => { }
      );
  }

  processEquoResponse(res) {
    this.equipmentList = [];
    this.newArray = []
    this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
    this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
    this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
    this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
    this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
    this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
    this.updateIdArrFilter.forEach(item1 => {
    this.oldIdArrFilter.forEach(item2 => {
    if (item1.oldIdV3 === item2.id) {
            this.newArray.push(item2, item1);
        }
      });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
    this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.equipmentList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))
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

  getSoftCompoenent() {
      this.auth.getSoftCompoenentListRevision(this.aisheCode, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, "1").subscribe(
        (res) => {
          this.processsoftResponse(res)
          this.saveLockStatus()
        },
        (err) => { }
      );
  }

  processsoftResponse(res) {
    this.softComponentList = [];
    this.newArray = []
    this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
    this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
    this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
    this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
    this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
    this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
    this.updateIdArrFilter.forEach(item1 => {
    this.oldIdArrFilter.forEach(item2 => {
    if (item1.oldIdV3 === item2.id) {
            this.newArray.push(item2, item1);
        }
      });
    });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
    this.softComponentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.softComponentList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))
    // this.softComponentList = res.data;
    this.itemList = [];
    res.data.forEach(ele => {
      this.itemList.push({
        id: ele.id,
        name: ele.activity
      })
    })
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
  }
  getProposedCourseData() {
    this.getService.getProposedCourse(this.aisheCode, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId).subscribe(
      (res) => {
        this.courseData = res;
        this.itemList = []
        res.forEach(ele => {
          this.itemList.push({
            id: ele.id,
            name: ele.name
          })
        })
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
        componentId: this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
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
        activeStatus: this.formDataCourse.controls["activeStatus"].value ? this.formDataCourse.controls["activeStatus"].value : true,
      },
    ];

    this.api.postProposalCourse(temp, this.insType === 'U' ? this.common.strengthUnivProposed : this.common.strengthClgProposed).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.saveBooleanValue(this.booleanEntity.isProposedCourse, this.insType === 'U' ? this.common.strengthUnivProposed : this.common.strengthClgProposed, this.sharedService.isProposedCourse)
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
      .get("enrolmentTargetFourthYear")
      ?.setValue(data.enrolmentTargetFourthYear);
    this.formDataCourse
      .get("enrolmentTargetThirdYear")
      ?.setValue(data.enrolmentTargetThirdYear);
    this.formDataCourse
      .get("enrolmentTargetSecondYear")
      ?.setValue(data.enrolmentTargetSecondYear);
    this.formDataCourse
      .get("enrolmentTargetFirstYear")
      ?.setValue(data.enrolmentTargetFirstYear);

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
            this.deleteService.deleteInfraRevision(item, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.sharedService.pabStatusV3, false).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.resetTotal()
                this.getInfraCons();
                this.getBooleanData()
              }
            }, err => {

            })

        } if (this.selectedIndex === 1) {
            this.deleteService.deleteRenovatedRevision(item, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.sharedService.pabStatusV3, false).subscribe(res => {
              if (res.status === 200) {
                // this.addUpdate=true
                this.resetTotal()
                this.notification.showDelete()
                this.getRenovated();
                this.getBooleanData()
              }
            }, err => {

            })

        } if (this.selectedIndex === 2) {
            this.deleteService.deleteEquipmentRevision(item, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.sharedService.pabStatusV3, false).subscribe(res => {
              if (res.status === 200) {
                this.resetTotal()
                this.notification.showDelete()
                this.getEquipment();
                this.getBooleanData()
              }
            }, err => {

            })
        } if (this.selectedIndex === 3) {
            this.deleteService.deleteSoftRevision(item, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.sharedService.pabStatusV3, false).subscribe(res => {
              if (res.status === 200) {
                this.resetTotal()
                this.notification.showDelete()
                this.getSoftCompoenent();
                this.getBooleanData()
              }
            }, err => {

            })
        } if (this.selectedIndex === 4) {
          this.deleteService.deleteProposedCourse(item, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId).subscribe(res => {
            if (res.status === 200) {
              this.notification.showDelete()
              this.getProposedCourseData();
              this.getBooleanData()
            }
          }, err => {

          })
        }
        if (this.selectedIndex === 5) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteTimeLineRevision(item, "1", false).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getDataTimeLine();

              }
            }, err => {

            })
          }
          else {
            this.deleteService.deleteTimeLine(item).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getDataTimeLine();

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

              }
            }, err => {

            })
          }
          else {
            this.deleteService.deleteFinancial(item).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getDataFinancialEstimate();

              }
            }, err => {

            })
          }

        }
      }
    })
  }
  restore(item: any) {
    this.hideButton = true;
    this.common.restoreDelete("delete").subscribe(res => {
      if (res) {
        if (this.selectedIndex === 0) {
            this.deleteService.deleteInfraRevision(item, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.sharedService.pabStatusV3, true).subscribe(res => {
              if (res.status === 200) {
                this.notification.showRestore()
                this.resetTotal()
                this.getInfraCons();
                this.getBooleanData()
              }
            }, err => {

            })
        } if (this.selectedIndex === 1) {
            this.deleteService.deleteRenovatedRevision(item, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.sharedService.pabStatusV3, true).subscribe(res => {
              if (res.status === 200) {
                // this.addUpdate=true
                this.resetTotal()
                this.notification.showRestore()
                this.getRenovated();
                this.getBooleanData()
              }
            }, err => {

            })
        } if (this.selectedIndex === 2) {
            this.deleteService.deleteEquipmentRevision(item, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.sharedService.pabStatusV3, true).subscribe(res => {
              if (res.status === 200) {
                this.resetTotal()
                this.notification.showRestore()
                this.getEquipment();
                this.getBooleanData()
              }
            }, err => {

            })
        } if (this.selectedIndex === 3) {
            this.deleteService.deleteSoftRevision(item, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId, this.sharedService.pabStatusV3, true).subscribe(res => {
              if (res.status === 200) {
                this.resetTotal()
                this.notification.showRestore()
                this.getSoftCompoenent();
                this.getBooleanData()
              }
            }, err => {

            })
        } if (this.selectedIndex === 4) {
          this.deleteService.deleteProposedCourse(item, this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId).subscribe(res => {
            if (res.status === 200) {
              this.notification.showDelete()
              this.getProposedCourseData();
              this.getBooleanData()
            }
          }, err => {

          })
        }
        if (this.selectedIndex === 5) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteTimeLineRevision(item, "1", true).subscribe(res => {
              if (res.status === 200) {
                this.notification.showRestore()
                this.getDataTimeLine();

              }
            }, err => {

            })
          }
          else {
            this.deleteService.deleteTimeLine(item).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getDataTimeLine();

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

              }
            }, err => {

            })
          }
          else {
            this.deleteService.deleteFinancial(item).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.getDataFinancialEstimate();

              }
            }, err => {

            })
          }

        }
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

  LockProposal(lockValue) {
      let commonObj = this.common.newObj
      let filterObjt = Object.entries(commonObj).filter(([key]) => key === lockValue)
      let filterObjValue = filterObjt[0][1]
      let characters = this.aisheCode.split(/[\W\d]+/).join("");
      let temp = {
          aisheCode: this.aisheCode,
          componentId: this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
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

  LockProposaltime(lockValue) {
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
          componentId: this.insType === 'U' ? this.sharedService.universityComponentId : this.sharedService.collegeComponentId,
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
      'delete-row': item?.rsV3?.id === 2 && (item?.v3 === false && this.paramId === this.sharedService.revPrposalV3),
      'update-row': item?.rsV3?.id === 3 && (item?.v3 === true && this.paramId === this.sharedService.revPrposalV3),
      'old-update-row': item?.rsV3?.id === 3 && (item?.v3 === false && this.paramId === this.sharedService.revPrposalV3),
      'disabled-row1': item?.rsV3?.id === 1 && this.paramId === this.sharedService.revPrposalV3,


    };
  }

  getTitle(item: any): string {
    if (item?.rsV3?.id === 3 && item?.v3 === true && this.paramId === this.sharedService.revPrposalV3) {
      return 'Existing Record Updated';
    } else if (item?.rsV3?.id === 1 && this.paramId === this.sharedService.revPrposalV3) {
      return 'New Addition';
    }
    else if (item?.rsV3?.id === 2 && item?.v3 === false && this.paramId === this.sharedService.revPrposalV3) {
      return 'Deleted Record';
    }
    else if (item?.rsV3?.id === 3 && item?.v3 === false && this.paramId === this.sharedService.revPrposalV3) {
      return 'Old Existing Record';
    }
    return '';
  }

trackById(index: number, item: any) {
  return item.id;
}

}
