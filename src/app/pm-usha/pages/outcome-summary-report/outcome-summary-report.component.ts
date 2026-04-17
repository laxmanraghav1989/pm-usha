import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTabChangeEvent, MatTabGroup } from "@angular/material/tabs";
import { CachedDataService } from "../reports/report-services/cached-data.service";
import { GetService } from "src/app/service/get.service";
import { MasterService } from "src/app/service/master.service";
import { SharedService } from "src/app/shared/shared.service";
import { PageEvent } from "@angular/material/paginator";
import { Router } from "@angular/router";
import { routes } from 'src/app/routes';
import { ExcelService } from "src/app/service/excel.service";
import { NotificationService } from "src/app/service/notification.service";
import { ShareReplayService } from "src/app/service/share-replay.service";

@Component({
  selector: "cfs-outcome-summary-report",
  templateUrl: "./outcome-summary-report.component.html",
  styleUrls: ["./outcome-summary-report.component.scss"],
})
export class OutcomeSummaryReportComponent implements OnInit {
   @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  public routers: typeof routes = routes;
  selectedIndex: any;
  isToggled: boolean = false;
  tabIndex: any = false;
  stateName: any = "ALL";
  componetName: any = "0";
  componentList: Array<any> = [];
  filteredComponents: any[];
  rusaPhase: any = "ALL";
  rusaComp: any[];
  filterStateList: Array<any> = [];
  filterStateListArr: Array<any> = [];
  stateList2: Array<any> = [];
  stateListArr: Array<any> = [];
  proposalOutComesArr: any[] = [];
  pageSize = 15;
  pageIndex = 0;
  pageSizeAch = 15;
  pageIndexAch = 0;
  pageSizeNumber = 15;
  pageIndexNumber = 0;
  paginatedData = [];
  paginatedDataUpdate = [];
  proposalOutAchiveArr: any[] = [];
  stateList: Array<any> = [];
  proposalTemplateArr: any[] = [];
  proposalOutAchiveArrUpdate: any;
  tempList1: any[];
  SAATypeList: boolean;
  userTypeId: any;
  stateCode: string;
  userNpdTypeList: boolean;
  collegeListData: any[] = [];
  districtId: string = 'ALL';
  gridApi: any;
  gridColumnApi: any;

  constructor(
    public cachedData: CachedDataService,
    public getService: GetService,
    public masterService: MasterService,
    public sharedService: SharedService,
    public router: Router,
    private excelService: ExcelService, public notification: NotificationService, public shareData: ShareReplayService
  ) {
    this.stateCode = sessionStorage.getItem("stateCode");
    this.userTypeId = sessionStorage.getItem("userTypeId");
  }

  ngOnInit(): void {

    if (sessionStorage.getItem("back") === "true") {
      sessionStorage.removeItem("back");
      this.cachedData.getData("stateList").subscribe((data) => {
        if (data && data.length > 0) {
          this.stateList = data;
        } 
        else {
          // this.getSateData();
          this.getSateDataList()
        }
      });
      // this.collegeListData = this.cachedDataTag.getData(); // Use cached data
      // this.cachedData.getData('tempConsolidatedList').subscribe((data) => {
      //   if (data && data.length > 0) {
      //     this.tempConsolidatedList = data;
      //     this.totalValue(this.tempConsolidatedList)
      //   }
      // });
      this.cachedData.getData("collegeList").subscribe((data) => {
        if (data && data.length > 0) {
          this.collegeListData = data;
        }
      });
    } 
    else {
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

    ngAfterViewInit(): void {
    const storedIndex = sessionStorage.getItem('activeTabIndex1');
    if (storedIndex !== null) {
      this.tabGroup.selectedIndex = +storedIndex;
    }
  }

  tabSelected(value: MatTabChangeEvent) {
    sessionStorage.setItem("activeTabIndex1", value.index.toString());
    this.selectedIndex = value.index;
    if (this.selectedIndex === 1) {
      if (sessionStorage.getItem("report") === "true") {
        sessionStorage.removeItem("report");
        this.tabIndex = true;
        const storedToggle = sessionStorage.getItem("isToggled");
        if (storedToggle !== null) {
          this.isToggled = JSON.parse(storedToggle);
        }
        this.stateName = String(sessionStorage.getItem("stateFilterName"));
        const compVal = Number(sessionStorage.getItem("componetFilterName"));
        this.componetName = isNaN(compVal) ? "ALL" : compVal;
        this.componentIdList();
        this.getSateDataList();
        this.cachedData.getData("proposalOutComesArr").subscribe((data) => {
          if (data && data.length > 0) {
            this.proposalOutComesArr = data;
            this.updatePaginatedData();
          }
        });
        this.cachedData.getData("proposalOutAchiveArr").subscribe((data) => {
          if (data && data.length > 0) {
            this.proposalOutAchiveArr = data;
            this.updatePaginatedDataAchivment();
          }
        });
      } else if (sessionStorage.getItem("report") === null) {
        this.tabIndex = true;
        this.stateName = "ALL";
        this.componetName = "ALL";
        this.collegeList();
        this.getSateDataList()
        this.componentIdList();
      }
    } 
    // else if (this.selectedIndex === 2) {
    //   if (sessionStorage.getItem("report") === "true") {
    //     sessionStorage.removeItem("report");
    //     this.tabIndex = true;
    //     const storedToggle = sessionStorage.getItem("isToggled");
    //     if (storedToggle !== null) {
    //       this.isToggled = JSON.parse(storedToggle);
    //     }
    //     this.stateName = String(sessionStorage.getItem("stateFilterName"));
    //     const compVal = Number(sessionStorage.getItem("componetFilterName"));
    //     this.componetName = isNaN(compVal) ? "ALL" : compVal;
    //     this.componentIdList();
    //     this.getSateDataList();
    //     this.cachedData.getData("proposalOutAchiveArr").subscribe((data) => {
    //       if (data && data.length > 0) {
    //         this.proposalOutAchiveArr = data;
    //         this.updatePaginatedDataAchivment();
    //       }
    //     });
    //   } else if (sessionStorage.getItem("report") === null) {
    //     this.tabIndex = true;
    //     this.stateName = "ALL";
    //     this.componetName = "ALL";
    //     this.collegeListAch();
    //     this.componentIdList();
    //     this.getSateDataList();
    //   }
    // }
  }

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
        // this.getConsolidate()
      },
      (err) => {
        console.error("Error fetching page status:", err);
      }
    );
  }

  getSateDataList() {
    this.shareData.getStateData().subscribe(
      (res) => {
        this.stateList2 = res;
        this.stateListArr = res;
        this.filterStateList = this.stateList2.slice();
        this.filterStateListArr = this.stateListArr.slice();
      },
      () => {}
    );
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
    this.getService.getLockPMUshaProgressList(this.stateCode === 'ALL' ? '' : this.stateCode).subscribe((res) => {
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

  datailsList(ele: any): void {
    let componentId = ele.componentId
    let aiseCode = ele.aisheCode
    let tabIndex = 1
    let districtCode = ele.districtCode
    sessionStorage.setItem('stateFilterName', this.stateName)
    sessionStorage.setItem('componetFilterName', this.componetName)
    sessionStorage.setItem('districtFilterName', this.districtId)
    if (componentId == '1') {
      this.router.navigate([this.routers.viewOutcomeMeruRevision, componentId, aiseCode, tabIndex])
    }
    else if (componentId == '2' || componentId == '3') {
      this.router.navigate([this.routers.viewOutcomeStrengthenRevision, componentId, aiseCode, tabIndex])
    }
    else if (componentId == '4' || componentId == '5') {
      this.router.navigate([this.routers.viewOutcomeEquityRevision, componentId, aiseCode, tabIndex, districtCode])
    }
  }

  datailsListAchive(ele: any): void {
    let componentId = ele.componentId
    let aiseCode = ele.aisheCode
    let year = ele.year
    let month = ele.month
    let achiveKey = 11
    let tabIndex = 2
    let districtCode = ele.districtCode
    // sessionStorage.setItem('stateFilterNameAch', this.stateNameAch)
    // sessionStorage.setItem('componetFilterNameAch', this.componetNameAch)
    this.cachedData.setData('TagData', ele)
    sessionStorage.setItem('districtFilterName', this.districtId)
    if (componentId == '1') {
      this.router.navigate([this.routers.viewOutcomeMeruRevisionAch, componentId, aiseCode, tabIndex, year, month, achiveKey])
    }
    else if (componentId == '2' || componentId == '3') {
      this.router.navigate([this.routers.viewOutcomeStrengthenRevisionAch, componentId, aiseCode, tabIndex, year, month, achiveKey])
    }
    else if (componentId == '4' || componentId == '5') {
      this.router.navigate([this.routers.viewOutcomeEquityRevisionAch, componentId, aiseCode, tabIndex, districtCode, year, month, achiveKey])
    }
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

  downloadPOutcomes() {
    if (this.proposalOutComesArr.length != 0) {
      //  this.arrMonths
      let custom_data = this.proposalOutComesArr.map((item, index) => ({
        'S.No': index + 1,
        'Aishe Code': item.aisheCode,
        'Institution Name': (item.componentId === this.sharedService.genderComponentId ||
         item.componentId === this.sharedService.nmdcComponentId)
          ? item.aisheCode
          : item.instituteName,
        'Component Name': item.componentName,
        'State': item.stateName,
        'District': item.districtName,
        'Focus District': item.isFocusDistrict ? 'Yes' : 'No',
        'Is Aspirational District': item.aspirational ? 'Yes' : 'No',
        'Is Left Wing Extremist (LWE) District': item.lweAffected ? 'Yes' : 'No',
        'Is Border Area District': item.borderArea ? 'Yes' : 'No',
        'Total Score': item.totalScore,
        'Total Cost': item.isV3ForwardedToNpd && item.revisedProposalV3Cost ? +item.revisedProposalV3Cost : +item.revisedTotalCost
      }

      ));
      this.excelService.exportToExcel(custom_data, `Proposal-Outcomes-Report`);
    }
    else {
      this.notification.showValidationMessage("No Data Found");
    }
  }

   downloadReportAch() {
    if (this.proposalOutAchiveArr.length != 0) {
      //  this.arrMonths
      let custom_data = this.proposalOutAchiveArr.map((item, index) => ({
        'S.No': index + 1,
        'Aishe Code': item.aisheCode,
        'Institution Name': item.institutionName,
        'Component Name': item.componentName,
        'State': item.stateName,
        'District': item.districtName,
        'Focus District': item.isFocusDistrict ? 'Yes' : 'No',
        'Is Aspirational District': item.aspirational ? 'Yes' : 'No',
        'Is Left Wing Extremist (LWE) District': item.lweAffected ? 'Yes' : 'No',
        'Is Border Area District': item.borderArea ? 'Yes' : 'No',
        'Total Score': item.totalScore,
        'Total Cost': item.revisedTotalCost,
        'Year': item.year,
        'Month': item.monthName,

      }

      ));
      this.excelService.exportToExcel(custom_data, `Outcomes Achievement Report`);
    }
    else {
      this.notification.showValidationMessage("No Data Found");
    }
  }

   clearAll() {
    this.stateName = 'ALL'
    this.componetName = 'ALL'
    this.findOutcome()
  }

  defaultColDef = {
    resizable: true,
  }

 columnDefs = [
    {
      headerName: 'S.No',
      valueGetter: 'node.rowIndex + 1',
      width: 90,
      sortable: true
    },
    {
      headerName: 'Aishe Code',
      field: 'aisheCode',
      cellRenderer: (params: any) =>
        `<span style="color:blue; border-bottom:1px solid blue; cursor:pointer;">${params.value}</span>`,
      onCellClicked: (params: any) => this.datailsList(params.data),
      width: 140,
      filter: true,
      sortable: true
    },
    {
      headerName: 'Institution Name',
      field: 'instituteName',
      valueGetter: (params: any) =>
        (params.data.componentId === this.sharedService.genderComponentId ||
         params.data.componentId === this.sharedService.nmdcComponentId)
          ? params.data.aisheCode
          : params.data.instituteName,
          filter: true,
          sortable: true
    },
    { headerName: 'Component Name', field: 'componentName', filter: true, sortable: true },
    { headerName: 'State', field: 'stateName', filter: true, sortable: true },
    { headerName: 'District', field: 'districtName', width: 140, filter: true, sortable: true },

    {
      headerName: 'Focus District',
      field: 'isFocusDistrict',
      valueFormatter: p => p.value ? 'Yes' : 'No',
      width: 140
    },
    {
      headerName: 'Is Aspirational',
      field: 'aspirational',
      valueFormatter: p => p.value ? 'Yes' : 'No',
      width: 140
    },
    {
      headerName: 'LWE District',
      field: 'lweAffected',
      valueFormatter: p => p.value ? 'Yes' : 'No',
      width: 140
    },
    {
      headerName: 'Border Area',
      field: 'borderArea',
      valueFormatter: p => p.value ? 'Yes' : 'No',
      width: 140
    },

    { headerName: 'Total Score', field: 'totalScore', width: 140, filter: true },

    {
      headerName: 'Total Cost',
      field: 'revisedTotalCost',
      valueFormatter: (p: any) =>
        (p.data.isV3ForwardedToNpd && p.data.revisedProposalV3Cost || p.data.revisedTotalCost) ?
          this.formatRupees(p.data.revisedProposalV3Cost || p.data.revisedTotalCost) :
          '', width: 140, filter: true, sortable: true
    }
  ];

  formatRupees(value: any) {
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 2
  }).format(value);
}

onGridReady(params: any) {
  this.gridApi = params.api;
  // this.gridColumnApi = params.columnApi;
}

downloadPOutcomes1() {

  if (!this.gridApi) {
    this.notification.showValidationMessage("Grid not ready");
    return;
  }

  if (this.proposalOutComesArr.length === 0) {
    this.notification.showValidationMessage("No Data Found");
    return;
  }

  this.gridApi.exportDataAsCsv({
    fileName: 'Proposal-Outcomes-Report'
  });
}

onQuickFilter(event: any) {
  this.gridApi.setQuickFilter(event.target.value);
}
}
