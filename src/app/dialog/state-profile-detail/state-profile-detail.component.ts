import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ApiService } from "src/app/service/api.service";

@Component({
  selector: "cfs-state-profile-detail",
  templateUrl: "./state-profile-detail.component.html",
  styleUrls: ["./state-profile-detail.component.scss"],
})
export class StateProfileDetailComponent implements OnInit {
  detailsStateProfile: any ={};
  stateCategoryList: Array<any> = [];
  tableKay: Array<any>;
  categoryState: any = {};
  gpiData: any;
  ptrData: any;
  gpi:Array<any>=[];
  ptr:Array<any>=[]
  meeting1: any;
  meeting2:any;
  meeting3: any;
  meeting4:any;
  meeting5:any
  constructor(
    private dialogRef: MatDialogRef<StateProfileDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api: ApiService
  ) {}

  ngOnInit(): void {
   
    this.getStateCategory();
  }
  getStateCategory() {
    this.api.stateCategory().subscribe(
      (res) => {
        this.stateCategoryList = res;
        this.stateProfileDetails();
      },
      (err) => {}
    );
  }
  stateProfileDetails() {
    this.api.getStateProfileDetails(this.data.stateCode).subscribe((res) => {
      this.detailsStateProfile = res.data;
      if(this.detailsStateProfile.lastFiveMeetingsShec && this.detailsStateProfile.lastFiveMeetingsShec.length){
        if(this.detailsStateProfile?.lastFiveMeetingsShec.length >= 1){
          this.meeting1 = this.detailsStateProfile.lastFiveMeetingsShec['0'].meetingDate1;
          this.meeting2 = this.detailsStateProfile.lastFiveMeetingsShec['1'].meetingDate2
          this.meeting3 = this.detailsStateProfile.lastFiveMeetingsShec['2'].meetingDate3
          this.meeting4 = this.detailsStateProfile.lastFiveMeetingsShec['3'].meetingDate4
          this.meeting5 = this.detailsStateProfile.lastFiveMeetingsShec['4'].meetingDate5
        }
      }
      this.categoryState = this.stateCategoryList.find(
        (C) => C.id == this.detailsStateProfile.stateCategoryId
      )?.categoryName;
      this.gpi = this.detailsStateProfile.stateHeiDataGpiPtrRatios.filter(
        (ele) => ele.indicator.id === 3
      );
    this.ptr = this.detailsStateProfile.stateHeiDataGpiPtrRatios.filter(
        (ele) => ele.indicator.id === 4
      );
    });
  }
}
