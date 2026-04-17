import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-college-scrutiny-list',
  templateUrl: './college-scrutiny-list.component.html',
  styleUrls: ['./college-scrutiny-list.component.scss']
})
export class CollegeScrutinyListComponent implements OnInit, OnDestroy {

  public routers: typeof routes = routes;
  collegeListData: any[] = [];
  tempList: any[] = [];
  searchText: any;
  stateCode: string;
  userTypeId: string;
  componentId: any;
  stateList: Array<any> = [];
  variables: Array<any> = [];
  districtList: Array<any> = [];
  filterDistrictList: Array<any> = [];
  stateId: string = ''
  sortDir = 1;//1= 'ASE' -1= DSC
  districtId: string = '';
  pabActionId: any = 'ALL';
  pabActionNumber:any;
  consultantUserId: string = 'ALL';
  userList: Array<any> = [];
  allotment: string = 'ALL';
  status: string = 'ALL'
  userId: string;
  UpdatedropList: any;
  constructor(public api: ApiService, public common: Common, public notification: NotificationService, public masterService: MasterService,
    public sharedService: SharedService, public router: Router, private route: ActivatedRoute, public getService: GetService, public postService: PostService) {
    this.stateCode = sessionStorage.getItem('stateCode');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === sharedService.userTypeList['0'].id) {
      this.getUserType()
      this.userId = sessionStorage.getItem('userName')
    } 
    if (this.userTypeId === this.sharedService.userTypeList['7'].id) {
      // this.consultantUserId = sessionStorage.getItem('userName')
    }
  }
  ngOnInit(): void {
    this.getStateList();
    this.componentId = this.route.snapshot.paramMap.get('id');
    if (sessionStorage.getItem('back') === 'true') {
      
        this.stateId = sessionStorage.getItem('filteredStateCode')
        this.componentId = sessionStorage.getItem('filteredComponentId')
        this.districtId = sessionStorage.getItem('filteredDistrictCode')
        this.consultantUserId = sessionStorage.getItem('filteredConsultantUserId')
        this.status = sessionStorage.getItem('filteredStatus')
        this.allotment = sessionStorage.getItem('filteredAllotmentStatus')
        this.pabActionId = sessionStorage.getItem('filteredActionStatus')
        this.collegeList()
      
    }
    this.getPABDropValue()

    // this.stateId = this.route.snapshot.paramMap.get('stateCode')
    // this.collegeList();

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
    let payload={
      stateCode:'ALL',
      reviseProposalOrInitial:false
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
    this.stateId = ''
    this.collegeListData = [];
    this.tempList = [];
    this.searchText = ''
    this.districtId = ''
     this.consultantUserId = 'ALL'
    // if (this.userTypeId === this.sharedService.userTypeList['7'].id) {
    //   this.consultantUserId = 'ALL'
    //   this.consultantUserId = sessionStorage.getItem('userName')
    // } else {
    //   this.consultantUserId = 'ALL'
    // }
      this.status = 'ALL',
      this.allotment = 'ALL'
      this.pabActionId = 'ALL'
      sessionStorage.setItem('filteredStateCode', this.stateId)
      sessionStorage.setItem('filteredComponentId', this.componentId)
      sessionStorage.setItem('filteredDistrictCode', this.districtId)
      sessionStorage.setItem('filteredConsultantUserId', this.consultantUserId)
      sessionStorage.setItem('filteredStatus', this.status)
      sessionStorage.setItem('filteredAllotmentStatus', this.allotment)
      sessionStorage.setItem('filteredActionStatus', this.pabActionId)
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
    sessionStorage.setItem('stateP', ele.name);
    sessionStorage.setItem('stateCodeP', ele.stateCode);
    sessionStorage.setItem('aisheCode', ele.aisheCode);
    sessionStorage.setItem('instituteCategory', ele.instituteCategory);
    sessionStorage.setItem('componentIdV', ele.componentId);
    sessionStorage.setItem('addRemarks', 'true');
    sessionStorage.setItem('consultantComment', ele.consultantComment),
    sessionStorage.setItem('consultantUserName', ele.consultantUserId)
    this.router.navigate([this.routers.viewCollege])

  }

  openScore(data: any) {
    this.common.scoreBreakup(data);
  }

  openCost(data: any) {
    this.common.costBreakup(data, '');
  }
  collegeList() {
    let consultantUserId = ''
    if (this.consultantUserId === 'ALL') {
      consultantUserId = ''
    } else {
      consultantUserId = this.consultantUserId
    }
    let status = ''
    if (this.status === 'ALL') {
      status = ''
    } else {
      status = this.status
    }
    let allotmentStatus = ''
    if (this.allotment === 'ALL') {
      allotmentStatus = ''
    } else {
      allotmentStatus = this.allotment
    }

    let pabActionStatus = ''
    if (this.pabActionId === 'ALL') {
      pabActionStatus = '';
    }
    else if (this.pabActionId == 'Pending') {
      pabActionStatus = '';
    }
    else {
      pabActionStatus = this.pabActionId;
    }
    let payload = {
      stateCode: this.stateId === 'ALL' ? null : this.stateId,
      componentId: this.componentId,
      districtCode: this.districtId ? this.districtId : null,
      consultantUserId: consultantUserId,
      scrutinyStatus: status,
      allotmentStatus: allotmentStatus,
      pabActionId: pabActionStatus,
      isSaaApproved: true
    }
    sessionStorage.setItem('filteredStateCode', this.stateId)
    sessionStorage.setItem('filteredComponentId', this.componentId)
    sessionStorage.setItem('filteredDistrictCode', this.districtId)
    sessionStorage.setItem('filteredConsultantUserId', this.consultantUserId)
    sessionStorage.setItem('filteredStatus', this.status)
    sessionStorage.setItem('filteredAllotmentStatus', this.allotment)
    sessionStorage.setItem('filteredActionStatus', this.pabActionId)
    this.getService.getfinalSubmitProposal(payload).subscribe((res) => {
      this.collegeListData = res.data;
      if (this.pabActionId == 'Pending') {
      this.collegeListData = this.collegeListData.filter(e => e.pabActionId === null)
      }
      else {
      this.collegeListData = this.collegeListData.filter(e => e.isSaaApproved === true)
      this.collegeListData = this.collegeListData.map((v) => ({
        ...v,
        checked: false,
      }));
      }


      this.tempList = [...this.collegeListData]
      this.handlePageChange(this.sharedService.page = 1)
    });
  }

  getPABDropValue() {
  this.masterService.getNPDAction().subscribe(
    (res: any[]) => {
      if (res && res.length) {
        // ❌ id = 4 remove
        this.UpdatedropList = res.filter(item => item.id !== 4);
      }
    },
    err => {
      console.error('Error fetching page status:', err);
    }
  );
}

  toggleSelectAll(checked: boolean): void {
    for (let index = 0; index < this.collegeListData.length; index++) {
      if (checked) {
        this.collegeListData[index].checked = true;
      } else {
        this.collegeListData[index].checked = false;
      }

    }
  }
  mergeAllot() {
    let finalProposalStatusId = [];
    for (let i = 0; i < this.collegeListData.length; i++) {
      if (this.collegeListData[i].checked && this.collegeListData[i].consultantStatus) {
        this.notification.showValidationMessage('Scrutiny of this proposal is already done !!!')
        return;
      } if (this.collegeListData[i].checked) {
        finalProposalStatusId.push(this.collegeListData[i].id)
      }
    }
    // this.collegeListData.forEach(element => {
    //   if(element.checked && element.consultantName){

    //   }
    //   if (element.checked) {
    //     finalProposalStatusId.push(element.id)
    //   }
    // });
    if (finalProposalStatusId.length === 0) {
      this.notification.showValidationMessage('Please select');
      return;
    }
    let data = {
      userList: this.userList,
      finalProposalStatusId: finalProposalStatusId,
      componentId: this.componentId,
      stateCode: this.stateId === 'ALL' ? null : this.stateId
    }
    this.common.mergeConsultant(data).subscribe((res: any) => {
      if (res) {
        this.collegeList()
      }
    })
  }

  PABMultiAllot() {
    let finalProposalStatusId = [];
    for (let i = 0; i < this.collegeListData.length; i++) {
      // if (this.collegeListData[i].checked && this.collegeListData[i].consultantStatus) {
      //   this.notification.showValidationMessage('Scrutiny of this proposal is already done !!!')
      //   return;
      // }
       if (this.collegeListData[i].checked) {
        finalProposalStatusId.push(this.collegeListData[i].id)
      }
    }
    // this.collegeListData.forEach(element => {
    //   if(element.checked && element.consultantName){

    //   }
    //   if (element.checked) {
    //     finalProposalStatusId.push(element.id)
    //   }
    // });
    if (finalProposalStatusId.length === 0) {
      this.notification.showValidationMessage('Please select');
      return;
    }
    let data = {
      id: finalProposalStatusId,
      pabActionId: '',
      pabRemarks: ''
    }
    this.pabRemark(data, 'EditMulti')
    // this.common.mergeConsultant(data).subscribe((res: any) => {
    //   if (res) {
    //     this.collegeList()
    //   }
    // })
  }
  remarks(item) {
    this.common.remarks(item).subscribe(res => {
      if (res) {
        this.collegeList()
      }
    })
  }

  pabRemark(item, valueKey){
    this.common.pabRemark(item, valueKey).subscribe(res => {
      if (res) {
        this.collegeList()
      }
    })
  }
  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
    sessionStorage.removeItem('back')
    sessionStorage.removeItem('addRemarks');
    // sessionStorage.removeItem('filterdata')
    // sessionStorage.removeItem('filteredStateCode')
    // sessionStorage.removeItem('filteredComponentId')
    // sessionStorage.removeItem('filteredDistrictCode')
    // sessionStorage.removeItem('filteredConsultantUserId')
    // sessionStorage.removeItem('filteredStatus')
    // sessionStorage.removeItem('filteredAllotmentStatus')
  }
}
