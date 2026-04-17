import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-ipmr',
  templateUrl: './ipmr.component.html',
  styleUrls: ['./ipmr.component.scss']
})
export class IpmrComponent implements OnInit {
  selectedIndex: any = 0;
  componentId!: string | null;
  userTypeId: string;
  refreshLockedMonth: number;
  viewCollege:boolean = false;
  

  constructor(private route: ActivatedRoute, public sharedService: SharedService) {
  this.userTypeId = sessionStorage.getItem('userTypeId');
  // this.componentId = JSON.parse(sessionStorage.getItem("componentId"));
   }

  ngOnInit(): void {
     if (sessionStorage.getItem('back') === 'true') {
        this.selectedIndex = sessionStorage.getItem('selectIndex');
        this.viewCollege = true;
     }
     else {
      this.selectedIndex = 0;
     }
  }

    tabSelected(value) {
    this.selectedIndex = value.index;
    if (this.selectedIndex === 0) {
      // this.reset()
    } 
    else if (this.selectedIndex === 1) {
     this.refreshLockedMonth = Date.now(); // trigger input change
    }
  }

}
