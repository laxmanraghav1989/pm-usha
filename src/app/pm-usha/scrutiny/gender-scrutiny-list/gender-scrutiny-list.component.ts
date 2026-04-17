import { Component, OnInit } from '@angular/core';
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
  selector: 'cfs-gender-scrutiny-list',
  templateUrl: './gender-scrutiny-list.component.html',
  styleUrls: ['./gender-scrutiny-list.component.scss']
})
export class GenderScrutinyListComponent implements OnInit {
  sortDir = 1;//1= 'ASE' -1= DSC
  public routers: typeof routes = routes;
  genderListData: any[] = [];
  tempList:any[]=[];
  stateList:Array<any>=[];
  filterDistrictList:Array<any>[] = [];
  variables:Array<any>=[]
  districtList:Array<any>[] = [];
  searchText: any;
  stateCode: string;
  userTypeId: string;
  componentId: any;
  districtCode:any;
  stateId:string=""
  districtId: string = '';
  consultantUserId: string='ALL';
  userList: Array<any> = [];
  status:string='ALL'
  allotment:string='ALL';
  userId: string;
  pabActionId: any = 'ALL';
  UpdatedropList: any;
  constructor(    public api: ApiService, public common: Common,public notification:NotificationService,public masterService:MasterService, 
    public sharedService: SharedService, public router: Router,private route: ActivatedRoute, public getService: GetService,public postService:PostService) {
      this.stateCode =sessionStorage.getItem('stateCode');
      this.districtCode=sessionStorage.getItem("districtCode");
      this.userTypeId = sessionStorage.getItem('userTypeId');
      if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id || this.userTypeId === sharedService.userTypeList['0'].id) {
        this.getUserType()
      this.userId = sessionStorage.getItem('userName')

      }if(this.userTypeId === this.sharedService.userTypeList['7'].id){
        // this.consultantUserId = sessionStorage.getItem('userName')
      }
    
  }

  ngOnInit(): void {
    this.componentId = this.route.snapshot.paramMap.get('id');
    // this.stateId = this.route.snapshot.paramMap.get('stateCode');
    this.getStateList();
    if (sessionStorage.getItem('back') === 'true') {
      this.stateId = sessionStorage.getItem('filteredStateCode')
      this.componentId = sessionStorage.getItem('filteredComponentId')
      this.districtId = sessionStorage.getItem('filteredDistrictCode')
      this.consultantUserId = sessionStorage.getItem('filteredConsultantUserId')
      this.status = sessionStorage.getItem('filteredStatus')
      this.allotment = sessionStorage.getItem('filteredAllotmentStatus')
      this.pabActionId = sessionStorage.getItem('filteredActionStatus')
      this.genderList()
  }
  this.getPABDropValue()
   
   
  }
  getUserType() {
    this.postService.getUserByType([this.sharedService.userTypeList['7'].id,this.sharedService.userTypeList['6'].id]).subscribe(res => {
      this.userList = res;
      this.userList.forEach(e=>{
        e.userAcronym =  e.userAcronym.replace('TSG-','');
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
  getDistrict(data:any) {
    this.masterService.getDistrictList(data).subscribe(res => {
      this.districtList = res;
      this.filterDistrictList = this.districtList.slice();
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
 
  getDistrictWise(value) {
    if (value !== '') {
      this.genderListData = this.tempList.filter(e=>e.districtCode === value)
    }else{
      this.genderListData = [...this.tempList];
    }
    this.handlePageChange(this.sharedService.page=1)
  }
 
  genderList() {
    let consultantUserId=''
    if(this.consultantUserId === 'ALL'){
      consultantUserId=''
    }else{
      consultantUserId = this.consultantUserId
    }
    let status = ''
    if (this.status === 'ALL') {
      status = ''
    } else {
      status = this.status
    }
    let allotmentStatus=''
    if(this.allotment === 'ALL'){
      allotmentStatus=''
    }else{
      allotmentStatus = this.allotment
    }
    let pabActionStatus = ''
    if (this.pabActionId === 'ALL') {
      pabActionStatus = ''
    } 
    else if (this.pabActionId == 'Pending') {
      pabActionStatus = '';
    }
    else {
      pabActionStatus = this.pabActionId
    }
    let payload = {
      stateCode: this.stateId === 'ALL'?null:this.stateId,
      componentId: this.componentId,
      districtCode: this.districtId ? this.districtId : null,
      consultantUserId: consultantUserId,
      scrutinyStatus:status,
      allotmentStatus:allotmentStatus,
      pabActionId: pabActionStatus
    }
    sessionStorage.setItem('filteredStateCode', this.stateId)
    sessionStorage.setItem('filteredComponentId', this.componentId)
    sessionStorage.setItem('filteredDistrictCode', this.districtId)
    sessionStorage.setItem('filteredConsultantUserId', this.consultantUserId)
    sessionStorage.setItem('filteredStatus', this.status)
    sessionStorage.setItem('filteredAllotmentStatus', this.allotment)
    sessionStorage.setItem('filteredActionStatus', this.pabActionId)
    this.getService.getfinalSubmitProposal(payload).subscribe((res) => {
      this.genderListData = res.data;
      if (this.pabActionId == 'Pending') {
        this.genderListData = this.genderListData.filter(e=>e.pabActionId === null)
      }
      else {
      this.genderListData = this.genderListData.filter(e=>e.isSaaApproved === true)
      this.genderListData=this.genderListData.map((v)=>({
        ...v,
        checked: false,
      }));
      }
      this.tempList = [...this.genderListData]
      this.handlePageChange(this.sharedService.page = 1)
    });
  }
  clear() {
    this.stateId = ''
    this.genderListData = [];
    this.tempList = [];
    this.searchText = ''
    this.districtId = ''
    this.consultantUserId = 'ALL'
    // if(this.userTypeId === this.sharedService.userTypeList['7'].id){
    //   this.consultantUserId = 'ALL'
    //   this.consultantUserId = sessionStorage.getItem('userName')
    // }else{
    //   this.consultantUserId = 'ALL'
    // }
    this.status = 'ALL',
    this.allotment= 'ALL',
    this.pabActionId = 'ALL'
    sessionStorage.setItem('filteredStateCode', this.stateId)
    sessionStorage.setItem('filteredComponentId', this.componentId)
    sessionStorage.setItem('filteredDistrictCode', this.districtId)
    sessionStorage.setItem('filteredConsultantUserId', this.consultantUserId)
    sessionStorage.setItem('filteredStatus', this.status)
    sessionStorage.setItem('filteredAllotmentStatus', this.allotment)
    sessionStorage.setItem('filteredActionStatus', this.pabActionId)

  }
  openScore(data:any){      
    this.common.scoreBreakup(data);    
  }

  openCost(data:any){    
    this.common.costBreakup(data, '');    
  }
 

  datailsList(ele: any): void {
    sessionStorage.setItem('stateP', ele.name);
    sessionStorage.setItem('stateCodeP', ele.stateCode);
    sessionStorage.setItem('districtCodeGender', ele.districtCode);
    sessionStorage.setItem('aisheCode', ele.aisheCode);
    sessionStorage.setItem('componentId', ele.componentId);
    sessionStorage.setItem('instituteCategory', ele.instituteCategory);
    sessionStorage.setItem('addRemarks',ele.consultantStatus?'true':'false')
    sessionStorage.setItem('consultantComment',ele.consultantComment)
    sessionStorage.setItem('consultantUserIdNmdc',ele.consultantUserId)
    sessionStorage.setItem('componentIdV', ele.componentId);
    if(this.componentId==this.sharedService.genderComponentId){
    this.router.navigate([this.routers.viewGenderEquity])
     }else
     this.router.navigate([this.routers.viewNmdc])
  }


  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }
  async updateResults() {
    this.genderListData = []
    this.genderListData = this.searchByValue(this.tempList);
    this.handlePageChange(this.sharedService.page = 1)
  }
  

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.stateName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
            || (item.districtName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
            || (item.dateFinalSubmission?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
            || (item.totalScore?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
            || (item.totalCost?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
            // || (item.saastatus.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
            // || (item.npdstatus.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          }
    })
  }
  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.genderListData.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.genderListData.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.genderListData.length - 1);
    }

  }
  onSortClick(event,colName) {
    let target = event.currentTarget,
      classList = target.classList;

    if (classList.contains('fa-chevron-up')) {
      classList.remove('fa-chevron-up');
      classList.add('fa-chevron-down');
      this.sortDir=-1;
    } else {
      classList.add('fa-chevron-up');
      classList.remove('fa-chevron-down');
      this.sortDir=1;
    }
    this.sortArr(colName);
  }

  sortArr(colName:any){
    this.genderListData.sort((a,b)=>{
      a= a[colName]?.toLowerCase();
      b= b[colName]?.toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }

  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
    sessionStorage.removeItem('back');
    sessionStorage.removeItem('addRemarks');
  }
  toggleSelectAll(checked:boolean):void {
    for(let index=0;index<this.genderListData.length;index++) {
      if(checked){
        this.genderListData[index].checked=true;
      }else{
        this.genderListData[index].checked=false;
      }
  }
}
mergeAllot() {
  let finalProposalStatusId = []
  // this.genderListData.forEach(element => {
  //   if (element.checked) {
  //     finalProposalStatusId.push(element.id)
  //   }
  // });
  for (let i = 0; i < this.genderListData.length; i++) {
    if(this.genderListData[i].checked && this.genderListData[i].consultantStatus){
      this.notification.showValidationMessage('Scrutiny of this proposal is already done !!!')
      return;
    }if(this.genderListData[i].checked){
      finalProposalStatusId.push(this.genderListData[i].id)
    } 
  }
  if (finalProposalStatusId.length === 0) {
    this.notification.showValidationMessage('Please select');
    return;
  }
  let data = {
    userList: this.userList,
    finalProposalStatusId: finalProposalStatusId,
    componentId:this.componentId,
    stateCode: this.stateId === 'ALL'?null:this.stateId
  }
  this.common.mergeConsultant(data).subscribe(res => {
    if(res){
    this.genderList()
    }
  })
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



PABMultiAllot() {
  let finalProposalStatusId = [];
  for (let i = 0; i < this.genderListData.length; i++) {
    // if (this.collegeListData[i].checked && this.collegeListData[i].consultantStatus) {
    //   this.notification.showValidationMessage('Scrutiny of this proposal is already done !!!')
    //   return;
    // }
     if (this.genderListData[i].checked) {
      finalProposalStatusId.push(this.genderListData[i].id)
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
remarks(item){
  this.common.remarks(item).subscribe(res=>{
    if(res){
      this.genderList()
    }
  })
}

pabRemark(item, valueKey){
  this.common.pabRemark(item, valueKey).subscribe(res => {
    if (res) {
      this.genderList()
    }
  })
}
}

