import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-institution-dialog',
  templateUrl: './institution-dialog.component.html',
  styleUrls: ['./institution-dialog.component.scss']
})
export class InstitutionDialogComponent implements OnInit {
  startLimit: number = 0;
  endLimit: number = 15;
  pageSize: number = 15;
  pageData: number = 0;
  page: number = 1;
  list: any[] = [];
  searchText: any = '';
  tempList: any[] = [];
  constructor(public dialogRef: MatDialogRef<InstitutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public element: any, public sharedService: SharedService, public api: ApiService, public notification: NotificationService, public getSrevice:GetService) {
    // this.element.list.forEach(element => {
    //   if (!element.checked) {
    //     element['id'] = 0
    //   }
    // });
    this.list = this.element.list;
    this.tempList = [...this.list]
  }

  ngOnInit(): void {
  }
  onChange(event: any) {
    this.pageSize = parseInt(event);
    this.handlePageChange(this.page = 1)
  }
  handlePageChange(event: any) {
    this.page = event
    this.startLimit = ((this.page - 1) * this.pageSize),
      this.endLimit = this.startLimit + this.pageSize
    var a = Math.ceil(this.list.length / this.pageSize);
    if (a === event) {
      this.pageData = Math.min(this.startLimit + this.pageSize, this.list.length);
    } else {
      this.pageData = Math.min(this.startLimit + this.pageSize, this.list.length - 1);
    }
  }

  async updateResults() {
    this.list = this.searchByValue(this.tempList);
    this.handlePageChange(this.page = 1)
  }

  searchByValue(items: any) {
    return items.filter((item: any) => {
      if (this.searchText.trim() === '') {
        return true;
      } else {
        return (item.name.trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.aisheCode.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.addressLine1.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.addressLine2.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.city.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.districtName.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))
          || (item.stateName.toString().trim().toLowerCase().includes(this.searchText.trim().toLowerCase()))

      }
    })
  }
  save() {
    let payload = []
    for (let index = 0; index < this.list.length; index++) {
      if (this.list[index].checked) {
        payload.push({
          "componentId": this.element.componentId,
          "focusDistrict": this.list[index].districtId,
          "id": this.list[index].id,
          "instituteId": this.list[index].aisheCode,
          "createdByUserId": sessionStorage.getItem('userName'),
        })
      }

    }

    // payload.push({
    //   "componentId": this.element.componentId,
    //   "focusDistrict": this.element.distCode,
    //   "id": 0,
    //   "instituteId": 'U-0101',
    //   "createdByUserId": sessionStorage.getItem('userName'),
    // })

    this.api.saveComponentMapping(payload).subscribe(res => {
      if (res.status === 200) {
        this.notification.showSuccess()
        this.dialogRef.close(true)
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
}

