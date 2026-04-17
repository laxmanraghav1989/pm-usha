import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'cfs-pm-usha',
  templateUrl: './pm-usha.component.html',
  styleUrls: ['./pm-usha.component.scss']
})
export class PmUshaComponent implements OnInit {
  toggle: any;
  icon: string = 'widgets'
  
  constructor(public sharedService:SharedService) { }

  ngOnInit(): void {
  }
  toggleSidebar() {
    this.toggle = !this.toggle
    if (this.toggle) {
      this.icon = 'segment'
    } else {
      this.icon = 'widgets'
    }
    this.sharedService.setSidebar(this.toggle);
  }
}
