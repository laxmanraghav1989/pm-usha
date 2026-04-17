import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { routes } from "src/app/routes";
import { ApiService } from "src/app/service/api.service";
import { GetService } from "src/app/service/get.service";
import { NotificationService } from "src/app/service/notification.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";


@Component({
  selector: "cfs-state-profile-list",
  templateUrl: "./state-profile-list.component.html",
  styleUrls: ["./state-profile-list.component.scss"],
})
export class StateProfileListComponent implements OnInit, OnDestroy {
  public routers: typeof routes = routes;
  statePList: any[] = [];
  tempList: any[] = []
  searchText: any;
  userTypeId: any;
  userTypeValue: any
  stateCode: any;
  stateCode1: any;
  sortDir = 1;
  constructor(
    public api: ApiService, public common: Common, public sharedService: SharedService, public router: Router, public getService: GetService,public notification:NotificationService) {
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.stateCode = sessionStorage.getItem('stateCode')
    
  }

  ngOnInit(): void {
    this.stateProfileList();
   
  }

  stateProfileList() {
    this.api.getStateProfileList().subscribe((res) => {
      this.statePList = res;
      // this.stateCode = res.stCode;
      if (this.userTypeId === this.sharedService.userTypeList['1'].id || this.userTypeId === this.sharedService.userTypeList['2'].id) {
        this.statePList = this.statePList.filter(ele => ele.stCode === this.stateCode)
      }
      this.tempList = [...this.statePList]
      this.handlePageChange(this.sharedService.page = 1)
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
 
  openUnlockMsg(data:any){
    sessionStorage.setItem('stateCodeP', data.stCode);
    data['page']=false
    data['requestForUnlockBySaa']=true,
    data['pageSAA']=true
    this.common.unLock(data).subscribe(res=>{
      if(res){
        this.stateProfileList()
      }
    });
    
   }
   openRemarksPartial(item){
    let data={
      stateName:item.name,
      userTypeId:this.userTypeId,
      partialunlock:this.common.unlockBYNPD,
      stateCode:item.stCode
    }
    this.common.partialUnlock(data).subscribe(res=>{
      if(res){
       this.stateProfileList();
       this.notification.showSuccessMessage('This record has been Successfully unlocked');
      }
    })
  }
 
  datailsList(ele: any): void {
    sessionStorage.setItem('stateP', ele.name);
    sessionStorage.setItem('stateCodeP', ele.stCode);
    sessionStorage.setItem('addRemarks','false');
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
        return (item.name.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
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
    this.statePList.sort((a,b)=>{
      a= a[colName]?.toLowerCase();
      b= b[colName]?.toLowerCase();
      return a.localeCompare(b) * this.sortDir;
    });
  }
}
