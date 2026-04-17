import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetService } from 'src/app/service/get.service';
import { PostService } from 'src/app/service/post.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit, OnDestroy {
  activityList: Array<any> = [];
  tempActivityList: Array<any> = [];
  searchText: string = ''
  userList: Array<any>=[];
  userId:string=''
  userListTemp:Array<any>=[];
  activity:string=''
  constructor(public sharedService: SharedService, public getService: GetService,public postService:PostService) { }

  ngOnInit(): void {
    this.getUser()
  }
  getUser() {
    this.postService.getAllUser('ALL').subscribe(res => {
      if (res && res.length) {
          this.userListTemp = res;
          this.userList = this.userListTemp.slice()
        }
      
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getActivity() {
    if(this.activity && this.userId){
      this.getService.getActivityList(this.userId,this.activity).subscribe(res => {
        this.activityList = res;
        this.handlePageChange(this.sharedService.page=1)
      }, err => {
  
      })
    }
    
  }
  onChange(event: any) {
    this.sharedService.pageSize = parseInt(event);
    this.handlePageChange(this.sharedService.page = 1)
  }

  async updateResults() {
    this.activityList = []
    this.activityList = this.searchByValue(this.tempActivityList);
    this.handlePageChange(this.sharedService.page = 1)
  }
  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.actionName?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.modifiedBy?.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.actionTime?.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.ipAddress?.toString().trim().includes(this.searchText.trim().toLowerCase()))
      }
    })
  }
  handlePageChange(event: any) {
    this.sharedService.page = event
    this.sharedService.StartLimit = ((this.sharedService.page - 1) * Number(this.sharedService.pageSize)),
      this.sharedService.EndLimit = this.sharedService.StartLimit + Number(this.sharedService.pageSize)
    var a = Math.ceil(this.activityList.length / Number(this.sharedService.pageSize));
    if (a === event) {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.activityList.length);
    } else {
      this.sharedService.pageData = Math.min(this.sharedService.StartLimit + Number(this.sharedService.pageSize), this.activityList.length - 1);
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
