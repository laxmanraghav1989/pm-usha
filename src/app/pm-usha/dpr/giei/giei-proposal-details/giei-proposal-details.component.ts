import { ViewportScroller } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { GetService } from "src/app/service/get.service";
import { NotificationService } from "src/app/service/notification.service";
import { PostService } from "src/app/service/post.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";
import { CustomErrorStateMatcher } from "src/app/utility/validators";
import { BooleanEntity } from "src/app/pm-usha/Entity/boolean-entity";
import { DeleteService } from "src/app/service/delete.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "cfs-giei-proposal-details",
  templateUrl: "./giei-proposal-details.component.html",
  styleUrls: ["./giei-proposal-details.component.scss"],
})
export class GieiProposalDetailsComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) myVar1: ElementRef | undefined;
  fileSizeUnit: number = 5120;
  myFiles: string[] = [];
  myFilesName: any = '';
  fileSizeExceed: any;
  uploadedMedia: Array<any> = [];
  changeDoc: boolean = false;
  fileSize: any = 0
  blob: any;
  hideButton: Boolean = true;
  addUpdate: boolean = false;
  addUpdateButton: string = "save";
  componentList: any;
  tab: any;
  infraConstruction: FormGroup;
  formDataFinancialEstimates: FormGroup;
  formDataInfraRenovation: FormGroup;
  formDataEquipmentProcured: FormGroup;
  formDataInfraConstruction: FormGroup;
  formDataRemedial: FormGroup;
  formDataWorkshop: FormGroup;
  formDataStemCourse: FormGroup;
  dataFinancialEstimateList: any
  formDataTimeLine: FormGroup;
  formVocational: FormGroup;
  formActivities: FormGroup
  //aisheCode: any;
  selectedIndex: any = 0;
  dataActivitiesList: any
  hideItem: boolean = true
  tabIndex = 0;
  isFormInvalid: boolean = false
  perUnitCost: number = 0;
  proposedArea: number = 0;
  costPerUnitV: number = 0;
  totalCost: number = 0;
  proposedAreaR: number = 0;
  perUnitCostR: number = 0;
  totalCostR: number = 0;
  proposedAreaEQ: number = 0;
  perUnitCostEQ: number = 0;
  totalCostEQ: number = 0;
  proposedAreaW: number = 0;
  perUnitCostW: number = 0;
  totalCostW: number = 0;
  numberofClass: number = 0;
  costPerClassReme: number = 0;
  totalCostV: number = 0;
  totalCostReme: number = 0;
  expectedOutcome: number = 0;
  targetNoParticipant1: number = 0;
  unitActivity: number = 0;
  costPerUnitActivity: number = 0;
  totalCostActivity: number = 0;
  targetNoBeneficiary: number = 0;
  expectedOutcomeActivity: number = 0;

  dataTimeLineList: any;
  targetNoParticipantV: number = 0;
  expectedOutcomeV: number = 0;
  unitVocational: number = 0;
  perUnitCostV: number = 0;
  targetNumberofParticipantsReme: number = 0;
  expectedOutcomeReme: number = 0;
  infraConstructionList: Array<any> = [];
  infraRenovationList: Array<any> = [];
  equipmqntList: Array<any> = [];
  workshopDataList: Array<any> = [];
  remedialClassesList: Array<any> = [];
  dataListProposalActivity: Array<any> = [];
  dataStemCourseList: Array<any> = [];
  dataListVocational: Array<any> = []
  softComponentList: Array<any> = [];
  instituteCategory: any;
  programmeList: any;
  disabledPage: boolean = false;
  category: any;
  stateCode: any;
  districtCode: any;
  levelList: Array<any> = [];
  institutionTypeData: any
  //componentId: number;
  districtCode1: any;
  itemList: Array<any> = [];
  phaseCount: any = 0;
  phaseList: Array<any> = [];
  showPage: boolean = false
  start: any;
  startFinance: any;
  paramId: any;
  isInfraDisabled: boolean = false;
  isRenvoDisabled: boolean = false;
  isEquoDisabled: boolean = false;
  isSoftDisabled: boolean = false;
  istimelineDisabled: boolean = false;
  isProposedDisabled: boolean = false;
  isOtherDisabled: boolean = false;
  isInfraDeleteDisabled:boolean = false
  isFinicialEstimateDisabled:boolean = false;
  isWorkDisabled: boolean = false;
  isremedialDisabled: boolean = false;
  isVocationalDisabled:boolean = false
  isOtherActivityDisabled:boolean = false
  FinalLockKey: any;
  aisheCode: string;
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
  maxDate: Date;
  constructor(
    public fb: FormBuilder,
    public notification: NotificationService,
    public sharedService: SharedService,
    public api: ApiService,
    public common: Common,
    public viewportScroller: ViewportScroller,
    public getService: GetService,
    public errorMatcher: CustomErrorStateMatcher,
    public post: PostService,
    public booleanEntity: BooleanEntity, public deleteService: DeleteService, private route: ActivatedRoute
  ) {
    this.paramId = Number(this.route.snapshot.paramMap.get('id'));
    this.stateCode = sessionStorage.getItem("stateCode");
    this.districtCode = sessionStorage.getItem("districtCode");
    this.aisheCode = sessionStorage.getItem("userName");




    this.infraConstruction = this.fb.group({
      description: ["", [Validators.required]],
      id: 0,
      name: ["", [Validators.required]],
      quantity: ["", [Validators.required]],
      justification: ["", [Validators.required]],
      perUnitCost: ["", []],
      proposedArea: ["", []],
      purpose: ["", [Validators.required]],
      totalCost: ["", [Validators.required]],
      landTittleObtainedToBeUpload: ["", [Validators.required]],
      location: ["", [Validators.required]],
      theme: ["", [Validators.required]],
      expectedOutcome: ["", [Validators.required]],
      noWorkshop: ["", [Validators.required]],
      costPerWorkshop: ["", [Validators.required]],
      targetNoParticipant: ["", [Validators.required]],
      detail: ["", [Validators.required]],
      noOfClasses: ["", [Validators.required]],
      nameOfClass: ["", [Validators.required]],
      willAnyCertificationProvided: ["", [Validators.required]],
      costPerClass: ["", [Validators.required]],
      institutionName: ['', [Validators.required]],
      isApprovedByUgc: ['', [Validators.required]],
      isSufficientFacultySanctioned: ['', [Validators.required]],
      durationMonth: ['', [Validators.required]],
      durationYear: ['', [Validators.required]],
      courseLevelId: ['', [Validators.required]],
      enrollmentTargetFirstYear: ['', [Validators.required]],
      enrollmentTargetFifthYear: ['', [Validators.required]],
      programmeId: ['', [Validators.required]],
      equityInstitutionTypeId: ['', [Validators.required]],


    });
    this.formDataRemedial = this.fb.group({
      id: 0,
      expectedOutcome: ["", [Validators.required]],
      targetNoParticipant: ["", [Validators.required]],
      detail: ["", [Validators.required]],
      totalCost: ["", [Validators.required]],
      noOfClasses: ["", []],
      nameOfClass: ["", [Validators.required]],
      willAnyCertificationProvided: ["", [Validators.required]],
      costPerClass: ["", []],
      pabStatus: ["", []],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []]



    });


    this.formDataWorkshop = this.fb.group({
      id: 0,
      theme: ["", [Validators.required]],
      noWorkshop: ["", []],
      costPerWorkshop: ["", []],
      totalCost: ["", [Validators.required]],
      targetNoParticipant: ["", [Validators.required]],
      expectedOutcome: ["", [Validators.required]],
      pabStatus: ["", []],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []]

    });
    this.formDataInfraConstruction = this.fb.group({
      description: ["", [Validators.required]],
      id: 0,
      purpose: ["", [Validators.required]],
      justification: ["", [Validators.required]],
      proposedArea: ["", []],
      perUnitCost: ["", []],
      totalCost: ["", [Validators.required]],
      landTittleObtainedToBeUpload: ["", []],
      location: ["", [Validators.required]],
      recordStatusId: ["", []],
      pabStatus: ["", []],
      oldId: ["", []],
      oldIdV3: ["", []],
      rsV3: ["", []],
      v1: ["", []],
      v2: ["", []],
      v3: ["", []]

    });

    this.formVocational = this.fb.group({
      activity: ['', [Validators.required]],
      detail: ['', [Validators.required]],
      unit: ['', []],
      costPerUnit: ['', []],
      totalCost: ['', [Validators.required]],
      targetNoParticipant: ['', [Validators.required]],
      expectedOutcome: ['', [Validators.required]],
      willAnyCertificationProvided: ['', [Validators.required]],
      id: [0, [Validators.required]],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []]
    })
    this.formActivities = this.fb.group({
      activity: ['', [Validators.required]],
      detail: ['', [Validators.required]],
      unit: ['', []],
      costPerUnit: ['', []],
      totalCost: ['', [Validators.required]],
      expectedOutcome: ['', [Validators.required]],
      targetNoBeneficiary: ['', [Validators.required]],
      purpose: ['', [Validators.required]],
      id: [0, [Validators.required]],
      pabStatus: ["", []],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []]
    })

  }

  ngOnInit(): void {
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
    });
    this.formDataStemCourse = this.fb.group({
      enrollmentTargetFourthYear: ['', [Validators.required]],
      enrollmentTargetSecondYear: ['', [Validators.required]],
      enrollmentTargetThirdYear: ['', [Validators.required]],
      name: ['', [Validators.required]],
      id: [0, [Validators.required]],
      equityInstitutionTypeId: ['', [Validators.required]],
      courseLevelId: ['', [Validators.required]],
      programmeId: ['', [Validators.required]],
      durationYear: ['', [Validators.required]],
      durationMonth: ['', [Validators.required]],
      isApprovedByUgc: ['', [Validators.required]],
      isSufficientFacultySanctioned: ['', [Validators.required]],
      enrollmentTargetFirstYear: ['', [Validators.required]],
      enrollmentTargetFifthYear: ['', [Validators.required]],
      institutionName: ['', [Validators.required]],
    })
    this.formDataInfraRenovation = this.fb.group({
      description: ['', [Validators.required]],
      detail: ['', [Validators.required]],
      justification: ['', [Validators.required]],
      id: [0, [Validators.required]],
      proposedArea: ['', []],
      perUnitCost: ['', []],
      totalCost: ['', [Validators.required]],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []],
      oldIdV3: ["", []],
      rsV3: ["", []],
      v1: ["", []],
      v2: ["", []],
      v3: ["", []]

    })
    this.formDataEquipmentProcured = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', []],
      justification: ['', [Validators.required]],
      id: [0, [Validators.required]],
      perUnitCost: ['', []],
      totalCost: ['', [Validators.required]],
      recordStatus: ["", []],
      activeStatus: ["", []],
      oldId: ["", []],
      oldIdV3: ["", []],
      rsV3: ["", []],
      v1: ["", []],
      v2: ["", []],
      v3: ["", []]
    })


    this.getComponentList();
    this.getBooleanData()
    //  this.getInfraCons();
    this.getInstitutionType();
    this.getLevelData()
    this.getProposalActivity();
    this.getPageStatusList();
    if (this.paramId) {
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
        "aisheCode": this.districtCode,
        "componentId": this.sharedService.genderComponentId,
        "districtCode": this.districtCode,
        "menu": menu
      }
      payload[key] = value
      this.post.saveBoolean(payload).subscribe(res => {
        if (res.status === 200) {
          if (!value) {
            this.notification.showSuccess();
          }
          this.getBooleanData()
        }
      }, err => {

      })
    } else {
      this.notification.showValidationMessage(`Please choose 'YES/NO'`)
    }

  }
  // saveBooleanValue(value,menu) {
  //   if(value){
  //     let payload = {
  //       "aisheCode": this.aisheCode,
  //       "componentId":  this.sharedService.genderComponentId,
  //       "districtCode": this.districtCode,
  //       "isInfraConstruction": value,
  //       "menu":menu
  //     }
  //     this.post.saveBoolean(payload).subscribe(res => {
  //       if (res.status === 200) {
  //         this.getBooleanData()
  //       }
  //     }, err => {

  //     })
  //   }else{
  //     this.notification.showValidationMessage(`Please choose 'YES/NO'`)
  //   }

  // }
  saveLockStatus() {
    this.getService.getLockListStatus(this.aisheCode, this.sharedService.genderComponentId).subscribe(res => {
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
          if (this.FinalLockKey.workshop) {
            this.isWorkDisabled = true;
          }
          if (this.FinalLockKey.remedialClass) {
            this.isremedialDisabled = true;
          }
          if (this.FinalLockKey.vocational) {
            this.isVocationalDisabled = true;
          }
          if (this.FinalLockKey.anyOtherActivities) {
            this.isOtherActivityDisabled = true;
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
    this.getService.getBooleanList('', this.sharedService.genderComponentId, this.districtCode).subscribe(res => {
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
          this.getRenovationData();
        } else {
          this.addUpdate = false
        }
      } if (this.selectedIndex === 2) {
        this.booleanEntity.isEquipment = res['0'].isEquipment;
        if (this.booleanEntity.isEquipment) {
          this.getEquipmentData();
        } else {
          this.addUpdate = false
        }
      } if (this.selectedIndex === 3) {
        this.booleanEntity.isWorkshop = res['0'].isWorkshop;
        if (this.booleanEntity.isWorkshop) {
          this.getWorkshop1();
        } else {
          this.addUpdate = false
        }
      } if (this.selectedIndex === 4) {
        this.booleanEntity.isRemedialClass = res['0'].isRemedialClass;
        if (this.booleanEntity.isRemedialClass) {
          this.getRemedialData();
        } else {
          this.addUpdate = false
        }
      }
      if (this.selectedIndex === 5) {
        this.booleanEntity.isStemCourse = res['0'].isStemCourse;
        if (this.booleanEntity.isStemCourse) {
          this.getStemCourseData();
        } else {
          this.addUpdate = false
        }
      }
      if (this.selectedIndex === 6) {
        this.booleanEntity.isVocationalisation = res['0'].isVocationalisation;
        if (this.booleanEntity.isVocationalisation) {
          this.getVocational();
        } else {
          this.addUpdate = false
        }
      }if (this.selectedIndex === 7) {
        this.booleanEntity.isOtherActivity = res['0'].isOtherActivity;
        if (this.booleanEntity.isOtherActivity) {
          this.getActivitiesData();
        } else {
          this.addUpdate = false
        }
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  tabSelected(event) {
    this.resetTotal()
    this.selectedIndex = event.index;
  

    this.getBooleanData()
    this.close();

    if (this.selectedIndex === 8) {
      this.getPhase()
      this.getDataTimeLine();
    } if (this.selectedIndex === 9) {
      this.getDataFinancialEstimate();
    }
  }
  savePhase() {
    if (this.phaseCount === 0 || this.phaseCount === undefined) {
      this.notification.showValidationMessage('Please enter non zero(0) value !!!');
      return;
    }
    if (this.phaseCount < this.dataTimeLineList.length) {
      this.notification.showValidationMessage('Number of phase should not be less than Timeline details !!!')
      return;
    }
    let payload = {
      "aisheCode": this.districtCode,
      "componentId": this.sharedService.genderComponentId,
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
  getPageStatusList() {
    this.api.getPageStatus(this.sharedService.genderComponentId).subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {

          if (res.data[index].moduleName === this.common.genderEquityFinal) {
            if (this.paramId === this.sharedService.revPrposal && (this.selectedIndex === 0 || this.selectedIndex === 1 || this.selectedIndex === 2 || this.selectedIndex === 3 || this.selectedIndex === 4 || this.selectedIndex === 6 || this.selectedIndex === 8)) {
              this.disabledPage = false;
              this.hideButton = true;
            }
           else {
            this.disabledPage = true;
            this.hideButton = false;
           }
          }


        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getPhase() {
    this.api.getPhaseCount('', this.sharedService.genderComponentId, this.districtCode).subscribe(res => {
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
  getItemUpdateData(data: any) {
    this.hideItem = false
   
    if (data === 4) {
      // this.getSoftCompoenent();
    }
    if (data === 1) {
      this.getInfraCons();
    }
    if (data === 2) {
      this.getRenovationData();
    }
    if (data === 3) {
      this.getEquipmentData();
    } if (data === 5) {
      this.getWorkshop1();
    } if (data === 6) {
      this.getRemedialData();
    } if (data === 7) {
      this.getStemCourseData();
    } if (data === 8) {
      this.getVocational();
    } 
    if (data === 99) {
      this.getActivitiesData();
    }
  }

  getItemData(data: any) {
    this.hideItem = false;
    this.formDataTimeLine.get('itemId').reset();
    this.formDataFinancialEstimates.get('itemId').reset();
    if (data === 4) {
      // this.getSoftCompoenent();
    }
    if (data === 1) {
      this.getInfraCons();
    }
    if (data === 2) {
      this.getRenovationData();
    }
    if (data === 3) {
      this.getEquipmentData();
    } if (data === 5) {
      this.getWorkshop1();
    } if (data === 6) {
      this.getRemedialData();
    } if (data === 7) {
      this.getStemCourseData();
    } if (data === 8) {
      this.getVocational();
    } 
    if (data === 99) {
      this.getActivitiesData();
    }
  }
  getProposalActivity() {
    this.getService.getProposalActivity().subscribe((res) => {
      res.forEach(e => {
        if (e.isEquityActivity) {
          this.dataListProposalActivity.push(e)
          //   activityName:e.activityName,
          //   id:e.id
          // });
        }
      })


       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  // getSoftCompoenent() {
  //   this.api.getSoftCompoenentListGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(
  //     (res) => {
  //       this.softComponentList = res.data;
  //     },
  //     (err) => { }
  //   );
  // }

  getLevelData() {
    this.api.getLevel().subscribe((res) => {
      this.levelList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getProgramData() {
    this.api.getProgramme(this.formDataStemCourse.value.courseLevelId).subscribe((res) => {
      this.programmeList = res;
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getInstitutionType() {
    this.getService.getEquityInstitution().subscribe((res) => {
      this.institutionTypeData = res
    })
  }
  getComponentList() {
    this.getService.getComponent().subscribe(
      (res) => {
        this.componentList = res;
      },
      (err) => { }
    );
  }
  add() {
    this.addUpdate = true;
    this.hideButton = false;
    this.infraConstruction.get("id").setValue(0);
    this.formActivities.get("id").setValue(0);
    this.formDataStemCourse.get("id").setValue(0);
    this.formDataInfraRenovation.get('id').setValue(0)
    if (this.phaseCount && this.phaseCount !== 0) {
      this.showPage = true
    }
  }
  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }

  async getFileDetails(e: any) {
    this.myFiles = [];
    this.myFilesName = '';
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


  }





  saveTab1() {
    if (this.formDataInfraConstruction.invalid) {
      this.notification.showWarning();
      return;
    }
    const formdata: FormData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      formdata.append("file", this.myFiles[i]);
    }
    let temp = [];
    if (this.paramId === this.sharedService.revPrposal) {

  const form = this.formDataInfraConstruction;

  form.get('pabStatus')?.setValue(1);

  form.get('recordStatusId')?.setValue(
    form.controls["id"].value == 0 ? 1 : form.controls["recordStatusId"].value
  );

  form.get('rsV3')?.setValue(form.controls["rsV3"].value || null);

  form.get('oldId')?.setValue(form.controls["oldId"].value || '');
  form.get('oldIdV3')?.setValue(form.controls["oldIdV3"].value || null);

  form.get('v1')?.setValue(form.controls["v1"].value);

  form.get('v2')?.setValue(
    form.controls["id"].value == 0 ? true : form.controls["v2"].value
  );

  form.get('v3')?.setValue(form.controls["v3"].value);

  this.post.saveInfraConstructionGenderRevision(
    form.value,
    this.sharedService.genderComponentId,
    this.stateCode,
    this.districtCode,
    this.common.genderEquityInfroConstruction,
    formdata
  ).subscribe(
    // if (this.paramId === this.sharedService.revPrposal) {
    //   this.formDataInfraConstruction.get('pabStatus').setValue(1)
    //   this.formDataInfraConstruction.get('recordStatusId').setValue(this.formDataInfraConstruction.controls["id"].value == 0 ? 1 : this.formDataInfraConstruction.controls["recordStatusId"].value)
    //   this.formDataInfraConstruction.get('rsV3').setValue(this.formDataInfraConstruction.controls["rsV3"].value ? this.formDataInfraConstruction.controls["rsV3"].value : null)
    //   this.formDataInfraConstruction.get('oldId').setValue(this.formDataInfraConstruction.controls["oldId"].value ? this.formDataInfraConstruction.controls["oldId"].value : '')
    //   this.formDataInfraConstruction.get('oldIdV3').setValue(this.formDataInfraConstruction.controls["oldIdV3"].value ? this.formDataInfraConstruction.controls["oldIdV3"].value : null)
    //   this.formDataInfraConstruction.get('v1').setValue(this.formDataInfraConstruction.controls["v1"].value)
    //   this.formDataInfraConstruction.get('v2').setValue(this.formDataInfraConstruction.controls["id"].value == 0 ? true : this.formDataInfraConstruction.controls["v2"].value)
    //   this.formDataInfraConstruction.get('v3').setValue(this.formDataInfraConstruction.controls["v3"].value)
    //   // recordStatusId
    //   this.post
    //   .saveInfraConstructionGenderRevision(this.formDataInfraConstruction.value, this.sharedService.genderComponentId, this.stateCode, this.districtCode, this.common.genderEquityInfroConstruction, formdata)
    //   .subscribe(
        (res) => {
          if (res.status === 200) {
            this.saveBooleanValue(this.booleanEntity.isInfraConstruction, this.common.genderEquityInfroConstruction, this.sharedService.isInfraConstruction)
            this.notification.showSuccess();
            this.formDataInfraConstruction.reset();
            this.formDataInfraConstruction.get('id').setValue(0)
            this.getInfraCons();
          }
        },
        (err) => { }
      );
      // this.formDataInfraConstruction.get('recordStatus').setValue(this.formDataInfraConstruction.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.formDataInfraConstruction.controls["recordStatus"].value)
      // this.formDataInfraConstruction.get('activeStatus').setValue(this.formDataInfraConstruction.controls["activeStatus"].value ? this.formDataInfraConstruction.controls["activeStatus"].value : true)
      // this.formDataInfraConstruction.get('oldId').setValue(this.formDataInfraConstruction.controls["oldId"].value ? this.formDataInfraConstruction.controls["oldId"].value : null)
    }
    else {
      this.post
      .saveInfraConstructionGender(this.formDataInfraConstruction.value, this.sharedService.genderComponentId, this.stateCode, this.districtCode, this.common.genderEquityInfroConstruction, formdata)
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.saveBooleanValue(this.booleanEntity.isInfraConstruction, this.common.genderEquityInfroConstruction, this.sharedService.isInfraConstruction)
            this.notification.showSuccess();
            this.formDataInfraConstruction.reset();
            this.formDataInfraConstruction.get('id').setValue(0)
            this.getInfraCons();
          }
        },
        (err) => { }
      );
    }

   
  }
  getInfraCons() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getInfraConstructionGenderRevision(this.districtCode, this.sharedService.genderComponentId, "1").subscribe(
        (res) => {
          this.processInfraResponse(res)
          this.saveLockStatus()
        },
        (err) => { }
      );
    }
    else {
      this.api.getInfraConstructionGender(this.districtCode, this.sharedService.genderComponentId).subscribe(
        (res) => {
          this.processInfraResponse(res)
        },
        (err) => { }
      );
    }
    // this.api.getInfraConstructionGender(this.districtCode, this.sharedService.genderComponentId).subscribe(
    //     (res) => {
    //       this.infraConstructionList = []
    //       this.infraConstructionList = res.data;
    //       this.itemList = []
    //       res.data.forEach(e => {
    //         this.itemList.push({
    //           id: e.id,
    //           name: e.description
    //         })
    //       })

    //       this.proposedArea = this.infraConstructionList.reduce(
    //         (sum, item) => sum + Number(item.proposedArea),
    //         0
    //       );
    //       this.perUnitCost = this.infraConstructionList.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //       );
    //       this.totalCost = this.infraConstructionList.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //       );
    //     },
    //     (err) => { }
    //   );
  }

  processInfraResponse(res) {
    this.infraConstructionList = [];
    this.newArray = []
    if (this.paramId === this.sharedService.revPrposal) {
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
  saveInfraRenovation() {
    if (this.formDataInfraRenovation.invalid) {
      this.notification.showWarning();
      return;
    }
    //let characters = this.aisheCode?.split(/[\W\d]+/).join("");
    let temp = [];
    if (this.paramId === this.sharedService.revPrposal) {
      temp.push({
        //aisheCode: this.aisheCode,
        componentId: this.sharedService.genderComponentId,
        description: this.formDataInfraRenovation.controls["description"].value,
        districtCode: this.districtCode,
        id:
          this.formDataInfraRenovation.controls["id"].value === null
            ? 0
            : this.formDataInfraRenovation.controls["id"].value,
        // instituteCategory: characters,
        detail: this.formDataInfraRenovation.controls["detail"].value,
        justification: this.formDataInfraRenovation.controls["justification"].value,
        perUnitCost: this.formDataInfraRenovation.controls["perUnitCost"].value,
        proposedArea: this.formDataInfraRenovation.controls["proposedArea"].value,
        stateCode: this.stateCode,
        totalCost: this.formDataInfraRenovation.controls["totalCost"].value,
        pabStatus: this.sharedService.revAddId,
        recordStatus: this.formDataInfraRenovation.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.formDataInfraRenovation.controls["recordStatus"].value,
        rsV3: this.formDataInfraRenovation.controls["rsV3"].value ? this.formDataInfraRenovation.controls["rsV3"].value : null,
        activeStatus: this.formDataInfraRenovation.controls["activeStatus"].value ? this.formDataInfraRenovation.controls["activeStatus"].value : true,
        oldId:this.formDataInfraRenovation.controls["oldId"].value ? this.formDataInfraRenovation.controls["oldId"].value : null,
        oldIdV3:this.formDataInfraRenovation.controls["oldIdV3"].value ? this.formDataInfraRenovation.controls["oldIdV3"].value : null,
        v1:this.formDataInfraRenovation.controls["v1"].value,
        v2:this.formDataInfraRenovation.controls["id"].value == 0 ? true : this.formDataInfraRenovation.controls["v2"].value,
        v3:this.formDataInfraRenovation.controls["v3"].value,
      });
    }
    else {
      temp.push({
            //aisheCode: this.aisheCode,
            componentId: this.sharedService.genderComponentId,
            description: this.formDataInfraRenovation.controls["description"].value,
            districtCode: this.districtCode,
            id:
              this.formDataInfraRenovation.controls["id"].value === null
                ? 0
                : this.formDataInfraRenovation.controls["id"].value,
            // instituteCategory: characters,
            detail: this.formDataInfraRenovation.controls["detail"].value,
            justification: this.formDataInfraRenovation.controls["justification"].value,
            perUnitCost: this.formDataInfraRenovation.controls["perUnitCost"].value,
            proposedArea: this.formDataInfraRenovation.controls["proposedArea"].value,
            stateCode: this.stateCode,
            totalCost: this.formDataInfraRenovation.controls["totalCost"].value,
          });
    }
   
    this.api
      .postInfrastructureRenovation(
        temp,
        this.common.genderEquityInfroRenovation
      )
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.saveBooleanValue(this.booleanEntity.isInfraRenovation, this.common.genderEquityInfroRenovation, this.sharedService.isInfraRenovation)
            this.notification.showSuccess();
            this.getRenovationData();
            this.reset();
          }
        },
        (error) => { }
      );
  }
  getRenovationData() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getinfrastructureRenovationGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processRenovResponse(res.data)
          this.saveLockStatus()
        },
        (err) => { }
      );
    }
    else {
      this.api.getinfrastructureRenovationGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(
        (res) => {
          this.processRenovResponse(res.data)
        },
        (err) => { }
      );
    }
  }

  processRenovResponse(res) {
    this.infraRenovationList = [];
    this.newArray = []
    if (this.paramId === this.sharedService.revPrposal) {
      
    this.deleteFilterArr = res.filter(item => item.recordStatus?.id === 2)
    this.updateIdArrFilter = res.filter(item => item.activeStatus == true && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
    this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
    this.existingRecordFilter = res.filter(item => item.activeStatus == true && item.recordStatus == null && (item.v3 === null || item.v3 === false))
    this.newFilterArr = res.filter(item => item.v3 !== true && item.activeStatus == true && item.recordStatus?.id === 1 && (item.v3 === null || item.v3 === false))
    this.oldIdArrFilter = res.filter(item => item.activeStatus == false && item.recordStatus?.id === 3 && (item.v3 === null || item.v3 === false))
    this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldId === item2.id) {
                this.newArray.push(item2, item1);
              }
            });
          });
    this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
    this.infraRenovationList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.infraRenovationList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
  }
    
    else{
      this.infraRenovationList = res
      this.totalArr = this.infraRenovationList
      
    }
    this.itemList = [];
    res.forEach(ele => {
      this.itemList.push({
        id: ele.id,
        name: ele.description
      });
    });
    this.proposedAreaR = this.totalArr.reduce(
      (sum, item) => sum + Number(item.proposedArea),
      0
    );
    this.perUnitCostR = this.totalArr.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.totalCostR = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }

  saveEquipmentProcured() {
    if (this.formDataEquipmentProcured.invalid) {
      this.notification.showWarning();
      return;
    }
    let temp = [];
      if (this.paramId === this.sharedService.revPrposal) {
        temp.push({
          // aisheCode: this.aisheCode,
          componentId: this.sharedService.genderComponentId,
          districtCode: this.districtCode,
          id:
            this.formDataEquipmentProcured.controls["id"].value === null
              ? 0
              : this.formDataEquipmentProcured.controls["id"].value,
          // instituteCategory: this.category,
          justification: this.formDataEquipmentProcured.controls["justification"].value,
          name: this.formDataEquipmentProcured.controls["name"].value,
          perUnitCost: this.formDataEquipmentProcured.controls["perUnitCost"].value,
          quantity: this.formDataEquipmentProcured.controls["quantity"].value,
          stateCode: this.stateCode,
          totalCost: this.formDataEquipmentProcured.controls["totalCost"].value,
          pabStatus: this.sharedService.revAddId,
          recordStatus: this.formDataEquipmentProcured.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.formDataEquipmentProcured.controls["recordStatus"].value,
          rsV3: this.formDataEquipmentProcured.controls["rsV3"].value ? this.formDataEquipmentProcured.controls["rsV3"].value : null,
          activeStatus: this.formDataEquipmentProcured.controls["activeStatus"].value ? this.formDataEquipmentProcured.controls["activeStatus"].value : true,
          oldId:this.formDataEquipmentProcured.controls["oldId"].value ? this.formDataEquipmentProcured.controls["oldId"].value : null,
          oldIdV3:this.formDataEquipmentProcured.controls["oldIdV3"].value ? this.formDataEquipmentProcured.controls["oldIdV3"].value : null,
          v1:this.formDataEquipmentProcured.controls["v1"].value,
          v2:this.formDataEquipmentProcured.controls["id"].value == 0 ? true : this.formDataEquipmentProcured.controls["v2"].value,
          v3:this.formDataEquipmentProcured.controls["v3"].value,
        });
      }
      else {
        temp.push({
          // aisheCode: this.aisheCode,
          componentId: this.sharedService.genderComponentId,
          districtCode: this.districtCode,
          id:
            this.formDataEquipmentProcured.controls["id"].value === null
              ? 0
              : this.formDataEquipmentProcured.controls["id"].value,
          // instituteCategory: this.category,
          justification: this.formDataEquipmentProcured.controls["justification"].value,
          name: this.formDataEquipmentProcured.controls["name"].value,
          perUnitCost: this.formDataEquipmentProcured.controls["perUnitCost"].value,
          quantity: this.formDataEquipmentProcured.controls["quantity"].value,
          stateCode: this.stateCode,
          totalCost: this.formDataEquipmentProcured.controls["totalCost"].value,
        });
      }

    this.api
      .postEquipmentData(temp, this.common.genderEquityEquipmint)
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.saveBooleanValue(this.booleanEntity.isEquipment, this.common.genderEquityEquipmint, this.sharedService.isEquipment)
            this.notification.showSuccess();
            this.getEquipmentData();
            this.reset();
            this.formDataEquipmentProcured.get('id').setValue(0);
          }
        },
        (err) => { }
      );
  }
  getEquipmentData() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getEquipmentGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processEquoResponse(res)
        },
        (err) => { }
      );
    }
    else {
      this.api.getEquipmentGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(
        (res) => {
          this.processEquoResponse(res)
          this.saveLockStatus()
        },
        (err) => { }
      );
    }
  }

  processEquoResponse(res) {
    this.equipmqntList = [];
    this.newArray = []
    if (this.paramId === this.sharedService.revPrposal) 
    {
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
    this.equipmqntList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
    this.totalArr = this.equipmqntList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
  
    }
    else{
      this.equipmqntList = res.data
      this.totalArr = this.equipmqntList
    }
    this.itemList = [];
    res.data.forEach(ele => {
      this.itemList.push({
        id: ele.id,
        name: ele.name
      });
    });
    this.proposedAreaEQ = this.totalArr.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );

    this.perUnitCostEQ = this.totalArr.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.totalCostEQ = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }

  saveTave4() {
    if (this.formDataWorkshop.invalid) {
      this.notification.showWarning();
      return;
    }
    let temp = [];
      if (this.paramId === this.sharedService.revPrposal) {
        temp.push({
          // aisheCode: this.aisheCode,
          componentId: this.sharedService.genderComponentId,
          costPerWorkshop: this.formDataWorkshop.controls["costPerWorkshop"].value,
          districtCode: this.districtCode,
          expectedOutcome: this.formDataWorkshop.controls["expectedOutcome"].value,
          id:
            this.formDataWorkshop.controls["id"].value === null
              ? 0
              : this.formDataWorkshop.controls["id"].value,
          // instituteCategory: this.category,
          noWorkshop: this.formDataWorkshop.controls["noWorkshop"].value,
          stateCode: this.stateCode,
          targetNoParticipant:
            this.formDataWorkshop.controls["targetNoParticipant"].value,
          theme: this.formDataWorkshop.controls["theme"].value,
          totalCost: this.formDataWorkshop.controls["totalCost"].value,
          pabStatus: this.sharedService.revAddId,
          recordStatus: this.formDataWorkshop.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.formDataWorkshop.controls["recordStatus"].value,
          activeStatus: this.formDataWorkshop.controls["activeStatus"].value ? this.formDataWorkshop.controls["activeStatus"].value : true,
          oldId:this.formDataWorkshop.controls["oldId"].value ? this.formDataWorkshop.controls["oldId"].value : null
        });
      }
      else {
        temp.push({
          // aisheCode: this.aisheCode,
          componentId: this.sharedService.genderComponentId,
          costPerWorkshop: this.formDataWorkshop.controls["costPerWorkshop"].value,
          districtCode: this.districtCode,
          expectedOutcome: this.formDataWorkshop.controls["expectedOutcome"].value,
          id:
            this.formDataWorkshop.controls["id"].value === null
              ? 0
              : this.formDataWorkshop.controls["id"].value,
          // instituteCategory: this.category,
          noWorkshop: this.formDataWorkshop.controls["noWorkshop"].value,
          stateCode: this.stateCode,
          targetNoParticipant:
            this.formDataWorkshop.controls["targetNoParticipant"].value,
          theme: this.formDataWorkshop.controls["theme"].value,
          totalCost: this.formDataWorkshop.controls["totalCost"].value,
        });        
      }

    this.api.postWorkshopData(temp, this.common.genderEquityWorkshops).subscribe(
      (res) => {
        if (res.status === 200) {
          this.saveBooleanValue(this.booleanEntity.isWorkshop, this.common.genderEquityWorkshops, this.sharedService.isWorkshop)
          this.notification.showSuccess();
          this.reset();
          this.getWorkshop1();

        }
      },
      (err) => { }
    );
  }

  getWorkshop1() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getWorkshopGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processWorkshopResponse(res)
          this.saveLockStatus()
        },
        (err) => { }
      );
    }
    else {
      this.api.getWorkshopGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(
        (res) => {
          this.processWorkshopResponse(res)
        },
        (err) => { }
      );
    }
  }

  processWorkshopResponse(res) {
    this.workshopDataList = [];
    this.newArray = []
    if (this.paramId === this.sharedService.revPrposal) {
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
      this.workshopDataList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.workshopDataList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
  
    }
    else{
      this.workshopDataList = res.data
      this.totalArr = this.workshopDataList
    }
    this.itemList = []
    res.data.forEach(e => {
      this.itemList.push({
        id: e.id,
        name: e.theme

      })
    })

    this.proposedAreaW = this.totalArr.reduce(
      (sum, item) => sum + Number(item.noWorkshop),
      0
    );
    this.perUnitCostW = this.totalArr.reduce(
      (sum, item) => sum + Number(item.costPerWorkshop),
      0
    );
    this.totalCostW = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    this.expectedOutcome = this.totalArr.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.targetNoParticipant1 = this.totalArr.reduce(
      (sum, item) => sum + Number(item.targetNoParticipant),
      0
    );
  }

  saveTav5() {
    if (this.formDataRemedial.invalid) {
      this.notification.showWarning();
      return;
    }

    let temp = [];
    if (this.paramId === this.sharedService.revPrposal) {
      temp.push({
        // aisheCode: this.aisheCode,
        componentId: this.sharedService.genderComponentId,
        costPerClass: this.formDataRemedial.controls["costPerClass"].value,
        detail: this.formDataRemedial.controls["detail"].value,
        districtCode: this.districtCode,
        expectedOutcome: this.formDataRemedial.controls["expectedOutcome"].value,
        id: this.formDataRemedial.controls["id"].value === null
          ? 0
          : this.formDataRemedial.controls["id"].value,
        // instituteCategory:  this.category,
        nameOfClass: this.formDataRemedial.controls["nameOfClass"].value,
        noOfClasses: this.formDataRemedial.controls["noOfClasses"].value,
        stateCode: this.stateCode,
        targetNoParticipant: this.formDataRemedial.controls["targetNoParticipant"].value,
        totalCost: this.formDataRemedial.controls["totalCost"].value,
        willAnyCertificationProvided: this.formDataRemedial.controls["willAnyCertificationProvided"].value,
        pabStatus: this.sharedService.revAddId,
        recordStatus: this.formDataRemedial.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.formDataRemedial.controls["recordStatus"].value,
        activeStatus: this.formDataRemedial.controls["activeStatus"].value ? this.formDataRemedial.controls["activeStatus"].value : true,
        oldId:this.formDataRemedial.controls["oldId"].value ? this.formDataRemedial.controls["oldId"].value : null
      })
    }
    else {
      temp.push({
        // aisheCode: this.aisheCode,
        componentId: this.sharedService.genderComponentId,
        costPerClass: this.formDataRemedial.controls["costPerClass"].value,
        detail: this.formDataRemedial.controls["detail"].value,
        districtCode: this.districtCode,
        expectedOutcome: this.formDataRemedial.controls["expectedOutcome"].value,
        id: this.formDataRemedial.controls["id"].value === null
          ? 0
          : this.formDataRemedial.controls["id"].value,
        // instituteCategory:  this.category,
        nameOfClass: this.formDataRemedial.controls["nameOfClass"].value,
        noOfClasses: this.formDataRemedial.controls["noOfClasses"].value,
        stateCode: this.stateCode,
        targetNoParticipant: this.formDataRemedial.controls["targetNoParticipant"].value,
        totalCost: this.formDataRemedial.controls["totalCost"].value,
        willAnyCertificationProvided: this.formDataRemedial.controls["willAnyCertificationProvided"].value
      })
    }

    this.api.postRemedial(temp, this.common.genderEquityRemedial).subscribe((res) => {
      if (res.status === 200) {
        this.saveBooleanValue(this.booleanEntity.isRemedialClass, this.common.genderEquityRemedial, this.sharedService.isRemedialClass)
        this.reset();
        this.notification.showSuccess()
        this.getRemedialData()

      }
    }, (err) => {

    })
  }

  getRemedialData() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getRemedialClasssGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processremedialResponse(res)
          this.saveLockStatus()
        },
        (err) => { }
      );
    }
    else {
      this.api.getRemedialClasssGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(
        (res) => {
          this.processremedialResponse(res)
        },
        (err) => { }
      );
    }
  }


  processremedialResponse(res) {
    this.remedialClassesList = [];
    this.newArray = []
   if (this.paramId === this.sharedService.revPrposal) {
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
      this.remedialClassesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.remedialClassesList.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
  
    }
    else{
      this.remedialClassesList = res.data
      this.totalArr = this.remedialClassesList
    }
    this.itemList = [];
    res.data.forEach(e => {
      this.itemList.push({
        id: e.id,
        name: e.detail
      })
    })

    this.proposedAreaR = this.totalArr.reduce(
      (sum, item) => sum + Number(item.noWorkshop),
      0
    );
    this.numberofClass = this.totalArr.reduce(
      (sum, item) => sum + Number(item.noOfClasses),
      0
    );
    this.costPerClassReme = this.totalArr.reduce(
      (sum, item) => sum + Number(item.costPerClass),
      0
    );
    this.expectedOutcomeReme = this.totalArr.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.targetNumberofParticipantsReme = this.totalArr.reduce(
      (sum, item) => sum + Number(item.targetNoParticipant),
      0
    );
    this.totalCostReme = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0) 
  }



  saveSTEMCourses() {
    if (this.formDataStemCourse.invalid) {
      this.notification.showWarning();
      return;
    }

    let temp = [];
    temp.push({
      // aisheCode: this.aisheCode,
      componentId: this.sharedService.genderComponentId,
      courseLevelId: this.formDataStemCourse.controls["courseLevelId"].value,
      districtCode: this.districtCode,
      durationMonth: this.formDataStemCourse.controls["durationMonth"].value,
      durationYear: this.formDataStemCourse.controls["durationYear"].value,
      enrollmentTargetFifthYear: this.formDataStemCourse.controls["enrollmentTargetFifthYear"].value,
      enrollmentTargetFirstYear: this.formDataStemCourse.controls["enrollmentTargetFirstYear"].value,
      equityInstitutionTypeId: this.formDataStemCourse.controls["equityInstitutionTypeId"].value,
      enrollmentTargetFourthYear: this.formDataStemCourse.controls["enrollmentTargetFourthYear"].value,
      enrollmentTargetSecondYear: this.formDataStemCourse.controls["enrollmentTargetSecondYear"].value,
      enrollmentTargetThirdYear: this.formDataStemCourse.controls["enrollmentTargetThirdYear"].value,
      id: this.formDataStemCourse.controls["id"].value,
      // instituteCategory: this.category,
      institutionName: this.formDataStemCourse.value.institutionName,
      isApprovedByUgc: this.formDataStemCourse.controls["isApprovedByUgc"].value,
      isSufficientFacultySanctioned: this.formDataStemCourse.controls["isSufficientFacultySanctioned"].value,
      name: this.formDataStemCourse.controls["name"].value,
      programmeId: this.formDataStemCourse.controls["programmeId"].value,
      stateCode: this.stateCode
    })
    this.api.postStemCourse(temp, this.common.genderEquityStremCourse).subscribe((res) => {
      if (res.status == "200") {
        this.saveBooleanValue(this.booleanEntity.isStemCourse, this.common.genderEquityStremCourse, this.sharedService.isStemCourse)
        this.reset();
        this.notification.showSuccess();
        this.getStemCourseData()
      }
    }, error => {

    })

  }
  getStemCourseData() {
    this.api.getStemCourseDataGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe((res) => {
      this.dataStemCourseList = []
      this.dataStemCourseList = res.data
      this.itemList = []
      res.data.forEach(e => {
        this.itemList.push({
          id: e.id,
          name: e.name
        })
      })
    }, error => { });
  }

  saveVocational() {
    if (this.formVocational.invalid) {
      this.notification.showWarning();
      return;
    }
    let temp = [];
    if (this.paramId === this.sharedService.revPrposal) {
      temp.push({
        activity: this.formVocational.value.activity,
        // aisheCode: this.aisheCode,
        componentId: this.sharedService.genderComponentId,
        costPerUnit: this.formVocational.value.costPerUnit,
        detail: this.formVocational.value.detail,
        districtCode: this.districtCode,
        expectedOutcome: this.formVocational.value.expectedOutcome,
        id: this.formVocational.controls["id"].value === null
          ? 0
          : this.formVocational.controls["id"].value,
        //instituteCategory: this.category,
        stateCode: this.stateCode,
        targetNoParticipant: this.formVocational.value.targetNoParticipant,
        totalCost: this.formVocational.value.totalCost,
        unit: this.formVocational.value.unit,
        willAnyCertificationProvided: this.formVocational.value.willAnyCertificationProvided,
        pabStatus: this.sharedService.revAddId,
        recordStatus: this.formVocational.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.formVocational.controls["recordStatus"].value,
        activeStatus: this.formVocational.controls["activeStatus"].value ? this.formVocational.controls["activeStatus"].value : true,
        oldId:this.formVocational.controls["oldId"].value ? this.formVocational.controls["oldId"].value : null
      })
     }
    else {
      temp.push({
        activity: this.formVocational.value.activity,
        // aisheCode: this.aisheCode,
        componentId: this.sharedService.genderComponentId,
        costPerUnit: this.formVocational.value.costPerUnit,
        detail: this.formVocational.value.detail,
        districtCode: this.districtCode,
        expectedOutcome: this.formVocational.value.expectedOutcome,
        id: this.formVocational.controls["id"].value === null
          ? 0
          : this.formVocational.controls["id"].value,
        //instituteCategory: this.category,
        stateCode: this.stateCode,
        targetNoParticipant: this.formVocational.value.targetNoParticipant,
        totalCost: this.formVocational.value.totalCost,
        unit: this.formVocational.value.unit,
        willAnyCertificationProvided: this.formVocational.value.willAnyCertificationProvided
      })
    }

    this.api.postVocational(temp, this.common.genderEquityImprovingVocationalSkilling).subscribe(res => {
      if (res.status === 200) {
        this.saveBooleanValue(this.booleanEntity.isVocationalisation, this.common.genderEquityImprovingVocationalSkilling, this.sharedService.isVocationalisation)
        this.notification.showSuccess();
        this.reset();
        this.getVocational()
      }
    }, (err) => { })
  }

  getVocational() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getVocationalDataGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processVocationalResponse(res)
          this.saveLockStatus()
        },
        (err) => { }
      );
    }
    else {
      this.api.getVocationalDataGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(
        (res) => {
          this.processVocationalResponse(res)
        },
        (err) => { }
      );
    }
  }

  processVocationalResponse(res) {
    this.dataListVocational = [];
    this.newArray = []
     if (this.paramId === this.sharedService.revPrposal) {
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
      this.dataListVocational = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.dataListVocational.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
  
    }
    else{
      this.dataListVocational = res.data
      this.totalArr = this.dataListVocational
    }
    this.itemList = [];
    res.data.forEach(e => {
      this.itemList.push({
        id: e.id,
        name: e.detail
      })
    })

    this.unitVocational = this.totalArr.reduce(
      (sum, item) => sum + Number(item.unit),
      0
    );
    this.costPerUnitV = this.totalArr.reduce(
      (sum, item) => sum + Number(item.costPerUnit),
      0
    );
    this.totalCostV = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    this.expectedOutcomeV = this.totalArr.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.targetNoParticipantV = this.totalArr.reduce(
      (sum, item) => sum + Number(item.targetNoParticipant),
      0
    )
  }

  saveActivities() {
    if (this.formActivities.invalid) {
      this.notification.showWarning();
      return;
    }
    let temp = [];
      if (this.paramId === this.sharedService.revPrposal) {
        temp = [
          {
            activity: this.formActivities.value.activity,
            // aisheCode: this.aisheCode,
            componentId: this.sharedService.genderComponentId,
            costPerUnit: this.formActivities.value.costPerUnit,
            detail: this.formActivities.value.detail,
            districtCode: this.districtCode,
            expectedOutcome: this.formActivities.value.expectedOutcome,
            id: this.formActivities.value.id,
            // instituteCategory: this.category,
            purpose: this.formActivities.value.purpose,
            stateCode: this.stateCode,
            targetNoBeneficiary: this.formActivities.value.targetNoBeneficiary,
            totalCost: this.formActivities.value.totalCost,
            unit: this.formActivities.value.unit,
            pabStatus: this.sharedService.revAddId,
            recordStatus: this.formActivities.controls["id"].value == 0 ? { id: 1, name: "Addition" } : this.formActivities.controls["recordStatus"].value,
            activeStatus: this.formActivities.controls["activeStatus"].value ? this.formActivities.controls["activeStatus"].value : true,
            oldId:this.formActivities.controls["oldId"].value ? this.formActivities.controls["oldId"].value : null
          }
        ]
      }
      else {
        temp = [
          {
            activity: this.formActivities.value.activity,
            // aisheCode: this.aisheCode,
            componentId: this.sharedService.genderComponentId,
            costPerUnit: this.formActivities.value.costPerUnit,
            detail: this.formActivities.value.detail,
            districtCode: this.districtCode,
            expectedOutcome: this.formActivities.value.expectedOutcome,
            id: this.formActivities.value.id,
            // instituteCategory: this.category,
            purpose: this.formActivities.value.purpose,
            stateCode: this.stateCode,
            targetNoBeneficiary: this.formActivities.value.targetNoBeneficiary,
            totalCost: this.formActivities.value.totalCost,
            unit: this.formActivities.value.unit
          }
        ]
      }
   
    this.api.postActivities(temp, this.common.genderEquityOtherActivity).subscribe((res) => {

      if (res.status === 200) {

        this.saveBooleanValue(this.booleanEntity.isOtherActivity, this.common.genderEquityOtherActivity, this.sharedService.isOtherActivity)
        this.notification.showSuccess();
        this.reset();
        this.getActivitiesData();
      }
    }, (err) => { });
  }

  getActivitiesData() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.api.getActivitiesGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
        (res) => {
          this.processActivityResponse(res)
          this.saveLockStatus()
        },
        (err) => { }
      );
    }
    else {
      this.api.getActivitiesGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(
        (res) => {
          this.processActivityResponse(res)
        },
        (err) => { }
      );
    }
  }

  processActivityResponse(res) {
    this.dataActivitiesList = [];
    this.newArray = []
    if (this.paramId === this.sharedService.revPrposal) {
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
      this.dataListVocational = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.dataListVocational.filter(item => (item.v2 === true && item.v3 !== true) && item.activeStatus == true)
    }
    else{
      this.dataActivitiesList = res.data
      this.totalArr = this.dataActivitiesList
    }
    this.itemList = []
    res.data.forEach(e => {
      this.itemList.push({
        id: e.id,
        name: e.activity
      })
    })

    this.unitActivity = this.totalArr.reduce(
      (sum, item) => sum + Number(item.unit),
      0
    );
    this.costPerUnitActivity = this.totalArr.reduce(
      (sum, item) => sum + Number(item.costPerUnit),
      0
    );
    this.targetNoBeneficiary = this.totalArr.reduce(
      (sum, item) => sum + Number(item.targetNoBeneficiary),
      0
    );
    this.expectedOutcomeActivity = this.totalArr.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.totalCostActivity = this.totalArr.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
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
    let component = this.componentList.find((ele) => ele.id === 5);
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
        // aisheCode: this.aisheCode,
        componentId: component.id,
        componentName: component.componentName,
        districtCode: this.districtCode,
        financialTargetEndDateString: financialTargetEndDateString,
        financialTargetStartDateString: financialTargetStartDateString,
        id: this.formDataTimeLine.value.id,
        //instituteCategory: this.category,
        itemId: this.formDataTimeLine.value.itemId,
        percentageOfCompletion:
          this.formDataTimeLine.value.percentageOfCompletion,
        phase: this.formDataTimeLine.value.phase,
        physicalTargetEndDateString: physicalTargetEndDateString,
        physicalTargetStartDateString: physicalTargetStartDateString,
        proposalActivityId: this.formDataTimeLine.value.proposalActivityId,
        proposalActivityName: activityName.activityName,
        stateCode: this.stateCode,
        pabStatus: 1,
        recordStatus: this.formDataTimeLine.controls["recordStatus"].value,
        activeStatus: this.formDataTimeLine.controls["activeStatus"].value ? this.formDataTimeLine.controls["activeStatus"].value : true
      });
    }
    }
    else {
      temp.push({
        // aisheCode: this.aisheCode,
        componentId: component.id,
        componentName: component.componentName,
        districtCode: this.districtCode,
        financialTargetEndDateString: financialTargetEndDateString,
        financialTargetStartDateString: financialTargetStartDateString,
        id: this.formDataTimeLine.value.id,
        //instituteCategory: this.category,
        itemId: this.formDataTimeLine.value.itemId,
        percentageOfCompletion:
          this.formDataTimeLine.value.percentageOfCompletion,
        phase: this.formDataTimeLine.value.phase,
        physicalTargetEndDateString: physicalTargetEndDateString,
        physicalTargetStartDateString: physicalTargetStartDateString,
        proposalActivityId: this.formDataTimeLine.value.proposalActivityId,
        proposalActivityName: activityName.activityName,
        stateCode: this.stateCode,
      });
    }

    this.api.saveTimeLineData(temp, this.common.genderEquityTimeLine).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.getDataTimeLine();
        this.reset();
      }
    });
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
    this.api.getDataTimeGenderEquityRevision(this.districtCode, this.sharedService.genderComponentId, this.sharedService.revAddId).subscribe(
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
      this.api.getDataTimeGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe(
        (res) => {
          this.dataTimeLineList = res;
        },
        (error) => { }
      );
    }
  }

  getDataFinancialEstimate() {
    this.api.getFinancialEstimateGenderEquity(this.districtCode, this.sharedService.genderComponentId).subscribe((res) => {
      this.dataFinancialEstimateList = res;
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
    let component = this.componentList.find((ele) => ele.id === this.sharedService.genderComponentId);
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
      //aisheCode: this.aisheCode,
      amount2023: this.formDataFinancialEstimates.value.amount2023,
      amount2024: this.formDataFinancialEstimates.value.amount2024,
      amount2025: this.formDataFinancialEstimates.value.amount2025,
      componentId: component.id,
      componentName: component.componentName,
      districtCode: this.districtCode,
      id: this.formDataFinancialEstimates.value.id,
      // instituteCategory: this.category,
      itemId: this.formDataFinancialEstimates.value.itemId,
      proposalActivityId:
        this.formDataFinancialEstimates.value.proposalActivityId,
      proposalActivityName: activityName.activityName,
      stateCode: this.stateCode,
    };
    this.api.postFinancial(temp, this.common.genderEquityFinancial).subscribe((res) => {
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
    this.addUpdate = true;
    this.addUpdateButton = "Update";
    this.hideButton = false
    this.getDataFinancialEstimate()
    this.getItemUpdateData(data.proposalActivityId);
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
    this.addUpdate = true;
    this.addUpdateButton = "Update";
    this.hideButton = false
    this.getItemUpdateData(data.proposalActivityId);
  }
  private formatDate(date) {
    if (date) {
      let split_dateAsString1 = date.split('/')
      let final_format1 = new Date(`${split_dateAsString1[2]}-${split_dateAsString1[1]}-${split_dateAsString1[0]}`);
      return final_format1;
    }
  }
  resetTotal() {
    this.proposedArea = 0
    this.perUnitCost = 0
    this.totalCost = 0
    this.totalCostW = 0
    this.proposedAreaR = 0
    this.perUnitCostR = 0
    this.totalCostR = 0
    this.proposedAreaEQ = 0
    this.perUnitCostEQ = 0
    this.totalCostEQ = 0
    this.proposedAreaW = 0
    this.perUnitCostW = 0
    this.totalCost = 0
    this.expectedOutcome = 0
    this.targetNoParticipant1 = 0
    this.proposedAreaW = 0
    this.numberofClass = 0
    this.costPerClassReme = 0
    this.expectedOutcomeReme = 0
    this.targetNumberofParticipantsReme = 0
    this.totalCostReme = 0
    this.unitVocational = 0
    this.costPerUnitV = 0
    this.totalCostV = 0
    this.expectedOutcomeV = 0
    this.targetNoParticipantV = 0
    this.unitActivity = 0
    this.costPerUnitActivity = 0
    this.targetNoBeneficiary = 0
    this.expectedOutcomeActivity = 0
    this.totalCostActivity = 0
  }
  reset() {
    this.infraConstruction.reset();
    this.formActivities.reset();
    this.formDataFinancialEstimates.reset();
    this.addUpdateButton = "save";
    this.formDataInfraRenovation.reset();
    this.formDataRemedial.reset()
    this.formVocational.reset();
    this.formDataWorkshop.reset();
    this.formDataStemCourse.reset();
    this.formDataEquipmentProcured.reset();
    this.formDataTimeLine.reset()
    this.formDataTimeLine.get('id').setValue(0);
    this.formDataInfraRenovation.get('id').setValue(0);
    this.infraConstruction.get("id").patchValue(0);
    this.formDataWorkshop.get('id').setValue(0);
    this.formDataRemedial.get('id').setValue(0);
    this.formDataEquipmentProcured.get('id').setValue(0);
    this.formDataStemCourse.get('id').setValue(0);
    this.formVocational.get('id').setValue(0);
    this.formDataFinancialEstimates.get('id').setValue(0);
    this.formActivities.get('id').setValue(0);
    this.myFiles = [];
    this.myFilesName = ''
  }
  close() {

    this.infraConstruction.reset();
    this.addUpdateButton = "save";
    this.addUpdate = false;
    this.hideButton = true;
    this.hideItem = true
    this.showPage = false

    this.reset()
  }
  editRow(data: any, i: any) {
    this.addUpdate = true;
    this.addUpdateButton = "Update";

    if (this.selectedIndex === 0) {
      this.formDataInfraConstruction.patchValue(data);
    }
    if (this.selectedIndex === 1) {
      this.formDataInfraRenovation.patchValue(data);
      // this.formDataInfraRenovation.get("purpose").patchValue(data.detail);
    }
    if (this.selectedIndex === 2) {
      this.formDataEquipmentProcured.patchValue(data);
      // this.infraConstruction.get('purpose').patchValue(data.detail);
    }
    if (this.selectedIndex === 3) {
      this.formDataWorkshop.patchValue(data);
      // this.infraConstruction.get('purpose').patchValue(data.detail);
    }
    if (this.selectedIndex === 4) {
      this.formDataRemedial.patchValue(data);
      // this.infraConstruction.get('purpose').patchValue(data.detail);
    }
    if (this.selectedIndex === 5) {
      this.formDataStemCourse.patchValue(data);
      this.getInstitutionType()
      // this.infraConstruction.get('purpose').patchValue(data.detail);
    }
    if (this.selectedIndex === 6) {
      this.formVocational.patchValue(data);
      this.getInstitutionType()
      // this.infraConstruction.get('purpose').patchValue(data.detail);
    }
    if (this.selectedIndex === 7) {
      this.formActivities.patchValue(data);
    }
  }
  delete(item: any) {
    this.hideButton = true;
    this.common.delete().subscribe(res => {
      if (res) {
        if (this.selectedIndex === 0) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteInfraNMDCGenderRevision(item, this.sharedService.genderComponentId, this.sharedService.revAddId, false).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.resetTotal()
                this.getInfraCons();
                this.getBooleanData()
              }
            }, err => {
  
            })
          }
          else {
            this.deleteService.deleteInfraNMDCGender(item, this.sharedService.genderComponentId).subscribe(res => {
              if (res.status === 200) {
                this.notification.showDelete()
                this.resetTotal()
                this.getInfraCons();
                this.getBooleanData()
              }
            }, err => {
  
            })
          }
          
        } if (this.selectedIndex === 1) {
            if (this.paramId === this.sharedService.revPrposal) {
              this.deleteService.deleteRenovatedNMDCGenderRevision(item, this.sharedService.genderComponentId, this.sharedService.revAddId, false).subscribe(res => {
                if (res.status === 200) {
                  this.getRenovationData();
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
            else {
              this.deleteService.deleteRenovatedNMDCGender(item, this.sharedService.genderComponentId).subscribe(res => {
                if (res.status === 200) {
                  this.getRenovationData();
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
         
        } if (this.selectedIndex === 2) {
            if (this.paramId === this.sharedService.revPrposal) {
              this.deleteService.deleteEquipmentNMDCGenderRevision(item, this.sharedService.genderComponentId, this.sharedService.revAddId, false).subscribe(res => {
                if (res.status === 200) {
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getEquipmentData();
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
            else {
              this.deleteService.deleteEquipmentNMDCGender(item, this.sharedService.genderComponentId).subscribe(res => {
                if (res.status === 200) {
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getEquipmentData();
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
          
        } if (this.selectedIndex === 3) {
            if (this.paramId === this.sharedService.revPrposal) {
              this.deleteService.deleteWorkshopRevision(item, this.sharedService.revAddId, false).subscribe(res => {
                if (res.status === 200) {
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getWorkshop1();
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
            else {
              this.deleteService.deleteWorkshop(item).subscribe(res => {
                if (res.status === 200) {
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getWorkshop1();
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
          
        } if (this.selectedIndex === 4) {
            if (this.paramId === this.sharedService.revPrposal) {
              this.deleteService.deleteRemedialRevision(item, this.sharedService.revAddId, false).subscribe(res => {
                if (res.status === 200) {
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getRemedialData();
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
            else {
              this.deleteService.deleteRemedial(item).subscribe(res => {
                if (res.status === 200) {
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getRemedialData();
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
         
        }
        if (this.selectedIndex === 5) {
          this.deleteService.deleteSTEMCourse(item).subscribe(res => {
            if (res.status === 200) {
              this.resetTotal()
              this.notification.showDelete()
              this.getStemCourseData();
              this.getBooleanData()
            }
          }, err => {

          })
        } if (this.selectedIndex === 6) {
            if (this.paramId === this.sharedService.revPrposal) {
              this.deleteService.deleteVocationalRevision(item, this.sharedService.revAddId, false).subscribe(res => {
                if (res.status === 200) {
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getVocational();
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
            else {
              this.deleteService.deleteVocational(item).subscribe(res => {
                if (res.status === 200) {
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getVocational();
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
          
        } if (this.selectedIndex === 7) {
            if (this.paramId === this.sharedService.revPrposal) {
              this.deleteService.deleteActivityRevision(item, this.sharedService.revAddId, false).subscribe(res => {
                if (res.status === 200) {
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getActivitiesData();
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
            else {
              this.deleteService.deleteActivity(item).subscribe(res => {
                if (res.status === 200) {
                  this.resetTotal()
                  this.notification.showDelete()
                  this.getActivitiesData();
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
         
        }
        if (this.selectedIndex === 8) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteTimeLineRevision(item, this.sharedService.revAddId, false).subscribe(res => {
              if (res.status === 200) {
                this.resetTotal()
                this.notification.showDelete()
                this.getDataTimeLine();
  
              }
            }, err => {
  
            })
          }
          else {
            this.deleteService.deleteTimeLine(item).subscribe(res => {
              if (res.status === 200) {
                this.resetTotal()
                this.notification.showDelete()
                this.getDataTimeLine();
  
              }
            }, err => {
  
            })
          }
         
        }
        if (this.selectedIndex === 9) {
          if (this.paramId === this.sharedService.revPrposal) {
            this.deleteService.deleteFinancialRevision(item, this.sharedService.revAddId, false).subscribe(res => {
              if (res.status === 200) {
                this.resetTotal()
                this.notification.showDelete()
                this.getDataFinancialEstimate();
  
              }
            }, err => {
  
            })
          }
          else {
            this.deleteService.deleteFinancial(item).subscribe(res => {
              if (res.status === 200) {
                this.resetTotal()
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
    this.common.delete().subscribe(res => {
      if (res) {
        if (this.selectedIndex === 0) {
          this.deleteService.deleteInfraNMDCGenderRevision(item, this.sharedService.genderComponentId, this.sharedService.revAddId, true).subscribe(res => {
            if (res.status === 200) {
              this.notification.showRestore()
              this.resetTotal()
              this.getInfraCons();
              this.getBooleanData()
            }
          }, err => {

          })
        } if (this.selectedIndex === 1) {
              this.deleteService.deleteRenovatedNMDCGenderRevision(item, this.sharedService.genderComponentId, "1", true).subscribe(res => {
                if (res.status === 200) {
                  this.getRenovationData();
                  this.resetTotal()
                  this.notification.showRestore()
                  this.getBooleanData()
                }
              }, err => {
    
              })
            }
          
         if (this.selectedIndex === 2) {
          this.deleteService.deleteEquipmentNMDCGenderRevision(item, this.sharedService.genderComponentId, this.sharedService.revAddId, true).subscribe(res => {
            if (res.status === 200) {
              this.resetTotal()
              this.notification.showRestore()
              this.getEquipmentData();
              this.getBooleanData()
            }
          }, err => {

          })
        } if (this.selectedIndex === 3) {
              this.deleteService.deleteWorkshopRevision(item, this.sharedService.revAddId, true).subscribe(res => {
                if (res.status === 200) {
                  this.resetTotal()
                  this.notification.showRestore()
                  this.getWorkshop1();
                  this.getBooleanData()
                }
              }, err => {
    
              })
            
        } if (this.selectedIndex === 4) {
          this.deleteService.deleteRemedialRevision(item, this.sharedService.revAddId, true).subscribe(res => {
            if (res.status === 200) {
              this.resetTotal()
              this.notification.showRestore()
              this.getRemedialData();
              this.getBooleanData()
            }
          }, err => {

          })
        }
        if (this.selectedIndex === 5) {
          this.deleteService.deleteSTEMCourse(item).subscribe(res => {
            if (res.status === 200) {
              this.resetTotal()
              this.notification.showDelete()
              this.getStemCourseData();
              this.getBooleanData()
            }
          }, err => {

          })
        } if (this.selectedIndex === 6) {
          this.deleteService.deleteVocationalRevision(item, this.sharedService.revAddId, true).subscribe(res => {
            if (res.status === 200) {
              this.resetTotal()
              this.notification.showRestore()
              this.getVocational();
              this.getBooleanData()
            }
          }, err => {

          })
        } if (this.selectedIndex === 7) {
          this.deleteService.deleteActivityRevision(item, this.sharedService.revAddId, true).subscribe(res => {
            if (res.status === 200) {
              this.resetTotal()
              this.notification.showRestore()
              this.getActivitiesData();
              this.getBooleanData()
            }
          }, err => {

          })
        }
        if (this.selectedIndex === 8) {
          this.deleteService.deleteTimeLineRevision(item, this.sharedService.revAddId, true).subscribe(res => {
            if (res.status === 200) {
              this.resetTotal()
              this.notification.showRestore()
              this.getDataTimeLine();

            }
          }, err => {

          })
        }
        if (this.selectedIndex === 9) {
          this.deleteService.deleteFinancialRevision(item, this.sharedService.revAddId, true).subscribe(res => {
            if (res.status === 200) {
              this.resetTotal()
              this.notification.showRestore()
              this.getDataFinancialEstimate();

            }
          }, err => {

          })
        }
      }
    })
  }
  download(doc, name) {
    if (doc) {
      this.common.viewPdf(doc, name)
    }
  }
  dateChangeP(event){
    const m = event.value;
    if (m) {
      this.formDataTimeLine.get('physicalTargetEndDateString').setValue(null)
      this.start = m;
    }
  }
  dateChangeFinance(event){
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

  LockProposal(lockValue) {
    let commonObj = this.common.newObj
    let filterObjt = Object.entries(commonObj).filter(([key]) => key === lockValue)
    let filterObjValue = filterObjt[0][1]
    let characters = this.aisheCode.split(/[\W\d]+/).join("");
    let temp = {
        aisheCode: this.aisheCode,
        componentId: this.sharedService.genderComponentId,
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
        componentId: this.sharedService.genderComponentId,
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

trackById(index: number, item: any) {
  return item.id;
}
}
