import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { GetService } from 'src/app/service/get.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { CachedDataService } from 'src/app/pm-usha/pages/reports/report-services/cached-data.service';
import { CachedTotalDataService } from 'src/app/pm-usha/pages/reports/report-services/cached-total-data.service';
import { CachedStateDataService } from 'src/app/pm-usha/pages/reports/report-services/cached-state-data.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'cfs-status-note-seven',
  templateUrl: './status-note-seven.component.html',
  styleUrls: ['./status-note-seven.component.scss']
})
export class StatusNoteSevenComponent implements OnInit {
  @Input() noteData: string; 
  @Input() triggerFetch!: boolean;
  @Input() stateValue!: string;
  selectedTabIndex: number = 0; // Initialize with the first tab selected
  userTypeId: any;
  componentId: any = 0;
  stateCode: string;
  noteOneList: Array<any> = [];
  rusaPhase: any = 'ALL';
  componetNameFilter = -1;
  stateName: any = 'ALL';
  rusa1UnitStatus: any
  rusa2UnitStatus: any;
  pmushaUnitStatus: any;
  rusa1UnitApproved: number;
  rusa2UnitApproved: number;
  pmushaUnitApproved: number;
  totalApprovedUnits: number;
  rusa1TotalShareApproved: any;
  rusa2TotalShareApproved: any;
  pmushaTotalShareApproved: any;
  totalShareApproved: any;
  rusa1UnitStatusMmer: any;
  rusa1UnitStatusMmerCount: number;
  rusa2UnitStatusMmer: any;
  rusa2UnitStatusMmerCount: number;
  pmushaUnitStatusMmer: any;
  pmushaUnitStatusMmerCount: number;
  totalUnitStatusMmerCount: number;
  totalAmountApprovedRusa1: any;
  totalAmountApprovedRusa2: any;
  totalAmountApprovedPmusha: any;
  allTotalAmountApproved: any;
  centralShareRusa1: any;
  centralSharApprovedRusa1Total: any;
  centralSharApprovedRusa1PmsushaUtilisedTotal: any;
  centralSharApprovedRusa1ReleasedTotal: any;
  centralShareRusa2: any;
  centralSharApprovedRusa2Total: any;
  centralSharApprovedRusa2ReleasedTotal: any;
  centralSharApprovedRusa2PmsushaUtilisedTotal: any;
  centralSharePmUsha:any = 0;
  centralSharePmUshaApprovedTotal:any;
  centralSharePmUshaApprovedReleased:any;
  centralSharePmUshaApprovedUtilization:any;
  balanceRusa1:any;
  balanceRusa2:any;
  balancePmUsha:any;
  ongoingRusa1:any = 0;
  ongoingRusa2:any = 0;
  ongoingRusaPmUsha:any = 0;
  stateId:any = 'ALL';
  selectedIndex: any = 0;
  legacyDataArr:any = []
  meruDataArry:any = []
  gscuDataArry:any = []
  gieiDataArry:any = []
  gscDataArry:any = []
  dataList:any  = []
  paginatedData = [];
  paginatedDataThree = [];
  pageSize = 10;
  pageIndex = 0;
  projectStatusListUpdate:any = [{ status: "Completed", id: 1 }, { status: "Ongoing", id: 2 },{ status: "Not yet started", id: 3 },{ status: "Cancelled by the 1st PAB of PM-USHA (Committed liability not carried forward)", id: 4 },]
  updateProjectStatus:any = 'ALL';
  filterArray:any =[]
  filterPhaseList: any = [{ name: "PM-USHA", keyname: "PM-USHA"}, { name: "RUSA 1", keyname: "RUSA 1" }, { name: "RUSA 2", keyname: "RUSA 2" }]
  showHeader: boolean = true;
  threeNotesData: any;
  componentCounts: {
    componentId: number;
    componentName: string;
    count: number;
    ranges: { [key: string]: number };
    totalAmountApproved: number;
  }[] = [];
  constructor(public router: Router, public getService: GetService, public sharedService: SharedService, public masterService: MasterService, public notification: NotificationService, public cachedData: CachedDataService, public cachedTotalData: CachedTotalDataService, public cachedStateData: CachedStateDataService) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userTypeId = sessionStorage.getItem('userTypeId')
  }

  ngOnInit(): void {
    this.getStatusData('')
    // this.getRusaLegacyData()
  }


  tabSelected(event) {

  }



  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['triggerFetch']) {
  //     this.fetchData(this.stateId)
  //   }
    
    
  // }

  // fetchData(stateName) {
  //   this.stateId = stateName === 'ALL' ? '' : stateName
  //     this.getStatusData(this.stateId)
    
  // }

  

  getStatusData(stateId:any) {
    this.getService.getPmUshaReportDetails(stateId, '', '').subscribe(res => {
    // this.dataList = res.data
    this.threeNotesData = res.data
    this.legacyDataArr = res.data
    this.sharedService.setNoteData(res)
      this.rusa1UnitStatus = res.data.filter(e => (e.rusaPhase === "RUSA 1" && e.componentName !=="MMER"));
      this.rusa1UnitStatusMmer = res.data.filter(e => (e.rusaPhase === "RUSA 1" && e.componentName ==="MMER"));
      this.centralShareRusa1=res.data.filter(e => (e.rusaPhase === "RUSA 1"))
      this.centralSharApprovedRusa1Total=this.centralShareRusa1.reduce((total,item)=>{
        return total + parseFloat(item.centralShareApproved);
      },0 );
      this.centralSharApprovedRusa1ReleasedTotal=this.centralShareRusa1.reduce((total,item)=>{
        return total + parseFloat(item.centralShareReleased);
      },0 );

    
      
      
      this.centralSharApprovedRusa1PmsushaUtilisedTotal = this.centralShareRusa1.reduce((total, item) => {
        const util = parseFloat(item.centralShareUtilised);
        if (!isNaN(util)) {
          return total + util;
        }
        return total;
      }, 0);



      this.balanceRusa1 =  this.centralSharApprovedRusa1Total -  this.centralSharApprovedRusa1ReleasedTotal
      this.centralSharApprovedRusa1PmsushaUtilisedTotal = isNaN(this.centralSharApprovedRusa1PmsushaUtilisedTotal) ? 0 : this.centralSharApprovedRusa1PmsushaUtilisedTotal

      this.rusa1UnitStatusMmerCount=this.rusa1UnitStatusMmer.reduce((total, item) => {
        return total + parseFloat(item.centralShareApproved);
      }, 0);

      this.rusa1UnitApproved = this.rusa1UnitStatus.length
      this.rusa1TotalShareApproved = this.rusa1UnitStatus.reduce((total, item) => {
        return total + parseFloat(item.centralShareApproved) + parseFloat(item.stateShareApproved);
      }, 0);




      this.rusa2UnitStatus = res.data.filter(e => (e.rusaPhase === "RUSA 2"  && e.componentName !=="MMER"));
      this.rusa2UnitStatusMmer = res.data.filter(e => (e.rusaPhase === "RUSA 2"  && e.componentName ==="MMER"));
      this.centralShareRusa2=res.data.filter(e => (e.rusaPhase === "RUSA 2"))
      this.centralSharApprovedRusa2Total=this.centralShareRusa2.reduce((total,item)=>{
        return total + parseFloat(item.centralShareApproved);
      },0 );
      this.centralSharApprovedRusa2ReleasedTotal=this.centralShareRusa2.reduce((total,item)=>{
        return total + parseFloat(item.centralShareReleased);
      },0 );
      this.centralSharApprovedRusa2PmsushaUtilisedTotal=this.centralShareRusa2.reduce((total,item)=>{
        return total + parseFloat(item.centralShareUtilised);
      },0 );

      this.balanceRusa2 =  this.centralSharApprovedRusa2Total -  this.centralSharApprovedRusa2ReleasedTotal

      this.rusa2UnitStatusMmerCount=this.rusa2UnitStatusMmer.reduce((total, item) => {
        return total + parseFloat(item.centralShareApproved);
      }, 0);



      this.rusa2UnitApproved = this.rusa2UnitStatus.length;
      this.rusa2TotalShareApproved = this.rusa2UnitStatus.reduce((total, item) => {
        return total + parseFloat(item.centralShareApproved) + parseFloat(item.stateShareApproved);
      }, 0);
      this.pmushaUnitStatus = res.data.filter(e => (e.rusaPhase === "PM-USHA"  && e.componentName!=="MMER"));
      this.pmushaUnitStatusMmer = res.data.filter(e => (e.rusaPhase === "PM-USHA" && e.componentName ==="MMER"));
      this.centralSharePmUsha=res.data.filter(e => (e.rusaPhase === "PM-USHA"))

      this.centralSharePmUshaApprovedTotal=this.centralSharePmUsha.reduce((total,item)=>{
        return total + parseFloat(item.centralShareApproved);
      },0 );

      this.centralSharePmUshaApprovedTotal = isNaN(this.centralSharePmUshaApprovedTotal) ? 0  : this.centralSharePmUshaApprovedTotal;

      // this.centralSharePmUshaApprovedReleased=this.centralSharePmUsha.reduce((total,item)=>{
      //   return total + parseFloat(item.centralShareReleased);
      // },0 );

      
      
      
      this.centralSharePmUshaApprovedReleased = this.centralSharePmUsha.reduce((total, item) => {
        const util = parseFloat(item.centralShareReleased);
        // Check if the parsed value is a valid number
        if (!isNaN(util)) {
          return total + util;
        }
        return total; // If it's not a valid number, skip it
      }, 0);


     


      this.centralSharePmUshaApprovedReleased = isNaN(this.centralSharePmUshaApprovedReleased) ? 0  : this.centralSharePmUshaApprovedReleased;
      
      
      // this.centralSharePmUshaApprovedUtilization=this.centralSharePmUsha.reduce((total,item)=>{
      //   return total + parseFloat(item.centralShareUtilised);
      // },0 );


      this.centralSharePmUshaApprovedUtilization = this.centralSharePmUsha.reduce((total, item) => {
        const util = parseFloat(item.centralShareUtilised);
       
        if (!isNaN(util)) {
          return total + util;
        }
        return total; 
      }, 0);

      

      this.balancePmUsha =  this.centralSharePmUshaApprovedTotal -  this.centralSharePmUshaApprovedReleased


      this.centralSharePmUshaApprovedUtilization = isNaN(this.centralSharePmUshaApprovedUtilization) ? 0  : this.centralSharePmUshaApprovedUtilization;

      



      this.pmushaUnitStatusMmerCount=this.pmushaUnitStatusMmer.reduce((total, item) => {
        return total + parseFloat(item.centralShareApproved);
      }, 0);;
      this.pmushaUnitApproved = this.pmushaUnitStatus.length;
      this.pmushaTotalShareApproved = this.pmushaUnitStatus.reduce((total, item) => {
        return total + parseFloat(item.centralShareApproved) + parseFloat(item.stateShareApproved);
      }, 0);
      // Calculate the total approved units
      this.totalApprovedUnits = this.rusa1UnitApproved + this.rusa2UnitApproved + this.pmushaUnitApproved;
      this.totalShareApproved = this.rusa1TotalShareApproved + this.rusa2TotalShareApproved + this.pmushaTotalShareApproved;
      this.totalUnitStatusMmerCount =this.rusa1UnitStatusMmerCount + this.rusa2UnitStatusMmerCount + this.pmushaUnitStatusMmerCount;
      this.totalAmountApprovedRusa1=this.rusa1TotalShareApproved + this.rusa1UnitStatusMmerCount;
      this.totalAmountApprovedRusa2=this.rusa2TotalShareApproved + this.rusa2UnitStatusMmerCount;
      this.totalAmountApprovedPmusha=this.pmushaTotalShareApproved + this.pmushaUnitStatusMmerCount;
      this.allTotalAmountApproved=this.totalAmountApprovedRusa1+ this.totalAmountApprovedRusa2 + this.totalAmountApprovedPmusha
      this.ongoingRusa1 = res.data.filter(e => (e.rusaPhase === "RUSA 1" && (e.rusaProjectStatusId === 2 || e.rusaProjectStatusId === 3  || e.rusaProjectStatusId === null)));
      this.ongoingRusa2 = res.data.filter(e => (e.rusaPhase === "RUSA 2" && (e.rusaProjectStatusId === 2 || e.rusaProjectStatusId === 3 || e.rusaProjectStatusId === null)));
      this.ongoingRusaPmUsha = res.data.filter(e => (e.rusaPhase === "PM-USHA" && (e.rusaProjectStatusId === 2 || e.rusaProjectStatusId === 3 || e.rusaProjectStatusId === null)));
    });
    this.updatePaginatedData()
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.dataList.slice(startIndex, endIndex);
    this.paginatedDataThree = this.threeNotesData.slice(startIndex, endIndex);
  }






  // tabValue(e, prposalId){
  //   this.dataList = this.legacyDataArr.filter(
  //     item => item.rusaPhase === 'PM-USHA' && item.componentId === prposalId
  //   );
  //   this.pageIndex = 0;
  //   this.updatePaginatedData();

  // }

  getRusaLegacyData() {
    this.sharedService.noteData$.subscribe(res =>{
      this.legacyDataArr = res.data
      this.updatePaginatedData();
    
   });
  }

  ChangesRusaComponentSelection(e) {
    if (e === 'PM_USHA' || e === 'ALL') {
       this.showHeader = true;
     }
     else {
       this.showHeader = false;
     }
     this.updateProjectStatus = 'ALL'
     this.getProjectStatusBottom()
    
   }
 
   getProjectStatusBottom() {
     this.getService.getprojectStatusList().subscribe(res => {
         this.projectStatusListUpdate = res.data;
       }, err => {
 
     })
   }
 
   ChangesProjectStatus(statusValue: any) {
     if(statusValue == 'ALL'){
       this.dataList = this.filterArray
       this.updatePaginatedData()
     
     }
     else{
       this.dataList = this.filterArray.filter(evt => evt.rusaProjectStatusId ===  statusValue)
       this.updatePaginatedData()
     }
       
   
   }


   tabValue(e, prposalId){
    if(prposalId ===11){
   const counts: { [key: string]: { componentId: number; componentName: string; count: number; ranges: { [key: string]: number }; totalAmountApproved: number} } = {};
     const ranges = {
       "100": (value: number) => value === 100,
       "95-97": (value: number) => value >= 95 && value <= 97,
       "74-50": (value: number) => value >= 50 && value <= 74,
       "below 50": (value: number) => value < 50
     };
     this.dataList = this.legacyDataArr.filter(item => item.rusaPhase === 'RUSA 1')
     this.dataList.forEach(item => {
       const key = `${item.componentId}-${item.componentName}`; // Unique key based on ID and name
       if (!counts[key]) {
         counts[key] = {
           componentId: item.componentId,
           componentName: item.componentName,
           count: 0,
           ranges: { "100": 0, "95-97": 0, "74-50": 0, "below 50": 0 },
           totalAmountApproved : 0
         };
       }
       counts[key].count += 1;
       counts[key].totalAmountApproved += parseFloat(item.totalAmountApproved);
 
       // Update the ranges for physicalProgressTotal
       Object.keys(ranges).forEach(range => {
         if (ranges[range](item.physicalProgressTotal)) {
           counts[key].ranges[range]++;
         }
       });
     });
     this.componentCounts = Object.entries(counts).map(([key, value]) => ({
       componentId: value.componentId,
       componentName: value.componentName,
       count: value.count,
       ranges: value.ranges,
       totalAmountApproved: value.totalAmountApproved

     }));
     

   }
   else if(prposalId === 22){
     const counts: { [key: string]: { componentId: number; componentName: string; count: number; ranges: { [key: string]: number }; totalAmountApproved: number} } = {};
     const ranges = {
       "100": (value: number) => value === 100,
       "95-97": (value: number) => value >= 95 && value <= 97,
       "74-50": (value: number) => value >= 50 && value <= 74,
       "below 50": (value: number) => value < 50
     };
     this.dataList = this.legacyDataArr.filter(item => item.rusaPhase === 'RUSA 2')
     this.dataList.forEach(item => {
       const key = `${item.componentId}-${item.componentName}`; // Unique key based on ID and name
       if (!counts[key]) {
         counts[key] = {
           componentId: item.componentId,
           componentName: item.componentName,
           count: 0,
           ranges: { "100": 0, "95-97": 0, "74-50": 0, "below 50": 0 },
           totalAmountApproved : 0
         };
       }
       counts[key].count += 1;
       counts[key].totalAmountApproved += parseFloat(item.totalAmountApproved);
 
       // Update the ranges for physicalProgressTotal
       Object.keys(ranges).forEach(range => {
         if (ranges[range](item.physicalProgressTotal)) {
           counts[key].ranges[range]++;
         }
       });
     });
     this.componentCounts = Object.entries(counts).map(([key, value]) => ({
       componentId: value.componentId,
       componentName: value.componentName,
       count: value.count,
       ranges: value.ranges,
       totalAmountApproved: value.totalAmountApproved

     }));
     
    
   }
   else if(prposalId ===33){
     const counts: { [key: string]: { componentId: number; componentName: string; count: number; ranges: { [key: string]: number }; totalAmountApproved: number} } = {};
     const ranges = {
       "100": (value: number) => value === 100,
       "95-97": (value: number) => value >= 95 && value <= 97,
       "74-50": (value: number) => value >= 50 && value <= 74,
       "below 50": (value: number) => value < 50
     };
     this.dataList = this.legacyDataArr.filter(item => item.rusaPhase === 'PM-USHA')
     this.dataList.forEach(item => {
       const key = `${item.componentId}-${item.componentName}`; // Unique key based on ID and name
       if (!counts[key]) {
         counts[key] = {
           componentId: item.componentId,
           componentName: item.componentName,
           count: 0,
           ranges: { "100": 0, "95-97": 0, "74-50": 0, "below 50": 0 },
           totalAmountApproved : 0
         };
       }
       counts[key].count += 1;
       counts[key].totalAmountApproved += parseFloat(item.totalAmountApproved);
 
       // Update the ranges for physicalProgressTotal
       Object.keys(ranges).forEach(range => {
         if (ranges[range](item.physicalProgressTotal)) {
           counts[key].ranges[range]++;
         }
       });
     });
     this.componentCounts = Object.entries(counts).map(([key, value]) => ({
       componentId: value.componentId,
       componentName: value.componentName,
       count: value.count,
       ranges: value.ranges,
       totalAmountApproved: value.totalAmountApproved

     }));
   }
   else {
    this.dataList = this.legacyDataArr.filter(
      item => item.rusaPhase === 'PM-USHA' && item.componentId === prposalId
    );
    this.pageIndex = 0;
    this.updatePaginatedData();
   }
 
 }

 onChange(event: any) {
   this.sharedService.pageSizeCustom = parseInt(event);
   this.handlePageChange(this.sharedService.page = 1)
 }

 handlePageChange(event: any) {
   this.sharedService.page = event
   this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSizeCustom)),
     this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSizeCustom)
   var a = Math.ceil(this.dataList.length / Number(this.sharedService.pageSizeCustom));
   if (a === event) {
     this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSizeCustom), this.dataList.length);
   } else {
     this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSizeCustom), this.dataList.length - 1);
   }

 }
 
 
   
 
  
 
 
//    

}

