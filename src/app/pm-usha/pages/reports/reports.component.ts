import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { SharedService } from 'src/app/shared/shared.service';
import * as XLSX from 'xlsx-js-style';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { MatTabChangeEvent, MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ExcelService } from 'src/app/service/excel.service';
import { NotificationService } from 'src/app/service/notification.service';
import { CachedDataService } from './report-services/cached-data.service';
import { CachedTotalDataService } from './report-services/cached-total-data.service';
import { CachedStateDataService } from './report-services/cached-state-data.service';
import { PageEvent } from '@angular/material/paginator';
import { CachedDataTagService } from './report-services/cached-data-tag.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: "cfs-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit, AfterViewInit {
  @ViewChild("tabGroup") tabGroup!: MatTabGroup;
  public routers: typeof routes = routes;
  gridApi: any;
  gridColumnApi: any;
  userTypeId: any;
  stateCode: string;
  meruFinalSubmiited: number = 0;
  consultantName: any;
  universityFinalSubmitted: number = 0;
  clgSaaApproveCount: number = 0;
  isSaaForwardedCount: number = 0;
  consultantStatus: number = 0;
  isNpdApproved: number = 0;
  cost: number = 0;
  componetNameFilter = -1;
  consolidatedList: Array<any> = [];
  componentId: any = 0;
  state: Array<any> = [];
  states: Array<any> = [];
  stateList: Array<any> = [];
  tempConsolidatedList: Array<any> = [];
  StartLimit: number = 0;
  universityForword: number = 0;
  universityConst: number = 0;
  universityStatus: number = 0;
  unisityNpdApproved: number = 0;
  collegeFinalSubmitted: number = 0;
  collegeForword: number = 0;
  collegeConst: number = 0;
  collegeStatus: number = 0;
  collegeNpdApproved: number = 0;
  nmdcFinalSubmitted: number = 0;
  nmdcForword: number = 0;
  nmdcConst: number = 0;
  nmdcStatus: number = 0;
  nmdcNpdApproved: number = 0;
  genderFinalSubmitted: number = 0;
  genderForword: number = 0;
  genderConst: number = 0;
  genderStatus: number = 0;
  genderNpdApproved: number = 0;
  meruFinalSubmiitedTotal: any = 0;
  isSaaForwardedCountTotal: any = 0;
  consultantNameTotal: any = 0;
  consultantStatusTotal: any = 0;
  consultantStatusNpdApprovedTotal: any = 0;
  consultantStatusMeruNpdApprovedTotal: any = 0;
  consultantStatusmeruCostTotal: any = 0;
  universityCostTotal: any = 0;
  collegeCostTotal: number = 0;
  nmdcCostTotal: number = 0;
  genderCostTotal: number = 0;
  TotalAllFilled: number = 0;
  TotalAllSubmitted: number = 0;
  TotalAllApproved: number = 0;
  universityFinalSubmittedTotal: any = 0;
  universityForwordTotal: any = 0;
  universityConstTotal: any = 0;
  universityNpdApprovedTotal: any = 0;
  universityRevisedNpdApprovedTotal: any = 0;
  universityStatusTotal: any = 0;
  collegeStatusTotal: any = 0;
  collegeNpdApprovedTotal: any = 0;
  collegeConstTotal: any = 0;
  collegeForwordTotal: any = 0;
  collegeFinalSubmittedTotal: any = 0;
  nmdcFinalSubmittedTotal: any = 0;
  nmdcForwordTotal: any = 0;
  nmdcConstTotal: any = 0;
  nmdcStatusTotal: any = 0;
  nmdcNpdApprovedTotal: any = 0;
  genderStatusTotal: any = 0;
  genderNpdApprovedTotal: any = 0;
  genderConstTotal: any = 0;
  genderFinalSubmittedTotal: any = 0;
  genderForwordTotal: any = 0;
  selectedIndex: any;
  meruCost: number = 0;
  meruCosttotal: number = 0;
  uniCost: number = 0;
  collegeCost: number = 0;
  nmdcCost: number = 0;
  genderCost: number = 0;
  meruCost1: number = 0;
  meruCost2: number = 0;
  collegeCost1: number = 0;
  collegeCost2: number = 0;
  uniCost1: number = 0;
  uniCost2: number = 0;
  nmdcCost1: number = 0;
  nmdcCost2: number = 0;
  genderCost1: number = 0;
  genderCost2: number = 0;
  collegeCost11: number = 0;
  collegeCost22: number = 0;
  uniCost11: number = 0;
  uniCost22: number = 0;
  meruCost11: number = 0;
  meruCost22: number = 0;
  nmdcCost11: number = 0;
  nmdcCost22: number = 0;
  genderCost11: number = 0;
  genderCost22: number = 0;
  showCollaps: boolean = true;
  selectedComponentId: string = "ALL";
  selectedStateCode: string = "ALL";
  reportArr: any = [];
  isSelecterVisible: any;
  isSubmitedSelecterVisible: any;
  filterStateList: Array<any> = [];
  filterStateListArr: Array<any> = [];
  stateList2: Array<any> = [];
  stateListArr: Array<any> = [];
  dprStatusList: Array<any> = [];
  tempList: Array<any> = [];
  filterdprStatusList: Array<any> = [];
  componentList: Array<any> = [];
  stateName: any = "ALL";
  stateNameAch: any = "ALL";
  componetNameAch: any = "0";
  componetName: any = "0";
  updateDprList: any[];
  componentIdVariable: any;
  dprUnderStatusM: any = 0;
  dprUnderStatusU: any = 0;
  dprUnderStatusC: any = 0;
  dprUnderStatusN: any = 0;
  dprUnderStatusG: any = 0;

  dprUnderTakingM: any = 0;
  dprUnderTakingU: any = 0;
  dprUnderTakingC: any = 0;
  dprUnderTakingN: any = 0;
  dprUnderTakingG: any = 0;
  MeruRevisedProposalForwardedtoNpd: any = 0;
  UnivRevisedProposalForwardedtoNpd: any = 0;

  isDPRNPDTotal: any = 0;
  isDPRNPDUnderTakingTotal: any = 0;
  isDPRNPDUnderStatusTotal: any = 0;

  isDPRUTotal: any = 0;
  isDPRUUnderTakingTotal: any = 0;
  isDPRUUnderStatusTotal: any = 0;

  isDPRCTotal: any = 0;
  isDPRCUnderTakingTotal: any = 0;
  isDPRCDUnderStatusTotal: any = 0;

  isDPRNTotal: any = 0;
  isDPRNUnderTakingTotal: any = 0;
  isDPRNUnderStatusTotal: any = 0;

  isDPRGTotal: any = 0;
  isDPRGUnderTakingTotal: any = 0;
  isDPRGUnderStatusTotal: any = 0;
  CollegeRevisedProposalForwardedtoNpd: any = 0;

  page1 = 1; // For Tab 1
  pageSize1 = 10;

  // constructor(public getService: GetService, public sharedService: SharedService, public masterService: MasterService) {
  tabIndex: any = false;
  proposalOutComesArr: any[] = [];
  proposalTemplateArr: any[] = [];
  proposalTagArr: any[] = [];
  proposalOutAchiveArr: any[] = [];
  savedTabIndex: any;
  filterData: any = [];
  reportDataArr: any = [];
  filterPhaseList: any = [
    { name: "PM_USHA", keyname: "PM-USHA" },
    { name: "RUSA_1", keyname: "RUSA 1" },
    { name: "RUSA_2", keyname: "RUSA 2" },
  ];
  stateFilter: any = "ALL";
  rusaPhase: any = "ALL";
  collegeRevisedNpdApprovedTotal: any = 0;
  NMDCRevisedProposalForwardedtoNpd: any = 0;
  genderRevisedProposalForwardedtoNpd: any = 0;
  genderRevisedNpdApprovedTotal: any = 0;
  nmdcRevisedNpdApprovedTotal: any = 0;
  tooltipPosition: "above" | "below" | "left" | "right" = "above";
  //Proposal Outcome Report
  paginatedData = [];
  paginatedDataUpdate = [];
  pageSize = 15;
  pageIndex = 0;
  pageSizeAch = 15;
  pageIndexAch = 0;
  pageSizeNumber = 15;
  pageIndexNumber = 0;
  pageSizeNumberRepo = 15;
  pageIndexNumberRepo = 0;
  pageSizeNumberGeo = 15;
  pageIndexNumberGeo = 0;
  pabNumber: any;
  pabNumberArr: any = [{ id: 1 }, { id: 2 }, { id: 3 }];
  SAATypeList: boolean;
  rusaComp: any[];
  sortDir = 1; //1= 'ASE' -1= DSC
  variables: Array<any> = [];
  districtList: Array<any> = [];
  filterDistrictList: Array<any> = [
    {
      distCode: "null",
      stateCode: "null",
      name: "ALL",
      sno: null,
      lgdDistCode: null,
    },
  ];
  districtId: string = "ALL";
  collegeListData: any[] = [];
  columnDefsTagging: any[] = [
    {
      headerName: 'S.No',
      cellRenderer: (params: any) => {
        const displayedRowIndex = params.node.rowIndex + 1;
        return displayedRowIndex;
      },
      width: 70,
      pinned: 'left',
      sortable: false,
      resizable: true
    },
    {
      headerName: 'Aishe Code',
      field: 'aisheCode',
      width: 130,
      cellRenderer: (params: any) => {
        if (params.value) {
          return `
            <span class="aishe-link" title="View Filled Details">
              ${params.value}
            </span>
          `;
        }
        return '';
      },
      onCellClicked: (params: any) => {
        if (params.data?.aisheCode) {
          this.datailsListTag(params.data);
        }
      }
    },
    {
      headerName: 'Institution Name',
      field: 'instituteName',
      width: 180,
      cellRenderer: (params: any) => {
        if (params.data?.componentId === this.sharedService.genderComponentId || 
            params.data?.componentId === this.sharedService.nmdcComponentId) {
          return `<span title="${params.data?.instituteName || ''}">${params.data?.aisheCode || ''}</span>`;
        }
        return `<span title="${params.value || ''}">${params.value || ''}</span>`;
      },
      autoHeight: false,
      resizable: true
    },
    {
      headerName: 'Component Name',
      field: 'componentName',
      width: 150,
      autoHeight: false,
      resizable: true
    },
    {
      headerName: 'State',
      field: 'stateName',
      width: 120,
      autoHeight: false,
      resizable: true
    },
    {
      headerName: 'District',
      field: 'districtName',
      width: 120,
      autoHeight: false,
      resizable: true
    },
    {
      headerName: 'Focus District',
      field: 'isFocusDistrict',
      width: 100,
      cellRenderer: (params: any) => {
        return params.value === true || params.value === 1 ? 'Yes' : 'No';
      },
      autoHeight: false,
      resizable: true
    },
    {
      headerName: 'Is Aspirational District',
      field: 'isAspirationDistrict',
      width: 130,
      cellRenderer: (params: any) => {
        return params.value === true || params.value === 1 ? 'Yes' : 'No';
      },
      autoHeight: false,
      resizable: true
    },
    {
      headerName: 'Is LWE District',
      field: 'isLweDistrict',
      width: 110,
      cellRenderer: (params: any) => {
        return params.value === true || params.value === 1 ? 'Yes' : 'No';
      },
      autoHeight: false,
      resizable: true
    },
    {
      headerName: 'Is Border Area District',
      field: 'isBorderAreaDistrict',
      width: 130,
      cellRenderer: (params: any) => {
        return params.value === true || params.value === 1 ? 'Yes' : 'No';
      },
      autoHeight: false,
      resizable: true
    },
    {
      headerName: 'Submitted On',
      field: 'proposalItemTaggingDateTime',
      width: 120,
      autoHeight: false,
      resizable: true
    }
  ];
  propsalTagData: any[] = [];
  filteredComponents: any[];
  paginatedTagData: any[];
  stateChangeName: any;
  userNpdTypeList: boolean;
  isToggled: boolean = false;
  tempList1: any[];
  proposalOutAchiveArrUpdate: any;
  projectStatusList: Array<any> = [];
  refList: any;
  proposalActivityId: any;
  consolidateTagReport: any[];
  collegeListDataTag: any[];
  paginatedTagDataTag: any[];
  groupedCollegeListDataTag: any[] = [];
  proposaActivityId: any;
  UpdatedropList: Array<any> = [];
  viewId: any;
  criteriaIdValue: any;
  isFormInvalid: boolean = false;
  UpdatedropListArr: any[];
  itemView: boolean;
  isCapicity: boolean;
  proposalItemTaggingId: any;
  masterNames: any[];
  filterCollegeData: any[];
  searchText: string = "";
  geoTagData: any[] = [];
  filteredData: any[] = [];
  paginatedTagGeoData: any[] = [];
  searchSubject: Subject<string> = new Subject<string>();
  filterValues = {
  name: 'ALL',
  component: 'ALL',
  year: null,
  month: null
  };
  yearList: any[];
  monthList: any[];
  stateList1: any[];
  stateListArr1: { name: any; }[];
  componentLIst: any[];
  componentList1: any[];
  year: 'ALL';
  month: 'ALL';
  constructor(
    public router: Router,
    public getService: GetService,
    public sharedService: SharedService,
    public masterService: MasterService,
    private excelService: ExcelService,
    public notification: NotificationService,
    public cachedData: CachedDataService,
    public cachedTotalData: CachedTotalDataService,
    public cachedStateData: CachedStateDataService,
    public cachedDataTag: CachedDataTagService
  ) {
    this.stateCode = sessionStorage.getItem("stateCode");
    this.userTypeId = sessionStorage.getItem("userTypeId");
  }

  changeTooltipPosition(position: "above" | "below" | "left" | "right") {
    this.tooltipPosition = position;
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    // Auto-size columns to fit their content
    this.gridColumnApi.autoSizeAllColumns();
     setTimeout(() => {
      this.gridApi.sizeColumnsToFit();
    }, 100);
  }

  ngOnInit(): void {
    
    // this.getStateList();
    // this.getSateDataList()
    // this.componentIdList()
        this.searchSubject.pipe(
        debounceTime(300),          // user typing wait
        distinctUntilChanged()      // same value ignore
      ).subscribe(searchText => {
        this.applyFilter(searchText);
      });
    if (sessionStorage.getItem("back") === "true") {
      // setTimeout(() => this.resizeGrid(), 200);
      sessionStorage.removeItem("back");
      this.pabNumber = +sessionStorage.getItem("pabNumber");
      // this.getSateDataUpdate()
      this.cachedData.getData("stateList").subscribe((data) => {
        if (data && data.length > 0) {
          this.stateList = data;
        } else {
          this.getSateData();
        }
      });
      // this.collegeListData = this.cachedDataTag.getData(); // Use cached data
      this.cachedData.getData("tempConsolidatedList").subscribe((data) => {
        if (data && data.length > 0) {
          this.tempConsolidatedList = data;
          this.totalValue(this.tempConsolidatedList);
        }
      });
      this.cachedData.getData("collegeList").subscribe((data) => {
        if (data && data.length > 0) {
          this.collegeListData = data;
        }
      });

    } else {
      this.getSateData();
    }
    this.SAATypeList =
      this.userTypeId === this.sharedService.userTypeList["1"].id;

    this.userNpdTypeList =
      this.userTypeId === this.sharedService.userTypeList["0"].id ||
      this.userTypeId === this.sharedService.userTypeList["6"].id ||
      this.userTypeId === this.sharedService.userTypeList["7"].id ||
      this.userTypeId === this.sharedService.userTypeList["8"].id ||
      this.userTypeId === this.sharedService.userTypeList["9"].id ||
      this.userTypeId === this.sharedService.userTypeList["10"].id;

      
  }
  

  onYearChange(value: any) {
    this.filterValues.year = value;
    this.applyFilters1();
  }

  onMonthChange(value: any) {
      this.filterValues.month = value;
      this.applyFilters1();
  }

  onStateChange(value: any) {
      this.filterValues.name = value;
      this.applyFilters1();
  }

  onComponentChange(value: any) {
      this.filterValues.component = value;
      this.applyFilters1();
  }

  applyFilters1() {
  this.filteredData = this.geoTagData.filter((item: any) => {
    return (
      (this.filterValues.name === 'ALL' || item.stateName == this.filterValues.name) &&
      (this.filterValues.component === 'ALL' || item.componentName == this.filterValues.component) &&
      (!this.filterValues.year || item.mprEnterredYear == this.filterValues.year) &&
      (!this.filterValues.month || item.mprEnterredMonth == this.filterValues.month)
    );

  });

  this.pageIndexNumberGeo = 0; // reset page
  this.updatePaginatedGeoReport();
}

onSearch(value: string) {
  this.searchSubject.next(value);
}

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  onPageChangeAch(event: PageEvent) {
    this.pageIndexAch = event.pageIndex;
    this.pageSizeAch = event.pageSize;
    this.updatePaginatedDataAchivment();
  }

  onPageChangeTag(event: PageEvent) {
    this.pageIndexNumber = event.pageIndex;
    this.pageSizeNumber = event.pageSize;
    this.updatePaginatedTagData();
  }

  onPageChangeTagReport(event: PageEvent) {
    this.pageIndexNumberRepo = event.pageIndex;
    this.pageSizeNumberRepo = event.pageSize;
    this.updatePaginatedTagReport();
  }

   onPageChangeGeoReport(event: PageEvent) {
    this.pageIndexNumberGeo = event.pageIndex;
    this.pageSizeNumberGeo = event.pageSize;
    this.updatePaginatedGeoReport();
  }

  ngAfterViewInit(): void {
    const storedIndex = sessionStorage.getItem("activeTabIndex");
    if (storedIndex !== null) {
      this.tabGroup.selectedIndex = +storedIndex;
    }
  }

  getSateData() {
    if (this.userTypeId === this.sharedService.userTypeList["1"].id) {
      this.stateCode = this.stateCode;
    } else {
      this.stateCode = "ALL";
    }
    let payload = {
      stateCode: this.stateCode,
      reviseProposalOrInitial: false,
    };
    this.getService.saaForwardedFinalProposal(payload).subscribe(
      (res) => {
        this.stateList = res.data;
        this.cachedData.setData("stateList", this.stateList);
        this.getConsolidate();
      },
      (err) => {
        console.error("Error fetching page status:", err);
      }
    );
  }

  getSateDataUpdate() {
    if (this.userTypeId === this.sharedService.userTypeList["1"].id) {
      this.stateCode = this.stateCode;
    } else {
      this.stateCode = "ALL";
    }
    let payload = {
      stateCode: this.stateCode,
      reviseProposalOrInitial: false,
    };
    this.getService.saaForwardedFinalProposal(payload).subscribe(
      (res) => {
        this.stateList = res.data;
      },
      (err) => {
        console.error("Error fetching page status:", err);
      }
    );
  }
  getSateDataList() {
    this.masterService.getStateData().subscribe(
      (res) => {
        this.stateList2 = res;
        this.stateListArr = res;
        this.filterStateList = this.stateList2.slice();
        this.filterStateListArr = this.stateListArr.slice();
        // this.variables = res;
        // this.variables = this.variables.sort((a, b) => a.stateName > b.stateName ? 1 : -1);
        // this.stateList = this.variables.slice()
      },
      () => {}
    );
  }
  getDprStatusData() {
    this.getService
      .getDprStatus(this.stateName ? this.stateName : "ALL", this.componentId)
      .subscribe(
        (res) => {
          if (res.status) {
            this.dprStatusList = res.data;
            this.tempList = [...this.dprStatusList];
            this.updateTable2PageData();
            // this.handlePageChange(this.sharedService.page = 1)
          }
          this.handlePageChange((this.sharedService.page = 1));
          this.handlePageChangeReport((this.sharedService.page = 1));
        },
        (err) => {
          console.error("Error fetching page status:", err);
        }
      );
  }

  table2CurrentPage = 1;
  table2PageSize = 25;
  table2StartLimit = 0;
  table2PageData = 0;

  handleTable2PageChange(event: number): void {
    this.table2CurrentPage = event;
    this.table2StartLimit = (this.table2CurrentPage - 1) * this.table2PageSize;
    this.updateTable2PageData();
  }

  updateTable2PageData() {
    const totalPages = Math.ceil(
      this.dprStatusList.length / this.table2PageSize
    );
    this.table2PageData = Math.min(
      this.table2StartLimit + this.table2PageSize,
      this.dprStatusList.length
    );
  }

  stateChanges(value: any) {
    // this.componetName='0'
    if (value != "ALL" && this.componetName === "0") {
      this.dprStatusList = this.tempList.filter(
        (res) => res.stateCode === value
      );
      this.updateDprList = this.dprStatusList;
    }
    // if (value != 'ALL' ){
    //   this.dprStatusList=this.tempList.filter((res)=> (res.stateCode===value));
    //   this.updateDprList = this.dprStatusList;
    // }
    // else {
    //   this.dprStatusList=this.tempList;
    // }

    if (value != "ALL" && this.componetName !== "0") {
      this.dprStatusList = this.tempList.filter(
        (res) =>
          res.stateCode === value &&
          (res.componentId == this.componentIdVariable
            ? this.componentIdVariable
            : "0")
      );
    }
    if (value == "ALL" && this.componetName !== "0") {
      this.dprStatusList = this.tempList.filter(
        (res) => res.componentId == this.componentIdVariable
      );
    }
    if (value == "ALL" && this.componetName == "0") {
      this.dprStatusList = this.tempList;
    }
    // this.componetName='0';
    //   if(value !=='ALL' && this.componetName){
    //     this.dprStatusList=this.tempList.filter((res)=> (res.stateCode===value));
    //     // this.dprStatusList=[...this.filterStateList]

    //   }else if(value && this.componetName){

    //   }else {
    //     this.dprStatusList=this.tempList;
    //   }
  }
  componentChanges(value: any) {
    this.componentIdVariable = value;
    if (value !== "0" && this.stateName !== "ALL") {
      if (this.updateDprList) {
        this.dprStatusList = this.updateDprList.filter(
          (res) => res.componentId === value
        );
      }
      //   }else if(value !== "0" && this.stateName ){
      //     this.dprStatusList=this.tempList.filter((res)=>(res.componentId===value))

      //   }
    }
    if (value !== "0" && this.stateName === "ALL") {
      this.dprStatusList = this.tempList.filter(
        (res) => res.componentId === value
      );
    } else if (value === "0" && this.stateName !== "ALL") {
      this.dprStatusList = this.updateDprList;
    } else if (value === "0" && this.stateName === "ALL") {
      this.dprStatusList = this.tempList;
    } else if (value !== "0" && this.stateName === "ALL") {
      this.dprStatusList = this.tempList.filter(
        (res) => res.componentId === value
      );
    }
    // else if (value === '0' && this.updateDprList){
    //   this.dprStatusList=this.tempList.filter((res)=> (res.stateCode===this.updateDprList));
    // }
    // else{
    //   this.dprStatusList=this.tempList
    // }
  }

  componentFilterChanges(value: any) {
    this.selectedComponentId = value;
    this.applyFilters();
  }

  stateFilterChanges(value: any) {
    this.selectedStateCode = value;
    this.applyFilters();
  }

  applyFilters() {
    this.paginatedData = this.proposalTemplateArr.filter((res) => {
      const matchesComponent =
        this.selectedComponentId === "ALL" ||
        res.componentId === this.selectedComponentId;
      const matchesState =
        this.selectedStateCode === "ALL" ||
        res.stateCode === this.selectedStateCode;
      return matchesComponent && matchesState;
    });
  }

  handleClick(evt, componentId, stateCode, stateName, eventName) {
    this.reportArr = [];
    var obj = {};
    var index;
    if (
      eventName == "DA" ||
      eventName == "RA" ||
      eventName == "RGA" ||
      eventName == "U" ||
      eventName == "D" ||
      eventName == "TA" ||
      eventName == "TU" ||
      eventName == "TD"
    ) {
      index = 2;
    } else {
      index = 0;
    }
    // var index = eventName == 'DA' || 'U' || 'D' || 'TA' || 'TU' || 'TD' ? 2 : 0
    obj["statecode"] = stateCode;
    obj["statename"] = stateName;
    obj["componentid"] = componentId;
    obj["status"] = eventName;
    obj["pabNumber"] =
      this.pabNumber === undefined
        ? null
        : this.pabNumber === "ALL"
        ? null
        : this.pabNumber;
    this.reportArr.push(obj);
    this.router.navigate([this.routers.viewReport, index]);
    this.sharedService.setViewReportDetails(this.reportArr);
  }

  getConsolidate() {
    if (this.userTypeId === this.sharedService.userTypeList["1"].id) {
      this.stateCode = this.stateCode;
    } else {
      this.stateCode = null;
    }
    this.tempConsolidatedList = [];
    this.getService
      .getfinalSubmitReport(
        this.stateCode === "ALL" ? null : this.stateCode,
        this.componentId === 0 ? "" : this.componentId,
        this.pabNumber === undefined
          ? null
          : this.pabNumber === "ALL"
          ? null
          : this.pabNumber
      )
      .subscribe(
        (res) => {
          this.consolidatedList = res.data.filter(
            (e) =>
              e.userTypeId?.toString() !==
              this.sharedService.userTypeList["1"].id
          );

          // this.consolidatedList.forEach((v, i) => {
          //   this.state = this.consolidatedList[i].stateName;
          // })
          // this.states = this.state.filter((item,
          //   index) => this.state.indexOf(item) === index);

          // var cons = this.consolidatedList.filter(e => (e.pabActionId === 1) && e.componentId === 1)

          const uniqueArray = this.consolidatedList.filter(
            (obj, index, self) =>
              index === self.findIndex((o) => o.stateName === obj.stateName)
          );

          this.stateList.forEach((element, index) => {
            this.meruFinalSubmiited = 0;
            this.isSaaForwardedCount = 0;
            this.consultantName = 0;
            this.consultantStatus = 0;
            this.universityFinalSubmitted = 0;
            this.universityForword = 0;
            this.universityConst = 0;
            this.universityStatus = 0;
            this.collegeFinalSubmitted = 0;
            this.collegeForword = 0;
            this.collegeConst = 0;
            this.collegeStatus = 0;
            this.nmdcFinalSubmitted = 0;
            this.nmdcForword = 0;
            this.nmdcConst = 0;
            this.nmdcStatus = 0;
            this.genderFinalSubmitted = 0;
            this.genderForword = 0;
            this.genderConst = 0;
            this.genderStatus = 0;
            this.isNpdApproved = 0;
            this.meruCost = 0;
            this.meruCosttotal = 0;
            this.unisityNpdApproved = 0;
            this.uniCost = 0;
            this.collegeNpdApproved = 0;
            this.genderNpdApproved = 0;
            this.nmdcNpdApproved = 0;
            this.collegeCost = 0;
            this.nmdcCost = 0;
            this.genderCost = 0;
            this.meruCost1 = 0;
            this.meruCost2 = 0;
            this.uniCost1 = 0;
            this.uniCost2 = 0;
            this.collegeCost1 = 0;
            this.collegeCost2 = 0;
            this.nmdcCost1 = 0;
            this.nmdcCost2 = 0;
            this.genderCost1 = 0;
            this.genderCost2 = 0;
            this.collegeCost22 = 0;
            this.collegeCost11 = 0;
            this.uniCost11 = 0;
            this.uniCost22 = 0;
            this.meruCost11 = 0;
            this.meruCost22 = 0;
            this.nmdcCost11 = 0;
            this.nmdcCost22 = 0;
            this.genderCost11 = 0;
            this.genderCost22 = 0;
            this.dprUnderStatusM = 0;
            this.dprUnderStatusU = 0;
            this.dprUnderStatusC = 0;
            this.dprUnderStatusN = 0;
            this.dprUnderStatusG = 0;

            this.dprUnderTakingM = 0;
            this.dprUnderTakingU = 0;
            this.dprUnderTakingC = 0;
            this.dprUnderTakingN = 0;
            this.dprUnderTakingG = 0;
            this.MeruRevisedProposalForwardedtoNpd = 0;
            this.UnivRevisedProposalForwardedtoNpd = 0;
            this.CollegeRevisedProposalForwardedtoNpd = 0;
            this.NMDCRevisedProposalForwardedtoNpd = 0;
            this.genderRevisedProposalForwardedtoNpd = 0;

            this.consolidatedList.forEach((currentValue) => {
              if (
                this.sharedService.meruComponentId == currentValue.componentId
              ) {
                if (currentValue.stateCode === element.stateId) {
                  this.meruFinalSubmiited++;
                  if (currentValue.isSaaForwarded) {
                    this.isSaaForwardedCount++;
                  }
                  if (
                    currentValue.revisedProposalForwardedtoNpd &&
                    (currentValue.pabActionId === 1 ||
                      currentValue.pabActionId === 3)
                  ) {
                    this.MeruRevisedProposalForwardedtoNpd++;
                  }
                  if (currentValue.consultantName) {
                    this.consultantName++;
                  }
                  if (currentValue.consultantStatus) {
                    this.consultantStatus++;
                  }
                  if (currentValue.pabActionId === 1 || currentValue.pabActionId === 3) {
                    this.isNpdApproved++;
                  }

                  if (
                    (currentValue.pabActionId == 1 ||
                      currentValue.pabActionId == 3) &&
                    currentValue.revisedProposalDprUndertaking === true &&
                    currentValue.revisedProposalForwardedtoNpd === true &&
                    currentValue.isRevisedProposalDprEsign == null
                  ) {
                    this.dprUnderStatusM += 1;
                  }
                  if (
                    (currentValue.pabActionId == 1 ||
                      currentValue.pabActionId == 3) &&
                    (currentValue.revisedProposalForwardedtoNpd === true || currentValue.isV3ForwardedToNpd === true) &&
                    (currentValue.revisedProposalDprUndertaking === false ||
                      (currentValue.isRevisedProposalDprEsign === true &&
                        currentValue.revisedProposalDprUndertaking !== false) || currentValue.v3Dpr)
                  ) {
                    this.dprUnderTakingM += 1;
                  }

                  if (currentValue.pabActionId === 1) {
                    if (!this.meruCost11) {
                      this.meruCost11 = 0;
                    }
                    this.meruCost11 += isNaN(
                      parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost)
                    )
                      ? 0
                      : parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost);
                    this.meruCost1 = this.meruCost11;
                    // this.meruCost1 = parseInt(currentValue.totalCost);
                  }

                  if (currentValue.pabActionId === 3) {
                    if (!this.meruCost22) {
                      this.meruCost22 = 0;
                    }
                    this.meruCost22 += isNaN(
                      parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost)
                    )
                      ? 0
                      : parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost);
                    this.meruCost2 = this.meruCost22;
                  }

                  this.meruCost = this.meruCost1 + this.meruCost2;
                  this.meruCost === this.meruCost ? this.meruCost : "";
                  //  this.meruCost = this.meruCost;
                }
              }

              if (
                this.sharedService.universityComponentId ===
                currentValue.componentId
              ) {
                if (currentValue.stateCode === element.stateId) {
                  this.universityFinalSubmitted++;

                  if (currentValue.isSaaForwarded) {
                    this.universityForword++;
                  }
                  if (
                    currentValue.revisedProposalForwardedtoNpd &&
                    (currentValue.pabActionId === 1 ||
                      currentValue.pabActionId === 3)
                  ) {
                    this.UnivRevisedProposalForwardedtoNpd++;
                  }
                  if (currentValue.consultantName) {
                    this.universityConst++;
                  }
                  if (currentValue.consultantStatus) {
                    this.universityStatus++;
                  }
                  if (currentValue.pabActionId === 1 || currentValue.pabActionId === 3) {
                    this.unisityNpdApproved++;
                  }

                  if (currentValue.pabActionId === 1) {
                    if (!this.uniCost11) {
                      this.uniCost11 = 0;
                    }
                    this.uniCost11 += isNaN(
                      parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost)
                    )
                      ? 0
                      : parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost);
                    this.uniCost1 = this.uniCost11;
                  }

                  if (currentValue.pabActionId === 3) {
                    if (!this.uniCost22) {
                      this.uniCost22 = 0;
                    }
                    this.uniCost22 += isNaN(
                      parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost)
                    )
                      ? 0
                      : parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost);
                    this.uniCost2 = this.uniCost22;
                  }

                  if (
                    (currentValue.pabActionId == 1 ||
                      currentValue.pabActionId == 3) &&
                    currentValue.revisedProposalDprUndertaking === true &&
                    currentValue.revisedProposalForwardedtoNpd === true &&
                    currentValue.isRevisedProposalDprEsign == null
                  ) {
                    this.dprUnderStatusU += 1;
                  }
                  
                if (
                    (currentValue.pabActionId == 1 ||
                      currentValue.pabActionId == 3) &&
                    (currentValue.revisedProposalForwardedtoNpd === true || currentValue.isV3ForwardedToNpd === true) &&
                    (currentValue.revisedProposalDprUndertaking === false ||
                      (currentValue.isRevisedProposalDprEsign === true &&
                        currentValue.revisedProposalDprUndertaking !== false) || currentValue.v3Dpr)
                  ) {
                    this.dprUnderTakingU += 1;
                  }

                  this.uniCost = this.uniCost1 + this.uniCost2;
                  this.uniCost === this.uniCost ? this.uniCost : "";
                  this.uniCost = this.uniCost++;
                }
              }
              if (
                this.sharedService.collegeComponentId ===
                currentValue.componentId
              ) {
                if (currentValue.stateCode === element.stateId) {
                  this.collegeFinalSubmitted++;

                  if (currentValue.isSaaForwarded) {
                    this.collegeForword++;
                  }
                  if (currentValue.consultantName) {
                    this.collegeConst++;
                  }
                  if (currentValue.consultantStatus) {
                    this.collegeStatus++;
                  }
                  if (
                    currentValue.revisedProposalForwardedtoNpd &&
                    (currentValue.pabActionId === 1 ||
                      currentValue.pabActionId === 3)
                  ) {
                    this.CollegeRevisedProposalForwardedtoNpd++;
                  }
                  if (currentValue.pabActionId === 1 || currentValue.pabActionId === 3) {
                    this.collegeNpdApproved++;
                  }

                  if (currentValue.pabActionId === 1) {
                    if (!this.collegeCost11) {
                      this.collegeCost11 = 0;
                    }
                    this.collegeCost11 += isNaN(
                      parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost)
                    )
                      ? 0
                      : parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost);
                    this.collegeCost1 = this.collegeCost11;
                  }

                  if (
                    (currentValue.pabActionId == 1 ||
                      currentValue.pabActionId == 3) &&
                    currentValue.revisedProposalDprUndertaking === true &&
                    currentValue.revisedProposalForwardedtoNpd === true &&
                    currentValue.isRevisedProposalDprEsign == null
                  ) {
                    this.dprUnderStatusC += 1;
                  }
                   if (
                    (currentValue.pabActionId == 1 ||
                      currentValue.pabActionId == 3) &&
                    (currentValue.revisedProposalForwardedtoNpd === true || currentValue.isV3ForwardedToNpd === true) &&
                    (currentValue.revisedProposalDprUndertaking === false ||
                      (currentValue.isRevisedProposalDprEsign === true &&
                        currentValue.revisedProposalDprUndertaking !== false) || currentValue.v3Dpr)
                  ) {
                    this.dprUnderTakingC += 1;
                  }

                  if (currentValue.pabActionId === 3) {
                    if (!this.collegeCost22) {
                      this.collegeCost22 = 0;
                    }
                    this.collegeCost22 += isNaN(
                      parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost)
                    )
                      ? 0
                      : parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost);
                    this.collegeCost2 = this.collegeCost22;
                  }
                  this.collegeCost = this.collegeCost1 + this.collegeCost2;
                  this.collegeCost == this.collegeCost ? this.collegeCost : "";
                  //  this.collegeCost = this.collegeCost;
                }
              }
              if (
                this.sharedService.nmdcComponentId === currentValue.componentId
              ) {
                if (currentValue.stateCode === element.stateId) {
                  this.nmdcFinalSubmitted++;

                  if (currentValue.isSaaForwarded) {
                    this.nmdcForword++;
                  }
                  if (currentValue.consultantName) {
                    this.nmdcConst++;
                  }
                  if (currentValue.consultantStatus) {
                    this.nmdcStatus++;
                  }
                  if (
                    currentValue.revisedProposalForwardedtoNpd &&
                    (currentValue.pabActionId === 1 ||
                      currentValue.pabActionId === 3)
                  ) {
                    this.NMDCRevisedProposalForwardedtoNpd++;
                  }

                  if (
                    (currentValue.pabActionId == 1 ||
                      currentValue.pabActionId == 3) &&
                    currentValue.revisedProposalDprUndertaking === true &&
                    currentValue.revisedProposalForwardedtoNpd === true &&
                    currentValue.isRevisedProposalDprEsign == null
                  ) {
                    this.dprUnderStatusN += 1;
                  }
                    if (
                    (currentValue.pabActionId == 1 ||
                      currentValue.pabActionId == 3) &&
                    (currentValue.revisedProposalForwardedtoNpd === true || currentValue.isV3ForwardedToNpd === true) &&
                    (currentValue.revisedProposalDprUndertaking === false ||
                      (currentValue.isRevisedProposalDprEsign === true &&
                        currentValue.revisedProposalDprUndertaking !== false) || currentValue.v3Dpr)
                  ) {
                    this.dprUnderTakingN += 1;
                  }

                  if (currentValue.pabActionId === 1 || currentValue.pabActionId === 3) {
                    this.nmdcNpdApproved++;
                  }

                  if (currentValue.pabActionId === 1) {
                    if (!this.nmdcCost11) {
                      this.nmdcCost11 = 0;
                    }
                    this.nmdcCost11 += isNaN(
                      parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost)
                    )
                      ? 0
                      : parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost);
                    this.nmdcCost1 = this.nmdcCost11;
                    // this.nmdcCost1 = parseInt(currentValue.totalCost);
                  }

                  if (currentValue.pabActionId === 3) {
                    if (!this.nmdcCost22) {
                      this.nmdcCost22 = 0;
                    }
                    this.nmdcCost22 += isNaN(
                      parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost)
                    )
                      ? 0
                      : parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost);
                    this.nmdcCost2 = this.nmdcCost22;
                    // this.nmdcCost2 = parseInt(currentValue.totalCost);
                  }
                  this.nmdcCost = this.nmdcCost1 + this.nmdcCost2;
                  this.nmdcCost == this.nmdcCost ? this.nmdcCost : "";
                  this.nmdcCost = this.nmdcCost++;
                }
              }
              if (
                this.sharedService.genderComponentId ===
                currentValue.componentId
              ) {
                if (currentValue.stateCode === element.stateId) {
                  this.genderFinalSubmitted++;

                  if (currentValue.isSaaForwarded) {
                    this.genderForword++;
                  }
                  if (
                    currentValue.revisedProposalForwardedtoNpd &&
                    (currentValue.pabActionId === 1 ||
                      currentValue.pabActionId === 3)
                  ) {
                    this.genderRevisedProposalForwardedtoNpd++;
                  }
                  if (currentValue.consultantName) {
                    this.genderConst++;
                  }
                  if (currentValue.consultantStatus) {
                    this.genderStatus++;
                  }
                  if (currentValue.pabActionId === 1 || currentValue.pabActionId === 3) {
                    this.genderNpdApproved++;
                  }
                  //   if(currentValue.isNpdApproved == true){
                  //     let genderCost = currentValue.totalCost;
                  //     this.genderCost=genderCost++;
                  //  }
                  if (currentValue.pabActionId === 1) {
                    if (!this.genderCost11) {
                      this.genderCost11 = 0;
                    }

                    this.genderCost11 += isNaN(
                      parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost)
                    )
                      ? 0
                      : parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost);
                    this.genderCost1 = this.genderCost11;
                    // this.genderCost1 = parseInt(currentValue.totalCost);
                  }

                  if (
                    (currentValue.pabActionId == 1 ||
                      currentValue.pabActionId == 3) &&
                    currentValue.revisedProposalDprUndertaking === true &&
                    currentValue.revisedProposalForwardedtoNpd === true &&
                    currentValue.isRevisedProposalDprEsign == null
                  ) {
                    this.dprUnderStatusG += 1;
                  }
                  if (
                    (currentValue.pabActionId == 1 ||
                      currentValue.pabActionId == 3) &&
                    (currentValue.revisedProposalForwardedtoNpd === true || currentValue.isV3ForwardedToNpd === true) &&
                    (currentValue.revisedProposalDprUndertaking === false ||
                      (currentValue.isRevisedProposalDprEsign === true &&
                        currentValue.revisedProposalDprUndertaking !== false) || currentValue.v3Dpr)
                  ) {
                    this.dprUnderTakingG += 1;
                  }

                  if (currentValue.pabActionId === 3) {
                    if (!this.genderCost22) {
                      this.genderCost22 = 0;
                    }

                    this.genderCost22 += isNaN(
                      parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost)
                    )
                      ? 0
                      : parseInt(currentValue.isV3ForwardedToNpd && currentValue.revisedProposalV3Cost ? currentValue.revisedProposalV3Cost : currentValue.revisedTotalCost);
                    this.genderCost2 = this.genderCost22;
                    // this.genderCost2 = parseInt(currentValue.totalCost);
                  }
                  this.genderCost = this.genderCost1 + this.genderCost2;
                  this.genderCost == this.genderCost ? this.genderCost : "";
                  //  this.genderCost = this.genderCost++;
                }
              }
            });
            this.tempConsolidatedList.push({
              meruFinalSubmiited: this.meruFinalSubmiited,
              isSaaForwardedCount: this.isSaaForwardedCount,
              consultantName: this.consultantName,
              consultantStatus: this.consultantStatus,
              isNpdApproved: this.isNpdApproved,
              meruCost: this.meruCost,
              universityFinalSubmitted: this.universityFinalSubmitted,
              universityForword: this.universityForword,
              universityConst: this.universityConst,
              universityStatus: this.universityStatus,
              unisityNpdApproved: this.unisityNpdApproved,
              uniCost: this.uniCost,
              collegeFinalSubmitted: this.collegeFinalSubmitted,
              collegeForword: this.collegeForword,
              collegeConst: this.collegeConst,
              collegeStatus: this.collegeStatus,
              collegeNpdApproved: this.collegeNpdApproved,
              collegeCost: this.collegeCost,
              nmdcFinalSubmitted: this.nmdcFinalSubmitted,
              nmdcForword: this.nmdcForword,
              nmdcConst: this.nmdcConst,
              nmdcStatus: this.nmdcStatus,
              nmdcNpdApproved: this.nmdcNpdApproved,
              nmdcCost: this.nmdcCost,
              genderFinalSubmitted: this.genderFinalSubmitted,
              genderForword: this.genderForword,
              genderConst: this.genderConst,
              genderStatus: this.genderStatus,
              genderNpdApproved: this.genderNpdApproved,
              genderCost: this.genderCost,
              stateName: element.stateName,
              stateCode: element.stateId,
              dprUnderStatusM: this.dprUnderStatusM,
              dprUnderStatusU: this.dprUnderStatusU,
              dprUnderStatusC: this.dprUnderStatusC,
              dprUnderStatusN: this.dprUnderStatusN,
              dprUnderStatusG: this.dprUnderStatusG,

              dprUnderTakingM: this.dprUnderTakingM,
              dprUnderTakingU: this.dprUnderTakingU,
              dprUnderTakingC: this.dprUnderTakingC,
              dprUnderTakingN: this.dprUnderTakingN,
              dprUnderTakingG: this.dprUnderTakingG,
              MeruRevisedProposalForwardedtoNpd:
                this.MeruRevisedProposalForwardedtoNpd,
              UnivRevisedProposalForwardedtoNpd:
                this.UnivRevisedProposalForwardedtoNpd,
              CollegeRevisedProposalForwardedtoNpd:
                this.CollegeRevisedProposalForwardedtoNpd,
              NMDCRevisedProposalForwardedtoNpd:
                this.NMDCRevisedProposalForwardedtoNpd,
              genderRevisedProposalForwardedtoNpd:
                this.genderRevisedProposalForwardedtoNpd,

              AllTotalfilled:
                this.meruFinalSubmiited +
                this.universityFinalSubmitted +
                this.collegeFinalSubmitted +
                this.nmdcFinalSubmitted +
                this.genderFinalSubmitted,
              AllTotalSubmitted:
                this.isSaaForwardedCount +
                this.universityForword +
                this.collegeForword +
                this.nmdcForword +
                this.genderForword,
              AllTotalApproved:
                this.isNpdApproved +
                this.unisityNpdApproved +
                this.collegeNpdApproved +
                this.nmdcNpdApproved +
                this.genderNpdApproved,
            });
          });
          this.tempConsolidatedList.sort((a, b) =>
            a.stateName.localeCompare(b.stateName)
          );

          this.totalValue(this.tempConsolidatedList);

          this.cachedData.setData(
            "tempConsolidatedList",
            this.tempConsolidatedList
          );
        },
        (err) => {
          console.error("Error fetching page status:", err);
        }
      );
  }

  pabNumberFilter() {
    this.getConsolidate();
  }

  formatToCrores(value: number): string {
    const crores = Math.floor((value / 10000000) * 100) / 100; // Truncate to 2 decimal places
    return `${crores.toFixed(2)} Cr`;
  }

  totalValue(data: any) {
    this.meruFinalSubmiitedTotal = data.reduce(
      (sum, item) => sum + Number(item.meruFinalSubmiited),
      0
    );
    this.isSaaForwardedCountTotal = data.reduce(
      (sum, item) => sum + Number(item.isSaaForwardedCount),
      0
    );
    this.consultantNameTotal = data.reduce(
      (sum, item) => sum + Number(item.consultantName),
      0
    );
    this.consultantStatusTotal = data.reduce(
      (sum, item) => sum + Number(item.consultantStatus),
      0
    );
    this.consultantStatusTotal = data.reduce(
      (sum, item) => sum + Number(item.consultantStatus),
      0
    );
    this.consultantStatusNpdApprovedTotal = data.reduce(
      (sum, item) => sum + Number(item.isNpdApproved),
      0
    );
    this.consultantStatusMeruNpdApprovedTotal = data.reduce(
      (sum, item) => sum + Number(item.MeruRevisedProposalForwardedtoNpd),
      0
    );

    this.consultantStatusmeruCostTotal = data.reduce(
      (sum, item) => sum + Number(item.meruCost),
      0
    );
    this.universityFinalSubmittedTotal = data.reduce(
      (sum, item) => sum + Number(item.universityFinalSubmitted),
      0
    );
    this.universityForwordTotal = data.reduce(
      (sum, item) => sum + Number(item.universityForword),
      0
    );
    this.universityConstTotal = data.reduce(
      (sum, item) => sum + Number(item.universityConst),
      0
    );
    this.universityNpdApprovedTotal = data.reduce(
      (sum, item) => sum + Number(item.unisityNpdApproved),
      0
    );
    this.universityRevisedNpdApprovedTotal = data.reduce(
      (sum, item) => sum + Number(item.UnivRevisedProposalForwardedtoNpd),
      0
    );
    this.universityCostTotal = data.reduce(
      (sum, item) => sum + Number(item.uniCost),
      0
    );
    this.collegeFinalSubmittedTotal = data.reduce(
      (sum, item) => sum + Number(item.collegeFinalSubmitted),
      0
    );
    this.collegeForwordTotal = data.reduce(
      (sum, item) => sum + Number(item.collegeForword),
      0
    );
    this.collegeConstTotal = data.reduce(
      (sum, item) => sum + Number(item.collegeConst),
      0
    );
    this.collegeStatusTotal = data.reduce(
      (sum, item) => sum + Number(item.collegeStatus),
      0
    );
    this.collegeStatusTotal = data.reduce(
      (sum, item) => sum + Number(item.collegeStatus),
      0
    );
    this.collegeNpdApprovedTotal = data.reduce(
      (sum, item) => sum + Number(item.collegeNpdApproved),
      0
    );
    this.collegeRevisedNpdApprovedTotal = data.reduce(
      (sum, item) => sum + Number(item.CollegeRevisedProposalForwardedtoNpd),
      0
    );
    this.collegeCostTotal = data.reduce(
      (sum, item) => sum + Number(item.collegeCost),
      0
    );
    this.nmdcFinalSubmittedTotal = data.reduce(
      (sum, item) => sum + Number(item.nmdcFinalSubmitted),
      0
    );
    this.nmdcForwordTotal = data.reduce(
      (sum, item) => sum + Number(item.nmdcForword),
      0
    );
    this.nmdcRevisedNpdApprovedTotal = data.reduce(
      (sum, item) => sum + Number(item.NMDCRevisedProposalForwardedtoNpd),
      0
    );
    this.nmdcConstTotal = data.reduce(
      (sum, item) => sum + Number(item.nmdcConst),
      0
    );
    this.nmdcStatusTotal = data.reduce(
      (sum, item) => sum + Number(item.nmdcStatus),
      0
    );
    this.nmdcNpdApprovedTotal = data.reduce(
      (sum, item) => sum + Number(item.nmdcNpdApproved),
      0
    );
    this.nmdcCostTotal = data.reduce(
      (sum, item) => sum + Number(item.nmdcCost),
      0
    );
    this.genderFinalSubmittedTotal = data.reduce(
      (sum, item) => sum + Number(item.genderFinalSubmitted),
      0
    );
    this.genderForwordTotal = data.reduce(
      (sum, item) => sum + Number(item.genderForword),
      0
    );
    this.genderRevisedNpdApprovedTotal = data.reduce(
      (sum, item) => sum + Number(item.genderRevisedProposalForwardedtoNpd),
      0
    );
    this.genderConstTotal = data.reduce(
      (sum, item) => sum + Number(item.genderConst),
      0
    );
    this.genderStatusTotal = data.reduce(
      (sum, item) => sum + Number(item.genderStatus),
      0
    );
    this.genderNpdApprovedTotal = data.reduce(
      (sum, item) => sum + Number(item.genderNpdApproved),
      0
    );
    this.genderCostTotal = data.reduce(
      (sum, item) => sum + Number(item.genderCost),
      0
    );

    this.TotalAllFilled = data.reduce(
      (sum, item) => sum + Number(item.AllTotalfilled),
      0
    );
    this.TotalAllSubmitted = data.reduce(
      (sum, item) => sum + Number(item.AllTotalSubmitted),
      0
    );
    this.TotalAllApproved = data.reduce(
      (sum, item) => sum + Number(item.AllTotalApproved),
      0
    );
    this.isDPRNPDTotal = data.reduce(
      (sum, item) => sum + Number(item.isNpdApproved),
      0
    );

    this.isDPRNPDUnderTakingTotal = data.reduce(
      (sum, item) => sum + Number(item.dprUnderTakingM),
      0
    );

    this.isDPRNPDUnderStatusTotal = data.reduce(
      (sum, item) => sum + Number(item.dprUnderStatusM),
      0
    );

    this.isDPRUTotal = data.reduce(
      (sum, item) => sum + Number(item.unisityNpdApproved),
      0
    );
    this.isDPRUUnderTakingTotal = data.reduce(
      (sum, item) => sum + Number(item.dprUnderTakingU),
      0
    );

    this.isDPRUUnderStatusTotal = data.reduce(
      (sum, item) => sum + Number(item.dprUnderStatusU),
      0
    );

    this.isDPRCTotal = data.reduce(
      (sum, item) => sum + Number(item.collegeNpdApproved),
      0
    );
    this.isDPRCUnderTakingTotal = data.reduce(
      (sum, item) => sum + Number(item.dprUnderTakingC),
      0
    );

    this.isDPRCDUnderStatusTotal = data.reduce(
      (sum, item) => sum + Number(item.dprUnderStatusC),
      0
    );

    this.isDPRNTotal = data.reduce(
      (sum, item) => sum + Number(item.nmdcNpdApproved),
      0
    );
    this.isDPRNUnderTakingTotal = data.reduce(
      (sum, item) => sum + Number(item.dprUnderTakingN),
      0
    );

    this.isDPRNUnderStatusTotal = data.reduce(
      (sum, item) => sum + Number(item.dprUnderStatusN),
      0
    );

    this.isDPRGTotal = data.reduce(
      (sum, item) => sum + Number(item.genderNpdApproved),
      0
    );
    this.isDPRGUnderTakingTotal = data.reduce(
      (sum, item) => sum + Number(item.dprUnderTakingG),
      0
    );

    this.isDPRGUnderStatusTotal = data.reduce(
      (sum, item) => sum + Number(item.dprUnderStatusG),
      0
    );
  }

  getFirstFiveDigits(num: string): string {
    return num.slice(0, 8);
  }

  excelDownload() {
    const wb = XLSX.utils.book_new();
    const data = this.getTableData();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    const customHeader = this.createCustomHeader();
    XLSX.utils.sheet_add_aoa(ws, customHeader, { origin: "A1" });
    let merge = [];

    // Specify the merged cells range
    merge = [
      { s: { r: 0, c: 2 }, e: { r: 0, c: 4 } },
      { s: { r: 0, c: 5 }, e: { r: 0, c: 7 } },
      { s: { r: 0, c: 8 }, e: { r: 0, c: 10 } },
      { s: { r: 0, c: 11 }, e: { r: 0, c: 13 } },
      { s: { r: 0, c: 14 }, e: { r: 0, c: 16 } },
      { s: { r: 0, c: 17 }, e: { r: 0, c: 19 } },
    ];
    // Apply style and set values in the merged range
    for (let col = 2; col <= 19; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (col >= 2 && col <= 4) {
        // Set value for the merged cell 23456
        ws[cellAddress].v = "MERU";
      } else if (col >= 5 && col <= 7) {
        // Set value for the merged cell 7 8 9 10 11

        ws[cellAddress].v = "Strengthen University";
      } else if (col >= 8 && col <= 10) {
        // Set value for the merged cell 12 13 14 15 16
        ws[cellAddress].v = "Strengthen College";
      } else if (col >= 11 && col <= 13) {
        // Set value for the merged cell 17 18 19 20 21
        ws[cellAddress].v = "NMDC";
      } else if (col >= 14 && col <= 16) {
        // Set value for the merged cell 22 23 24 25 26
        ws[cellAddress].v = "GI&EI";
      } else if (col >= 17 && col <= 19) {
        ws[cellAddress].v = "Total";
      }
    }

    // Add the merges property to the worksheet
    ws["!merges"] = merge;

    for (var i in ws) {
      if (typeof ws[i] != "object") continue;
      let cell = XLSX.utils.decode_cell(i);

      ws[i].s = {
        // styling for all cells
        font: {
          name: "arial",
        },
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: "1", // any truthy value here
        },
        border: {
          right: {
            style: "thin",
            color: "000000",
          },
          left: {
            style: "thin",
            color: "000000",
          },
        },
      };
      if (cell.r == 0) {
        // first row
        ws[i].s.font = { bold: true, size: 16 };
        ws[i].s.border.bottom = {
          // bottom border
          style: "thin",
          color: "000000",
        };
      }
      if (cell.r == 1) {
        ws[i].s.font = { bold: true, size: 16 };
        ws[i].s.border.bottom = {
          // bottom border
          style: "thin",
          color: "000000",
        };
      }
      if (cell.r) {
        ws[i].s.border.bottom = {
          // bottom border
          style: "thin",
          color: "000000",
        };
      }
      if (cell.r && cell.c == 1) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "B8DAFF" },
          bgColor: { rgb: "B8DAFF" },
        };
      }

      if ((cell.r == 0 && cell.c == 1) || (cell.r == 1 && cell.c == 1)) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "B8DAFF" },
          bgColor: { rgb: "B8DAFF" },
        };
      }

      if (cell.r == 0 && cell.c == 2) {
        // every other row
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "D6D8DB" },
          bgColor: { rgb: "D6D8DB" },
        };
      }
      if (
        (cell.c == 2 && cell.r == 1) ||
        (cell.r == 1 && cell.c == 3) ||
        (cell.r == 1 && cell.c == 4)
      ) {
        // every other row
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "D6D8DB" },
          bgColor: { rgb: "D6D8DB" },
        };
      }
      if (
        (cell.c == 2 && cell.r) ||
        (cell.r && cell.c == 3) ||
        (cell.r && cell.c == 4)
      ) {
        // every other row
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "D6D8DB" },
          bgColor: { rgb: "D6D8DB" },
        };
      }
      if (cell.r == 0 && cell.c == 5) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "C3E6CB" },
          bgColor: { rgb: "C3E6CB" },
        };
      }
      if (
        (cell.r == 1 && cell.c == 5) ||
        (cell.r == 1 && cell.c == 6) ||
        (cell.r == 1 && cell.c == 7)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "C3E6CB" },
          bgColor: { rgb: "C3E6CB" },
        };
      }
      if (
        (cell.r && cell.c == 5) ||
        (cell.r && cell.c == 6) ||
        (cell.r && cell.c == 7)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "C3E6CB" },
          bgColor: { rgb: "C3E6CB" },
        };
      }

      if (cell.r == 0 && cell.c == 8) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "BEE5EB" },
          bgColor: { rgb: "BEE5EB" },
        };
      }
      if (
        (cell.r == 1 && cell.c == 8) ||
        (cell.r == 1 && cell.c == 9) ||
        (cell.r == 1 && cell.c == 10)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "BEE5EB" },
          bgColor: { rgb: "BEE5EB" },
        };
      }
      if (
        (cell.r && cell.c == 8) ||
        (cell.r && cell.c == 9) ||
        (cell.r && cell.c == 10)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "BEE5EB" },
          bgColor: { rgb: "BEE5EB" },
        };
      }

      if (cell.r == 0 && cell.c == 11) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "F5C6CB" },
          bgColor: { rgb: "F5C6CB" },
        };
      }
      if (
        (cell.r == 1 && cell.c == 11) ||
        (cell.r == 1 && cell.c == 12) ||
        (cell.r == 1 && cell.c == 13)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "F5C6CB" },
          bgColor: { rgb: "F5C6CB" },
        };
      }
      if (
        (cell.r && cell.c == 11) ||
        (cell.r && cell.c == 12) ||
        (cell.r && cell.c == 13)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "F5C6CB" },
          bgColor: { rgb: "F5C6CB" },
        };
      }

      if (cell.r == 0 && cell.c == 14) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "FFEEBA" },
          bgColor: { rgb: "FFEEBA" },
        };
      }
      if (
        (cell.r == 1 && cell.c == 14) ||
        (cell.r == 1 && cell.c == 15) ||
        (cell.r == 1 && cell.c == 16)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "FFEEBA" },
          bgColor: { rgb: "FFEEBA" },
        };
      }
      if (
        (cell.r && cell.c == 14) ||
        (cell.r && cell.c == 15) ||
        (cell.r && cell.c == 16)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "FFEEBA" },
          bgColor: { rgb: "FFEEBA" },
        };
      }
      if (cell.r == 0 && cell.c == 17) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "BEE5EB" },
          bgColor: { rgb: "BEE5EB" },
        };
      }
      if (
        (cell.r == 1 && cell.c == 17) ||
        (cell.r == 1 && cell.c == 18) ||
        (cell.r == 1 && cell.c == 19)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "BEE5EB" },
          bgColor: { rgb: "BEE5EB" },
        };
      }
      if (
        (cell.r && cell.c == 17) ||
        (cell.r && cell.c == 18) ||
        (cell.r && cell.c == 19)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "BEE5EB" },
          bgColor: { rgb: "BEE5EB" },
        };
      }

      if (cell.r === this.tempConsolidatedList.length + 2) {
        ws[i].s.font = { bold: true, size: 16 };
        ws[i].s.fill = {
          patternType: "solid",
          fgColor: { rgb: "C6BFB5" },
          bgColor: { rgb: "C6BFB5" },
        };
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "report.xlsx");
  }

  getTableData(): any[][] {
    const tableData = [
      [
        "S.No.",
        "State",
        "MERU",
        "Strength University",
        "Strength College",
        "NMDC",
        "GI&EI",
        "Total",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [],
    ];

    this.tempConsolidatedList.forEach((element, i) => {
      tableData.push([
        i + this.StartLimit + 1,
        element.stateName,
        element.meruFinalSubmiited,
        element.isSaaForwardedCount,
        // element.consultantName,
        // element.consultantStatus,
        element.isNpdApproved,

        element.universityFinalSubmitted,
        element.universityForword,
        // element.universityConst,
        // element.universityStatus,
        element.unisityNpdApproved,

        element.collegeFinalSubmitted,
        element.collegeForword,
        // element.collegeConst,
        // element.collegeStatus,
        element.collegeNpdApproved,

        element.nmdcFinalSubmitted,
        element.nmdcForword,
        // element.nmdcConst,
        // element.nmdcStatus,
        element.nmdcNpdApproved,

        element.genderFinalSubmitted,
        element.genderForword,
        // element.genderConst,
        // element.genderStatus,
        element.genderNpdApproved,

        element.AllTotalfilled,
        element.AllTotalSubmitted,
        element.AllTotalApproved,
      ]);
    });

    tableData.push([
      "",
      "Total",
      this.meruFinalSubmiitedTotal,
      this.isSaaForwardedCountTotal,
      this.consultantStatusNpdApprovedTotal,
      this.universityFinalSubmittedTotal,
      this.universityForwordTotal,
      this.universityNpdApprovedTotal,
      this.collegeFinalSubmittedTotal,
      this.collegeForwordTotal,
      this.collegeNpdApprovedTotal,
      this.nmdcFinalSubmittedTotal,
      this.nmdcForwordTotal,
      this.nmdcNpdApprovedTotal,
      this.genderFinalSubmittedTotal,
      this.genderForwordTotal,
      this.genderNpdApprovedTotal,
      this.TotalAllFilled,
      this.TotalAllSubmitted,
      this.TotalAllApproved,
    ]);

    return tableData;
  }

  createCustomHeader(): any[][] {
    let header: any[][];

    header = [
      [
        "",
        "",
        "MERU",
        "",
        "Strengthen University",
        "",
        "Strengthen College",
        "",
        "NMDC",
        "",
        "GI&EI",
        "",
        "Total",
      ],
      [
        "S.No.",
        "State",
        "Filled",
        "Submitted",
        "Approved",
        "Filled",
        "Submitted",
        "Approved",
        "Filled",
        "Submitted",
        "Approved",
        "Filled",
        "Submitted",
        "Approved",
        "Filled",
        "Submitted",
        "Approved",
        "Filled",
        "Submitted",
        "Approved",
      ],
    ];

    return header;
  }

  downloadPdf() {
    // var doc = new jsPDF({
    //   orientation: "landscape",
    // });
    const doc = new jsPDF({ orientation: "landscape", unit: "px" });
    //current date and time
    var today = new Date();
    var date =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var CurrentDateTime = date + " " + time;
    doc.setFont("times");
    // let i = 0;
    let pdfData = [];
    this.meruFinalSubmiited = 0;
    this.isSaaForwardedCount = 0;
    this.consultantName = 0;
    this.consultantStatus = 0;
    this.isNpdApproved = 0;
    this.universityFinalSubmitted = 0;
    this.universityForword = 0;
    this.universityConst = 0;
    this.universityStatus = 0;
    this.unisityNpdApproved = 0;
    this.collegeFinalSubmitted = 0;
    this.collegeForword = 0;
    this.collegeConst = 0;
    this.collegeStatus = 0;
    this.collegeNpdApproved = 0;
    this.nmdcFinalSubmitted = 0;
    this.nmdcForword = 0;
    this.nmdcConst = 0;
    this.nmdcStatus = 0;
    this.nmdcNpdApproved = 0;
    this.genderFinalSubmitted = 0;
    this.genderForword = 0;
    this.genderConst = 0;
    this.genderStatus = 0;
    this.genderNpdApproved = 0;

    let head: any = [];

    for (let i = 0; i < this.tempConsolidatedList.length; i++) {
      pdfData.push({
        "0": i + 1,

        "1": this.tempConsolidatedList[i].stateName,
        // '1':{ title:JSON.stringify(this.tempConsolidatedList[i].stateName), colSpan: 4, rowSpan: 0, styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2, lineColor: [0, 0, 0] } },
        "2": this.tempConsolidatedList[i].meruFinalSubmiited,
        "3": this.tempConsolidatedList[i].isSaaForwardedCount,
        // '4': this.tempConsolidatedList[i].consultantName,
        // '5': this.tempConsolidatedList[i].consultantStatus,
        "4": this.tempConsolidatedList[i].isNpdApproved,

        "5": this.tempConsolidatedList[i].universityFinalSubmitted,
        "6": this.tempConsolidatedList[i].universityForword,
        // '9': this.tempConsolidatedList[i].universityConst,
        // '10': this.tempConsolidatedList[i].universityStatus,
        "7": this.tempConsolidatedList[i].unisityNpdApproved,

        "8": this.tempConsolidatedList[i].collegeFinalSubmitted,
        "9": this.tempConsolidatedList[i].collegeForword,
        // '14': this.tempConsolidatedList[i].collegeConst,
        // '15': this.tempConsolidatedList[i].collegeStatus,
        "10": this.tempConsolidatedList[i].collegeNpdApproved,

        "11": this.tempConsolidatedList[i].nmdcFinalSubmitted,
        "12": this.tempConsolidatedList[i].nmdcForword,
        // '19': this.tempConsolidatedList[i].nmdcConst,
        // '20': this.tempConsolidatedList[i].nmdcStatus,
        "13": this.tempConsolidatedList[i].nmdcNpdApproved,

        "14": this.tempConsolidatedList[i].genderFinalSubmitted,
        "15": this.tempConsolidatedList[i].genderForword,
        // '24': this.tempConsolidatedList[i].genderConst,
        // '25': this.tempConsolidatedList[i].genderStatus,
        "16": this.tempConsolidatedList[i].genderNpdApproved,

        "17": this.tempConsolidatedList[i].AllTotalfilled,
        "18": this.tempConsolidatedList[i].AllTotalSubmitted,
        "19": this.tempConsolidatedList[i].AllTotalApproved,
      });
    }
    head = [
      [
        {
          title: "State Wise Proposal Report",
          colSpan: 20,
          rowSpan: 0,
          styles: {
            halign: "center",
            fillColor: [243, 243, 243],
            textColor: [0, 0, 0],
            lineWidth: 1,
            lineColor: [0, 0, 0],
          },
        },
      ],

      [
        {
          title: "S.No.",
          colSpan: 1,
          rowSpan: 2,
          styles: {
            halign: "center",
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            cellWidth: "wrap",
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "State Name",
          colSpan: 1,
          rowSpan: 2,
          styles: {
            halign: "center",
            cellWidth: "wrap",
            padding: 10,
            fillColor: [153, 204, 255],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "MERU",
          colSpan: 3,
          rowSpan: 0,
          styles: {
            halign: "center",
            fillColor: [214, 216, 219],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "Strengthen University",
          colSpan: 3,
          rowSpan: 0,
          styles: {
            halign: "center",
            fillColor: [195, 230, 203],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "Strengthen College",
          colSpan: 3,
          rowSpan: 0,
          styles: {
            halign: "center",
            fillColor: [190, 229, 235],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "NMDC",
          colSpan: 3,
          rowSpan: 0,
          styles: {
            halign: "center",
            fillColor: [245, 198, 203],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "GI&EI",
          colSpan: 3,
          rowSpan: 0,
          styles: {
            halign: "center",
            fillColor: [255, 238, 186],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
          },
        },

        {
          title: "Total",
          colSpan: 3,
          rowSpan: 0,
          styles: {
            halign: "center",
            fillColor: [190, 229, 235],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            lineColor: [0, 0, 0],
          },
        },
      ],

      [
        // { title: "S.No.", styles: { halign: 'center', fillColor: [255, 255, 255], textColor: [0, 0, 0], lineWidth: 0.2,
        // cellWidth: 'wrap', lineColor: [0, 0, 0] } },
        // { title: "State Name",  styles: { halign: 'center', fillColor: [153, 204, 255], textColor: [0, 0, 0], lineWidth: 0.2,
        // cellWidth: 'wrap', lineColor: [0, 0, 0] } },

        {
          title: "Filled",
          styles: {
            halign: "center",
            fillColor: [214, 216, 219],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "Submitted",
          styles: {
            halign: "center",
            fillColor: [214, 216, 219],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        // { title: "Allotted", styles: { halign: 'center', fillColor: [214,216,219], textColor: [0, 0, 0], lineWidth: 0.2,
        // minCellWidth:10, lineColor: [0, 0, 0] } },
        // { title: "Scrutiny", styles: { halign: 'center', fillColor: [214,216,219], textColor: [0, 0, 0], lineWidth: 0.2,
        // minCellWidth:10, lineColor: [0, 0, 0] } },
        {
          title: "Approved",
          styles: {
            halign: "center",
            fillColor: [214, 216, 219],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },

        {
          title: "Filled",
          styles: {
            halign: "center",
            fillColor: [195, 230, 203],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "Submitted",
          styles: {
            halign: "center",
            fillColor: [195, 230, 203],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        // { title: "Allotted", styles: { halign: 'center', fillColor: [195,230,203], textColor: [0, 0, 0], lineWidth: 0.2,
        // minCellWidth:10, lineColor: [0, 0, 0] } },
        // { title: "Scrutiny", styles: { halign: 'center', fillColor: [195,230,203], textColor: [0, 0, 0], lineWidth: 0.2,
        // minCellWidth:10, lineColor: [0, 0, 0] } },
        {
          title: "Approved",
          styles: {
            halign: "center",
            fillColor: [195, 230, 203],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },

        {
          title: "Filled",
          styles: {
            halign: "center",
            fillColor: [190, 229, 235],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "Submitted",
          styles: {
            halign: "center",
            fillColor: [190, 229, 235],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        // { title: "Allotted", styles: { halign: 'center', fillColor: [190,229,235], textColor: [0, 0, 0], lineWidth: 0.2,
        // minCellWidth:10, lineColor: [0, 0, 0] } },
        // { title: "Scrutiny", styles: { halign: 'center', fillColor: [190,229,235], textColor: [0, 0, 0], lineWidth: 0.2,
        // minCellWidth:10, lineColor: [0, 0, 0] } },
        {
          title: "Approved",
          styles: {
            halign: "center",
            fillColor: [190, 229, 235],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },

        {
          title: "Filled",
          styles: {
            halign: "center",
            fillColor: [245, 198, 203],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "Submitted",
          styles: {
            halign: "center",
            fillColor: [245, 198, 203],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        // { title: "Allotted", styles: { halign: 'center', fillColor: [245,198,203], textColor: [0, 0, 0], lineWidth: 0.2,
        // minCellWidth:10,lineColor: [0, 0, 0] } },
        // { title: "Scrutiny", styles: { halign: 'center', fillColor: [245,198,203], textColor: [0, 0, 0], lineWidth: 0.2,
        // minCellWidth:10,lineColor: [0, 0, 0] } },
        {
          title: "Approved",
          styles: {
            halign: "center",
            fillColor: [245, 198, 203],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },

        {
          title: "Filled",
          styles: {
            halign: "center",
            fillColor: [255, 238, 186],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "Submitted",
          styles: {
            halign: "center",
            fillColor: [255, 238, 186],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        // { title: "Allotted", styles: { halign: 'center', fillColor: [255,238,186], textColor: [0, 0, 0], lineWidth: 0.2,
        // minCellWidth:10, lineColor: [0, 0, 0] } },
        // { title: "Scrutiny", styles: { halign: 'center', fillColor: [255,238,186], textColor: [0, 0, 0], lineWidth: 0.2,
        // minCellWidth:10, lineColor: [0, 0, 0] } },
        {
          title: "Approved",
          styles: {
            halign: "center",
            fillColor: [255, 238, 186],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "Filled",
          styles: {
            halign: "center",
            fillColor: [190, 229, 235],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "Submitted",
          styles: {
            halign: "center",
            fillColor: [190, 229, 235],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
        {
          title: "Approved",
          styles: {
            halign: "center",
            fillColor: [190, 229, 235],
            textColor: [0, 0, 0],
            lineWidth: 0.2,
            minCellWidth: 10,
            lineColor: [0, 0, 0],
          },
        },
      ],
    ];

    autoTable(doc, {
      head: head,
      body: pdfData,

      columnStyles: {
        0: { halign: "center" },
        1: { halign: "center", fillColor: [153, 204, 255] },
        2: { halign: "center", fillColor: [214, 216, 219] },
        3: { halign: "center", fillColor: [214, 216, 219] },
        4: { halign: "center", fillColor: [214, 216, 219] },
        5: { halign: "center", fillColor: [195, 230, 203] },
        6: { halign: "center", fillColor: [195, 230, 203] },
        7: { halign: "center", fillColor: [195, 230, 203] },
        8: { halign: "center", fillColor: [190, 229, 235] },
        9: { halign: "center", fillColor: [190, 229, 235] },
        10: { halign: "center", fillColor: [190, 229, 235] },
        11: { halign: "center", fillColor: [245, 198, 203] },
        12: { halign: "center", fillColor: [245, 198, 203] },
        13: { halign: "center", fillColor: [245, 198, 203] },
        14: { halign: "center", fillColor: [255, 238, 186] },
        15: { halign: "center", fillColor: [255, 238, 186] },
        16: { halign: "center", fillColor: [255, 238, 186] },
        17: { halign: "center", fillColor: [190, 229, 235] },
        18: { halign: "center", fillColor: [190, 229, 235] },
        19: { halign: "center", fillColor: [190, 229, 235] },
      },
      foot: [
        [
          {
            title: "Total",
            colSpan: 2,
            rowSpan: 0,
            styles: {
              halign: "center",
              fillColor: [198, 191, 181],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          {
            title: JSON.stringify(this.meruFinalSubmiitedTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          {
            title: JSON.stringify(this.isSaaForwardedCountTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          // { title: JSON.stringify(this.consultantNameTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          // { title: JSON.stringify(this.consultantStatusTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          {
            title: JSON.stringify(this.consultantStatusNpdApprovedTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },

          {
            title: JSON.stringify(this.universityFinalSubmittedTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          {
            title: JSON.stringify(this.universityForwordTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          // { title: JSON.stringify(this.universityConstTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          // { title: JSON.stringify(this.universityStatusTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          {
            title: JSON.stringify(this.universityNpdApprovedTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },

          {
            title: JSON.stringify(this.collegeFinalSubmittedTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          {
            title: JSON.stringify(this.collegeForwordTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          // { title: JSON.stringify(this.collegeConstTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          // { title: JSON.stringify(this.collegeStatusTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          {
            title: JSON.stringify(this.collegeNpdApprovedTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },

          {
            title: JSON.stringify(this.nmdcFinalSubmittedTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          {
            title: JSON.stringify(this.nmdcForwordTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          // { title: JSON.stringify(this.nmdcConstTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          // { title: JSON.stringify(this.nmdcStatusTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          {
            title: JSON.stringify(this.nmdcNpdApprovedTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },

          {
            title: JSON.stringify(this.genderFinalSubmittedTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          {
            title: JSON.stringify(this.genderForwordTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          // { title: JSON.stringify(this.genderConstTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          // { title: JSON.stringify(this.genderStatusTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          {
            title: JSON.stringify(this.genderNpdApprovedTotal),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },

          {
            title: JSON.stringify(this.TotalAllFilled),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          {
            title: JSON.stringify(this.TotalAllSubmitted),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
          // { title: JSON.stringify(this.genderConstTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          // { title: JSON.stringify(this.genderStatusTotal), styles: { halign: 'center', fillColor: [197,167,127], textColor: [0, 0, 0], lineWidth: 0.1, lineColor: [0, 0, 0] } },
          {
            title: JSON.stringify(this.TotalAllApproved),
            styles: {
              halign: "center",
              fillColor: [197, 167, 127],
              textColor: [0, 0, 0],
              lineWidth: 0.1,
              lineColor: [0, 0, 0],
            },
          },
        ],
      ],
      footStyles: {
        fillColor: [217, 217, 214],
        textColor: [0, 0, 0],
        fontSize: 12,
      },
      showFoot: "lastPage",
      startY: 5,
      tableLineColor: 200,
      showHead: "everyPage",
      theme: "grid",
      margin: { top: 5 },
      styles: { font: "times", halign: "center", lineColor: [0, 0, 0] },
    });

    doc.setFontSize(12);
    const totalPages = doc.internal.pages.length - 1;
    const currentPage = doc.internal.pages.length - 1;

    doc.setFontSize(12);
    doc.text(`Page :  ${currentPage}` + `of ${totalPages}`, 30, 425);

    // doc.text(`Page : ` + 1 + `of ` + 1, 30, 200);
    doc.text(`Generate Date & Time : ` + CurrentDateTime, 90, 425);
    // Adjust the coordinates (90, 425) as needed for your desired margin
    doc.save("State Wise Proposal Report.pdf");
  }

  tabSelected(value: MatTabChangeEvent) {
    sessionStorage.setItem("activeTabIndex", value.index.toString());
    this.selectedIndex = value.index;
    if (this.selectedIndex === 2) {
      this.pabNumber = null;
      this.cachedData.getData("stateList").subscribe((data) => {
        if (data && data.length > 0) {
          this.stateList = data;
          // this.getConsolidate();
        } else {
          this.getSateData();
        }
      });
      // this.getSateDataList();
      this.getDprStatusData();
      this.componentIdList();
    }
    // else if (this.selectedIndex === 3) {
    //   if (sessionStorage.getItem('report') === 'true') {
    //     sessionStorage.removeItem('report');
    //     this.tabIndex = true;
    //      const storedToggle = sessionStorage.getItem('isToggled');
    //     if (storedToggle !== null) {
    //       this.isToggled = JSON.parse(storedToggle);
    //     }
    //     this.stateName = String(sessionStorage.getItem('stateFilterName'));
    //     const compVal = Number(sessionStorage.getItem('componetFilterName'));
    //     this.componetName = isNaN(compVal) ? 'ALL' : compVal;
    //     // this.stateNameAch = String(sessionStorage.getItem('stateFilterNameAch'));
    //     // const compValAch = Number(sessionStorage.getItem('componetFilterNameAch'));
    //     // this.componetNameAch = isNaN(compValAch) ? 'ALL' : compValAch;
    //     this.componentIdList()
    //     this.getSateDataList();
    //      this.cachedData.getData('proposalOutComesArr').subscribe((data) => {
    //       if (data && data.length > 0) {
    //         this.proposalOutComesArr = data;
    //         this.updatePaginatedData();
    //       }
    //       });
    //       this.cachedData.getData('proposalOutAchiveArr').subscribe((data) => {
    //       if (data && data.length > 0) {
    //         this.proposalOutAchiveArr = data;
    //         this.updatePaginatedDataAchivment();
    //       }
    //       });

    //   }
    //   else if (sessionStorage.getItem('report') === null) {
    //     this.tabIndex = true
    //     this.stateName = 'ALL'
    //     this.componetName = 'ALL'
    //     // this.stateNameAch = 'ALL'
    //     // this.componetNameAch = 'ALL'
    //     this.collegeList();
    //     this.componentIdList()
    //     this.getSateDataList();
    //   }

    // }
    // else if (this.selectedIndex === 4) {
    //   if (sessionStorage.getItem('report') === 'true') {
    //     sessionStorage.removeItem('report');
    //     this.tabIndex = true;
    //      const storedToggle = sessionStorage.getItem('isToggled');
    //     if (storedToggle !== null) {
    //       this.isToggled = JSON.parse(storedToggle);
    //     }
    //     this.stateName = String(sessionStorage.getItem('stateFilterName'));
    //     const compVal = Number(sessionStorage.getItem('componetFilterName'));
    //     this.componetName = isNaN(compVal) ? 'ALL' : compVal;
    //     // this.stateNameAch = String(sessionStorage.getItem('stateFilterNameAch'));
    //     // const compValAch = Number(sessionStorage.getItem('componetFilterNameAch'));
    //     // this.componetNameAch = isNaN(compValAch) ? 'ALL' : compValAch;
    //     this.componentIdList()
    //     this.getSateDataList();
    //     //  this.cachedData.getData('proposalOutComesArr').subscribe((data) => {
    //     //   if (data && data.length > 0) {
    //     //     this.proposalOutComesArr = data;
    //     //     this.updatePaginatedData();
    //     //   }
    //     //   });
    //       this.cachedData.getData('proposalOutAchiveArr').subscribe((data) => {
    //       if (data && data.length > 0) {
    //         this.proposalOutAchiveArr = data;
    //         this.updatePaginatedDataAchivment();
    //       }
    //       });

    //   }
    //   else if (sessionStorage.getItem('report') === null) {
    //     this.tabIndex = true
    //     this.stateName = 'ALL'
    //     this.componetName = 'ALL'
    //     // this.stateNameAch = 'ALL'
    //     // this.componetNameAch = 'ALL'
    //     this.collegeListAch();
    //     this.componentIdList()
    //     this.getSateDataList();
    //   }

    // }
    else if (this.selectedIndex === 3) {
      // this.tabIndex  = true
      this.stateName = "ALL";
      this.rusaPhase = "ALL";
      this.componetName = "ALL";
      this.getPmUshaReportDetails();
      // this.componentIdList()
      // this.changeComponentList()
      this.getSateDataList();
    } else if (this.selectedIndex === 4) {
      console.log('22')
      if (sessionStorage.getItem("report") === "true") {
        sessionStorage.removeItem("report");
        this.tabIndex = true;
        this.stateName = String(sessionStorage.getItem("stateFilterName"));
        const compVal = Number(sessionStorage.getItem("componetFilterName"));
        this.componetName = isNaN(compVal) ? "ALL" : compVal;
        this.componentIdList();
        this.getSateDataList();
        this.getDistrict(this.stateName);
        this.districtId = sessionStorage.getItem("districtFilterName");
        this.cachedData.getData("collegeList").subscribe((data) => {
          if (data && data.length > 0) {
            this.collegeListData = data;
            this.updatePaginatedTagData();
          }
        })
          setTimeout(() => {
              if (this.gridApi) {
                this.gridApi.sizeColumnsToFit();
              }
            }, 200);
          // setTimeout(() => this.resizeGrid(), 200);
      } else if (sessionStorage.getItem("report") === null) {
        this.tabIndex = true;
        this.stateName = "ALL";
        this.componetName = "ALL";
        this.districtId = "ALL";
        this.collegeList1();
        this.componentIdList();
        this.getSateDataList();
        this.updateResults();
         console.log('991')
        setTimeout(() => {
          if (this.gridApi) {
            this.gridApi.sizeColumnsToFit();
          }
        }, 200);
      }
    } else if (this.selectedIndex === 5) {
      this.stateName = "ALL";
      this.districtId = "ALL";
      this.componetName = "ALL";
      this.proposalActivityId = this.proposalActivityId
        ? this.proposalActivityId
        : "";
      // this.collegeListDataTag = []
      this.getSateDataList();
      this.componentIdList();
      this.refActivity();
      // this.collegeTagReport()
    } else if (value.index === 0 || value.index === 1) {
      this.pabNumber = null;
      this.getConsolidate();
    }
  }

  resizeGrid() {
    if (this.gridApi && this.gridColumnApi) {
      this.gridApi.sizeColumnsToFit();
      this.gridColumnApi.autoSizeAllColumns();
    }
  }

  clearAll() {
    this.stateName = "ALL";
    this.componetName = "ALL";
    (this.rusaPhase = "ALL"), (this.componetNameFilter = -1);
    // this.componentList = []
    this.collegeList();
    this.getPmUshaReportDetails();
  }

  clearAllAch() {
    this.stateNameAch = "ALL";
    this.componetNameAch = "ALL";
    // this.componentList = []
    this.findOutcomeAch();
  }

  // pab excel
  excelDownloadPab() {
    const wb = XLSX.utils.book_new();
    const data = this.getTableDataPab();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    const customHeader = this.createCustomHeaderPab();
    XLSX.utils.sheet_add_aoa(ws, customHeader, { origin: "A1" });
    let merge = [];

    // Specify the merged cells range
    merge = [
      { s: { r: 0, c: 2 }, e: { r: 0, c: 5 } },
      { s: { r: 0, c: 6 }, e: { r: 0, c: 9 } },
      { s: { r: 0, c: 10 }, e: { r: 0, c: 13 } },
      { s: { r: 0, c: 14 }, e: { r: 0, c: 17 } },
      { s: { r: 0, c: 18 }, e: { r: 0, c: 21 } },
      { s: { r: 0, c: 22 }, e: { r: 0, c: 25 } },
    ];
    // Apply style and set values in the merged range
    for (let col = 2; col <= 25; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (col >= 2 && col <= 5) {
        // Set value for the merged cell 23456
        ws[cellAddress].v = "MERU";
      } else if (col >= 6 && col <= 9) {
        // Set value for the merged cell 7 8 9 10 11

        ws[cellAddress].v = "Strengthen University";
      } else if (col >= 10 && col <= 13) {
        // Set value for the merged cell 12 13 14 15 16
        ws[cellAddress].v = "Strengthen College";
      } else if (col >= 14 && col <= 17) {
        // Set value for the merged cell 17 18 19 20 21
        ws[cellAddress].v = "NMDC";
      } else if (col >= 18 && col <= 21) {
        // Set value for the merged cell 22 23 24 25 26
        ws[cellAddress].v = "GI&EI";
      } else if (col >= 22 && col <= 25) {
        // Set value for the merged cell 22 23 24 25 26
        ws[cellAddress].v = "Total";
      }
    }

    // Add the merges property to the worksheet
    ws["!merges"] = merge;

    for (var i in ws) {
      if (typeof ws[i] != "object") continue;
      let cell = XLSX.utils.decode_cell(i);

      ws[i].s = {
        // styling for all cells
        font: {
          name: "arial",
        },
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: "1", // any truthy value here
        },
        border: {
          right: {
            style: "thin",
            color: "000000",
          },
          left: {
            style: "thin",
            color: "000000",
          },
        },
      };
      if (cell.r == 0) {
        // first row
        ws[i].s.font = { bold: true, size: 16 };
        ws[i].s.border.bottom = {
          // bottom border
          style: "thin",
          color: "000000",
        };
      }
      if (cell.r == 1) {
        ws[i].s.font = { bold: true, size: 16 };
        ws[i].s.border.bottom = {
          // bottom border
          style: "thin",
          color: "000000",
        };
      }
      if (cell.r) {
        ws[i].s.border.bottom = {
          // bottom border
          style: "thin",
          color: "000000",
        };
      }
      if (cell.r && cell.c == 1) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "B8DAFF" },
          bgColor: { rgb: "B8DAFF" },
        };
      }

      if ((cell.r == 0 && cell.c == 1) || (cell.r == 1 && cell.c == 1)) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "B8DAFF" },
          bgColor: { rgb: "B8DAFF" },
        };
      }

      if (cell.r == 0 && cell.c == 2) {
        // every other row
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "D6D8DB" },
          bgColor: { rgb: "D6D8DB" },
        };
      }
      if (
        (cell.c == 2 && cell.r == 1) ||
        (cell.r == 1 && cell.c == 3) ||
        (cell.r == 1 && cell.c == 4) ||
        (cell.r == 1 && cell.c == 5)
      ) {
        // every other row
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "D6D8DB" },
          bgColor: { rgb: "D6D8DB" },
        };
      }
      if (
        (cell.c == 2 && cell.r) ||
        (cell.r && cell.c == 3) ||
        (cell.r && cell.c == 4) ||
        (cell.r && cell.c == 5)
      ) {
        // every other row
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "D6D8DB" },
          bgColor: { rgb: "D6D8DB" },
        };
      }
      if (cell.r == 0 && cell.c == 6) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "C3E6CB" },
          bgColor: { rgb: "C3E6CB" },
        };
      }
      if (
        (cell.r == 1 && cell.c == 6) ||
        (cell.r == 1 && cell.c == 7) ||
        (cell.r == 1 && cell.c == 8) ||
        (cell.r == 1 && cell.c == 9)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "C3E6CB" },
          bgColor: { rgb: "C3E6CB" },
        };
      }
      if (
        (cell.r && cell.c == 6) ||
        (cell.r && cell.c == 7) ||
        (cell.r && cell.c == 8) ||
        (cell.r && cell.c == 9)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "C3E6CB" },
          bgColor: { rgb: "C3E6CB" },
        };
      }

      if (cell.r == 0 && cell.c == 10) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "BEE5EB" },
          bgColor: { rgb: "BEE5EB" },
        };
      }
      if (
        (cell.r == 1 && cell.c == 10) ||
        (cell.r == 1 && cell.c == 11) ||
        (cell.r == 1 && cell.c == 12) ||
        (cell.r == 1 && cell.c == 13)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "BEE5EB" },
          bgColor: { rgb: "BEE5EB" },
        };
      }
      if (
        (cell.r && cell.c == 10) ||
        (cell.r && cell.c == 11) ||
        (cell.r && cell.c == 12) ||
        (cell.r && cell.c == 13)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "BEE5EB" },
          bgColor: { rgb: "BEE5EB" },
        };
      }

      if (cell.r == 0 && cell.c == 14) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "F5C6CB" },
          bgColor: { rgb: "F5C6CB" },
        };
      }
      if (
        (cell.r == 1 && cell.c == 14) ||
        (cell.r == 1 && cell.c == 15) ||
        (cell.r == 1 && cell.c == 16) ||
        (cell.r == 1 && cell.c == 17)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "F5C6CB" },
          bgColor: { rgb: "F5C6CB" },
        };
      }
      if (
        (cell.r && cell.c == 14) ||
        (cell.r && cell.c == 15) ||
        (cell.r && cell.c == 16) ||
        (cell.r && cell.c == 17)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "F5C6CB" },
          bgColor: { rgb: "F5C6CB" },
        };
      }

      if (cell.r == 0 && cell.c == 18) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "FFEEBA" },
          bgColor: { rgb: "FFEEBA" },
        };
      }
      if (
        (cell.r == 1 && cell.c == 18) ||
        (cell.r == 1 && cell.c == 19) ||
        (cell.r == 1 && cell.c == 20) ||
        (cell.r == 1 && cell.c == 21)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "FFEEBA" },
          bgColor: { rgb: "FFEEBA" },
        };
      }
      if (
        (cell.r && cell.c == 18) ||
        (cell.r && cell.c == 19) ||
        (cell.r && cell.c == 20) ||
        (cell.r && cell.c == 21)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "FFEEBA" },
          bgColor: { rgb: "FFEEBA" },
        };
      }

      if (cell.r === this.tempConsolidatedList.length + 2) {
        ws[i].s.font = { bold: true, size: 16 };
        ws[i].s.fill = {
          patternType: "solid",
          fgColor: { rgb: "C6BFB5" },
          bgColor: { rgb: "C6BFB5" },
        };
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "report.xlsx");
  }

  getTableDataPab(): any[][] {
    const tableData = [
      [
        "S.No.",
        "State",
        "MERU",
        "Strength University",
        "Strength College",
        "NMDC",
        "GI&EI",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "Total",
      ],
      [],
    ];

    this.tempConsolidatedList.forEach((element, i) => {
      tableData.push([
        i + this.StartLimit + 1,
        element.stateName,
        element.isSaaForwardedCount,
        element.isNpdApproved,
        element.MeruRevisedProposalForwardedtoNpd,
        element.meruCost,

        element.universityForword,
        element.unisityNpdApproved,
        element.UnivRevisedProposalForwardedtoNpd,
        element.uniCost,

        element.collegeForword,
        element.collegeNpdApproved,
        element.CollegeRevisedProposalForwardedtoNpd,
        element.collegeCost,

        element.nmdcForword,
        element.nmdcNpdApproved,
        element.NMDCRevisedProposalForwardedtoNpd,
        element.nmdcCost,

        element.genderForword,
        element.genderNpdApproved,
        element.genderRevisedProposalForwardedtoNpd,
        element.genderCost,

        element.isSaaForwardedCount +
          element.universityForword +
          element.collegeForword +
          element.nmdcForword +
          element.genderForword,
        element.isNpdApproved +
          element.unisityNpdApproved +
          element.collegeNpdApproved +
          element.nmdcNpdApproved +
          element.genderNpdApproved,
        element.MeruRevisedProposalForwardedtoNpd +
          element.UnivRevisedProposalForwardedtoNpd +
          element.CollegeRevisedProposalForwardedtoNpd +
          element.NMDCRevisedProposalForwardedtoNpd +
          element.genderRevisedProposalForwardedtoNpd,
        element.meruCost +
          element.uniCost +
          element.collegeCost +
          element.nmdcCost +
          element.genderCost,
      ]);
    });

    tableData.push([
      "",
      "Total",
      this.isSaaForwardedCountTotal,
      this.consultantStatusNpdApprovedTotal,
      this.consultantStatusMeruNpdApprovedTotal,
      this.consultantStatusmeruCostTotal,
      this.universityForwordTotal,
      this.universityNpdApprovedTotal,
      this.universityRevisedNpdApprovedTotal,
      this.universityCostTotal,
      this.collegeForwordTotal,
      this.collegeNpdApprovedTotal,
      this.collegeRevisedNpdApprovedTotal,
      this.collegeCostTotal,
      this.nmdcForwordTotal,
      this.nmdcNpdApprovedTotal,
      this.nmdcRevisedNpdApprovedTotal,
      this.nmdcCostTotal,
      this.genderForwordTotal,
      this.genderNpdApprovedTotal,
      this.genderRevisedNpdApprovedTotal,
      this.genderCostTotal,
      this.isSaaForwardedCountTotal +
        this.universityForwordTotal +
        this.collegeForwordTotal +
        this.nmdcForwordTotal +
        this.genderForwordTotal,
      this.consultantStatusNpdApprovedTotal +
        this.universityNpdApprovedTotal +
        this.collegeNpdApprovedTotal +
        this.nmdcNpdApprovedTotal +
        this.genderNpdApprovedTotal,
      this.consultantStatusMeruNpdApprovedTotal +
        this.universityRevisedNpdApprovedTotal +
        this.collegeRevisedNpdApprovedTotal +
        this.nmdcRevisedNpdApprovedTotal +
        this.genderRevisedNpdApprovedTotal,
      this.consultantStatusmeruCostTotal +
        this.universityCostTotal +
        this.collegeCostTotal +
        this.nmdcCostTotal +
        this.genderCostTotal,
    ]);

    return tableData;
  }

  createCustomHeaderPab(): any[][] {
    let header: any[][];

    header = [
      [
        "",
        "",
        "MERU",
        "",
        "",
        "",
        "Strengthen University",
        "",
        "",
        "",
        "Strengthen College",
        "",
        "",
        "",
        "NMDC",
        "",
        "",
        "",
        "GI&EI",
        "",
        "",
        "",
        "Total",
        "",
        "",
        "",
      ],
      [
        "S.No",
        "State Name",
        "Submitted",
        "PAB(Initial)",
        "PAB(Revised)",
        "Cost(Revised)",
        "Submitted",
        "PAB(Initial)",
        "PAB(Revised)",
        "Cost(Revised)",
        "Submitted",
        "PAB(Initial)",
        "PAB(Revised)",
        "Cost(Revised)",
        "Submitted",
        "PAB(Initial)",
        "PAB(Revised)",
        "Cost(Revised)",
        "Submitted",
        "PAB(Initial)",
        "PAB(Revised)",
        "Cost(Revised)",
        "Submitted",
        "Approved(Initial)",
        "Approved(Revised)",
        "Cost(Revised)",
      ],
    ];

    return header;
  }

  excelDownloadDpr() {
    const wb = XLSX.utils.book_new();
    const data = this.getTableDataDPR();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    const customHeader = this.createCustomHeaderDPR();
    XLSX.utils.sheet_add_aoa(ws, customHeader, { origin: "A1" });
    let merge = [];

    // Specify the merged cells range
    merge = [
      { s: { r: 0, c: 2 }, e: { r: 0, c: 5 } },
      { s: { r: 0, c: 6 }, e: { r: 0, c: 9 } },
      { s: { r: 0, c: 10 }, e: { r: 0, c: 13 } },
      { s: { r: 0, c: 14 }, e: { r: 0, c: 17 } },
      { s: { r: 0, c: 18 }, e: { r: 0, c: 21 } },
      { s: { r: 0, c: 22 }, e: { r: 0, c: 25 } },
    ];
    // Apply style and set values in the merged range
    for (let col = 2; col <= 25; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (col >= 2 && col <= 5) {
        // Set value for the merged cell 23456
        ws[cellAddress].v = "MERU";
      } else if (col >= 6 && col <= 9) {
        // Set value for the merged cell 7 8 9 10 11

        ws[cellAddress].v = "Strengthen University";
      } else if (col >= 10 && col <= 13) {
        // Set value for the merged cell 12 13 14 15 16
        ws[cellAddress].v = "Strengthen College";
      } else if (col >= 14 && col <= 17) {
        // Set value for the merged cell 17 18 19 20 21
        ws[cellAddress].v = "NMDC";
      } else if (col >= 18 && col <= 21) {
        // Set value for the merged cell 22 23 24 25 26
        ws[cellAddress].v = "GI&EI";
      } else if (col >= 22 && col <= 25) {
        // Set value for the merged cell 22 23 24 25 26
        ws[cellAddress].v = "Total";
      }
    }

    // Add the merges property to the worksheet
    ws["!merges"] = merge;

    for (var i in ws) {
      if (typeof ws[i] != "object") continue;
      let cell = XLSX.utils.decode_cell(i);

      ws[i].s = {
        // styling for all cells
        font: {
          name: "arial",
        },
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: "1", // any truthy value here
        },
        border: {
          right: {
            style: "thin",
            color: "000000",
          },
          left: {
            style: "thin",
            color: "000000",
          },
        },
      };
      if (cell.r == 0) {
        // first row
        ws[i].s.font = { bold: true, size: 16 };
        ws[i].s.border.bottom = {
          // bottom border
          style: "thin",
          color: "000000",
        };
      }
      if (cell.r == 1) {
        ws[i].s.font = { bold: true, size: 16 };
        ws[i].s.border.bottom = {
          // bottom border
          style: "thin",
          color: "000000",
        };
      }
      if (cell.r) {
        ws[i].s.border.bottom = {
          // bottom border
          style: "thin",
          color: "000000",
        };
      }
      if (cell.r && cell.c == 1) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "B8DAFF" },
          bgColor: { rgb: "B8DAFF" },
        };
      }

      if ((cell.r == 0 && cell.c == 1) || (cell.r == 1 && cell.c == 1)) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "B8DAFF" },
          bgColor: { rgb: "B8DAFF" },
        };
      }

      // if (cell.r == 0 && cell.c == 2) {
      //   // every other row
      //   ws[i].s.fill = {
      //     // background color
      //     patternType: 'solid',
      //     fgColor: { rgb: 'D6D8DB' },
      //     bgColor: { rgb: 'D6D8DB' },
      //   };
      // }

      if (
        (cell.c == 2 && cell.r) ||
        (cell.r && cell.c == 3) ||
        (cell.r && cell.c == 4) ||
        (cell.r && cell.c == 5)
      ) {
        // every other row
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "D6D8DB" },
          bgColor: { rgb: "D6D8DB" },
        };
      }

      if (
        (cell.c == 6 && cell.r) ||
        (cell.r && cell.c == 7) ||
        (cell.r && cell.c == 8) ||
        (cell.r && cell.c == 9)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "C3E6CB" },
          bgColor: { rgb: "C3E6CB" },
        };
      }
      if (
        (cell.r && cell.c == 10) ||
        (cell.r && cell.c == 11) ||
        (cell.r && cell.c == 12) ||
        (cell.r && cell.c == 13)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "BEE5EB" },
          bgColor: { rgb: "BEE5EB" },
        };
      }

      if (
        (cell.r && cell.c == 14) ||
        (cell.r && cell.c == 15) ||
        (cell.r && cell.c == 16) ||
        (cell.r && cell.c == 17)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "F5C6CB" },
          bgColor: { rgb: "F5C6CB" },
        };
      }
      if (
        (cell.r && cell.c == 18) ||
        (cell.r && cell.c == 19) ||
        (cell.r && cell.c == 20) ||
        (cell.r && cell.c == 21)
      ) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "FFEEBA" },
          bgColor: { rgb: " FFEEBA" },
        };
      }

      // if (cell.r == 0 && cell.c == 17) {
      //   ws[i].s.fill = {
      //     // background color
      //     patternType: 'solid',
      //     fgColor: { rgb: 'F5C6CB' },
      //     bgColor: { rgb: 'F5C6CB' },
      //   };
      // }
      // if (cell.r == 1 && cell.c == 17 || cell.r == 1 && cell.c == 18 || cell.r == 1 && cell.c == 19 || cell.r == 1 && cell.c == 20 || cell.r == 1 && cell.c == 21) {
      //   ws[i].s.fill = {
      //     // background color
      //     patternType: 'solid',
      //     fgColor: { rgb: 'F5C6CB' },
      //     bgColor: { rgb: 'F5C6CB' },
      //   };
      // }
      // if (cell.r && cell.c == 17 || cell.r  && cell.c == 18 || cell.r && cell.c == 19 || cell.r  && cell.c == 20 || cell.r  && cell.c == 21) {
      //   ws[i].s.fill = {
      //     // background color
      //     patternType: 'solid',
      //     fgColor: { rgb: 'F5C6CB' },
      //     bgColor: { rgb: 'F5C6CB' },
      //   };
      // }

      // if (cell.r == 0 && cell.c == 22) {
      //   ws[i].s.fill = {
      //     // background color
      //     patternType: 'solid',
      //     fgColor: { rgb: 'FFEEBA' },
      //     bgColor: { rgb: 'FFEEBA' },
      //   };
      // }
      // if (cell.r == 1 && cell.c == 22 || cell.r == 1 && cell.c == 23 || cell.r == 1 && cell.c == 24 || cell.r == 1 && cell.c == 25 || cell.r == 1 && cell.c == 26) {
      //   ws[i].s.fill = {
      //     // background color
      //     patternType: 'solid',
      //     fgColor: { rgb: 'FFEEBA' },
      //     bgColor: { rgb: 'FFEEBA' },
      //   };
      // }
      // if (cell.r && cell.c == 22 || cell.r  && cell.c == 23 || cell.r  && cell.c == 24 || cell.r  && cell.c == 25 || cell.r  && cell.c == 26) {
      //   ws[i].s.fill = {
      //     // background color
      //     patternType: 'solid',
      //     fgColor: { rgb: 'FFEEBA' },
      //     bgColor: { rgb: 'FFEEBA' },
      //   };
      // }

      if (cell.r === this.tempConsolidatedList.length + 2) {
        ws[i].s.font = { bold: true, size: 16 };
        ws[i].s.fill = {
          patternType: "solid",
          fgColor: { rgb: "C6BFB5" },
          bgColor: { rgb: "C6BFB5" },
        };
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "report.xlsx");
  }

  getTableDataDPR(): any[][] {
    const tableData = [
      [
        "S.No.",
        "State",
        "MERU",
        "Strength University",
        "Strength College",
        "NMDC",
        "GI&EI",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ],
      [],
    ];

    this.tempConsolidatedList.forEach((element, i) => {
      tableData.push([
        i + this.StartLimit + 1,
        element.stateName,
        element.isNpdApproved,
        element.MeruRevisedProposalForwardedtoNpd,
        element.dprUnderStatusM,
        element.dprUnderTakingM,
        element.unisityNpdApproved,
        element.UnivRevisedProposalForwardedtoNpd,
        element.dprUnderStatusU,
        element.dprUnderTakingU,
        element.collegeNpdApproved,
        element.CollegeRevisedProposalForwardedtoNpd,
        element.dprUnderStatusC,
        element.dprUnderTakingC,
        element.nmdcNpdApproved,
        element.NMDCRevisedProposalForwardedtoNpd,
        element.dprUnderStatusN,
        element.dprUnderTakingN,
        element.genderNpdApproved,
        element.genderRevisedProposalForwardedtoNpd,
        element.dprUnderStatusG,
        element.dprUnderTakingG,
        element.isNpdApproved +
          element.unisityNpdApproved +
          element.collegeNpdApproved +
          element.nmdcNpdApproved +
          element.genderNpdApproved,
        element.MeruRevisedProposalForwardedtoNpd +
          element.UnivRevisedProposalForwardedtoNpd +
          element.CollegeRevisedProposalForwardedtoNpd +
          element.NMDCRevisedProposalForwardedtoNpd +
          element.genderRevisedProposalForwardedtoNpd,
        element.dprUnderStatusM +
          element.dprUnderStatusU +
          element.dprUnderStatusC +
          element.dprUnderStatusN +
          element.dprUnderStatusG,
        element.dprUnderTakingM +
          element.dprUnderTakingU +
          element.dprUnderTakingC +
          element.dprUnderTakingN +
          element.dprUnderTakingG,
      ]);
    });

    tableData.push([
      "",
      "Total",
      this.isDPRNPDTotal,
      this.consultantStatusMeruNpdApprovedTotal,
      this.isDPRNPDUnderStatusTotal,
      this.isDPRNPDUnderTakingTotal,
      this.isDPRUTotal,
      this.universityRevisedNpdApprovedTotal,
      this.isDPRUUnderStatusTotal,
      this.isDPRUUnderTakingTotal,
      this.isDPRCTotal,
      this.collegeRevisedNpdApprovedTotal,
      this.isDPRCDUnderStatusTotal,
      this.isDPRCUnderTakingTotal,
      this.isDPRNTotal,
      this.nmdcRevisedNpdApprovedTotal,
      this.isDPRNUnderStatusTotal,
      this.isDPRNUnderTakingTotal,
      this.isDPRGTotal,
      this.genderRevisedNpdApprovedTotal,
      this.isDPRGUnderStatusTotal,
      this.isDPRGUnderTakingTotal,
      this.isDPRNPDTotal +
        this.isDPRUTotal +
        this.isDPRCTotal +
        this.isDPRNTotal +
        this.isDPRGTotal,
      this.consultantStatusMeruNpdApprovedTotal +
        this.universityRevisedNpdApprovedTotal +
        this.collegeRevisedNpdApprovedTotal +
        this.nmdcRevisedNpdApprovedTotal +
        this.genderRevisedNpdApprovedTotal,
      this.isDPRNPDUnderStatusTotal +
        this.isDPRUUnderStatusTotal +
        this.isDPRCDUnderStatusTotal +
        this.isDPRNUnderStatusTotal +
        this.isDPRGUnderStatusTotal,
      this.isDPRNPDUnderTakingTotal +
        this.isDPRUUnderTakingTotal +
        this.isDPRCUnderTakingTotal +
        this.isDPRNUnderTakingTotal +
        this.isDPRGUnderTakingTotal,
    ]);

    return tableData;
  }

  createCustomHeaderDPR(): any[][] {
    let header: any[][];

    header = [
      [
        "",
        "",
        "MERU",
        "",
        "",
        "",
        "Strengthen University",
        "",
        "",
        "",
        "Strengthen College",
        "",
        "",
        "",
        "NMDC",
        "",
        "",
        "",
        "GI&EI",
        "",
        "",
        "",
        "Total",
      ],
      [
        "S.No.",
        "State",
        "Proposals Approved",
        "Proposals Revised",
        "Undertaking Submitted",
        "DPR Uploaded",
        "Proposals Approved",
        "Proposals Revised",
        "Undertaking Submitted",
        "DPR Uploaded",
        "Proposals Approved",
        "Proposals Revised",
        "Undertaking Submitted",
        "DPR Uploaded",
        "Proposals Approved",
        "Proposals Revised",
        "Undertaking Submitted",
        "DPR Uploaded",
        "Proposals Approved",
        "Proposals Revised",
        "Undertaking Submitted",
        "DPR Uploaded",
        "Proposals Approved",
        "Proposals Revised",
        "Undertaking Submitted",
        "DPR Uploaded",
      ],
    ];

    return header;
  }

  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange((this.sharedService.page = 1));
    this.handlePageChangeReport((this.page1 = 1));
  }

  handlePageChange(event: any) {
    this.sharedService.page = event;
    (this.sharedService.StartLimit =
      (this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      (this.sharedService.EndLimit =
        this.sharedService.StartLimit + Number(this.sharedService.pageSize));
    var a = Math.ceil(
      this.dprStatusList.length / Number(this.sharedService.pageSize)
    );
    if (a === event) {
      this.sharedService.pageData = Math.min(
        this.sharedService.StartLimit + Number(this.sharedService.pageSize),
        this.dprStatusList.length
      );
    } else {
      this.sharedService.pageData = Math.min(
        this.sharedService.StartLimit + Number(this.sharedService.pageSize),
        this.dprStatusList.length - 1
      );
    }
  }

  handlePageChangeReport(event: any) {
    this.sharedService.page = event;
    (this.sharedService.StartLimit =
      (this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      (this.sharedService.EndLimit =
        this.sharedService.StartLimit + Number(this.sharedService.pageSize));
    var a = Math.ceil(
      this.proposalOutComesArr.length / Number(this.sharedService.pageSize)
    );
    if (a === event) {
      this.sharedService.pageData = Math.min(
        this.sharedService.StartLimit + Number(this.sharedService.pageSize),
        this.proposalOutComesArr.length
      );
    } else {
      this.sharedService.pageData = Math.min(
        this.sharedService.StartLimit + Number(this.sharedService.pageSize),
        this.proposalOutComesArr.length - 1
      );
    }
  }

  //   tabState = {
  //     tab1: { page: 1, pageSize: 10 },
  //     tab2: { page: 1, pageSize: 10 }
  // };

  // currentTab = 'tab1';

  // handlePageChangeReport(event: number): void {
  //     this.tabState[this.currentTab].page = event;
  // }

  // switchTab(tab: string): void {
  //     this.currentTab = tab;
  // }

  componentIdList() {
    this.getService.getComponent().subscribe((res) => {
      this.componentList = res;
      this.componentList = this.componentList.splice(0, 5);
      this.filteredComponents = this.componentList.filter((c) => c.id !== 4);
      if (this.rusaPhase == "") {
        this.componentList = [...this.componentList, ...this.rusaComp];
      }
    });
  }

  changeComponentList(e) {
    let phaseRUSA1 =
      e === "RUSA_1"
        ? "1"
        : e === "RUSA_2"
        ? "2"
        : e === "PM_USHA"
        ? "0"
        : "-1";
    this.getService.getComponentName(phaseRUSA1).subscribe((res) => {
      if (e === "PM_USHA") {
        this.componentIdList();
      } else if (e === "") {
        this.componentIdList();
        this.rusaComp = [
          ...res.map((e: any) => ({ ...e, componentName: e.name })),
        ];
      } else {
        this.componentList = res;
        this.componentList.forEach((e: any) => {
          e["componentName"] = e["name"];
        });
        this.componentList = this.componentList.slice();
      }
    });
  }

  reset() {
    this.stateName = "ALL";
    this.componetName = "0";
    this.getDprStatusData();
  }

  findOutcome() {
    this.cachedData.clearData("proposalOutComesArr");
    this.collegeList();
  }

  findOutcomeAch() {
    this.cachedData.clearData("proposalOutAchiveArr");
    this.collegeOutcomeReport();
  }

  collegeOutcomeReport() {
    //  let payload = {
    //   stateCode: this.stateNameAch === 'ALL'?null:this.stateNameAch,
    //   componentId: this.componetNameAch === 'ALL'?'':this.componetNameAch,
    //   // districtCode: null,
    // }
    this.getService.getLockPMUshaProgressList("").subscribe((res) => {
      this.proposalOutAchiveArr = [];
      if (res.data && res.data.length) {
        this.proposalOutAchiveArrUpdate = res.data.filter(
          (e) => e.isForwardedToNpd
        );
        if (this.proposalOutAchiveArrUpdate.length) {
          // 1. Find the max item (latest year & month)
          const maxItem = this.proposalOutAchiveArrUpdate.reduce(
            (prev, current) => {
              if (current.year > prev.year) {
                return current;
              } else if (
                current.year === prev.year &&
                current.month > prev.month
              ) {
                return current;
              }
              return prev;
            }
          );

          const maxYear = maxItem.year;
          const maxMonth = maxItem.month;

          // 2. Filter only items matching max year & month
          this.proposalOutAchiveArrUpdate =
            this.proposalOutAchiveArrUpdate.filter(
              (item) => item.year === maxYear && item.month === maxMonth
            );
          this.proposalOutComesArr.forEach((e: any) => {
            const match = this.proposalOutAchiveArrUpdate.find(
              (a: any) => e.aisheCode === a?.rusaLegacyDataMinimalUse?.aisheCode
            );

            if (match) {
              this.proposalOutAchiveArr.push({
                ...e, // keep all fields from proposalOutComesArr
                year: match.year, // add year from proposalOutAchiveArrUpdate
                month: match.month, // add month from proposalOutAchiveArrUpdate
                monthName: match.monthName,
              });
            }
          });
          this.cachedData.setData(
            "proposalOutAchiveArr",
            this.proposalOutAchiveArr
          );
          this.tempList1 = [...this.proposalOutAchiveArr];
          this.updatePaginatedDataAchivment();
        }
      } else {
        this.proposalOutAchiveArr = [];
      }
    });
  }

  collegeList() {
    let payload = {
      stateCode: this.stateName === "ALL" ? null : this.stateName,
      componentId: this.componetName === "ALL" ? "" : this.componetName,
      districtCode: null,
    };

    this.getService.getfinalSubmitProposal(payload).subscribe((res) => {
      // this.proposalOutAchiveArr = []
      this.proposalOutComesArr = [];
      if (res.status == 200) {
        this.stateList.forEach((element) => {
          res.data.forEach((currentValue) => {
            if (currentValue.stateCode === element.stateId) {
              this.proposalOutComesArr.push(currentValue);
            }
          });
        });
        this.proposalOutComesArr = this.proposalOutComesArr.filter(
          (e) =>
            (e.pabActionId === 1 || e.pabActionId === 3) &&
            e.userTypeId?.toString() !== this.sharedService.userTypeList["1"].id
        );
        // this.findOutcomeAch()
        // this.collegeOutcomeReport()
      } else {
        this.proposalOutComesArr = [];
      }
      this.updatePaginatedData();
      this.cachedData.setData("proposalOutComesArr", this.proposalOutComesArr);
      this.proposalTemplateArr = res.data.filter(
        (e) => e.pabActionId === 1 || e.pabActionId === 3
      );
      // this.collegeListData = this.proposalTemplateArr.filter(e => (e.revisedProposalForwardedtoNpd && e.proposalItemTaggingStatus))
      // this.tempList = [...this.collegeListData]
      this.handlePageChangeReport((this.sharedService.page = 1));
    });
  }

  collegeListAch() {
    let payload = {
      stateCode: this.stateName === "ALL" ? null : this.stateName,
      componentId: this.componetName === "ALL" ? "" : this.componetName,
      districtCode: null,
    };

    this.getService.getfinalSubmitProposal(payload).subscribe((res) => {
      // this.proposalOutAchiveArr = []
      this.proposalOutComesArr = [];
      if (res.status == 200) {
        this.stateList.forEach((element) => {
          res.data.forEach((currentValue) => {
            if (currentValue.stateCode === element.stateId) {
              this.proposalOutComesArr.push(currentValue);
            }
          });
        });
        this.proposalOutComesArr = this.proposalOutComesArr.filter(
          (e) =>
            (e.pabActionId === 1 || e.pabActionId === 3) &&
            e.userTypeId?.toString() !== this.sharedService.userTypeList["1"].id
        );
        this.findOutcomeAch();
        // this.collegeOutcomeReport()
      } else {
        this.proposalOutComesArr = [];
      }
      this.updatePaginatedData();
      this.cachedData.setData("proposalOutComesArr", this.proposalOutComesArr);
      this.proposalTemplateArr = res.data.filter(
        (e) => e.pabActionId === 1 || e.pabActionId === 3
      );
      // this.collegeListData = this.proposalTemplateArr.filter(e => (e.revisedProposalForwardedtoNpd && e.proposalItemTaggingStatus))
      // this.tempList = [...this.collegeListData]
      this.handlePageChangeReport((this.sharedService.page = 1));
    });
  }

  collegeList1() {
    let payload = {
      stateCode: this.stateName === "ALL" ? null : this.stateName,
      componentId: this.componetName === "ALL" ? "" : this.componetName,
      districtCode: this.districtId === "ALL" ? null : this.districtId,
    };

    this.getService.getfinalSubmitProposal(payload).subscribe((res) => {
      this.proposalTagArr = [];
      if (res.status == 200) {
        this.proposalTagArr = res.data.filter(
          (e) => e.pabActionId === 1 || e.pabActionId === 3
        );
        this.collegeListData = this.proposalTagArr.filter(
          (e) => e.revisedProposalForwardedtoNpd && e.proposalItemTaggingStatus
        );
        this.cachedData.setData("collegeList", this.collegeListData);
        this.tempList = [...this.collegeListData];
        this.updatePaginatedTagData();
      } else {
        this.proposalTagArr = [];
      }
    });
  }

  defaultColDef = {
    resizable: true,
    sortable: true,
    flex: 1,
    minWidth: 120,
    cellStyle: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    tooltipValueGetter: (params: any) => params.value
};

  collegeTagReport() {
    let payload = {
      stateCode: this.stateName === "ALL" ? "" : this.stateName,
      districtCode: this.districtId === "ALL" ? "" : this.districtId,
      componentId: this.componetName === "ALL" ? "" : this.componetName,
      proposalActivityId:
        this.proposalActivityId === "ALL" ? null : this.proposalActivityId,
    };
    if (this.proposalActivityId) {
      this.getService.getfinalTaggingReport(payload).subscribe((res) => {
        this.collegeListDataTag = [];
        this.proposalItemTaggingId = ''
        if (res) {
          // Step 1: group by aisheCode
          this.groupedCollegeListDataTag = this.groupByAishe(res);

          // Step 2: set for pagination
          this.collegeListDataTag = this.groupedCollegeListDataTag;
          this.filterCollegeData = [...this.collegeListDataTag]
          this.proposaActivityId = this.proposalActivityId;
          const updateDrop = this.collegeListDataTag
            .map(c => c.proposalTaggingName)
            // .reduce((acc, val) => acc.concat(val), []);
          const filtered = updateDrop.filter(Boolean);
          // Step 2: flatten
          const flattened = ([] as any[]).concat(...filtered);
          // Step 3: keep unique by id
          const unique = Array.from(
            new Map(flattened.map(item => [item.name, item])).values()
          );
          this.UpdatedropList = unique,
          this.UpdatedropListArr = this.UpdatedropList.slice()
          // this.cachedData.setData("consolidateTag", this.collegeListDataTag);

          // Step 3: paginate
        } else {
          this.collegeListDataTag = [];
        }
        this.updatePaginatedTagReport();
      });
    } else {
      this.notification.showValidationMessage(
        "Please Select Proposal Activity!!"
      );
    }
  }

  // 🔹 Grouping function
  groupByAishe(data: any[]) {
    const grouped: { [key: string]: any } = {};

    data.forEach((item) => {
      if (!grouped[item.aisheCode]) {
        grouped[item.aisheCode] = {
          ...item,
          proposals: [],
        };
      }
      grouped[item.aisheCode].proposals.push({
        componentName: item.componentName,
        proposalItemTaggingDate: item.proposalItemTaggingDate,
        description: item.description,
        purpose: item.purpose,
        proposedArea: item.proposedArea,
        perUnitCost: item.perUnitCost,
        totalCost: item.totalCost,
        location: item.location,
        landTitleObtainedToBeUploaded: item.landTitleObtainedToBeUploaded,
        detail: item.details,
        justification: item.justification,
        proposalTaggingName: item.proposalTaggingName,
        capacity: item.capacity,
        totalCostBreakup: item?.proposalItemTaggingCapacity?.reduce(
          (sum, tag) => sum + Number(tag.costBreakup || 0),
          0
        ) || 0,
        equipmentName: item.equipmentName,
        quantity: item.quantity,
        activity: item.activity,
        unit: item.unit,
        targetNumberOfBeneficiary: item.targetNoOfBeneficiary,
        expectedOutcome: item.expectedOutcome,
        proposalItemTaggingCapacity: item.proposalItemTaggingCapacity
      });
    });
    return Object.values(grouped);
  }

  updatePaginatedData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.proposalOutComesArr.slice(startIndex, endIndex);
  }

  updatePaginatedDataAchivment() {
    const startIndex = this.pageIndexAch * this.pageSizeAch;
    const endIndex = startIndex + this.pageSizeAch;
    this.paginatedDataUpdate = this.proposalOutAchiveArr.slice(
      startIndex,
      endIndex
    );
  }

  updatePaginatedTagData() {
    const startIndex = this.pageIndexNumber * this.pageSizeNumber;
    const endIndex = startIndex + this.pageSizeNumber;
    this.paginatedTagData = this.collegeListData.slice(startIndex, endIndex);
  }

  updatePaginatedTagReport() {
    const startIndex = this.pageIndexNumberRepo * this.pageSizeNumberRepo;
    const endIndex = startIndex + this.pageSizeNumberRepo;
    this.paginatedTagDataTag = this.collegeListDataTag.slice(
      startIndex,
      endIndex
    );
  }

  updatePaginatedGeoReport() {
    const startIndex = this.pageIndexNumberGeo * this.pageSizeNumberGeo;
    const endIndex = startIndex + this.pageSizeNumberGeo;
    this.paginatedTagGeoData = this.filteredData.slice(
      startIndex,
      endIndex
    );
  }

  datailsList(ele: any): void {
    let componentId = ele.componentId;
    let aiseCode = ele.aisheCode;
    let tabIndex = 3;
    let districtCode = ele.districtCode;
    sessionStorage.setItem("stateFilterName", this.stateName);
    sessionStorage.setItem("componetFilterName", this.componetName);
    sessionStorage.setItem("districtFilterName", this.districtId);
    if (componentId == "1") {
      this.router.navigate([
        this.routers.viewReportMeruRevision,
        componentId,
        aiseCode,
        tabIndex,
      ]);
    } else if (componentId == "2" || componentId == "3") {
      this.router.navigate([
        this.routers.viewReportStrengthenRevision,
        componentId,
        aiseCode,
        tabIndex,
      ]);
    } else if (componentId == "4" || componentId == "5") {
      this.router.navigate([
        this.routers.viewReportEquityRevision,
        componentId,
        aiseCode,
        tabIndex,
        districtCode,
      ]);
    }
  }

  datailsListAchive(ele: any): void {
    let componentId = ele.componentId;
    let aiseCode = ele.aisheCode;
    let year = ele.year;
    let month = ele.month;
    let achiveKey = 11;
    let tabIndex = 4;
    let districtCode = ele.districtCode;
    // sessionStorage.setItem('stateFilterNameAch', this.stateNameAch)
    // sessionStorage.setItem('componetFilterNameAch', this.componetNameAch)
    this.cachedData.setData("TagData", ele);
    sessionStorage.setItem("districtFilterName", this.districtId);
    if (componentId == "1") {
      this.router.navigate([
        this.routers.viewReportMeruRevisionAch,
        componentId,
        aiseCode,
        tabIndex,
        year,
        month,
        achiveKey,
      ]);
    } else if (componentId == "2" || componentId == "3") {
      this.router.navigate([
        this.routers.viewReportStrengthenRevisionAch,
        componentId,
        aiseCode,
        tabIndex,
        year,
        month,
        achiveKey,
      ]);
    } else if (componentId == "4" || componentId == "5") {
      this.router.navigate([
        this.routers.viewReportEquityRevisionAch,
        componentId,
        aiseCode,
        tabIndex,
        districtCode,
        year,
        month,
        achiveKey,
      ]);
    }
  }

  datailsListTag(ele: any): void {
    let tabIndex = 4;
    sessionStorage.setItem("stateP", ele.name);
    sessionStorage.setItem("stateCodeP", ele.stateCode);
    sessionStorage.setItem("aisheCode", ele.aisheCode);
    sessionStorage.setItem("instituteCategory", ele.instituteCategory);
    sessionStorage.setItem("componentIdV", ele.componentId);
    sessionStorage.setItem("addRemarks", "true");
    sessionStorage.setItem("consultantComment", ele.consultantComment),
      sessionStorage.setItem("consultantUserName", ele.consultantUserId);
    sessionStorage.setItem("pmushaUniqueCode", "RemarkView");
    sessionStorage.setItem("stateFilterName", this.stateName);
    sessionStorage.setItem("componetFilterName", this.componetName);
    sessionStorage.setItem("districtFilterName", this.districtId);
    if (ele.componentId === this.sharedService.collegeComponentId) {
      this.router.navigate([
        this.routers.viewReportProjectTag,
        ele.componentId,
        this.sharedService.reportTaggingId,
        ele.id,
        ele.stateCode,
        tabIndex,
      ]);
    } else if (ele.componentId === this.sharedService.universityComponentId) {
      this.router.navigate([
        this.routers.viewReportUniverProjectTag,
        ele.componentId,
        this.sharedService.reportTaggingId,
        ele.id,
        ele.stateCode,
        tabIndex,
      ]);
    } else if (ele.componentId === this.sharedService.meruComponentId) {
      this.router.navigate([
        this.routers.viewReportMeruProjectTag,
        ele.componentId,
        this.sharedService.reportTaggingId,
        ele.id,
        ele.stateCode,
        tabIndex,
      ]);
    } else {
      this.router.navigate([
        this.routers.viewReportGenderProjectTag,
        ele.componentId,
        this.sharedService.reportTaggingId,
        ele.id,
        ele.stateCode,
        ele.districtCode,
        tabIndex,
      ]);
    }
  }

  downloadReportAch() {
    if (this.proposalOutAchiveArr.length != 0) {
      //  this.arrMonths
      let custom_data = this.proposalOutAchiveArr.map((item, index) => ({
        "S.No": index + 1,
        "Aishe Code": item.aisheCode,
        "Institution Name": item.institutionName,
        "Component Name": item.componentName,
        State: item.stateName,
        District: item.districtName,
        "Focus District": item.isFocusDistrict ? "Yes" : "No",
        "Is Aspirational District": item.aspirational ? 'Yes' : 'No',
        "Is Left Wing Extremist (LWE) District": item.lweAffected ? 'Yes' : 'No',
        "Is Border Area District": item.borderArea ? 'Yes' : 'No',
        "Total Score": item.totalScore,
        "Total Cost": item.revisedTotalCost,
        Year: item.year,
        Month: item.monthName,
      }));
      this.excelService.exportToExcel(
        custom_data,
        `Outcomes Achievement Report`
      );
    } else {
      this.notification.showValidationMessage("NO Data Found");
    }
  }

  downloadPOutcomes() {
    const wb = XLSX.utils.book_new();
    const data = this.getTableDataPOutcome();
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    const customHeader = this.createCustomHeaderPOutcome();
    XLSX.utils.sheet_add_aoa(ws, customHeader, { origin: "A1" });

    let merge = [];

    // Specify the merged cells range
    merge = [
      { s: { r: 0, c: 1 }, e: { r: 0, c: 1 } },
      { s: { r: 0, c: 2 }, e: { r: 0, c: 2 } },
      { s: { r: 0, c: 3 }, e: { r: 0, c: 3 } },
      { s: { r: 0, c: 4 }, e: { r: 0, c: 4 } },
    ];

    // Add the merges property to the worksheet
    ws["!merges"] = merge;

    for (var i in ws) {
      if (typeof ws[i] != "object") continue;
      let cell = XLSX.utils.decode_cell(i);

      ws[i].s = {
        // styling for all cells
        font: {
          name: "arial",
        },
        alignment: {
          vertical: "center",
          horizontal: "center",
          wrapText: "1", // any truthy value here
        },
        border: {
          right: {
            style: "thin",
            color: "000000",
          },
          left: {
            style: "thin",
            color: "000000",
          },
        },
      };
      if (cell.r == 0) {
        // first row
        ws[i].s.font = { bold: true, size: 8 };
        ws[i].s.border.bottom = {
          // bottom border
          style: "thin",
          color: "000000",
        };
      }

      if (cell.r) {
        ws[i].s.border.bottom = {
          // bottom border
          style: "thin",
          color: "000000",
        };
      }
      if ((cell.r && cell.c == 1) || (cell.r == 0 && cell.c == 1)) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "B8DAFF" },
          bgColor: { rgb: "B8DAFF" },
        };
      }

      if ((cell.r && cell.c == 2) || (cell.r == 0 && cell.c == 2)) {
        // every other row
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "D6D8DB" },
          bgColor: { rgb: "D6D8DB" },
        };
      }

      if ((cell.r && cell.c == 3) || (cell.r == 0 && cell.c == 3)) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "C3E6CB" },
          bgColor: { rgb: "C3E6CB" },
        };
      }
      if ((cell.r && cell.c == 4) || (cell.r == 0 && cell.c == 4)) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "BEE5EB" },
          bgColor: { rgb: "BEE5EB" },
        };
      }
      if ((cell.r && cell.c == 5) || (cell.r == 0 && cell.c == 5)) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "B8DAFF" },
          bgColor: { rgb: "B8DAFF" },
        };
      }

      if ((cell.r && cell.c == 6) || (cell.r == 0 && cell.c == 6)) {
        ws[i].s.fill = {
          // background color
          patternType: "solid",
          fgColor: { rgb: "F5C6CB" },
          bgColor: { rgb: "F5C6CB" },
        };
      }

      if (cell.r === this.proposalOutComesArr.length + 2) {
        ws[i].s.font = { bold: true, size: 8 };
        ws[i].s.fill = {
          patternType: "solid",
          fgColor: { rgb: "C6BFB5" },
          bgColor: { rgb: "C6BFB5" },
        };
      }
    }

    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, "Proposal-Outcomes-Report.xlsx");
  }

  getTableDataPOutcome(): any[][] {
    const tableData = [
      [
        "S.No.",
        "Aishe Code",
        "Institution Name",
        "Component Name",
        "State",
        "District",
        "Focus District",
        "Is Aspirational District",
        "Is Left Wing Extremist (LWE) District",
        "Is Border Area District",
        "Total Score",
        "Total Cost",
      ],
    ];

    this.proposalOutComesArr.forEach((element, i) => {
      tableData.push([
        i + this.StartLimit + 1,
        element.aisheCode,
        element.instituteName,
        element.componentName,
        element.stateName,
        element.districtName,
        element.isFocusDistrict ? "Yes" : "No",
        element.aspirational ? "Yes" : "No",
        element.lweAffected ? "Yes" : "No",
        element.borderArea ? "Yes" : "No",
        element.totalScore,
        element.totalCost,
      ]);
    });
    return tableData;
  }

  createCustomHeaderPOutcome(): any[][] {
    let header: any[][];

    header = [
      [
        "S.No.",
        "Aishe Code",
        "Institution Name",
        "Component Name",
        "State",
        "District",
        "Focus District",
        "Is Aspirational District",
        "Is Left Wing Extremist (LWE) District",
        "Is Border Area District",
        "Total Score",
        "Total Cost",
      ],
    ];

    return header;
  }

  ChangesComponentSelection(e: any) {
    this.getPmUshaReportDetails();
  }

  ChangesRusaComponentSelection(e) {
    this.rusaPhase = e;
    this.getPmUshaReportDetails();
    this.changeComponentList(e);
  }

  ChangesComponentNameSelection(e: any) {
    this.componetNameFilter = e == "ALL" ? -1 : e;
    if (e.length > 0) {
      this.reportDataArr = this.filterData
        .filter((m) => e.includes(m.componentId))
        .map((item) => {
          return item;
        });
      this.handlePageChange((this.sharedService.page = 1));
    } else {
      this.reportDataArr = this.filterData;
      this.handlePageChange((this.sharedService.page = 1));
    }
  }

  getPmUshaReportDetails() {
    if (this.userTypeId === this.sharedService.userTypeList["1"].id) {
      this.stateName = this.stateCode;
    }
    this.getService
      .getPmUshaReportDetails(this.stateName, this.rusaPhase, "-1")
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.reportDataArr = res.data;
            this.filterData = res.data;
          } else {
            this.reportDataArr = [];
          }
        },
        (err) => {
          this.reportDataArr = [];
        }
      );
    this.handlePageChange((this.sharedService.page = 1));
    this.handlePageChangeReport((this.sharedService.page = 1));
  }

  
  downloadReport() {
    if (this.reportDataArr.length != 0) {
      //  this.arrMonths
      let custom_data = this.reportDataArr.map((item, index) => ({
        "S.No": index + 1,
        State: item.stateName,
        District: item.districtName,
        "RUSA Phase": item.rusaPhase,
        "Component Name": item.componentName,
        "Institution Name": (item?.componentId === this.sharedService.genderComponentId || item?.componentId === this.sharedService.nmdcComponentId) ? item?.aisheCode : item?.institutionName,
        "Aishe Code": item.aisheCode,
        "PAB Meeting Number": item.pabMeetingNumber,
        "PAB Date": item.pabDate,
        "Total Amount Approved (Cr)":
          item.totalAmountApproved == "NaN" ? "0" : +item.totalAmountApproved,
        "Total Amount Released (Cr)":
          item.totalAmountReleased == "NaN" ? "0" : +item.totalAmountReleased,
        "Total Amount Utilised (Cr)":
          item.totalUtilisation == "NaN" ? "0" : +item.totalUtilisation,
        "Total Central Share Approved (Cr)":
          item.centralShareApproved == "NaN" ? "0" : +item.centralShareApproved,
        "Total Central Share Released (Cr)":
          item.centralShareReleased == "NaN" ? "0" : +item.centralShareReleased,
        "Total Central Share utilised (Cr)":
          item.centralShareUtilised == "NaN" ? "0" : +item.centralShareUtilised,
        "State Share Approved (Cr)": +item.stateShareApproved,
        "State Share Released (Cr)": +item.stateShareReleased,
        "State Share Utilised (Cr)": +item.stateShareUtilised,
        "Focus District": item.isFocus ? 'Yes' : 'No',
        "Is Aspirational District": item.isAspirational ? 'Yes' : 'No',
        "Is Left Wing Extremist (LWE) District": item.isLweAffected ? 'Yes' : 'No',
        "Is Border Area District": item.isBorderArea ? 'Yes' : 'No',
        "Project Status (Ongoing /Completed/Not yet started)":
          item.rusaProjectStatus == "null" ? "" : item.rusaProjectStatus,
        "Whether PM Digitally Launched Project (Yes/ No)":
          item.rusaPhase == "PM-USHA"
            ? "No"
            : item.whetherPmDigitallyLaunchedProject
            ? "Yes"
            : "No",
      }));
      this.excelService.exportToExcel(
        custom_data,
        `PM-USHA_Progress_Monthly_Report`
      );
    } else {
      this.notification.showValidationMessage("NO Data Found");
    }
  }

  trackByFn(index: number, item: any): number {
    return item.id; // Use a unique identifier
  }

  trackByAishe(index, item) {
  return item.aisheCode;
}

  onSortClick(event, colName) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains("fa-chevron-up")) {
      classList.remove("fa-chevron-up");
      classList.add("fa-chevron-down");
      this.sortDir = -1;
    } else {
      classList.add("fa-chevron-up");
      classList.remove("fa-chevron-down");
      this.sortDir = 1;
    }
    this.sortArr(colName);
  }

  sortArr(colName: any) {
    this.reportDataArr.sort((a, b) => {
      a = a[colName]?.toLowerCase();
      b = b[colName]?.toLowerCase();
      return a?.localeCompare(b) * this.sortDir;
    });
  }

  getDistrict(data: any) {
    this.filterDistrictList = [];
    this.districtList = [];
    this.districtId = "ALL";
    if (data === "ALL") {
      return;
    }
    this.masterService.getDistrictList(data === "ALL" ? "" : data).subscribe(
      (res) => {
        this.districtList = res;
        this.filterDistrictList = this.districtList.slice();
      },
      (err) => {
        console.error("Error fetching page status:", err);
      }
    );
  }

  clear() {
    this.stateName = "ALL";
    this.districtId = "ALL";
    this.componetName = "ALL";
    this.collegeList1();
  }

  updateResults() {
    const query = this.searchText?.trim().toLowerCase();
    const sourceData = this.tempList && this.tempList.length ? this.tempList : this.collegeListData;

    if (!query) {
      this.collegeListData = sourceData.slice();
      return;
    }

    this.collegeListData = sourceData.filter((item: any) => {
      return (
        item.aisheCode?.toString().toLowerCase().includes(query) ||
        item.instituteName?.toLowerCase().includes(query) ||
        item.componentName?.toLowerCase().includes(query) ||
        item.stateName?.toLowerCase().includes(query) ||
        item.districtName?.toLowerCase().includes(query)
      );
    });
  }

  clearSearch() {
    this.searchText = "";
    this.collegeListData = this.tempList && this.tempList.length ? this.tempList.slice() : this.collegeListData;
  }

  clearTag() {
    this.stateName = "ALL";
    this.districtId = "ALL";
    this.componetName = "ALL";
    this.proposalActivityId = "";
    this.collegeListDataTag = [];
    this.proposalItemTaggingId = "";
    this.masterNames = [];
    this.itemView = false;
    // this.collegeTagReport();
  }

clearGeoTag() {
  // Reset filter object
  this.filterValues = {
    name: 'ALL',
    component: 'ALL',
    year: null,
    month: null
  };

  // 🔴 IMPORTANT: Reset ngModel (UI dropdowns)
  this.stateName = 'ALL';
  this.componetName = 'ALL';
  this.year = 'ALL';
  this.month = 'ALL';

  // Apply filter (reload full data)
  this.applyFilters1();
}

  getMonthName(month: number): string {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1] || '';
}

getGeoTagData() {
  this.getService.getTaggingReportExl().subscribe(
    (res: any[]) => {

      if (!res?.length) {
        this.geoTagData = [];
        this.notification.showValidationMessage("No Data Found");
        return;
      }
      this.geoTagData = res;
      this.filteredData = [...this.geoTagData];
      this.yearList = [...new Set(this.geoTagData.map(x => x.mprEnterredYear).filter(Boolean))];
      this.monthList = [...new Set(this.geoTagData.map(x => x.mprEnterredMonth).filter(Boolean))];
      this.stateListArr1 = [
        ...new Map(
          this.geoTagData.map(item => [item.stateName, { name: item.stateName }])
        ).values()
      ];
      this.filterStateListArr = this.stateListArr1;
      this.componentList1 = [...new Set(this.geoTagData.map(x => x.componentName).filter(Boolean))];

      // pagination ke liye (agar use kar rahe ho)
      // this.paginatedTagGeoData = res.slice(0, this.pageSizeNumberGeo);
      this.updatePaginatedGeoReport()

    },
    (err) => {
      console.error(err);
      this.notification.showValidationMessage("API Error");
    }
  );
}

exportToExcelTag1() {

  if (!this.filteredData?.length) {
    this.notification.showValidationMessage("Please click Find first");
    return;
  }

  const custom_data = this.filteredData.map((item, index) => ({
    
    "S.No": index + 1,
    "State": item.stateName,
    "Component": item.componentName,
    "RUSA Phase": item.rusaPhase,
    "District": item.districtName,
    "Institution Name": item.instituteName,
    "AISHE Code": item.aisheCode,

    "Total Number of Infra Construction Activities (Eligible of GeoTagging and Timestamped Photographs)":
      item.totalNoOfInfraConstElligibleForGeoTagPhoto,

    "Total Number of Equipment Procurement Activities (Eligible for Timestamped Photographs)":
      item.totalNoOfEquipmentElligibleForGeoTagPhoto,

    "Month when the Project MPR was entered":
      this.getMonthName(item.mprEnterredMonth),

    "Year when the Project MPR was entered":
      item.mprEnterredYear,

    "Total Number of Infra Construction Activities with GeoTags":
      item.totalNoOfInfraConstWithGeoTag,

    "Total Number of Infra Construction Activities with Timestamped Photographs":
      item.totalNoOfInfraConstWithPhoto,

    "Total Number of Equipment Procurement Activities with Timestamped Photographs":
      item.totalNoOfEquipmentWithGeoTagPhoto,

    "Geotag Activity Status (Full, Partial, None)":
      item.geoTagStatus,

    "Timestamped Infra Photo Activity Status":
      item.infraPhotoStatus,

    "Timestamped Equipment Photo Activity Status":
      item.equipmentPhotoStatus
  }));

  const fileName = `Geotagged_Timestamped_Activities_${new Date().getTime()}`;

  this.excelService.exportToExcel(custom_data, fileName);
}

  exportToExcel() {
    if (this.collegeListData.length != 0) {
      let custom_data = this.collegeListData.map((item, index) => ({
        "S.No": index + 1,
        "Aishe Code": item.aisheCode,
        "Institution Name": (item?.componentId === this.sharedService.genderComponentId || item?.componentId === this.sharedService.nmdcComponentId) ? item?.aisheCode : item?.instituteName,
        "Component Name": item.componentName,
        State: item.stateName,
        District: item.districtName,
        "Focus District": item.isFocusDistrict ? "Yes" : "No",
        "Is Aspirational District": item.aspirational ? 'Yes' : 'No',
        "Is Left Wing Extremist (LWE) District": item.lweAffected ? 'Yes' : 'No',
        "Is Border Area District": item.borderArea ? 'Yes' : 'No',
        "Submitted On": item.proposalItemTaggingDateTime,
      }));
      const stateId = this.stateName === "null" ? "ALL" : this.stateName;
      if (stateId != "ALL") {
        const stateName = this.stateList.filter((e) => e.stateId == stateId);
        this.stateChangeName = stateName[0]?.stateName;
      }

      const fileName = `Item Tagging Report_${
        this.stateChangeName ? this.stateChangeName : "ALL"
      }_${this.componetName ? this.componetName : "ALL"}`;
      this.excelService.exportToExcel(custom_data, fileName);
    } else {
      this.notification.showValidationMessage("No Data Found");
    }
  }

buildTagRows(item: any, p: any, index: number, pIndex: number, baseData: any) {

  let rows: any[] = [];

  const emptyBase = Object.keys(baseData).reduce((acc: any, key) => {
    acc[key] = '';
    return acc;
  }, {});

  // Total Capacity
  const totalCapacity = p.capacity || "N/A";

  // Total Cost Breakup
  const totalCostBreakup =
    p.proposalItemTaggingCapacity?.reduce(
      (sum: number, tag: any) => sum + Number(tag.costBreakup || 0),
      0
    ) || "N/A";

  // ✅ Case 1: Capacity tagging
  if (p.proposalItemTaggingCapacity?.length > 0) {

    p.proposalItemTaggingCapacity.forEach((tag: any, tagIndex: number) => {

      rows.push({
        ...(tagIndex === 0 ? baseData : emptyBase),

        "S.No": `${index + 1}.${pIndex + 1}.${tagIndex + 1}`,
        "Project Tag": tag.proposalItemTagName || "N/A",

        "Project Capacity": tag.capacity || "N/A",
        "Project Cost Breakup (₹)": tag.costBreakup || "N/A",

        "Total Project Capacity": tagIndex === 0 ? totalCapacity : "",
        "Total Cost Breakup (₹)": tagIndex === 0 ? totalCostBreakup : ""
      });

    });

  }

  // ✅ Case 2: Normal tagging
  else if (p.proposalTaggingName?.length > 0) {

    p.proposalTaggingName.forEach((tag: any, tagIndex: number) => {

      rows.push({
        ...(tagIndex === 0 ? baseData : emptyBase),

        "S.No": `${index + 1}.${pIndex + 1}.${tagIndex + 1}`,
        "Project Tag": tag.name || "N/A",

        "Project Capacity": "N/A",
        "Project Cost Breakup (₹)": "N/A",

        "Total Project Capacity": tagIndex === 0 ? totalCapacity : "",
        "Total Cost Breakup (₹)": tagIndex === 0 ? totalCostBreakup : ""
      });

    });

  }

  // ✅ Case 3: No tagging
  else {

    rows.push({
      ...baseData,

      "S.No": `${index + 1}.${pIndex + 1}`,
      "Project Tag": "N/A",

      "Project Capacity": "N/A",
      "Project Cost Breakup (₹)": "N/A",

      "Total Project Capacity": totalCapacity,
      "Total Cost Breakup (₹)": totalCostBreakup
    });

  }

  return rows;
}

  exportToExcelTag() {
    if (this.collegeListDataTag?.length) {
      let custom_data: any[] = [];
      if (this.proposaActivityId === 1) {
        this.collegeListDataTag.forEach((item, index) => {
          item.proposals.forEach((p: any, pIndex: number) => {
            const baseData = {
      "Aishe Code": item.aisheCode,
      "Institution Name":
        (item?.componentName === this.sharedService.gender ||
         item?.componentName === this.sharedService.nmdc)
          ? item?.aisheCode
          : item?.instituteName,
      "Component Name": p.componentName,
      State: item.stateName,
      District: item.districtName,
      "Item Tagging Date": p.proposalItemTaggingDate,
      "Description of Infrastructure": p.description || "N/A",
      "Purpose of Infrastructure": p.purpose || "N/A",
      "Proposed Area Sq. feet": p.proposedArea || "N/A",
      "Total Cost per Sq. feet (₹)": p.perUnitCost || "N/A",
      "Total cost (₹)": p.totalCost || "N/A",
      Location: p.location || "N/A",
      "Clear land title obtained to be uploaded":
        p.landTitleObtainedToBeUploaded ? "Yes" : "No",
      Justification: p.justification || "N/A",
    };

    custom_data.push(
      ...this.buildTagRows(item, p, index, pIndex, baseData)
    );
          });
        });
      } else if (this.proposaActivityId === 2) {
        this.collegeListDataTag.forEach((item, index) => {
          item.proposals.forEach((p: any, pIndex: number) => {

            const baseData = {
              "Aishe Code": item.aisheCode,
              "Institution Name":
                (item?.componentName === this.sharedService.gender ||
                item?.componentName === this.sharedService.nmdc)
                  ? item?.aisheCode
                  : item?.instituteName,
              "Component Name": p.componentName,
              State: item.stateName,
              District: item.districtName,
              "Submitted On": p.proposalItemTaggingDate,
              "Description of Infrastructure": p.description || "N/A",
              "Detail of renovation/upgradation proposed": p.detail || "N/A",
              "Proposed Area Sq. feet": p.proposedArea || "N/A",
              "Total Cost per Sq. feet (₹)": p.perUnitCost || "N/A",
              "Total cost (₹)": p.totalCost || "N/A",
              Justification: p.justification || "N/A",
            };

            custom_data.push(
              ...this.buildTagRows(item, p, index, pIndex, baseData)
            );

          });
        });
      } else if (this.proposaActivityId === 3) {
       this.collegeListDataTag.forEach((item, index) => {
        item.proposals.forEach((p: any, pIndex: number) => {

          const baseData = {
            "Aishe Code": item.aisheCode,
            "Institution Name":
              (item?.componentName === this.sharedService.gender ||
              item?.componentName === this.sharedService.nmdc)
                ? item?.aisheCode
                : item?.instituteName,
            "Component Name": p.componentName,
            State: item.stateName,
            District: item.districtName,
            "Submitted On": p.proposalItemTaggingDate,
            "Name of the Equipment": p.equipmentName || "N/A",
            Quantity: p.quantity || "N/A",
            "Cost per Unit (₹)": p.perUnitCost || "N/A",
            "Total cost (₹)": p.totalCost || "N/A",
          };

          custom_data.push(
            ...this.buildTagRows(item, p, index, pIndex, baseData)
          );

        });
      });
      } else {
        this.collegeListDataTag.forEach((item, index) => {
        item.proposals.forEach((p: any, pIndex: number) => {

          const baseData = {
            "Aishe Code": item.aisheCode,
            "Institution Name":
              (item?.componentName === this.sharedService.gender ||
              item?.componentName === this.sharedService.nmdc)
                ? item?.aisheCode
                : item?.instituteName,
            "Component Name": p.componentName,
            State: item.stateName,
            District: item.districtName,
            "Submitted On": p.proposalItemTaggingDate,
            Activity: p.activity || "N/A",
            Purpose: p.purpose || "N/A",
            Details: p.detail || "N/A",
            Unit: p.unit || "N/A",
            "Cost per unit (₹)": p.perUnitCost || "N/A",
            "Total cost (₹)": p.totalCost || "N/A",
            "Target number of beneficiaries":
              p.targetNumberOfBeneficiary || "N/A",
            "Expected outcome": p.expectedOutcome || "N/A",
          };

          custom_data.push(
            ...this.buildTagRows(item, p, index, pIndex, baseData)
          );

        });
      });
      }

      // 🔹 Resolve State Name for filename
      // const stateId = this.stateName === "null" ? "ALL" : this.stateName;
      // if (stateId != "ALL") {
      //   const stateName = this.stateList.filter((e) => e.stateId == stateId);
      //   this.stateChangeName = stateName[0]?.stateName;
      // }

      // 🔹 File Name
      const fileName = `${
        this.proposaActivityId === 1
          ? "Infrastructure New Construction"
          : this.proposaActivityId === 2
          ? "Infrastructure Renovation or Upgradation"
          : this.proposaActivityId === 3
          ? "Equipment Procured"
          : this.proposaActivityId === 4
          ? "Soft Component"
          : ""
      }_${this.stateName ? this.stateName : "ALL"}_${
        this.districtId ? this.districtId : "ALL"
      }_${
        this.componetName ? this.componetName : "ALL"
      }_Consolidated_Item_Tagging_Report`;

      // 🔹 Export
      this.excelService.exportToExcel(custom_data, fileName);
    } else {
      this.notification.showValidationMessage("No Data Found");
    }
  }

  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
    sessionStorage.removeItem("back");
    sessionStorage.removeItem("addRemarks");
    // sessionStorage.removeItem('filterdata')
    // sessionStorage.removeItem('filteredStateCode')
    // sessionStorage.removeItem('filteredComponentId')
    // sessionStorage.removeItem('filteredDistrictCode')
    // sessionStorage.removeItem('filteredConsultantUserId')
    // sessionStorage.removeItem('filteredStatus')
    // sessionStorage.removeItem('filteredAllotmentStatus')
  }

  onToggleChange(event: any) {
    this.isToggled = event.checked;
    sessionStorage.setItem("isToggled", JSON.stringify(this.isToggled));
    if (event.checked) {
      // ✅ Toggle is ON
      this.findOutcomeAch();
    } else {
      // ✅ Toggle is OFF
      this.findOutcome();
    }
  }

  refActivity() {
    this.getService.getProposalActivity().subscribe((res) => {
      if (res) {
        this.refList = res.filter(
          (e) => e.id === 1 || e.id === 2 || e.id === 3 || e.id === 4
        );
      }
    });
  }

 getTagNames(tags: any[], capacityTags: any[]): string {

  // If capacity tagging available
  if (capacityTags && capacityTags.length > 0) {
    return capacityTags.map(tag => {
      return tag.capacity
        ? `${tag.proposalItemTagName} (${tag.capacity})`
        : `${tag.proposalItemTagName}`;
    }).join(', ');
  }

  // Otherwise use normal tagging
  return tags?.map(tag => tag.name).join(', ') || '';
}

getTags(tags: any[], capacityTags: any[]) {

  if (capacityTags && capacityTags.length > 0) {
    return capacityTags.map(tag => ({
      name: tag.proposalItemTagName,
      capacity: tag.capacity
    }));
  }

  return tags?.map(tag => ({
    name: tag.name,
    capacity: null
  })) || [];
}


getTotalCapacity(capacityTags: any[]): number {

  if (!capacityTags || capacityTags.length === 0) {
    return 0;
  }

  return capacityTags.reduce((sum, tag) => sum + (Number(tag.capacity) || 0), 0);
}



  onSelection(event: any) {
    const selectedValues = event.value;
    if (selectedValues) {
      this.itemView = true;
      // this.getTagDropValue(selectedValues);
    }
    else {
       this.itemView = false;
    }
    this.collegeTagReport()
    // const idValue =
    // selectedValues === 1
    //   ? "Infrastructure New Construction"
    //   : selectedValues === 2
    //   ? "Infrastructure Renovation or Upgradation"
    //   : selectedValues === 3
    //   ? "Equipment Procured"
    //   : selectedValues === 4
    //   ? "Soft Component"
    //   : "";
    // this.collegeTagReport1(idValue);
    // this.allSelected = selectedValues.length-1 === this.UpdatedropList.length;
  }

  allSelected = false;
  onSelectionChange(event: any) {
    const selectedValues = event.value;
    const fullResponse = this.UpdatedropList;
    this.allSelected = selectedValues.length - 1 === this.UpdatedropList.length;
    if (selectedValues[0] === "ALL") {
      const collegeDataTag = this.collegeListDataTag.filter(
        (proposal) =>
          Array.isArray(proposal.proposalTaggingName) &&
          proposal.proposalTaggingName.some((tag) =>
            fullResponse.includes(tag.name)
          )
      );
      this.collegeListDataTag = collegeDataTag;
      if (this.allSelected === false) {
        const filteredResult = fullResponse.filter((item) =>
          selectedValues.includes(item.id)
        );
        this.masterNames = filteredResult.map((item) => item.name);
        if (this.masterNames.length > 0) {
          const collegeDataTag = this.collegeListDataTag.filter(
            (proposal) =>
              Array.isArray(proposal.proposalTaggingName) &&
              proposal.proposalTaggingName.some((tag) =>
                this.masterNames.includes(tag.name)
              )
          );
          this.collegeListDataTag = collegeDataTag;
          this.updatePaginatedTagReport();
        } else {
          this.collegeTagReport();
        }
      } else {
        this.collegeListDataTag = this.collegeListDataTag;
        this.updatePaginatedTagReport();
      }
    } else if (selectedValues.length === 0) {
      this.collegeTagReport();
    } else {
      if (this.allSelected === false) {
        const filteredResult = fullResponse.filter((item) =>
          selectedValues.includes(item.id)
        );
        this.masterNames = filteredResult.map((item) => item.name);
        if (this.masterNames.length > 0) {
          const collegeDataTag = this.filterCollegeData.filter(
            (proposal) =>
              Array.isArray(proposal.proposalTaggingName) &&
              proposal.proposalTaggingName.some((tag) =>
                this.masterNames.includes(tag.name)
              )
          );
          this.collegeListDataTag = collegeDataTag;
          this.updatePaginatedTagReport();
        } else {
          this.collegeTagReport();
        }
      } else {
        this.collegeListDataTag = this.filterCollegeData;
        this.updatePaginatedTagReport();
      }
    }
  }

  getTagDropValue(id: any) {
    this.masterService.getTagging(id).subscribe(
      (res) => {
        if (res && res.length) {
          this.UpdatedropList = res;
          this.UpdatedropListArr = this.UpdatedropList.slice();
          // this.onDropCapicityValue(this.UpdatedropList)
        }
      },
      (err) => {
        console.error("Error fetching page status:", err);
      }
    );
  }

  // onDropCapicityValue(value:any) {
  //   const selectedValue = this.data?.proposalItemTagging;
  //   if (selectedValue) {
  //     const fullResponse1 = value;
  //     const capFilterResult = fullResponse1.filter(item =>
  //       selectedValue.includes(item.id) && item.isCapacityField === true
  //     );
  //     if (capFilterResult.length > 0){
  //       this.isCapicity = true;
  //     }
  //     else {
  //       this.isCapicity = false;
  //       this.infraForm.controls['capacity'].reset();
  //     }
  //   }

  // }

  toggleSelectAll() {
    if (this.allSelected) {
      // Deselect all items
      this.proposalItemTaggingId = "";
      this.allSelected = false;
    } else {
      // Select all items
      const allValues = this.UpdatedropList.map((item) => item.id);
      this.proposalItemTaggingId = allValues;
      this.allSelected = true;
    }
  }

 applyFilter(searchText: string) {

  if (!searchText) {
    this.filteredData = [...this.geoTagData];
  } else {
    const value = searchText.toLowerCase();

    this.filteredData = this.geoTagData.filter(item =>
      item.stateName?.toLowerCase().includes(value) ||
      item.componentName?.toLowerCase().includes(value) ||
      item.districtName?.toLowerCase().includes(value) ||
      item.instituteName?.toLowerCase().includes(value) ||
      item.aisheCode?.toLowerCase().includes(value)
    );
  }

  // 🔥 IMPORTANT FIX
  this.pageIndexNumberGeo = 0;   // reset to first page

  this.updatePaginatedGeoReport();
}


}

