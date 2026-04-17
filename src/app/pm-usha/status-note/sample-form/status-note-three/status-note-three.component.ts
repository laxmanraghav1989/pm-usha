import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { GetService } from 'src/app/service/get.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-status-note-three',
  templateUrl: './status-note-three.component.html',
  styleUrls: ['./status-note-three.component.scss']
})
export class StatusNoteThreeComponent implements OnInit {
  dataList:any = []
  templateDataArr:any = []
  paginatedData = [];
  pageSize = 15;
  pageIndex = 0;

  constructor(private getService : GetService, public sharedService : SharedService) { }
@Input() noteData: string; 
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
    let payload = {
      stateCode: null,
      componentId: '',
      districtCode: null,
    }
  this.getService.getfinalSubmitProposal(payload).subscribe((res) => {

    if(res.status == 200){
      this.templateDataArr = res.data
      this.dataList = this.templateDataArr.filter(e => e.pabActionId == 1 || e.pabActionId == 3) 
      this.updatePaginatedData()
    }
    else{
      this.templateDataArr = []
    }

  })

}


}
