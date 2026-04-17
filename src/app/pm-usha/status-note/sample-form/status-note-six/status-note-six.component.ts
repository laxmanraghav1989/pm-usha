import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { GetService } from 'src/app/service/get.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-status-note-six',
  templateUrl: './status-note-six.component.html',
  styleUrls: ['./status-note-six.component.scss']
})
export class StatusNoteSixComponent implements OnInit {
  dataList:any = [];
  paginatedData = [];
  pageSize = 15;
  pageIndex = 0;
  constructor(private getService : GetService, public sharedService : SharedService) { }

  ngOnInit(): void {
    this.getStatusData()
  }

  onPageChange(event: PageEvent) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.updatePaginatedData();
    }
  
    updatePaginatedData() {
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedData = this.dataList.slice(startIndex, endIndex);
    }

  getStatusData() {
   
  this.getService.getPmUshaReportDetails('', '', '').subscribe(res => {
      
          if (res.status == 200) {
          let dataArr = res.data
            this.dataList = dataArr.filter(item => item.rusaProjectStatusId === 2 || item.rusaProjectStatusId === 3)
            this.updatePaginatedData() 
        }
        else {
          this.dataList = []
        }
      },
        err => {
          this.dataList = []
        })
    
  }

}
