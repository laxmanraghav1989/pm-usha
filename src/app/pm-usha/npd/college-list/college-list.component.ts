import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-college-list',
  templateUrl: './college-list.component.html',
  styleUrls: ['./college-list.component.scss']
})
export class CollegeListComponent implements OnInit {
  public routers: typeof routes = routes;
  collegeListData: any[] = [];
  tempList: any[] = []; 
  searchText: any;
  stateCode: string;
  userTypeId: string;
  componentId: any;
  stateList: Array<any> = [];
  variables: Array<any> = [];
  stateId:string='ALL'
  sortDir = 1;//1= 'ASE' -1= DSC
  isEsignDone: boolean;
  constructor(public api: ApiService, public common: Common, public notification: NotificationService, public masterService: MasterService, 
    public sharedService: SharedService, public router: Router, private route: ActivatedRoute, public getService: GetService, public encrypt: EncryptDecrypt) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.isEsignDone = Boolean(this.encrypt.getDecryptedValue(sessionStorage.getItem('isEsignDone')));
  }

  ngOnInit(): void {
    this.getStateList()
    this.componentId = this.route.snapshot.paramMap.get('id');
    this.stateId = this.route.snapshot.paramMap.get('stateCode')
    this.collegeList();

  }
  getStateList() {
    this.masterService.getState().subscribe(res => {
      this.variables = res;
      this.stateList = this.variables.slice()
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getStateWise(value) {
    if (value !== 'ALL') {
      this.collegeListData = this.tempList.filter(e => e.stateCode === value)
    } else {
      this.collegeListData = [...this.tempList];
    }
    this.handlePageChange(this.sharedService.page = 1)
  }
  collegeList() {
    this.getService.getfinalSubmit(this.userTypeId === this.sharedService.userTypeList['0'].id ||this.userTypeId === this.sharedService.userTypeList['10'].id|| this.userTypeId === this.sharedService.userTypeList['8'].id || this.userTypeId === this.sharedService.userTypeList['9'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id ? this.stateId : this.stateCode, this.componentId).subscribe((res) => {
      this.collegeListData = res.data;
      if (this.userTypeId === this.sharedService.userTypeList['1'].id) {
        this.collegeListData = this.collegeListData.filter(ele => ele.stateCode === this.stateCode)
      }
      this.collegeListData.forEach(e => {
        if (e.isSaaApproved) {
          e['saastatus'] = 'Approved'
        } if (e.isSaaApproved === false) {
          e['saastatus'] = 'Reject'
        } if (e.isSaaApproved === null || e.isSaaApproved === undefined || e.isSaaApproved === '') {
          e['saastatus'] = 'Pending'
        }
        // item.isNpdApproved?'Approved':item.isNpdApproved === false?'Reject':item.isSaaApproved === null?'':item.isSaaApproved?'Pending':''
        if (e.isNpdApproved) {
          e['npdstatus'] = 'Approved'
        } if (e.isNpdApproved === false) {
          e['npdstatus'] = 'Reject'
        } if (e.isSaaApproved === null || e.isSaaApproved === undefined || e.isSaaApproved === '' || e.isSaaApproved === false) {
          e['npdstatus'] = ''
        } if (e.isSaaApproved) {
          e['npdstatus'] = 'Pending'
        }
      })
      this.tempList = [...this.collegeListData]
      this.handlePageChange(this.sharedService.page = 1)
    });
  }

  openScore(data: any) {
    this.common.scoreBreakup(data);
  }

  openCost(data: any) {
    this.common.costBreakup(data, '');
  }
  openUnlockMsg(data: any) {
    if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id) {
      if (data.isSaaApproved) {
        this.notification.showValidationMessage('This institute is Already Shortlisted for Approval');
        return;
      }

    }
    if (this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['10'].id) {
      if (data.isNpdApproved) {
        this.notification.showValidationMessage('This institute is Already Approved');
        return;
      }

    }
    data['page'] = false
    data['pageSAA'] = false
    this.common.unLock(data).subscribe(res => {
      if (res) {
        this.collegeList();
      }
    });
  }

  datailsList(ele: any): void {
    sessionStorage.setItem('stateP', ele.name);
    sessionStorage.setItem('stateCodeP', ele.stateCode);
    sessionStorage.setItem('aisheCode', ele.aisheCode);
    sessionStorage.setItem('instituteCategory', ele.instituteCategory);
    sessionStorage.setItem('componentIdV', ele.componentId);
    sessionStorage.setItem('addRemarks','false');
    this.router.navigate([this.routers.viewCollege])

  }


  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
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
        return (item.instituteName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.aisheCode?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.instituteType?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.affiliatingUniversityName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.address?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.stateName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.districtName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.dateFinalSubmission?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.totalScore?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.totalCost?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.saastatus.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.npdstatus.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))

      }
    })
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
  onSortClick(event,colName) {
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
  download(type:string){
    if(type !== '--Select--'){
      if(this.sharedService.userTypeList['1'].id === this.userTypeId || this.sharedService.userTypeList['2'].id === this.userTypeId){
        this.stateId = this.stateCode
      }else{
        if(this.stateId === 'ALL'){
          this.stateId = ''
        }
      }
      let payload={
        stateCode:this.stateId,
        componentId:this.componentId,
        type:type,
      }
      this.getService.downloadData(payload).subscribe(res=>{
        if(res.byteData){
          if(type === 'EXCEL'){
            this.common.viewExcel(res.byteData, res.name)
  
          } if(type === 'PDF'){
            this.common.viewPdf(res.byteData, res.name)
  
          }
        }
      },err=>{
  
      })
    }
    
  }
  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
    sessionStorage.removeItem('addRemark')
  }
}
