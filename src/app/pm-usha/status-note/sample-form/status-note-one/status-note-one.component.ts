import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GetService } from 'src/app/service/get.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { CachedDataService } from 'src/app/pm-usha/pages/reports/report-services/cached-data.service';
import { CachedTotalDataService } from 'src/app/pm-usha/pages/reports/report-services/cached-total-data.service';
import { CachedStateDataService } from 'src/app/pm-usha/pages/reports/report-services/cached-state-data.service';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import 'jspdf-autotable';

@Component({
  selector: 'cfs-status-note-one',
  templateUrl: './status-note-one.component.html',
  styleUrls: ['./status-note-one.component.scss']
})
export class StatusNoteOneComponent implements OnInit {
 
  @Input() noteData: string; 
  @Input() triggerFetch!: boolean;
  @Input() stateValue: string;
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
  myDate = new Date()
  mmerOnePercentageTotal:any;
  amountApprovedRusa1WithoutMMRMDC;
  amountApprovedRusa2WithoutMMRMDC;
  amountApprovedPMUSHAWithoutMMRMDC;
  rusa1ErstwhileMDC: any;
  rusa1Erstwhile: any;
  rusa2ErstwhileMDC: any;
  rusa2Erstwhile: any;
  pmushaErstwhileMDC: any;
  pmushaErstwhile: any;
  totalErstwhileEDC: any;
  amountErstwhileMDC: any;
  rusa1TotalErstwhile: any;
  amountrusa2ErstwhileMDC: any;
  rusa2TotalErstwhile: any;
  amountpmushaErstwhileMDC: any;
  pmushaTotalErstwhile: any;
  
  constructor(public router: Router, public getService: GetService, public sharedService: SharedService, public masterService: MasterService, public notification: NotificationService, public cachedData: CachedDataService, public cachedTotalData: CachedTotalDataService, public cachedStateData: CachedStateDataService) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userTypeId = sessionStorage.getItem('userTypeId')
  }

  ngOnInit(): void {
   
  }


  tabSelected(event) {

  }



  ngOnChanges(changes: SimpleChanges) {
    if (changes['triggerFetch']) {
      this.fetchData(this.stateValue)
    }
    
    
  }
  

  fetchData(stateName) {
    this.stateId = stateName === 'ALL' ? '' : stateName
      this.getStatusData(this.stateId)
    
  }

  

  getStatusData(stateId:any) {
  this.getService.getPmUshaReportDetails(stateId, '', '').subscribe(res => {
    this.sharedService.setNoteData(res)
    this.rusa1UnitStatus = res.data.filter(e => (e.rusaPhase === "RUSA 1" && e.componentId !== 11));
    this.rusa1ErstwhileMDC = res.data.filter(e => (e.rusaPhase === "RUSA 1" && e.componentId !== 6));

    this.amountApprovedRusa1WithoutMMRMDC = res.data.filter(e => (e.rusaPhase === "RUSA 1" && e.componentId !== 11) && (e.rusaPhase === "RUSA 1" && e.componentId !== 6));
    this.amountErstwhileMDC = res.data.filter(e => (e.rusaPhase === "RUSA 1" && e.componentId === 6));
    this.rusa1UnitStatusMmer = res.data.filter(e => (e.rusaPhase === "RUSA 1" && e.componentId === 11) || (e.rusaPhase === "RUSA 1" && e.componentId === 6));
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



      this.balanceRusa1 =  (isNaN(this.centralSharApprovedRusa1Total) ? 0 : this.centralSharApprovedRusa1Total) -  (isNaN(this.centralSharApprovedRusa1ReleasedTotal) ? 0 : this.centralSharApprovedRusa1ReleasedTotal)
      this.centralSharApprovedRusa1PmsushaUtilisedTotal = isNaN(this.centralSharApprovedRusa1PmsushaUtilisedTotal) ? 0 : this.centralSharApprovedRusa1PmsushaUtilisedTotal
     
      // this.rusa1UnitStatusMmerCount=this.rusa1UnitStatusMmer.reduce((total, item) => {
      //   return total + parseFloat(item.centralShareApproved);
      // }, 0);

     
      this.rusa1UnitApproved = this.rusa1UnitStatus.length
      this.rusa1Erstwhile =this.rusa1ErstwhileMDC.length

    
      //Rusa1 Amount approved (Central Share + State Share) (excluding MMER) (excluding Erstwhile MDC)
      this.rusa1TotalShareApproved = this.amountApprovedRusa1WithoutMMRMDC.reduce((total, item) => {
        return total + parseFloat(item.centralShareApproved) + parseFloat(item.stateShareApproved);
      }, 0);
      this.rusa1TotalErstwhile = this.amountErstwhileMDC.reduce((total, item) => {
        return total + parseFloat(item.centralShareApproved) + parseFloat(item.stateShareApproved);
      }, 0);

      this.rusa1UnitStatusMmerCount = this.rusa1TotalShareApproved * 0.01
      //

      this.rusa2UnitStatus = res.data.filter(e => (e.rusaPhase === "RUSA 2"  && e.componentId !== 11));
    this.rusa2ErstwhileMDC = res.data.filter(e => (e.rusaPhase === "RUSA 2" && e.componentId !== 6));

      this.amountApprovedRusa2WithoutMMRMDC = res.data.filter(e => (e.rusaPhase === "RUSA 2" && e.componentId !== 11) && (e.rusaPhase === "RUSA 2"  && e.componentId !== 6));

      this.amountrusa2ErstwhileMDC = res.data.filter(e => (e.rusaPhase === "RUSA 2"  && e.componentId === 6));
      
      this.rusa2UnitStatusMmer = res.data.filter(e => (e.rusaPhase === "RUSA 2"  && e.componentId === 11) && (e.rusaPhase === "RUSA 2"  && e.componentId === 6));
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

      this.balanceRusa2 =  (isNaN(this.centralSharApprovedRusa2Total) ? 0 : this.centralSharApprovedRusa2Total) -  (isNaN(this.centralSharApprovedRusa2ReleasedTotal) ? 0 : this.centralSharApprovedRusa2ReleasedTotal)

      // this.rusa2UnitStatusMmerCount=this.rusa2UnitStatusMmer.reduce((total, item) => {
      //   return total + parseFloat(item.centralShareApproved);
      // }, 0);



      this.rusa2UnitApproved = this.rusa2UnitStatus.length;
      this.rusa2Erstwhile =this.rusa2ErstwhileMDC.length
      //Rusa2 Amount approved (Central Share + State Share) (excluding MMER) (excluding Erstwhile MDC)

      const rusa2TotalShareApproved = this.amountApprovedRusa2WithoutMMRMDC.reduce((total, item) => {
        return total + parseFloat(item.centralShareApproved) + parseFloat(item.stateShareApproved);
      }, 0);

      const rusa2TotalErstwhile = this.amountrusa2ErstwhileMDC.reduce((total, item) => {
        return total + parseFloat(item.centralShareApproved) + parseFloat(item.stateShareApproved);
      }, 0);

      this.rusa2TotalErstwhile = isNaN(rusa2TotalErstwhile) ? 0 : rusa2TotalErstwhile

      
      this.rusa2TotalShareApproved = isNaN(rusa2TotalShareApproved) ? 0 : rusa2TotalShareApproved
      this.rusa2UnitStatusMmerCount = this.rusa2TotalShareApproved * 0.01
      this.pmushaUnitStatus = res.data.filter(e => (e.rusaPhase === "PM-USHA"  && e.componentId !== 11));
      this.pmushaErstwhileMDC = res.data.filter(e => (e.rusaPhase === "PM-USHA"  && e.componentId !== 6));
      
      this.amountApprovedPMUSHAWithoutMMRMDC = res.data.filter(e => (e.rusaPhase === "PM-USHA" && e.componentId !== 11) && (e.rusaPhase === "PM-USHA"  && e.componentId !== 6));

      this.amountpmushaErstwhileMDC = res.data.filter(e =>  (e.rusaPhase === "PM-USHA"  && e.componentId === 6));

      this.pmushaUnitStatusMmer = res.data.filter(e => (e.rusaPhase === "PM-USHA" && e.componentId === 11) || (e.rusaPhase === "PM-USHA" && e.componentId === 6));
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

      

      this.balancePmUsha =  (isNaN(this.centralSharePmUshaApprovedTotal) ? 0 : this.centralSharePmUshaApprovedTotal) -  (isNaN(this.centralSharePmUshaApprovedReleased) ? 0 : this.centralSharePmUshaApprovedReleased)


      this.centralSharePmUshaApprovedUtilization = isNaN(this.centralSharePmUshaApprovedUtilization) ? 0  : this.centralSharePmUshaApprovedUtilization;

      



      // this.pmushaUnitStatusMmerCount=this.pmushaUnitStatusMmer.reduce((total, item) => {
      //   return total + parseFloat(item.centralShareApproved);
      // }, 0);;
      this.pmushaUnitApproved = this.pmushaUnitStatus.length;
      this.pmushaErstwhile =this.pmushaErstwhileMDC.length
      



      const pmushaTotalShareApproved = this.amountApprovedPMUSHAWithoutMMRMDC.reduce((total, item) => {
        return total + +item.centralShareApproved + +item.stateShareApproved;
      }, 0);
      
      const pmushaTotalErstwhile = this.amountpmushaErstwhileMDC.reduce((total, item) => {
        return total + +item.centralShareApproved + +item.stateShareApproved;
      }, 0);
      this.pmushaTotalErstwhile = isNaN(pmushaTotalErstwhile) ? 0 : pmushaTotalErstwhile
      
      this.pmushaTotalShareApproved = isNaN(pmushaTotalShareApproved) ? 0 : pmushaTotalShareApproved
      this.pmushaUnitStatusMmerCount = this.pmushaTotalShareApproved * 0.01
      // Calculate the total approved units

      this.mmerOnePercentageTotal = parseFloat((
        this.rusa1UnitStatusMmerCount + 
        this.rusa2UnitStatusMmerCount + 
        this.pmushaUnitStatusMmerCount
      ).toFixed(2));



      this.totalApprovedUnits = this.rusa1UnitApproved + this.rusa2UnitApproved + this.pmushaUnitApproved;
      this.totalErstwhileEDC = this.rusa1TotalErstwhile + this.rusa2TotalErstwhile + this.pmushaTotalErstwhile;

      this.totalShareApproved = (this.rusa1TotalShareApproved || 0) + (this.rusa2TotalShareApproved || 0) + (this.pmushaTotalShareApproved || 0);
      const rusa1UnitStatusMmerCount =  isNaN(this.rusa1UnitStatusMmerCount) ? 0 : this.rusa1UnitStatusMmerCount
      const rusa2UnitStatusMmerCount = isNaN(this.rusa2UnitStatusMmerCount) ? 0 : this.rusa2UnitStatusMmerCount
      const pmushaUnitStatusMmerCount = isNaN(this.pmushaUnitStatusMmerCount) ? 0 : this.pmushaUnitStatusMmerCount

    
      const totalUnitStatusMmerCount = res.data.filter(e => e.componentId === 11);

      this.totalUnitStatusMmerCount = totalUnitStatusMmerCount.reduce((total, item) => {
        return total + parseFloat(item.totalAmountApproved);
      }, 0).toFixed(2);


      

      
      
      // this.totalUnitStatusMmerCount = rusa1UnitStatusMmerCount + rusa2UnitStatusMmerCount + pmushaUnitStatusMmerCount

      this.totalAmountApprovedRusa1 = (this.rusa1TotalShareApproved || 0) + (this.rusa1UnitStatusMmerCount || 0) + (this.rusa1TotalErstwhile || 0);
      this.totalAmountApprovedRusa2 = (this.rusa2TotalShareApproved || 0) + (this.rusa2UnitStatusMmerCount || 0) + (this.rusa2TotalErstwhile || 0);
      this.totalAmountApprovedPmusha = (this.pmushaTotalShareApproved || 0) + (this.pmushaUnitStatusMmerCount || 0) + (this.pmushaTotalErstwhile || 0);

      this.allTotalAmountApproved=this.totalAmountApprovedRusa1+ this.totalAmountApprovedRusa2 + this.totalAmountApprovedPmusha

      this.ongoingRusa1 = res.data.filter(e => (e.rusaPhase === "RUSA 1" && (e.rusaProjectStatusId === 2 || e.rusaProjectStatusId === 3  || e.rusaProjectStatusId === null)));

      this.ongoingRusa2 = res.data.filter(e => (e.rusaPhase === "RUSA 2" && (e.rusaProjectStatusId === 2 || e.rusaProjectStatusId === 3 || e.rusaProjectStatusId === null)));

      this.ongoingRusaPmUsha = res.data.filter(e => (e.rusaPhase === "PM-USHA" && (e.rusaProjectStatusId === 2 || e.rusaProjectStatusId === 3 || e.rusaProjectStatusId === null)));
    });
  }

  downloadPDF() {
    const doc = new jsPDF();
    (doc as any).autoTable({ html: '#myTable' ,
      didDrawPage: function (data) {
        doc.text('Note One Status', 90, 10); 
      }
    });
    
    doc.save('table-data.pdf');
  }
}
