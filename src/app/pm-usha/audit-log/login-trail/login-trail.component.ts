import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-login-trail',
  templateUrl: './login-trail.component.html',
  styleUrls: ['./login-trail.component.scss']
})
export class LoginTrailComponent implements OnInit {
  trailList: any[] = [];
  tempList: any[] = []
  searchText: any;
  userTypeId: any;
  userTypeValue: any
  stateCode: any;
  userId: string;
  constructor(
    public api: ApiService, public common: Common, public sharedService: SharedService,public getService: GetService) {
    this.userId = sessionStorage.getItem('userName');
    this.userTypeId =  sessionStorage.getItem('userTypeId')
    if(this.userTypeId !== this.sharedService.userTypeList['0'].id || this.userTypeId === this.sharedService.userTypeList['10'].id){
    this.stateCode = sessionStorage.getItem('stateCode')
  }else{
    this.stateCode='ALL'
  }
    }
  ngOnInit(): void {
    this.loginTrailList();
  }

  loginTrailList() {
    this.getService.getAuditTrail(this.stateCode,this.userId).subscribe((res) => {
      if(res && res.length){
        this.trailList = res;
        this.tempList = [...this.trailList]
        this.handlePageChange(this.sharedService.page = 1)
      }
      
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }

  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }

  async updateResults() {
    this.trailList = []
    this.trailList = this.searchByValue(this.tempList);
    this.handlePageChange(this.sharedService.page = 1)
  }
  

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.stateName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
        || (item.userId?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
        || (item.loginTime?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
        || (item.logoutTime?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
        || (item.ipAddress?.toString().trim().includes(this.searchText.trim().toLowerCase()))
        }
    })
  }
  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.trailList.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.trailList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.trailList.length - 1);
    }

  }
  ngOnDestroy(): void {
    this.sharedService.StartLimit = 0;
    this.sharedService.EndLimit = 25;
    this.sharedService.pageData = 0;
    this.sharedService.pageSize = 25;
    this.sharedService.page = 1;
  }
}

