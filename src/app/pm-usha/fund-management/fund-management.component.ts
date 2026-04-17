import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'cfs-fund-management',
  templateUrl: './fund-management.component.html',
  styleUrls: ['./fund-management.component.scss']
})
export class FundManagementComponent implements OnInit {
  byDefault: boolean = false;
  hideTable: boolean = true;
  
  Back: any = "Back";
  constructor() {
  }

  ngOnInit(): void {
  }

  back() {
    this.byDefault = false;
    this.hideTable = true;
  }
}
