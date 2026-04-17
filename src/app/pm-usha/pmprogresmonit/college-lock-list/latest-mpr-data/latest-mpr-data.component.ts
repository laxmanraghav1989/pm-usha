import { Component, OnInit } from '@angular/core';
import { GetService } from 'src/app/service/get.service';
import { ProgressMaxData } from 'src/app/interfaces/user.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CachedDataService } from 'src/app/pm-usha/pages/reports/report-services/cached-data.service';
import { ApiService } from 'src/app/service/api.service';
import { ExcelService } from 'src/app/service/excel.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';
import { routes } from 'src/app/routes';
import { ShareReplayService } from 'src/app/service/share-replay.service';

@Component({
  selector: 'cfs-latest-mpr-data',
  templateUrl: './latest-mpr-data.component.html',
  styleUrls: ['./latest-mpr-data.component.scss']
})
export class LatestMprDataComponent implements OnInit {
  public routers: typeof routes = routes;
  stateCode: string;
  userTypeId: string;
  userId: string;
  stateId: any;
  districtId: string;
  arrMonths: { monthCode: string; name: string; lastDate: string; }[];
  fullArrMonths: { monthCode: string; name: string; lastDate: string; }[];
  arrYears: { year: string; }[];
  componentId: number;
  userNpdTypeList: boolean;
  userNotNpdList: boolean;
  isForwardedToNpdValue:any;
  listData:any =[]
  monthList: any[];
  month: string = "";
  modiefiedMonth: any;
  year:any = "";
  searchText:any = ""
  tempList:any = []
  assignView: boolean;
  filterArr:any =[]
  stateList:any = []
  filterStateList:any =[]
  resetKey:boolean = false
  constructor(public api: ApiService, public common: Common, public notification: NotificationService, public masterService: MasterService,
      public sharedService: SharedService, public router: Router, public getService: GetService, public postService: PostService, public encrypt: EncryptDecrypt, public fb: FormBuilder, private http: HttpClient, private dialog : MatDialog, private excelService: ExcelService, public cachedData: CachedDataService, public shareData: ShareReplayService) {
      this.stateCode = sessionStorage.getItem('stateCode');
      this.userTypeId = sessionStorage.getItem('userTypeId');
      if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id) {
        // this.getUserType()
        this.stateCode = 'ALL'
        this.userId = sessionStorage.getItem('userName')
      }
      if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id || this.userTypeId === this.sharedService.userTypeList['3'].id || this.userTypeId === this.sharedService.userTypeList['12'].id) {
        this.stateId = this.stateCode;
        //  this.getDistrict(this.stateId);
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
  // getUserType() {
  //   throw new Error('Method not implemented.');
  // }
  // getDistrict(stateId: any) {
  //   throw new Error('Method not implemented.');
  // }

  ngOnInit(): void {
    this.getSateData();
     this.userNpdTypeList = this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id || this.userTypeId === this.sharedService.userTypeList['10'].id

    this.userNotNpdList = this.userTypeId !== this.sharedService.userTypeList['0'].id || this.userTypeId !== this.sharedService.userTypeList['6'].id || this.userTypeId !== this.sharedService.userTypeList['7'].id || this.userTypeId !== this.sharedService.userTypeList['8'].id ||
      this.userTypeId !== this.sharedService.userTypeList['9'].id || this.userTypeId !== this.sharedService.userTypeList['10'].id
  this.getPMUshaProgressMaxDataLatest(-1, -1)
 if (this.userNpdTypeList) {
      this.assignView = true;
      this.stateCode = 'ALL';
    } else {
      this.assignView = false
    }



    }


     trackByCollege(index: number, item: any): any {
  // Prefer a unique identifier from your data, e.g. id, aisheCode, etc.
    return item.pmUshaMonthlyProgressLockstatusId || item.aisheCode || index;



  }


datailsList(ele: any): void {
  // if (!ele) return;

  // Save details in sessionStorage
  sessionStorage.setItem('stateP', ele.stateName);
  sessionStorage.setItem('filteredStateCode', ele.stateId);
  sessionStorage.setItem('aisheCode', ele.aisheCode);
  sessionStorage.setItem('filteredComponentId', ele.componentId);
  // sessionStorage.setItem('filteredYear', this.year);
  // sessionStorage.setItem('filteredMonth', this.month);
  sessionStorage.setItem('selectIndex', '3');

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

 if (ele.componentId === this.sharedService.genderComponentId) {
    this.router.navigate([this.routers.viewinstGenderLock, ...routeParams]);
  }
  else {
    this.router.navigate([this.routers.viewinstCollegeLock, ...routeParams]);
  }
}





getMonthlyProposalTotal(item: any): number {
  const completed = isNaN(Number(item.monthlyCompletedProposalItemStatus)) ? 0 : Number(item.monthlyCompletedProposalItemStatus);
  const ongoing = isNaN(Number(item.monthlyOngoingProposalItemStatus)) ? 0 : Number(item.monthlyOngoingProposalItemStatus);
  const yetToStart = isNaN(Number(item.monthlyYetToBeStartedProposalItemStatus)) ? 0 : Number(item.monthlyYetToBeStartedProposalItemStatus);
  
  return completed + ongoing + yetToStart;
}


 async updateResults() {
    this.listData = []
    this.listData = this.searchByValue(this.tempList);
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
    this.listData = [...this.filterArr];
  } else {
    this.listData = this.filterArr.filter(item => item.stateId == selectedState);
  }

  // Keep filtered state list for component filtering
  // this.stateFilterArr = [...this.listData];

  // Refresh paginated table
  this.tempList = [...this.listData];
  // this.closeAllPanels()
  // // this.updatePaginatedData();
  // this.updatePaginatedData()
  // this.updatePaginatedData1();
}


getSateData() {
    this.shareData.getStateData().subscribe((res) => {
      this.stateList = res;
      this.filterStateList = this.stateList.slice();
    }, () => { })
  }


  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
    // this.handlePageChangeOne(this.sharedService.page = 1)
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

   ChangesCurrentMonth(changeValue: any) {
    let modyMonth = this.monthList.filter(m => parseInt(m.monthCode) === parseInt(changeValue));
    this.modiefiedMonth = modyMonth[0]?.name
  }



Find(month, year) {
     this.searchText = ''
    this.resetKey = true 
    this.getPMUshaProgressMaxDataLatest(month, year)

}

reset(){
  this.year = ""
  this.month = ""
  this.resetKey && this.getPMUshaProgressMaxDataLatest(-1, -1);
}




 getPMUshaProgressMaxDataLatest(month, year){
    const requestParams: ProgressMaxData = {
            stateCode: this.stateCode,
            componentId: -1,
            month: month,
            year: year,
            isForwardedToNpd : true,
            maxMonthData : 1
   
  };

    this.getService.getPMUshaProgressMaxDataLatest(requestParams).subscribe((res) => {
      if(res.data.length > 0){
        this.listData = res.data
        this.tempList = [...this.listData]
        this.filterArr = [...this.listData];
      }
      else {
        this.listData = [];
        this.tempList = [];
        this.filterArr = [];
      }

    })
  }


  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.listData.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.listData.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.listData.length - 1);
    }

  }



   exportToExcel() {


    if (this.listData.length != 0) {
       let custom_data = this.listData.map((item, index) => ({
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
      this.excelService.exportToExcel(custom_data, `PM-USHA Progress Monitoring Status_${this.stateCode === 'null' ? 'ALL' : this.stateCode }_${this.year ? this.year : this.listData[0].year}_${this.month ? this.month : this.listData[0].month}`);
    
    }
    else {
      this.notification.showValidationMessage("NO Data Found");
    }
  }



}
