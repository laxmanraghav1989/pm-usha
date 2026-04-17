import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
@Injectable()
export class SharedService {
  mandatory: string = "All Fields are Mandatory*";
  infra: string = "Whether Institution proposed Infrastructure Construction:-";
  renovated: string =
    "Whether Institution proposed Infrastructure Renovated/Upgradation:-";
  equipment: string = "Whether Institution have details of Equipments:-";
  softComponent: string =
    "Whether Institution have Soft component activities:-";
  proposedCourse: string =
    "Whether Institution have Course proposed to be added:";
  workshopProgramme: string = "Whether Institution have workshop programme:-";
  remedialClass: string = "Whether Institution have Remedial Class:-";
  stemCourse: string = "Whether Institution have STEM Course:";
  vocational: string =
    "Whether Institution have vocationalisation and skilling:-";
  OtherActivity: string = "Whether Institution have Activity:-";
  global_loader: boolean;
  isEquipment: string = "isEquipment";
  isInfraConstruction: string = "isInfraConstruction";
  isInfraRenovation: string = "isInfraRenovation";
  isOtherActivity: string = "isOtherActivity";
  isOtherSourceOfFund: string = "isOtherSourceOfFund";
  isProposedCourse: string = "isProposedCourse";
  isRemedialClass: string = "isRemedialClass";
  isSoftComponent: string = "isSoftComponent";
  isStemCourse: string = "isStemCourse";
  isVocationalisation: string = "isVocationalisation";
  isWorkshop: string = "isWorkshop";
  locked: string = "Page locked successfully";
  duplicates: string = "Duplicate entries not allowed !!!";
  pageLock: string = "This Page is Locked";
  public pageSizeOptions: number[] = [15, 25, 50];
  StartLimit: number = 0;
  EndLimit: number = 25;
  pageData: number = 0;
  pageSize: number = 25;
  pageSizeCustom: number = 15;
  stateAtGlanceCompId: number = 0;
  stateAtGlanceCompIdB: number = 100;
  meruComponentId: number = 1;
  universityComponentId: number = 2;
  collegeComponentId: number = 3;
  nmdcComponentId: number = 4;
  genderComponentId: number = 5;
  uniqueLockValue: number = 8;
  projectTaggingId: number = 9;
  reportTaggingId: number = 10;
  page: number = 1;
  pdfWarnig: string = "(File should be in pdf format only & less than 25MB.)";
  unlockMsgState: string = "Please click here to unlock the State Profile.";
  unlockMsgScheme: string = "Please click here to unlock the Project Proposal.";
  unlockPartial: string =
    "Please click here to unlock Partial Filled State Profile.";
  unlockingStatusMessageState: string =
    "You have already submitted your request for unlocking State Profile.";
  unlockingStatusMessageIns: string =
    "You have already submitted your request for unlocking Project Proposal.";
  meru: string = "Multi-disciplinary Education and Research University (MERU)";
  college: string = "Grants to Strengthen Colleges";
  university: string = "Grants to Strengthen Universities";
  nmdc: string = "New Model Degree Colleges";
  gender: string = "Gender Inclusion and Equity Initiatives";
  mmer: string = "MMER Grants";
  revPrposal: number = 21;
  revPrposalV3: number = 22;
  finApproveLIst: number = 23;
  pabStatus: number = 1;
  pabStatusV3: number = 3;
  revAdd: string = "Addition";
  revAddId: number = 1;
  rusaKey: string = "R";
  PmUshaKey: string = "P";
  //   var now = new Date();

  // var timestamp = now.getFullYear().toString(); // 2011
  // timestamp += (now.getMonth < 9 ? '0' : '') + (now.getMonth()+1).toString(); // JS months are 0-based, so +1 and pad with 0's
  // timestamp += ((now.getDate < 10) ? '0' : '') + now.getDate().toString(); // pad with a 0
  // var time = (now.getHours()).toString()
  // time += (now.getMinutes()).toString()
  // time += (now.getSeconds()).toString()
  // var ran = Math.floor(100000 + Math.random() * 900000);
  // var uni = '999-USHA'
  public activityMaster = [
    {
      value: "CHANGE_PASSWORD",
      name: "Change Password",
    },
    {
      value: "USER_MASTER_LOG",
      name: "User Master Log",
    },
  ];
  userTypeList = [
    {
      id: "1",
      userType: "Natonal Project Directorate(NPD)",
    },
    {
      id: "2",
      userType: "State Approving Authority(SAA)",
    },
    {
      id: "3",
      userType: "State Nodal Officer(SNO)",
    },
    {
      id: "4",
      userType: "District Nodal Officer(DNO)",
    },
    {
      id: "5",
      userType: "University Nodal Officer(UNO)",
    },
    {
      id: "6",
      userType: "College Nodal Officer(CNO)",
    },
    {
      id: "7",
      userType: "Technical Support Group (TSG)-Chief Consultant",
    },
    {
      id: "8",
      userType: "Technical Support Group (TSG)-Consultant",
    },
    {
      id: "9",
      userType: "Ministry Official(NPD)",
    },
    {
      id: "10",
      userType: "PAB Member(NPD)",
    },
    {
      id: "99",
      userType: "System Admin",
    },
    {
      id: "11",
      userType: "State Approving Authority (SAA)(Non-MoU)",
    },
    {
      id: "12",
      userType: "State Project Director (SPD)",
    },
  ];
  public criteriaList = [
    {
      score: 0,
      criteria: `Priority would be given to units in the Focus District`,
      criteriaId: 8,
    },
    {
      score: 0,
      criteria: "Prior support under any Phases of RUSA",
      criteriaId: 9,
    },
    {
      score: 0,
      criteria: "Student Enrolment",
      criteriaId: 3,
    },
    {
      score: 0,
      criteria: "No. of Departments in Institution",
      criteriaId: 4,
    },
    {
      score: 0,
      criteria: "Institution wise Faculty Positions filled in regular mode",
      criteriaId: 5,
    },
    {
      score: 0,
      criteria: "Institution wise Student-Teacher Ration",
      criteriaId: 6,
    },
  ];
  public criteriaListC = [
    {
      score: 0,
      criteria: `Priority would be given to units in the Focus District`,
      criteriaId: 8,
    },
    {
      score: 0,
      criteria: "Prior support under any Phases of RUSA",
      criteriaId: 9,
    },
    {
      score: 0,
      criteria: "Student Enrolment",
      criteriaId: 3,
    },
    {
      score: 0,
      criteria: "No. of Departments in Institution",
      criteriaId: 4,
    },
    {
      score: 0,
      criteria: "Institution wise Faculty Positions filled in regular mode",
      criteriaId: 5,
    },
    {
      score: 0,
      criteria: "Institution wise Student-Teacher Ration",
      criteriaId: 6,
    },
    {
      score: 0,
      criteria:
        "Collaboration with local industries for Research/Internship/Placements/Apprenticeship",
      criteriaId: 13,
    },
  ];
  public criteriaListMeru = [
    {
      score: 0,
      criteria: `Priority would be given to units in the Focus District`,
      criteriaId: 8,
    },
    {
      score: 0,
      criteria: "Prior support under any Phases of RUSA",
      criteriaId: 9,
    },
    {
      score: 0,
      criteria: "Student Enrolment",
      criteriaId: 3,
    },
    {
      score: 0,
      criteria: "No. of Departments in Institution",
      criteriaId: 4,
    },
    {
      score: 0,
      criteria: "Institution wise Faculty Positions filled in regular mode",
      criteriaId: 5,
    },
    {
      score: 0,
      criteria: "Institution wise Student-Teacher Ration",
      criteriaId: 6,
    },
    {
      score: 0,
      criteria:
        "Collaboration with local industries for Research/Internship/Placements/Apprenticeship",
      criteriaId: 13,
    },
  ];
  

  constructor() {
  }

  userId1 = new BehaviorSubject<any>([]);
  getUserDetails = this.userId1.asObservable();
  setUserDetails(data: any) {
    if (data) {
      this.userId1.next(data);
    }
  }

  private userData = new BehaviorSubject<any>(null);
  userData$ = this.userData.asObservable();

  setUserData(data: any) {
  this.userData.next(data);
  sessionStorage.setItem('userData', JSON.stringify(data));
  }

  clearUserData() {
  this.userData.next(null);                // ✅ reset subject
  sessionStorage.removeItem('userData');   // ✅ remove storage
}

  changeSidebar = new BehaviorSubject<any>(0);
  getChangeSidebar = this.changeSidebar.asObservable();

  sidebarToggle = new BehaviorSubject<any>({});
  getSidebarToggle = this.sidebarToggle.asObservable();

  goIns = new BehaviorSubject<any>(0);
  getIns = this.goIns.asObservable();

  goLock = new BehaviorSubject<any>(0);
  getLock = this.goLock.asObservable();

  getY = new BehaviorSubject<any>(0);
  getYears = this.getY.asObservable();

  goStatus = new BehaviorSubject<any>(0);
  getStatus = this.goStatus.asObservable();

  goTag = new BehaviorSubject<any>(0);
  getTag = this.goTag.asObservable();

  goActivity = new BehaviorSubject<any>(0);
  getActivityPage = this.goActivity.asObservable();

  changeMenu = new BehaviorSubject<any>(true);
  getMenu = this.changeMenu.asObservable();


 setTargetAchivementData = new BehaviorSubject<any>(0);
getTargetAchivementData = this.setTargetAchivementData.asObservable();


  fundId1 = new BehaviorSubject<any>(0);
  getFundTabsId = this.fundId1.asObservable();
  setFundId(data: any) {
    this.fundId1.next(data);
  }

  // userTypeVerify = new BehaviorSubject<any>({});
  // getUserType = this.userTypeVerify.asObservable();
  // setUserType(data: any) {
  //   this.userTypeVerify.next(data);
  // }


  verifyStatus = new BehaviorSubject<any>({});
  getcheckAPIResponse = this.verifyStatus.asObservable();
  checkAPIResponse(data: any) {
    this.verifyStatus.next(data);
  }



  fundDemandDetailsData1 = new BehaviorSubject<any>({});
  getfundDemandDetailsData = this.fundDemandDetailsData1.asObservable();
  setfundDemandDetailsData(data: any) {
    this.fundDemandDetailsData1.next(data);
  }

  ucFinancial = new BehaviorSubject<any>({});
  getUcFinancial = this.ucFinancial.asObservable();
  setUcFinancial(data) {
    this.ucFinancial.next(data);
  }

  // finalSubmit = new BehaviorSubject<any>(0);
  // getFinalSubmit = this.finalSubmit.asObservable();

  fundSubmit1 = new BehaviorSubject<any>(0);
  getFundSubmit = this.fundSubmit1.asObservable();
  setFundSubmit(data: any) {
    this.fundSubmit1.next(data);
  }

  fundTabs = new BehaviorSubject<any>(0);
  getfundTabs = this.fundTabs.asObservable();
  setFundtabs(data: any) {
    this.fundTabs.next(data);
  }

  viewReport = new BehaviorSubject<any>(0);
  getViewReportDetails = this.viewReport.asObservable();
  setViewReportDetails(data) {
    this.viewReport.next(data);
  }

  setMenu(data: any) {
    this.changeMenu.next(data);
  }

  setSidebarChanges(data: any) {
    this.changeSidebar.next(data);
  }
  setSidebar(data: any) {
    this.sidebarToggle.next(data);
  }


  goInstitutionPage(data: any) {
    if (data) {
      this.goIns.next(data);
    }
  }

  goLockPage(data: any) {
    if (data) {
      this.goLock.next(data);
    }
  }

  saveYear(data: any) {
    if (data) {
      this.getY.next(data);
    }
  }

  goStatusPage(data: any) {
    if (data) {
      this.goStatus.next(data);
    }
  }
  goActivityPage(data: any) {
    if (data) {
      this.goActivity.next(data);
    }
  }

  goTagData(data: any) {
    if (data) {
      this.goTag.next(data);
    }
  }

postTargetAchievementData(data: any) {
    if (data) {
      this.setTargetAchivementData.next(data);
    }
  }


  
  noteDataSubject:any = new BehaviorSubject<any>(0);
  noteData$ = this.noteDataSubject.asObservable();

  setNoteData(data: string) {
    this.noteDataSubject.next(data);
  }


   convertToInputDate(dateStr: string): string {
    if (!dateStr) return '';

    // If already ISO format
    if (dateStr.includes('-') && dateStr.length >= 10) {
      return dateStr.substring(0, 10);
    }

    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
   }

}
