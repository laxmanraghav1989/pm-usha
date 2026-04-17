import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { routes } from "src/app/routes";
import { ApiService } from "src/app/service/api.service";
import { GetService } from "src/app/service/get.service";
import { NotificationService } from "src/app/service/notification.service";
import { PostService } from "src/app/service/post.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";
@Component({
  selector: 'cfs-state-profile-scrutiny',
  templateUrl: './state-profile-scrutiny.component.html',
  styleUrls: ['./state-profile-scrutiny.component.scss']
})
export class StateProfileScrutinyComponent implements OnInit, OnDestroy {
  public routers: typeof routes = routes;
  statePList: any[] = [];
  tempList: any[] = []
  searchText: any;
  userTypeId: any;
  userTypeValue: any
  stateCode: any;
  stateCode1: any;
  sortDir = 1;
  checked: false;
  type: any;
  ele: any;
  checked1: boolean = false;
  consultantUserId: string='ALL';
  userList: Array<any> = []
  userId: string;
  constructor(
    public api: ApiService, public common: Common, public sharedService: SharedService, public router: Router, public getService: GetService,
    public notification: NotificationService, public postService: PostService) {
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.stateCode = sessionStorage.getItem('stateCode')
    if (this.userTypeId === this.sharedService.userTypeList['6'].id || this.userTypeId === sharedService.userTypeList['0'].id || this.userTypeId === sharedService.userTypeList['8'].id || this.userTypeId === sharedService.userTypeList['9'].id) {
       this.getUserType();
      this.userId = sessionStorage.getItem('userName')
    } if (this.userTypeId === this.sharedService.userTypeList['7'].id) {
      this.consultantUserId = sessionStorage.getItem('userName')
    }
  }

  ngOnInit(): void {
    this.stateProfileList()
    
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
  // getStateList(){
  //   this.getService.saaForwardedFinalProposal('ALL').subscribe(res=>{
     
  //     this.stateProfileList(res.data);
  //   },err=>{

  //   })
  // }
  // stateProfileList(list) {
  //   let consultantUserId=''
  //   if(this.consultantUserId === 'ALL'){
  //     consultantUserId=''
  //   }else{
  //     consultantUserId = this.consultantUserId
  //   }
  //   let payload={
  //     stateCode:null,
  //     componentId:''
  //   }
  //   this.api.getStateProfileList().subscribe((res) => {
  //     this.getUserType(res,list);
     
      
     
  //     this.tempList = [...this.statePList]
    
  //     this.handlePageChange(this.sharedService.page = 1)
  //   }, err => {

  //   });
  // }



    stateProfileList() {
    let consultantUserId=''
    if(this.consultantUserId === 'ALL'){
      consultantUserId=''
    }else{
      consultantUserId = this.consultantUserId
    }
    let payload={
      consultantUserId:consultantUserId
    }
    this.api.finalProposalState().subscribe((res) => {
      this.statePList = res.data;
      this.statePList = this.statePList.filter(e=>e.componentId !== 999 && e.esignDone === true)
      this.statePList = this.statePList.map((v) => ({
        ...v,
        checked: false,
      }));
     
      this.tempList = [...this.statePList]
      this.handlePageChange(this.sharedService.page = 1)
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  
  clear() {
    this.statePList = [];
    this.tempList = [];
    this.searchText = ''
    this.consultantUserId = 'ALL'
    this.stateProfileList()
  }

 

  datailsList(ele: any): void {
    sessionStorage.setItem('stateP', ele.stateName);
    sessionStorage.setItem('stateCodeP', ele.stateCode);
    sessionStorage.setItem('userAisheState',ele.aisheCode)
    sessionStorage.setItem('addRemarks',ele.consultantStatus?'true':'false');
    sessionStorage.setItem('consultantComment',ele.consultantComment)
    this.router.navigate([this.routers.viewState])

  }


  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }
  async updateResults() {
    this.statePList = this.searchByValue(this.tempList);
    this.handlePageChange(this.sharedService.page = 1)
  }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.stateName.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.stateShortName.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
      }
    })
  }
  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.statePList.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.statePList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.statePList.length - 1);
    }

  }

  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
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
    this.statePList.sort((a, b) => {
      a = a[colName]?.toLowerCase();
      b = b[colName]?.toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }
  toggleSelectAll(checked: boolean): void {
    for (let index = 0; index < this.statePList.length; index++) {
      if (checked) {

        this.statePList[index].checked = true;
        this.checked1 = true;
      } else {
        this.statePList[index].checked = false
        this.checked1 = false;
      }

    }

  }
  mergeAllot() {
    let finalProposalStatusId = []
    // this.statePList.forEach(element => {
    //   if (element.checked) {
    //     finalProposalStatusId.push(element.id)
    //   }
    // });
    for (let i = 0; i < this.statePList.length; i++) {
      if(this.statePList[i].checked && this.statePList[i].consultantStatus){
        this.notification.showValidationMessage('Scrutiny of this proposal is already done !!!')
        return;
      }if(this.statePList[i].checked){
        finalProposalStatusId.push(this.statePList[i].id)
      } 
    }
    if (finalProposalStatusId.length === 0) {
      this.notification.showValidationMessage('Please select');
      return;
    }
    let data = {
      userList: this.userList,
      finalProposalStatusId: finalProposalStatusId,
      componentId:0
    }
    this.common.mergeConsultant(data).subscribe(res => {
      if (res) {
        this.stateProfileList()
      }
    })
  }
  remarks(item){
    this.common.remarks(item).subscribe(res=>{
      if(res){
        this.stateProfileList()
      }
    })
  }
  }
