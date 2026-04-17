import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { GetService } from "src/app/service/get.service";
import { NotificationService } from "src/app/service/notification.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";
import { CustomErrorStateMatcher } from "src/app/utility/validators";

@Component({
  selector: "cfs-giei-section1",
  templateUrl: "./giei-section1.component.html",
  styleUrls: ["./giei-section1.component.scss"],
})
export class GieiSection1Component implements OnInit {
  stateName: any;
  instituteCategory: any;
  districtCode: any;
  stateCode:any;
  focusDistrict: any;
  isFormInvalid: boolean = false;
  disabledPage:boolean=false;
  formDataInclusionEquity: FormGroup;
  constructor(
    public fb: FormBuilder,
    public api: ApiService,
    public notification: NotificationService,
    public sharedService: SharedService,
    public getService: GetService,
    public common: Common,
    public errorMatcher: CustomErrorStateMatcher
  ) {
    this.stateName = sessionStorage.getItem("stateName");
   // this.aisheCode = sessionStorage.getItem("aisheCode");
    this.districtCode = sessionStorage.getItem("districtCode");
    this.stateCode = sessionStorage.getItem("stateCode");
    
  }

  ngOnInit(): void {
    this.formDataInclusionEquity = this.fb.group({
      stateName: [null, []],
      isFocusDistrict: [null, []],
      id: [null, []],
      female: [null, [Validators.required]],
      male: [null, [Validators.required]],
      scFemale: [null, [Validators.required]],
      scMale: [null, [Validators.required]],
      scTotal: [null, [Validators.required]],
      scTransgender: [, [Validators.required]],
      stFemale: [null, [Validators.required]],
      stMale: [null, [Validators.required]],
      stTotal: [null, [Validators.required]],
      stTransgender: [null, [Validators.required]],
      total: [null, [Validators.required]],
      transgender: [null, [Validators.required]],
      equityId: [0, []],
    });
    this.getDataEquity();
    this.getGerData();
    this.getPageStatusList();
    this.formDataInclusionEquity.get("stateName").setValue(this.stateName);
    this.formDataInclusionEquity.controls["stateName"].disable();
  }


  getPageStatusList() {
    this.api.getPageStatus(this.sharedService.genderComponentId).subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {
         
            if (res.data[index].moduleName === this.common.genderEquityFinal) {
              this.disabledPage = true
            }
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getDataEquity() {
    this.api
      .getEquityList(this.districtCode, this.sharedService.genderComponentId)
      .subscribe((res1) => {
        this.formDataInclusionEquity
          .get("isFocusDistrict")
          .setValue(res1.data.isFocusDistrict);
        this.focusDistrict = res1.data.isFocusDistrict;
        this.formDataInclusionEquity.get("equityId").setValue(res1.data.id);
      });
  }
  getGerData() {
    this.api
      .getGenderInclusion(
        this.districtCode,
        this.sharedService.genderComponentId
      )
      .subscribe((res) => {
        this.formDataInclusionEquity.patchValue(res.data[0]);
        this.formDataInclusionEquity.get("male").setValue(res.data[0].male);
      });
  }


  saveEquityBasicDetails() {

  
    let temp = {
      componentId: this.sharedService.genderComponentId,
      districtCode: this.districtCode,
      id: this.formDataInclusionEquity.value.equityId,
      isFocusDistrict: this.formDataInclusionEquity.value.isFocusDistrict,
      stateCode: this.stateCode ,
    };
    this.api
      .postEquityDetails(temp, this.common.genderEqBasic)
      .subscribe((res) => {
        if (res.status === 200) {
          this.saveGerData();
        }
      });
  }

  saveGerData() {
    if(this.formDataInclusionEquity.invalid){
      this.notification.showWarning();
      return;
    }
    this.isFormInvalid=true;
    let temp = [];
    temp.push({
      componentId: this.sharedService.genderComponentId,
      districtCode: this.districtCode,
      id:this.formDataInclusionEquity.value.id === null? 0: this.formDataInclusionEquity.value.id,
      male: this.formDataInclusionEquity.value.male.toString(),
      female: this.formDataInclusionEquity.value.female.toString(),
      transgender: this.formDataInclusionEquity.value.transgender.toString(),
      total: this.formDataInclusionEquity.value.total.toString(),
      scFemale: this.formDataInclusionEquity.value.scFemale.toString(),
      scMale: this.formDataInclusionEquity.value.scMale.toString(),
      scTransgender: this.formDataInclusionEquity.value.scTransgender.toString(),
      scTotal: this.formDataInclusionEquity.value.scTotal.toString(),
      
      stFemale: this.formDataInclusionEquity.value.stFemale.toString(),
      stMale: this.formDataInclusionEquity.value.stMale.toString(),
      stTransgender: this.formDataInclusionEquity.value.stTransgender.toString(),
      stTotal: this.formDataInclusionEquity.value.stTotal.toString(),      
      stateCode: this.stateCode ,
      
      
    });
    this.api
      .postEquityGender(temp, this.common.genderEqBasic)
      .subscribe((res) => {
        if (res.status === 200) {
          this.notification.showSuccess();

          this.getGerData();
          this.getDataEquity();
        }
      });
  }

  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  reset(): void {
    this.formDataInclusionEquity.reset();
    this.formDataInclusionEquity.get("stateName").setValue(this.stateName);
    this.formDataInclusionEquity.controls["stateName"].disable();
    this.formDataInclusionEquity.controls["stateName"].updateValueAndValidity();
  }
  close(): void {}
}
