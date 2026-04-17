import { Component, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/service/excel.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-pm-usha-report',
  templateUrl: './pm-usha-report.component.html',
  styleUrls: ['./pm-usha-report.component.scss']
})
export class PmUshaReportComponent implements OnInit {
  arrMonths: any = [];
  arrYears: any = [];
  monthList: any[];
  month: string = "";
  modiefiedMonth: any;
  year:any = "";
  searchText: any;
  stateCode: string;
  filterStateList: Array<any> = [];
  stateList:any;
  componentId:any;
  reportDataArr:any = []
  stateName:any;
  rushaPhase:any;
  filterData:any = []
  filterPhaseList:any = [{name: "PM-USHA"},{name : "RUSA 2"}]
  componentList: Array<any> = [{id: 1, componentName: 'Multi-Disciplinary Education and Research Universities (MERU)'},
    {id: 2, componentName: 'Grants to Strengthen Universities (Accredited & Unaccredited Universities)'},
    {id: 3, componentName: 'Grants to Strengthen Colleges (Accredited & Unaccredited Colleges)'},
    {id: 5, componentName: 'Gender Inclusion and Equity Initiatives'}]
  rusaPhase:any;
  userTypeId: string;
  StateGroup: boolean;
  userNpdTypeList: boolean;
  userNotNpdList: boolean;
  constructor(public sharedService: SharedService, public getService: GetService, private masterService : MasterService, private excelService: ExcelService, public notification: NotificationService) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.StateGroup = this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['3'].id
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
    this.arrYears = [
      { year: '2024' },
    ]

   }

  ngOnInit(): void {
    // this.getReportDetails()
    this.getSateData()
    // this.getInstituteData()

    this.userNpdTypeList = this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id || this.userTypeId === this.sharedService.userTypeList['10'].id

    this.userNotNpdList = this.userTypeId !== this.sharedService.userTypeList['0'].id || this.userTypeId !== this.sharedService.userTypeList['6'].id || this.userTypeId !== this.sharedService.userTypeList['7'].id || this.userTypeId !== this.sharedService.userTypeList['8'].id ||
      this.userTypeId !== this.sharedService.userTypeList['9'].id || this.userTypeId !== this.sharedService.userTypeList['10'].id

    if (this.userNpdTypeList) {
      this.stateCode = '';
      this.getReportDetailsNPD()
    } else {
      this.getReportDetails()
    }
  }


  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }

  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.reportDataArr.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.reportDataArr.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.reportDataArr.length - 1);
    }

  }


  getSateData() {
    this.masterService.getStateData().subscribe((res) => {
      this.stateList = res;
      this.filterStateList = this.stateList.slice();
    }, () => { })
  }

  // getInstituteData() {
  //   this.getService.getInstituteData().subscribe((res) => {
  //   })
  // }

  


  
  


  ChangesComponent(e, name){
    if(e == 'null' || e == ''){
      this.reportDataArr = this.filterData
    }
    else{
      if(name == 'state'){
        var stateFilter = this.filterData.filter(item => item.stateCode === e)
        this.reportDataArr = stateFilter
        // this.rusaPhase = '';
        // this.componentId = '';
      }
      else if(name == 'phase'){
        var stateFilter = this.filterData.filter(item => item.rusaPhase === e)
        this.reportDataArr = stateFilter
        // this.componentId = '';
        // this.stateCode = '';
      }
      else if(name == 'component'){
        var stateFilter = this.filterData.filter(item => item.componentId === e)
        this.reportDataArr = stateFilter
        // this.rusaPhase = '';
        // this.stateCode = '';
      }
      this.handlePageChange(this.sharedService.page = 1)

    }
    

   
  }


  downloadReport(){
    if (this.reportDataArr.length != 0) {
      //  this.arrMonths
      let custom_data = this.reportDataArr.map((item, index) => ({
        'S.No': index + 1,
        'State': item.stateName,
        'District': item.districtName,
        'RUSA Phase': item.rusaPhase,
        'Component Name': item.componentName,
        'Institution Name': item.institutionName + (item.aisheCode ? ' (' + item.aisheCode + ')' : ''),
        'Aishe Code': item.aisheCode,
        'PAB Meeting Number': item.pabMeetingNumber,
        'PAB Date': item.pabDate,
        'Total Amount Approved (Cr)': item.totalAmountApproved == 'NaN' ? '0' : +item.totalAmountApproved,
        'Total Amount Released (Cr)': item.totalAmountReleased == 'NaN' ? '0' : +item.totalAmountReleased,
        'Total Amount Utilised (Cr)': item.totalUtilisation == 'NaN' ? '0' : +item.totalUtilisation,
        'State Share Approved (Cr)': +item.stateShareApproved,
        'State Share Released (Cr)': +item.stateShareReleased,
        'State Share Utilised (Cr)': +item.stateShareUtilised,
        'Project Status (Ongoing /Completed/Not yet started)': item.rusaProjectStatus,
        'Whether PM Digitally Launched Project (Yes/ No)': item.whetherPmDigitallyLaunchedProject === true ? 'Yes' : 'No'
      
      }
      
      ));
      this.excelService.exportToExcel(custom_data, `PM-USHA_Progress_Monthly_Report`);
    }
    else {
      this.notification.showValidationMessage("NO Data Found");
    }
  }






  getComponentList() {
    this.getService.getComponent().subscribe(res => {
      this.componentList = res;
      this.componentList.unshift({
        id: 0,
        componentName: '--ALL--'
      })
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }



  getReportDetails() {
    this.getService.getPmUshaReportDetails(this.stateCode, 'ALL', '-1').subscribe(res =>{
      if(res.status == 200){
        this.reportDataArr =  res.data
        this.filterData = res.data
        
        
      }
      else{
        this.reportDataArr = []
      }
      this.handlePageChange(this.sharedService.page = 1)
    })
   

  }

  getReportDetailsNPD() {
    this.getService.getPmUshaReportDetails('ALL', 'ALL', '-1').subscribe(res =>{
      if(res.status == 200){
        this.reportDataArr =  res.data
        this.filterData = res.data
        
        
      }
      else{
        this.reportDataArr = []
      }
      this.handlePageChange(this.sharedService.page = 1)
    })
   

  }

  clear() {
    this.componentId = 'ALL';
    this.rusaPhase = 'ALL'
    this.getReportDetails()
  }

  







}
