
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { ExcelService } from 'src/app/service/excel.service';
import { filter } from 'rxjs/operators';
import { CachedDataService } from '../../pages/reports/report-services/cached-data.service';
import { ProgressMaxData } from 'src/app/interfaces/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShareReplayService } from 'src/app/service/share-replay.service';

@Component({
  selector: 'cfs-college-lock-list',
  templateUrl: './college-lock-list.component.html',
  styleUrls: ['./college-lock-list.component.scss']
})
export class CollegeLockListComponent implements OnInit, OnDestroy {
  public routers: typeof routes = routes;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  getLockList: any;
  stateName: any = 'ALL';
  filterArr: any[] = [];
  extraArr: any[] = [];
  extraMasterArr : any = []
  stateRevisionArr:any = []
   stateMasterRevisionArr:any = []
  allRevisionArr :any = []
  allMasterRevisionArr:any =[]
  dataSource = new MatTableDataSource<any>([]);
  collegeListData: any[] = [];
  tempList: any[] = [];
  searchText: any;
  stateCode: string = 'ALL';
  userTypeId: string;
  //componentId: any = 'ALL';
  componentId: any = -1;
  stateList: Array<any> = [];
  variables: Array<any> = [];
  stateFilterArr1: any[];
  stateFilterArr2: any[];
  districtList: Array<any> = [];
  filterDistrictList: Array<any> = [{ distCode: 'null', stateCode: 'null', name: 'ALL', sno: null, lgdDistCode: null }];
  stateId: string = ''
  sortDir = 1;//1= 'ASE' -1= DSC
  districtId: string = '';
  pabActionId: any = 'ALL';
  userList: Array<any> = [];
  status: string = 'ALL'
  userId: string;
  name: string;
  pm: any;
  revision: any;
  componentList: Array<any> = [{id: 1, componentName: 'Multi-Disciplinary Education and Research Universities (MERU)'},
    {id: 2, componentName: 'Grants to Strengthen Universities (Accredited & Unaccredited Universities)'},
    {id: 3, componentName: 'Grants to Strengthen Colleges (Accredited & Unaccredited Colleges)'},
    {id: 4, componentName: 'New Model Degree Colleges'},
    {id: 5, componentName: 'Gender Inclusion and Equity Initiatives'}
  ]
  arrMonths: any = [];
  arrYears: any = [];
  monthList: any[];
  month: string = "";
  modiefiedMonth: any;
  year:any = "";
  userNpdTypeList: boolean;
  userNotNpdList: boolean;
  assignView: boolean;
  filterStateList: Array<any> = [];
  selectedIndex: any = 0;
  isAllSelected:boolean = false;
  componentView:boolean = false;
  tempListStatus:Array<any>= [];
  filterYearMonths: any = [];
  stateFilter: boolean;
  stateFilterArr:any =[]
  stateListData: any[] = [];
  pageSize = 15;
  pageIndex = 0;
  pageSizeWorkSubmit = 15
  pageIndexWorkSubmit = 0

  pageSizeState = 15;
  pageIndexState = 0;
  pageSizeStateData = 15;
  pageIndexStateData = 0;
  pageSizeWork = 15;
  pageIndexWork = 0;
  paginatedDataMeeting: any = [];
  paginatedDataState: any = [];
  paginatedDataStateData: any = [];
  paginatedDataSubmited: any = [];
  showForwardToNpdButton: boolean;
  fullArrMonths: { monthCode: string; name: string; lastDate: string; }[];
  isView: boolean = false;
  isPanelNotSubmitted: boolean;
  isPanelNotForwarded: boolean;
  isPanelNotSubmittedState: boolean;
  ProjSubmittedNotFWD: boolean;
  isForwardedToNpdValue:boolean;
  private destroy$ = new Subject<void>();
  getDateTime: any;
  constructor(public api: ApiService, public common: Common, public notification: NotificationService, public masterService: MasterService,
    public sharedService: SharedService, public router: Router, public getService: GetService, public postService: PostService, public encrypt: EncryptDecrypt, public fb: FormBuilder, private http: HttpClient, private dialog : MatDialog, private excelService: ExcelService, public cachedData: CachedDataService, public shareData: ShareReplayService) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id) {
      this.getUserType()
      this.userId = sessionStorage.getItem('userName')
    }
    if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['3'].id || this.userTypeId === this.sharedService.userTypeList['12'].id) {
      this.stateId = this.stateCode;
      this.getDistrict(this.stateId);
      this.districtId = sessionStorage.getItem('districtCode');
    }

    this.arrMonths = [
      // { monthCode: '1', name: 'January', lastDate: '31' },
      // { monthCode: '2', name: 'February', lastDate: '28' },
      // { monthCode: '3', name: 'March', lastDate: '31' },
      // { monthCode: '4', name: 'April', lastDate: '30' },
      // { monthCode: '5', name: 'May', lastDate: '31' },
      // { monthCode: '6', name: 'June', lastDate: '30' },
      // { monthCode: '7', name: 'July', lastDate: '31' },
      // { monthCode: '8', name: 'August', lastDate: '31' },
      // { monthCode: '9', name: 'September', lastDate: '30' },
      { monthCode: '10', name: 'October', lastDate: '31' },
      { monthCode: '11', name: 'November', lastDate: '30' },
      { monthCode: '12', name: 'December', lastDate: '31' },
    ];
     this.fullArrMonths = [
      { monthCode: '1', name: 'January', lastDate: '31' },
      { monthCode: '2', name: 'February', lastDate: '28' },
      { monthCode: '3', name: 'March', lastDate: '31' },
      { monthCode: '4', name: 'April', lastDate: '30' },
      { monthCode: '5', name: 'May', lastDate: '31' },
      { monthCode: '6', name: 'June', lastDate: '30' },
      { monthCode: '7', name: 'July', lastDate: '31' },
      { monthCode: '8', name: 'August', lastDate: '31' },
      { monthCode: '9', name: 'September', lastDate: '30' },
      { monthCode: '10', name: 'October', lastDate: '31' },
      { monthCode: '11', name: 'November', lastDate: '30' },
      { monthCode: '12', name: 'December', lastDate: '31' },
    ];
    this.arrYears = [
      { year: '2024' },
      { year: '2025' },
      { year: '2026' }
    ]
 
   
  }
  ngOnInit(): void {
    this.getDateData();
    this.getSateData();
    this.userNpdTypeList = this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id || this.userTypeId === this.sharedService.userTypeList['10'].id
    this.userNotNpdList = this.userTypeId !== this.sharedService.userTypeList['0'].id || this.userTypeId !== this.sharedService.userTypeList['6'].id || this.userTypeId !== this.sharedService.userTypeList['7'].id || this.userTypeId !== this.sharedService.userTypeList['8'].id ||
      this.userTypeId !== this.sharedService.userTypeList['9'].id || this.userTypeId !== this.sharedService.userTypeList['10'].id

    if (this.userNpdTypeList) {
      this.assignView = true;
      this.stateCode = 'ALL';
    } else {
      this.assignView = false
    }
  

    if (sessionStorage.getItem('back') === 'true') {
    this.sharedService.getLock.subscribe(res=> {
      this.selectedIndex = res.selectIndex;
      this.year = sessionStorage.getItem('filteredYear');
      this.month = sessionStorage.getItem('filteredMonth');

      // Set month list based on year
      this.monthList = this.year === '2024' ? this.arrMonths : this.fullArrMonths;
      const modMonth = this.monthList.find(m => parseInt(m.monthCode) === parseInt(this.month));
      this.modiefiedMonth = modMonth?.name;

      // --- Load NPD vs Non-NPD data ---
      // if (this.userNpdTypeList) {
      //  this.cachedData.getData("collegeDataLock").subscribe((data) => {
      //       if (data?.length > 0) {
      //         this.componentId = this.userNpdTypeList ? -1 : this.componentId;
      //         this.collegeListData = data.filter(e => e.isForwardedToNpd);
      //         this.extraArr = data.filter(e => !e.isForwardedToNpd);
      //         this.filterArr = [...this.collegeListData];

      //         // this.getFinalProposalStatus('ALL');
      //         this.componentView = true;
      //         this.isAllSelected = false;
      //         this.tempList = [...this.collegeListData];
      //         this.handlePageChange(this.sharedService.page = 1);
      //       }
      //     });
      // } else {
        if (this.month && this.year) {
        this.Find(this.month, this.year);
        }
        else {
          if (this.userNpdTypeList) {
              this.getMaxData();
          }

        }
      // }
    });
} else {
  if (this.month && this.year) {
        this.Find(this.month, this.year);
        }
  else  {
    if (this.userNpdTypeList) {
    this.getMaxData();
  }
}
}
  }

  tabValue(e){

      if (e === 'isPanelNotSubmitted') {
        // this.getFinalProposalStatus('ALL')
      }
      else if (e === 'isPanelNotSubmittedState')  {
      this.getFinalProposalStatus(this.stateId)
      }
      else if (e === 'ProjSubmittedNotFWD'){
        // this.Find(this.month, this.year)
      }
  }



  closeAllPanels() {
    this.isPanelNotSubmitted = false;
    this.isPanelNotForwarded = false;
    this.isPanelNotSubmittedState = false;
    this.ProjSubmittedNotFWD = false;
  }

  trackByCollege(index: number, item: any): any {
  // Prefer a unique identifier from your data, e.g. id, aisheCode, etc.
    return item.pmUshaMonthlyProgressLockstatusId || item.aisheCode || index;
  }

  trackByItems(index: number, item: any): any {
  // Prefer a unique identifier from your data, e.g. id, aisheCode, etc.
    return item.id || item.aisheCode || index;
  }

  tabSelected(value) {
    this.selectedIndex = value.index;
    if (this.selectedIndex === 0) {
      this.reset()
    } 
    else if (this.selectedIndex === 1) {
      if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['12'].id) {
        this.getLockStatus();

      }
      else {
        this.reset()
        this.getLockStatus1()
        
      }
    }
  }


  getSateData() {
    this.shareData.getStateData().subscribe((res) => {
      this.stateList = res;
      this.filterStateList = this.stateList.slice();
    }, () => { })
  }

  ChangesCurrentMonth(changeValue: any) {
    let modyMonth = this.monthList.filter(m => parseInt(m.monthCode) === parseInt(changeValue));
    this.modiefiedMonth = modyMonth[0]?.name
  }

  ChangesYears(data: any) {

    this.monthList = [];
    this.month = '';
    if (data.value === '2024') {
   
      this.monthList = this.arrMonths;
    }
    else if (data.value === '2025') {
      this.monthList = this.fullArrMonths
   }
    else if (data.value === '2026') {
      this.monthList = this.fullArrMonths
   }

  }  

  
  ChangesYears1(data: any) {
    this.monthList = [];
    this.month = '';
    this.year = data.value; // Store selected year
    this.stateName = 'ALL'
    this.findState();
  
    if (this.year) {
      // Ensure months are compared as strings
      let filteredMonths = this.tempListStatus
        .filter(entry => entry.year == this.year && (this.stateName === 'ALL' || entry.stateCode === this.stateName))
        .map(entry => entry.month.toString()) // Convert to string to match `monthCode`
        .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
  
      // Assign month list dynamically based on filtered months
      if (this.year === '2024') {
        this.monthList = this.arrMonths;
      } else if (this.year === '2025') {
        this.monthList = this.fullArrMonths;
      }
       else if (this.year === '2026') {
        this.monthList = this.fullArrMonths;
      }
      
    }
  }
  
  
  ChangesCurrentMonth1(changeValue: any) {
    this.month = changeValue; // Store selected month
  
    if (this.year && this.month) {
      this.getLockFilter()
    }
  }

  getLock1() {
    this.getService.getLockPMUshaProgressList(this.stateCode).subscribe(res => {
      this.collegeListData = res.data;
      this.tempList = [...this.collegeListData]
    });
}
  getUserType() {
    this.postService.getUserByType([this.sharedService.userTypeList['7'].id, this.sharedService.userTypeList['6'].id]).subscribe(res => {
      this.userList = res;
      this.userList.forEach(e => {
        e.userAcronym = e.userAcronym.replace('TSG-', '');
      })
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getStateList() {
    let payload = {
      stateCode: 'ALL',
      reviseProposalOrInitial: false
    }
    this.getService.saaForwardedFinalProposal(payload).subscribe(res => {
      this.variables = res.data;
      this.variables = this.variables.sort((a, b) => a.stateName > b.stateName ? 1 : -1);
      this.stateList = this.variables.slice()
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getDistrict(data: any) {
    this.filterDistrictList = [];
    this.districtList = [];
    if (data === 'ALL') {
      return;
    }
    this.masterService.getDistrictList(data === 'ALL' ? '' : data).subscribe(res => {
      this.districtList = res;
      this.filterDistrictList = this.districtList.slice();

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
    // this.handlePageChangeOne(this.sharedService.page = 1)
  }

  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.collegeListData.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.collegeListData.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.collegeListData.length - 1);
    }

  }

  clear() {
    this.year = '';
    this.month = ''
    this.stateCode = ''
    this.getLock1()
    this.componentId = ''
  }

  reset(){
    this.year = '';
    this.month = '';
    this.componentId = '';
  }

  async updateResults() {
    this.collegeListData = []
    this.collegeListData = this.searchByValue(this.tempList);
    this.handlePageChange(this.sharedService.page = 1)
  }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.aisheCode?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase())) ||
            (item.institutionName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.instituteType?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.districtName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.componentName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.stateName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          // || (item.pabMeetingNumber?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.pabDate?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.centralShareApproved?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.stateShareApproved?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.totalAmountApproved?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          // || (item.physicalProgressTotal?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.rusaProjectStatus?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          // || (item.monthlyCompletedProposalItemStatus?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          // || (item.monthlyOngoingProposalItemStatus?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          // || (item.monthlyYetToBeStartedProposalItemStatus?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.year?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.monthName?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
      }
      
    })
    
  }

  onSortClick(event, colName) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir = -1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir = 1;
    }
    this.sortArr(colName);
  }

  sortArr(colName: any) {
    this.collegeListData.sort((a, b) => {
      a = a[colName]?.toLowerCase();
      b = b[colName]?.toLowerCase();
      return a?.localeCompare(b) * this.sortDir;
    });
  }
  datailsList(ele: any): void {
  // if (!ele) return;

  // Save details in sessionStorage
  sessionStorage.setItem('stateP', ele.stateName);
  sessionStorage.setItem('filteredStateCode', ele.stateId);
  sessionStorage.setItem('aisheCode', ele.aisheCode);
  sessionStorage.setItem('filteredComponentId', ele.componentId);
  sessionStorage.setItem('filteredYear', this.year);
  sessionStorage.setItem('filteredMonth', this.month);
  sessionStorage.setItem('selectIndex', '0');

  // Shared object for navigation or service
  // const sharedObj = {
  //   filteredStateCode: ele.stateId,
  //   aisheCode: ele.aisheCode,
  //   filteredComponentId: ele.componentId,
  //   filteredYear: ele.year,
  //   filteredMonth: ele.month,
  //   selectIndex: 0
  // };
  // this.sharedService.goLockPage(sharedObj);

  // --- Route navigation based on component ---
  const routeParams = [
    ele.componentId,
    this.sharedService.uniqueLockValue,
    ele.year,
    ele.month,
    ele.pmUshaMonthlyProgressLockstatusId,
    ele.stateId
  ];

  if (ele.componentId === this.sharedService.genderComponentId || ele.componentId === this.sharedService.nmdcComponentId) {
    this.router.navigate([this.routers.viewinstGenderLock, ...routeParams]);
  }
  else {
    this.router.navigate([this.routers.viewinstCollegeLock, ...routeParams]);
  }
    // this.router.navigate([this.routers.viewinstCollegeLock, ...routeParams]);
  // } else if (ele.componentId === this.sharedService.universityComponentId) {
  //   this.router.navigate([this.routers.viewinstUniverLock, ...routeParams]);
  // } else if (ele.componentId === this.sharedService.meruComponentId) {
  //   this.router.navigate([this.routers.viewinstMeruLock, ...routeParams]);
  // } else {
    
}


 Find(month, year) {
  this.componentId = this.userNpdTypeList ? -1 : this.componentId;
  this.stateCode = this.userNpdTypeList ? 'ALL' : this.stateCode;
  let isForwardedToNpdValue = this.userNpdTypeList ? true : false;
  this.searchText = '';

  if (!month || !year) {
    this.notification.showValidationMessage("Month and Year Field are Mandantory !!!");
    return;
  }
  this.getService.getDate().subscribe({
    next: (res) => {
      this.getDateTime = res;
      const apiDateTime = res; // ✅ NOW DEFINED

      const isAllowed = this.checkSubmissionPeriod(month, year, apiDateTime);
      this.isView = isAllowed;

      const requestParams: ProgressMaxData = {
        stateCode: this.stateCode,
        componentId: this.componentId,
        month: month,
        year: year,
        isForwardedToNpd: isForwardedToNpdValue
      };

      this.getService.getPMUshaProgressMaxData(requestParams).subscribe({
        next: (res) => {
          if (res.data && res.data.length) {

            if (this.userNpdTypeList) {
              this.collegeListData = res.data.filter(e => e.isForwardedToNpd);
              this.extraArr = res.data.filter(
                e => e.isForwardedToNpd === false || e.isForwardedToNpd == null
              );
              this.extraMasterArr = [...this.extraArr];
              this.filterArr = this.collegeListData;
              this.getFinalProposalStatus('ALL');
            } else {
              this.collegeListData = res.data.filter(e => e.lockStatus);
              this.stateListData = res.data.filter(e => e.lockStatus);
              this.filterArr = [...this.collegeListData];
              this.showForwardToNpdButton = this.collegeListData.some(
                item => item.isForwardedToNpd !== true
              );
              this.getFinalProposalStatus(this.stateId);
            }

            this.closeAllPanels();
            this.componentView = true;
            this.isAllSelected = false;
            this.tempList = [...this.collegeListData];
            this.updatePaginatedData();
            this.updatePaginatedData0();
            this.handlePageChange(this.sharedService.page = 1);

          } else {
            this.getFinalProposalStatus(this.userNpdTypeList ? 'ALL' : this.stateId);
            this.collegeListData = [];
            this.tempList = [];
            this.filterArr = [];
            this.isAllSelected = false;
            this.updatePaginatedData();
            this.updatePaginatedData0();
            this.handlePageChange(this.sharedService.page = 1);
          }
        },
        error: (err) => console.error('❌ API Error:', err)
      });
    },
    error: (err) => console.error('❌ Date API Error:', err)
  });
}


  // Find(month: any, year: any) {
  //   if (!month || !year) {
  //     this.notification.showValidationMessage("Month and Year fields are mandatory!");
  //     return;
  //   }

  //   this.cachedData.clearData("collegeDataLock");
  //   this.componentId = this.componentId || -1;
  //   this.stateCode = this.stateCode || 'ALL';

  //   const isAllowed = this.checkSubmissionPeriod(month, year);
  //   this.isView = !!isAllowed;

  //   const requestParams: ProgressMaxData = {
  //     stateCode: this.stateCode,
  //     componentId: this.componentId,
  //     month: month,
  //     year: year
  //   };

  //   this.getService.getPMUshaProgressMaxData(requestParams)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (res) => this.handleApiResponse(res),
  //       error: (err) => console.error('❌ API Error:', err)
  //     });
  // }

  // --- Common handler for both API responses ---
  private handleApiResponse(res: any) {
    const data = res?.data || [];
    if (data.length > 0) {
      if (this.userNpdTypeList) {
        // this.cachedData.setData("collegeDataLock", data);
        this.collegeListData = data.filter(e => e.isForwardedToNpd);
        this.extraArr = data.filter(e => !e.isForwardedToNpd);
        this.extraArr = data.filter(e => e.isForwardedToNpd == false || e.isForwardedToNpd == null);
        this.filterArr = [...this.collegeListData];
      } else {
        this.collegeListData = data.filter(e => e.lockStatus);
        this.stateListData = [...this.collegeListData];
        this.filterArr = [...this.collegeListData];
        this.showForwardToNpdButton = this.collegeListData.some(item => item.isForwardedToNpd !== true);
      }

      

      this.componentView = true;
      this.isAllSelected = false;
      this.tempList = [...this.collegeListData];
      this.closeAllPanels()
      this.updatePaginatedData();
      this.handlePageChange(this.sharedService.page = 1);
    } else {
      this.collegeListData = [];
      this.filterArr = [];
      this.tempList = [];
      this.isAllSelected = false;
      this.closeAllPanels()
      this.updatePaginatedData();
      this.handlePageChange(this.sharedService.page = 1);
    }
  }


  getMonthlyProposalTotal(item: any): number {
  const completed = isNaN(Number(item.monthlyCompletedProposalItemStatus)) ? 0 : Number(item.monthlyCompletedProposalItemStatus);
  const ongoing = isNaN(Number(item.monthlyOngoingProposalItemStatus)) ? 0 : Number(item.monthlyOngoingProposalItemStatus);
  const yetToStart = isNaN(Number(item.monthlyYetToBeStartedProposalItemStatus)) ? 0 : Number(item.monthlyYetToBeStartedProposalItemStatus);
  
  return completed + ongoing + yetToStart;
}

getMaxData() {
  this.componentId = this.userNpdTypeList ? -1 : this.componentId;
  let isForwardedToNpdValue = this.userNpdTypeList ? true : false;
  this.searchText = '';
  const requestParams: ProgressMaxData = {
    stateCode: this.userNpdTypeList ? 'ALL' : this.stateId || 'ALL',
    componentId: -1,
    month: -1,
    year: -1,
    isForwardedToNpd : isForwardedToNpdValue,
    maxMonthData : 1
  };

  this.getService.getPMUshaProgressMaxDataLatest(requestParams).subscribe({
    next: (res) => {
      const data = res?.data || [];
      if (data.length > 0) {
        if (this.userNpdTypeList) {
          // this.cachedData.setData("collegeDataLock", data);
          this.collegeListData = data.filter(e => e.isForwardedToNpd);
          this.extraArr = data.filter(e => e.isForwardedToNpd == false || e.isForwardedToNpd == null)
          //  this.extraArr = data.filter(e => !e.isForwardedToNpd);
          // this.extraArr = data.filter(e => e.isForwardedToNpd == false || e.isForwardedToNpd == null);
          this.extraMasterArr = [...this.extraArr]
          this.filterArr = [...this.collegeListData];
          this.getFinalProposalStatus('ALL')
        } else {
          // this.collegeListData = data.filter(e => e.lockStatus);
          // this.stateListData = [...this.collegeListData];
          // this.filterArr = [...this.collegeListData];
          // this.showForwardToNpdButton = this.collegeListData.some(item => item.isForwardedToNpd !== true);
          this.collegeListData = data.filter(e => e.lockStatus);
          this.stateListData = data.filter(e => e.lockStatus)
          this.filterArr = data.filter(e => e.lockStatus); 
          this.showForwardToNpdButton = this.collegeListData.some(
              item => item.isForwardedToNpd !== true
            );
          this.getFinalProposalStatus(this.stateId)
        }

        this.componentView = true;
        this.isAllSelected = false;
        this.tempList = [...this.collegeListData];
        this.updatePaginatedData();
        this.updatePaginatedData0()
        this.handlePageChange(this.sharedService.page = 1);
        // this.getFinalProposalStatus('ALL')
      } else {
         if (this.userNpdTypeList) {
            this.getFinalProposalStatus('ALL')
          }
          else{
            this.getFinalProposalStatus(this.stateId)
          }
          this.collegeListData = [];
          this.tempList = []
          this.filterArr = []
          // this.stateListData = []
          this.isAllSelected = false;
          this.updatePaginatedData()
          this.updatePaginatedData0()
          this.handlePageChange(this.sharedService.page = 1)
        // this.collegeListData = [];
        // this.filterArr = [];
        // this.tempList = [];
        // this.isAllSelected = false;
        // this.updatePaginatedData();
        // this.handlePageChange(this.sharedService.page = 1);
      }
    },
    error: (err) => console.error('❌ API Error:', err)
  });
}


 checkSubmissionPeriod(
  month: number,
  year: number,
  apiDateTime: string
  ): boolean {

  if (!apiDateTime) {
    return false;
  }

  // ---------- Parse API Date (DD/MM/YYYY hh:mm:ss AM/PM) ----------
  const [datePart, timePart, meridian] = apiDateTime.split(' ');
  const [day, apiMonth, apiYear] = datePart.split('/').map(Number);
  let [hours, minutes, seconds] = timePart.split(':').map(Number);

  if (meridian === 'PM' && hours < 12) hours += 12;
  if (meridian === 'AM' && hours === 12) hours = 0;

  const apiDate = new Date(apiYear, apiMonth - 1, day, hours, minutes, seconds);

  // ---------- Allowed Period ----------
  const selectedMonth = month - 1;
  const selectedYear = year;

  // Start: 16th of selected month (00:00:00)
  const startDate = new Date(selectedYear, selectedMonth, 16, 0, 0, 0);

  // End: 15th of next month (23:59:59)
  let nextMonth = selectedMonth + 1;
  let nextMonthYear = selectedYear;

  if (nextMonth > 11) {
    nextMonth = 0;
    nextMonthYear++;
  }

  const endDate = new Date(nextMonthYear, nextMonth, 16, 23, 59, 59);

  // ---------- Validation ----------
  return apiDate >= startDate && apiDate <= endDate;
}

ChangesStateSelection(selectedState: any) {
   this.componentId = -1
  // --- For Admin-like users ---
  if (
    this.userTypeId === this.sharedService.userTypeList['1'].id ||
    this.userTypeId === this.sharedService.userTypeList['2'].id ||
    this.userTypeId === this.sharedService.userTypeList['12'].id
  ) {
    // Require month & year
     if (this.month && this.year) {
      this.Find(this.month, this.year); // load filtered data from server
    } else {
      this.notification.showValidationMessage("Month and Year fields are mandatory!");
    }
    return;
  }

  // --- For Other users ---
 if (!selectedState || selectedState === 'ALL') {
    this.collegeListData = [...this.filterArr];
     this.extraArr = [...this.extraMasterArr]
    this.allRevisionArr = [...this.allMasterRevisionArr]
  } else {
    this.collegeListData = this.filterArr.filter(item => item.stateId == selectedState);
    this.extraArr = this.extraMasterArr.filter(item => item.stateId == selectedState)
    this.allRevisionArr = this.allMasterRevisionArr.filter(item => item.stateCode == selectedState)
  }

  // Keep filtered state list for component filtering
  this.stateFilterArr = [...this.collegeListData];
  this.stateFilterArr1 = [...this.extraArr];
  this.stateFilterArr2 = [...this.allRevisionArr];

  // Refresh paginated table
  this.tempList = [...this.collegeListData];
  this.closeAllPanels()
  this.updatePaginatedData0()
  this.updatePaginatedData()
  this.updatePaginatedData1()
  this.updatePaginatedData2()
}





ChangesComponent(selectedComponent: any) {
  const isAdmin =
    this.userTypeId === this.sharedService.userTypeList['1'].id ||
    this.userTypeId === this.sharedService.userTypeList['2'].id ||
    this.userTypeId === this.sharedService.userTypeList['12'].id;

  // --- For Admin-like users ---
  let baseArray = isAdmin ? this.filterArr : (this.stateFilterArr.length > 0 ? this.stateFilterArr : this.filterArr);
   let baseArray1 = isAdmin ? this.extraMasterArr : (this.stateFilterArr1?.length > 0 ? this.stateFilterArr1 : this.extraMasterArr);
  let baseArray2 = isAdmin ? this.allMasterRevisionArr : (this.stateFilterArr2?.length > 0 ? this.stateFilterArr2 : this.allMasterRevisionArr);

  // --- Filter by component ---
 if (selectedComponent === -1) {
    // ALL Selected
    this.collegeListData = [...baseArray];
     this.extraArr = [...baseArray1];
    this.allRevisionArr = [...baseArray2];
  } else {
    // Filter by componentId
   // Filter by componentId
    this.collegeListData = baseArray.filter(
      item => item.componentId == selectedComponent
    );
     this.extraArr = baseArray1.filter(
      item => item.componentId == selectedComponent
    );

     this.allRevisionArr = baseArray2.filter(
      item => item.componentId == selectedComponent
    );
    this.stateRevisionArr = this.stateMasterRevisionArr.filter(
      item => item.componentId == selectedComponent
    );
  }
  this.updatePaginatedData0()
  this.updatePaginatedData()
  this.updatePaginatedData1()
  this.updatePaginatedData2()

  // --- Admin: check month/year if needed ---
  if (isAdmin && (!this.month || !this.year)) {
    this.notification.showValidationMessage("Month and Year fields are mandatory!");
  }

  // Refresh paginated table
  this.tempList = [...this.collegeListData];
  this.closeAllPanels()
  // this.updatePaginatedData();
}



  toggleSelectAll(isChecked: boolean) {
    this.isAllSelected = isChecked; // Update global select status
    this.collegeListData.forEach(item => {
 
      if (!item.isForwardedToNpd) { // Only select items that are not forwarded
        item.checked = isChecked;
      }
    });
  }

  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
    sessionStorage.removeItem('back')
    this.destroy$.next();
    this.destroy$.complete();
    // sessionStorage.removeItem('filterdata')
    // sessionStorage.removeItem('filteredStateCode')
    // sessionStorage.removeItem('filteredComponentId')
    // sessionStorage.removeItem('filteredDistrictCode')
    // sessionStorage.removeItem('filteredStatus')
    // sessionStorage.removeItem('filteredAllotmentStatus')
  }

  unlock(unlockId){
    if (!unlockId.districtId) {
      this.notification.showValidationMessage("District Code is missing.");
      return;
    }
    let payload = {
      "lockStatus": false,
      "month": unlockId.month,
      "stateCode": unlockId.stateId,
      "year": unlockId.year,
      "componentId": unlockId.componentId,
      "userId": unlockId.aisheCode,
      "id": unlockId.pmUshaMonthlyProgressLockstatusId,
      "districtCode": unlockId.districtId
    };
    this.getService.getLockPMUshaProgressList(this.stateCode).subscribe(res => {
       // Assuming date format is "YYYY-MM-DD"
    // Step 1: Find max year
    const matchAishe = res.data.filter(item => item.year && (item.userId === unlockId.aisheCode));
    const maxYear = Math.max(...matchAishe.map(item => item.year));
    // Step 2: Filter records with max year
    const latestRecords = matchAishe.filter(item => item.year === maxYear);
    // Step 3: Find max month in max year
    const maxMonth = Math.max(...latestRecords.map(item => item.month));
    const matchMonth = (maxYear === unlockId.year) && (maxMonth === unlockId.month)
  if (matchMonth === true){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '25%',
        data: {
          message: 'Are you sure you want to UnLock ?',
        }
      })
      dialogRef.afterClosed().subscribe(res =>{
        if(res){
      this.postService.lockPmUshaProgress(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          this.Find(this.month, this.year)
        }
      }, err => {
        // Handle error here if needed
      });
    }})
  }
  else {
    this.notification.showValidationMessage(`Sorry, It cannot be unlocked as data for ${unlockId.year} and ${unlockId.monthName} is already there. Inorder to unlock data for this ${maxYear}/${maxMonth}, Please unlock latest data.`);
    return
  }
    });
 }


 unlockStatus(data){
    this.getService.getLockPMUshaProgressListFilter(data.stateCode, this.componentId, data.year, data.month).subscribe(res => {
      if(res.status === 200){
        this.UnlockData(res.data, data) 
      }
     
    })
}





UnlockData(data, lockStatusData) {
 let finalForwardStatusId = data.map(item => ({
        "componentId": item.componentId,
        "dateTime1": item.dateTime1,
        "id": item.id,
        "isForwardedToNpd": null,
        "lockStatus": false,
        "month": item.month,
        "state": { "stCode": item.state?.stCode || null },
        "stateCode": item.stateCode,
        "userId": item.userId,
        "year": item.year
    }));
   
    let payload = {
      rusaMonthlyProgressLockStatusId: lockStatusData.id,
      year: +lockStatusData.year,
      month: +lockStatusData.month
  };
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    width: '25%',
    data: { message: 'Are you sure you want to Unlock?' }
});

dialogRef.afterClosed().subscribe(res => {
  if (res) {
      this.postService.lockForwardPmUshaProgress(payload, finalForwardStatusId).subscribe(
          res => {
              if (res.status === 200) {
                this.notification.showSuccess();
                this.stateName = 'ALL'
                this.getLockStatus1()
                // this.getLockStatus1()
                }
          },
          err => {
              console.error('Error Response:', err);
          }
      );
  }
});



}






  // FWDNpd(){
    
  // }


  FWDNpd() {
    // Get all items that can be selected (not forwarded)
    let selectableItems = this.collegeListData.filter(item => !item.isForwardedToNpd);
    let selectedItems = this.collegeListData.filter(item => item.checked);
    // Check if all selectable items are selected
    if (selectedItems.length !== selectableItems.length) {
        this.notification.showValidationMessage('Please select all items to forward.');
        return;
    }

    let finalForwardStatusId = selectedItems.map(item => ({
        "componentId": item.componentId,
        "dateTime1": item.dateTime1,
        "id": item.pmUshaMonthlyProgressLockstatusId,
        "isForwardedToNpd": true,
        "lockStatus": true,
        "month": item.month,
        "state": { "stCode": item.stateId || null },
        "stateCode": item.stateId,
        "userId": item.aisheCode,
        "year": item.year,
        "districtCode": item.districtId
    }));

    // if (!this.year || !this.month) {
    //     this.notification.showValidationMessage('Please select Year and Month.');
    //     return;
    // }
    if (finalForwardStatusId.length === 0) {
        this.notification.showValidationMessage('Please select at least one item.');
        return;
    }

    let data = {
        rusaMonthlyProgressLockStatusId: 0,
        year: +this.year,
        month: +this.month
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '25%',
        data: { message: 'Are you sure you want to Forward to NPD?' }
    });

    dialogRef.afterClosed().subscribe(res => {
        if (res) {
            this.postService.lockForwardPmUshaProgress(data, finalForwardStatusId).subscribe(
                res => {
                    if (res.status === 200) {
                        this.notification.showSuccess();
                        this.Find(this.month, this.year);
                        this.isAllSelected = false;
                    }
                },
                err => {
                    console.error('Error Response:', err);
                }
            );
        }
    });
}

  findState() {
    this.getLockList = [];
    if (this.stateName === 'ALL') {
      this.getLockStatus1()
    } else {
      this.getLockFilter()
      this.stateFilter = true;
    }
  }

  getLockStatus1() {

    this.filterYearMonths = [];
    this.year = this.year ? this.year : '';
    this.month = this.month ? this.month : '';
    let state = this.stateName == 'ALL' ? null : this.stateName
    this.getService.getLockRusaProgressNpdPMUsha(state, this.sharedService.PmUshaKey, this.year, this.month).subscribe(res => {
    
      
      let resultUnique = this.filterStateUnique(res.data)
      let resu = this.filterState( this.stateList,res.data)
      
      
      this.getLockList =[...resultUnique,...resu];
      this.getLockList.sort((a: any, b: any) => {
            return this.parseDate(b).getTime()
                - this.parseDate(a).getTime();
          });
      // this.getLockList =[...res.data,...resu];
      
      this.tempListStatus = [...res.data,...resu];

      if (res.data.length > 0) {
        res.data.forEach((v, i) => {
          this.filterYearMonths.push({
            monthlock: res.data[i].monthName,
            yearLock: res.data[i].year
          })


        })
      }
    }
    );
  }

  parseDate(item: any): Date {

  // ✅ Priority 1: dateTime (with time)
  if (item?.dateTime) {
    const parts = item.dateTime.split(' ');
    if (parts.length === 3) {

      const [datePart, timePart, meridian] = parts;
      const [day, month, year] = datePart.split('-').map(Number);
      let [hours, minutes, seconds] = timePart.split(':').map(Number);

      if (meridian === 'PM' && hours < 12) hours += 12;
      if (meridian === 'AM' && hours === 12) hours = 0;

      return new Date(year, month - 1, day, hours, minutes, seconds);
    }
  }

  // ✅ Priority 2: dateTimeInString (only date)
  if (item?.dateTimeInString) {
    const parts = item.dateTimeInString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      return new Date(year, month - 1, day);
    }
  }

  // ❌ If both missing → very old date
  return new Date(0);
}


  getLockFilter() {

    this.filterYearMonths = [];
    this.year = this.year ? this.year : '';
    this.month = this.month ? this.month : '';
    let state = this.stateName == 'ALL' ? null : this.stateName
    this.getService.getLockRusaProgressNpdPMUsha(state, this.sharedService.PmUshaKey, this.year, this.month).subscribe(res => {
      this.getLockList = res.data;
      this.getLockList.sort((a: any, b: any) => {
            return this.parseDate(b).getTime()
                - this.parseDate(a).getTime();
        });
      if (res.data.length > 0) {
        res.data.forEach((v, i) => {
          this.filterYearMonths.push({
            monthlock: res.data[i].monthName,
            yearLock: res.data[i].year
          })


        })
      }
    }
    );
  }

  

  filterStateUnique(data: any[]) {
    let stateMap = new Map<string, any>();
  
    data.forEach(item => {
      const stateName = item.stateName;
      const existing = stateMap.get(stateName);
  
      // Store only the latest (max year and month) entry for each stateName
      if (!existing || item.year > existing.year || (item.year === existing.year && item.month > existing.month)) {
        stateMap.set(stateName, item);
      }
    });
  
    return Array.from(stateMap.values());
  }

  filterState(stateList, getLockList) {
   
    const filteredArray = stateList.filter(item => {
        // Check if the item is not in arr by comparing stateCode to all stCode
        return !getLockList.some(r1 => r1.stateCode === item.stCode);
    });
    
    return filteredArray.map((res)=>{
        return {...res,
          stateName:res.name,
          stateCode:res.stCode,
          lockStatus:false,
        }
    }); // Return the filtered array
}

getLockStatus() {
  this.filterYearMonths = [];
  let state = this.stateName == 'ALL' ? this.stateCode : '';
  this.getService.getLockRusaProgress(state, this.sharedService.PmUshaKey).subscribe(res => {
    const filterStatus = res.data.filter(e=> e.lockStatus)
    this.getLockList = filterStatus;
    if (res.data.length > 0) {
      res.data.forEach((v, i) => {
        this.filterYearMonths.push({
          monthlock: res.data[i].monthName,
          yearLock: res.data[i].year
        })


      })
    }
  }
  );
}

ChangesState(data: any) {
  this.stateName = data.value;
  this.year = '';
  this.month = '';
  this.findState();
}

  resetSearch(){
    this.year = ''
    this.month = '';
    this.monthList = [];
    this.stateName = 'ALL'
    this.searchText = ''
    this.getLockStatus1
    this.findState()
  }

  exportToExcel(id) {


    if (this.collegeListData.length != 0) {
      
     if(id === 1){
       let custom_data = this.collegeListData.map((item, index) => ({
        'S.No': index + 1,
        'State': item.stateName,
        'District': item.districtName,
        'Component Name': item.componentName,
        'RUSA Phase': 'PM-USHA',
        'Institution Name': item?.componentId === this.sharedService.genderComponentId ? item?.aisheCode : item?.institutionName,
        'Aishe Code': item.aisheCode,
        'PAB Meeting Number': item?.pabMeetingNumber,
        'PAB Date': item?.pabDate,
        'Central Share Amount Approved': +item?.centralShareApproved,
        'Central Share Amount Released': +item?.centralShareReleased,
        'Central Share Amount Utilised': +item?.centralShareUtilised,
        'State Share Amount Approved': +item?.stateShareApproved,
        'State Share Amount Released': +item?.stateShareReleased,
        'State Share Amount Utilised': +item?.stateShareUtilised,
        'Total Amount Approved': item?.totalAmountApproved == 'NaN' ? '0' : +item?.totalAmountApproved,
        'Total Amount Released': item?.totalAmountReleased == 'NaN' ? '0' : +item?.totalAmountReleased,
        'Total Amount Utilised': item?.totalUtilisation == 'NaN' ? '0' : +item?.totalUtilisation,
        'Physical Progress (Overall Project)(%)': item.isForwardedToNpd == null ? 0 : item.physicalProgressTotal,
        'Project Status (Overall)': item.isForwardedToNpd == null ? '0' : item?.rusaProjectStatus,
        'Monthly Proposal Item Status (Completed)': item.isForwardedToNpd == null ? 0 : item.monthlyCompletedProposalItemStatus,
        'Monthly Proposal Item Status (Ongoing)': item.isForwardedToNpd == null ? 0 : item.monthlyOngoingProposalItemStatus,
        'Monthly Proposal Item Status (Not yet started)': item.isForwardedToNpd == null ? 0 : item.monthlyYetToBeStartedProposalItemStatus,
        'Total Monthly Proposal Item Status': item.isForwardedToNpd == null ? 0 : this.getMonthlyProposalTotal(item),
        'Is Focus District': item.isFocusDistrict ? 'Yes' : 'No',
        'Is Aspirational District': item.aspirational ? 'Yes' : 'No',
        'Is Left Wing Extremist (LWE) District': item.lweAffected ? 'Yes' : 'No',
        'Is Border Area District': item.borderArea ? 'Yes' : 'No',
        'NAAC Accreditation Status': item.accreditationStatus ? 'Yes' : 'No',
        'Accreditation Score': item.accreditationScore,
        'Accreditation Grade': item.accreditationGrade,
        'Accreditation Valid Until': item.dateOfAccreditationValidity,
        'Year': item.year,
        'Month': item.monthName,
      
      }
      
      ));
      this.excelService.exportToExcel(custom_data, `PM-USHA Progress Monitoring Status_${this.stateCode === 'null' ? 'ALL' : this.stateCode }_${this.year ? this.year : this.collegeListData[0].year}_${this.month ? this.month : this.collegeListData[0].month}`);

     }
     if(id === 2){
       let custom_data = this.extraArr.map((item, index) => ({
       'S.No': index + 1,
        'State': item.stateName,
        'District': item.districtName,
        'Component Name': item.componentName,
        'RUSA Phase': 'PM-USHA',
        'Institution Name': item?.componentId === this.sharedService.genderComponentId ? item?.aisheCode : item?.institutionName,
        'Aishe Code': item.aisheCode,
        'PAB Meeting Number': item?.pabMeetingNumber,
        'PAB Date': item?.pabDate,
        'Central Share Amount Approved': +item?.centralShareApproved,
        'Central Share Amount Released': +item?.centralShareReleased,
        'Central Share Amount Utilised': +item?.centralShareUtilised,
        'State Share Amount Approved': +item?.stateShareApproved,
        'State Share Amount Released': +item?.stateShareReleased,
        'State Share Amount Utilised': +item?.stateShareUtilised,
        'Total Amount Approved': item?.totalAmountApproved == 'NaN' ? '0' : +item?.totalAmountApproved,
        'Total Amount Released': item?.totalAmountReleased == 'NaN' ? '0' : +item?.totalAmountReleased,
        'Total Amount Utilised': item?.totalUtilisation == 'NaN' ? '0' : +item?.totalUtilisation,
        'Physical Progress (Overall Project)(%)': item.isForwardedToNpd == null ? 0 : item.physicalProgressTotal,
        'Project Status (Overall)': item.isForwardedToNpd == null ? '0' : item?.rusaProjectStatus,
        'Monthly Proposal Item Status (Completed)': item.isForwardedToNpd == null ? 0 :  item.monthlyCompletedProposalItemStatus,
        'Monthly Proposal Item Status (Ongoing)': item.isForwardedToNpd == null ? 0 :  item.monthlyOngoingProposalItemStatus,
        'Monthly Proposal Item Status (Not yet started)': item.isForwardedToNpd == null ? 0 :  item.monthlyYetToBeStartedProposalItemStatus,
        'Total Monthly Proposal Item Status': item.isForwardedToNpd == null ? 0 : this.getMonthlyProposalTotal(item),
        'Is Focus District': item.isFocusDistrict ? 'Yes' : 'No',
        'Is Aspirational District': item.aspirational ? 'Yes' : 'No',
        'Is Left Wing Extremist (LWE) District': item.lweAffected ? 'Yes' : 'No',
        'Is Border Area District': item.borderArea ? 'Yes' : 'No',
        'NAAC Accreditation Status': item.accreditationStatus ? 'Yes' : 'No',
        'Accreditation Score': item.accreditationScore,
        'Accreditation Grade': item.accreditationGrade,
        'Accreditation Valid Until': item.dateOfAccreditationValidity,
        'Year': item.year,
        'Month': item.monthName,
      
      }
      
      ));
      this.excelService.exportToExcel(custom_data, `List of the Project Owners Who has Submitted the MPR for this Month: (${this.month ? this.month : this.collegeListData[0].month} - ${this.year ? this.year : this.collegeListData[0].year}) but not forwarded to NPD by the State`);

     }

     if(id === 3){
       let custom_data = this.allRevisionArr.map((item, index) => ({
        'S.No': index + 1,
        'State': item?.stateName,
        'District': item?.districtName,
        'Component Name': item.componentId === 1 ? this.sharedService.meru: item.componentId === 2 ? this.sharedService.university : item.componentId === 3 ? this.sharedService.college : item.componentId === 5 ? this.sharedService.gender : item.componentId === 4 ? this.sharedService.nmdc : '',
        'RUSA Phase': 'PM-USHA',
        'Institution Name': (item?.componentId === this.sharedService.genderComponentId || item?.componentId === this.sharedService.nmdcComponentId) ? item?.aisheCode : item?.instituteName,
        'Aishe Code': item.aisheCode,
        'PAB Meeting Number': item?.pabNumber,
        'PAB Date': item?.pabDateInString,
        'Central Share Amount Approved': +item?.centralShareApproved,
        'Central Share Amount Released': 0,
        'Central Share Amount Utilised': 0,
        'State Share Amount Approved': +item?.centralShareApproved,
        'State Share Amount Released': 0,
        'State Share Amount Utilised': 0,
        'Total Amount Approved': +item?.totalAmountApproved,
        'Total Amount Released': 0,
        'Total Amount Utilised': 0,
        'Physical Progress (Overall Project)(%)': 0,
        'Project Status (Overall)': 0,
        'Monthly Proposal Item Status (Completed)': 0,
        'Monthly Proposal Item Status (Ongoing)': 0,
        'Monthly Proposal Item Status (Not yet started)': 0,
        'Total Monthly Proposal Item Status': 0,
        'Is Focus District': item.isFocusDistrict ? 'Yes' : 'No',
        'Is Aspirational District': item.aspirational ? 'Yes' : 'No',
        'Is Left Wing Extremist (LWE) District': item.lweAffected ? 'Yes' : 'No',
        'Is Border Area District': item.borderArea ? 'Yes' : 'No',
        'Year': item.year,
        'Month': item.monthName,
      
      }
      
      ));
      this.excelService.exportToExcel(custom_data, `List of the Project Owners Who has not Submitted MPR for this Month: (${this.month ? this.month : this.collegeListData[0].month} - ${this.year ? this.year : this.collegeListData[0].year})`);

     }

     if(id === 4){
       let custom_data = this.stateRevisionArr.map((item, index) => ({
        'S.No': index + 1,
        'State': item?.stateName,
        'District': item?.districtName,
        'Component Name': item.componentId === 1 ? this.sharedService.meru: item.componentId === 2 ? this.sharedService.university : item.componentId === 3 ? this.sharedService.college : item.componentId === 5 ? this.sharedService.gender : item.componentId === 4 ? this.sharedService.nmdc : '',
        'RUSA Phase': 'PM-USHA',
       'Institution Name': (item?.componentId === this.sharedService.genderComponentId || item?.componentId === this.sharedService.nmdcComponentId) ? item?.aisheCode : item?.instituteName,
        'Aishe Code': item.aisheCode,
        // 'Aishe Code': item.userId,
        'PAB Meeting Number': item?.pabNumber,
        'PAB Date': item?.pabDateInString,
        'Central Share Amount Approved': 0,
        'Central Share Amount Released': 0,
        'Central Share Amount Utilised': 0,
        'State Share Amount Approved': 0,
        'State Share Amount Released': 0,
        'State Share Amount Utilised': 0,
        'Total Amount Approved': 0,
        'Total Amount Released': 0,
        'Total Amount Utilised': 0,
        'Physical Progress (Overall Project)(%)': 0,
        'Project Status (Overall)': 0,
        'Monthly Proposal Item Status (Completed)': 0,
        'Monthly Proposal Item Status (Ongoing)': 0,
        'Monthly Proposal Item Status (Not yet started)': 0,
        'Total Monthly Proposal Item Status': 0,
        'Is Focus District': item.isFocusDistrict ? 'Yes' : 'No',
        'Is Aspirational District': item.aspirational ? 'Yes' : 'No',
        'Is Left Wing Extremist (LWE) District': item.lweAffected ? 'Yes' : 'No',
        'Is Border Area District': item.borderArea ? 'Yes' : 'No',
        'Year': item.year,
        'Month': item.monthName,
      
      }
      
      ));
      this.excelService.exportToExcel(custom_data, `List of the Project Owners Who has not Submitted MPR for this Month: (${this.month ? this.month : this.collegeListData[0].month} - ${this.year ? this.year : this.collegeListData[0].year})`);

     }
     
     


    }
    else {
      this.notification.showValidationMessage("NO Data Found");
    }
  }




  getFinalProposalStatus(stateId){
    this.allMasterRevisionArr = []
    let payload = {
        stateCode: stateId === 'ALL' ? null : stateId,
        componentId: '',
        districtCode: this.districtId ? this.districtId : null,
        pabActionId: 1
        // proposalRevisionApprovedBySaa : true,
        
      }

    this.getService.getfinalSubmitProposal(payload).subscribe((res) => {
      let data = res.data
    
    if(this.userNpdTypeList){
      this.allRevisionArr = []
      let arr:any = [...this.collegeListData, ...this.extraArr]
      let filterArr = data.filter(e => (e.pabActionId === 1))
      filterArr.forEach((e: any) => {
      const isMatched = arr.some((a: any) => e.aisheCode === a?.aisheCode);
      if (!isMatched) {
        this.allRevisionArr.push(e);
         this.allMasterRevisionArr.push(e)
      }

    });
      this.updatePaginatedData();
      this.updatePaginatedData1();


    }

    if(!this.userNpdTypeList){
      this.stateRevisionArr = []
      let filterArr1 = data.filter(e => (e.pabActionId === 1))
      filterArr1.forEach((e: any) => {
      const isMatched = this.stateListData.some((a: any) => e.aisheCode === a?.aisheCode);
      if (!isMatched) {
        this.stateRevisionArr.push(e);
         this.stateMasterRevisionArr.push(e)
      }
    });
          this.updatePaginatedData2();
  }
    })
    
   
}

    onPageChangeWork0(event: PageEvent) {
      this.pageIndexWorkSubmit = event.pageIndex;
      this.pageSizeWorkSubmit = event.pageSize;
      this.updatePaginatedData0();
    }

  updatePaginatedData0() {
      const startIndex = this.pageIndexWorkSubmit * this.pageSizeWorkSubmit;
      const endIndex = startIndex + this.pageSizeWorkSubmit;
      this.paginatedDataSubmited = this.collegeListData.slice(startIndex, endIndex);
      
    }





    onPageChangeWork(event: PageEvent) {
      this.pageIndexWork = event.pageIndex;
      this.pageSizeWork = event.pageSize;
      this.updatePaginatedData();
    }

    updatePaginatedData() {
      const startIndex = this.pageIndexWork * this.pageSizeWork;
      const endIndex = startIndex + this.pageSizeWork;
      this.paginatedDataState = this.extraArr.slice(startIndex, endIndex);
      
    }
    onPageChangeWork1(event: PageEvent) {
      this.pageIndexState = event.pageIndex;
      this.pageSizeState = event.pageSize;
      this.updatePaginatedData1();
    }

    updatePaginatedData1() {
      const startIndex = this.pageIndexState * this.pageSizeState;
      const endIndex = startIndex + this.pageSizeState;
      this.paginatedDataMeeting = this.allRevisionArr.slice(startIndex, endIndex);
      
    }
     onPageChangeWork2(event: PageEvent) {
      this.pageIndexStateData = event.pageIndex;
      this.pageSizeStateData = event.pageSize;
      this.updatePaginatedData2();
    }

    updatePaginatedData2() {
      const startIndex = this.pageIndexStateData * this.pageSizeStateData;
      const endIndex = startIndex + this.pageSizeStateData;
      this.paginatedDataStateData = this.stateRevisionArr.slice(startIndex, endIndex);
      
    }

  getDateData(){
   this.getService.getDate().subscribe(
      (res) => {
        this.getDateTime = res;
      },
      (err) => { }
    );
  }

  
}
