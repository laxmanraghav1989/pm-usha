import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { MasterService } from 'src/app/service/master.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.scss']
})
export class GenderListComponent implements OnInit {
  sortDir = 1;//1= 'ASE' -1= DSC
  public routers: typeof routes = routes;
  genderListData: any[] = [];
  tempList:any[]=[];
  stateList:Array<any>=[];
  variables:Array<any>=[]
  searchText: any;
  stateCode: string;
  userTypeId: string;
  componentId: any;
  districtCode:any;
  stateId:string="ALL"
  constructor(    public api: ApiService, public common: Common,public notification:NotificationService,public masterService:MasterService, public sharedService: SharedService, public router: Router,private route: ActivatedRoute, public getService: GetService) {
      this.stateCode =sessionStorage.getItem('stateCode');
      this.districtCode=sessionStorage.getItem("districtCode");
      this.userTypeId = sessionStorage.getItem('userTypeId');
    
  }

  ngOnInit(): void {
    this.componentId = this.route.snapshot.paramMap.get('id');
    this.stateId = this.route.snapshot.paramMap.get('stateCode');
    this.genderList();
    this.getStateList()
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
      this.genderListData = this.tempList.filter(e=>e.stateCode === value)
    }else{
      this.genderListData = [...this.tempList];
    }
    this.handlePageChange(this.sharedService.page=1)
  }
 
  genderList() {
    this.getService.getfinalSubmit(this.userTypeId === this.sharedService.userTypeList['0'].id|| this.userTypeId === this.sharedService.userTypeList['10'].id || this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === this.sharedService.userTypeList['7'].id?this.stateId:this.stateCode,this.componentId).subscribe((res) => {
      this.genderListData = res.data;
      this.genderListData.forEach(e=>{
        if(e.isSaaApproved){
          e['saastatus']='Approved'
        }if(e.isSaaApproved === false){
          e['saastatus']='Reject'
        }if(e.isSaaApproved === null || e.isSaaApproved === undefined || e.isSaaApproved === ''){
          e['saastatus']='Pending'
        }
        // item.isNpdApproved?'Approved':item.isNpdApproved === false?'Reject':item.isSaaApproved === null?'':item.isSaaApproved?'Pending':''
        if(e.isNpdApproved){
          e['npdstatus']='Approved'
        }if(e.isNpdApproved === false){
          e['npdstatus']='Reject'
        }if(e.isSaaApproved === null || e.isSaaApproved === undefined || e.isSaaApproved === '' || e.isSaaApproved === false){
          e['npdstatus']=''
        }if(e.isSaaApproved){
          e['npdstatus']='Pending'
        }
      })
      this.tempList = [...this.genderListData]
      this.handlePageChange(this.sharedService.page = 1)
    });
  }
  openScore(data:any){      
    this.common.scoreBreakup(data);    
  }

  openCost(data:any){    
    this.common.costBreakup(data, '');    
  }
  openUnlockMsg(data:any){
    if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id) {
      if (data.isSaaApproved) {
        this.notification.showValidationMessage('This record is Already Shortlisted for Approval');
        return;
      }

    }
    if (this.userTypeId === this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['10'].id) {
      if (data.isNpdApproved) {
        this.notification.showValidationMessage('This record is Already Approved');
        return;
      }

    }
    data['page']=false
    data['pageSAA']=false
    this.common.unLock(data).subscribe(res=>{
      if(res){
        this.genderList()
      }
    });
   }

  datailsList(ele: any): void {
    sessionStorage.setItem('stateP', ele.name);
    sessionStorage.setItem('stateCodeP', ele.stateCode);
    sessionStorage.setItem('districtCodeGender', ele.districtCode);
    sessionStorage.setItem('aisheCode', ele.aisheCode);
    sessionStorage.setItem('componentId', ele.componentId);
    sessionStorage.setItem('instituteCategory', ele.instituteCategory);
    sessionStorage.setItem('addRemarks','false');
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
            || (item.saastatus.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
            || (item.npdstatus.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
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


    // let payload={
    //   stateCode:this.stateCode,
    //   componentId:this.componentId,
    //   type:type,
    //   aisheCode:'',
    // }
    // this.getService.downloadData(payload).subscribe(res=>{
    //   if(res.byteData){
    //     if(type === 'EXCEL'){
    //       this.common.viewExcel(res.byteData, res.name)

    //     } if(type === 'PDF'){
    //       this.common.viewPdf(res.byteData, res.name)

    //     }
    //   }
    // },err=>{

    // })
  }

  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
  }
}

