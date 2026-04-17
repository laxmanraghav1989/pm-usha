import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "src/app/service/api.service";
import { MasterService } from "src/app/service/master.service";
import { NotificationService } from "src/app/service/notification.service";
import {
  AppDateAdapter,
  APP_DATE_FORMATS,
} from "src/app/utility/format-datepicker.service";
import { ViewportScroller } from "@angular/common";
import { CollegeService } from "../dpr/strength-college/service/college.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";
import { GetService } from "src/app/service/get.service";
import { CustomErrorStateMatcher } from "src/app/utility/validators";
import { DeleteService } from "src/app/service/delete.service";


@Component({
  selector: "cfs-activity",
  templateUrl: "./activity.component.html",
  styleUrls: ["./activity.component.scss"],
  providers: [
    { provide: DateAdapter, useClass: AppDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS },
  ],
})
export class ActivityComponent implements OnInit {
  activityForm: FormGroup;
  formArray: FormArray
  activityList: Array<any> = [];
  componentList: Array<any> = [];
  proposedActivity: Array<any> = [];
  componentId: any;
  id: number = 0;
  aisheCode: string;
  collegeName: string;
  insType: any;
  stateCode: string;
  districtCode: string;
  instituteCategory: string;
  addUpdate: boolean = false;
  disabledPage: boolean = false;
  addUpdateButton: string = "Save";
  hideButton: boolean = true;
  isFormInvalid: boolean = false;
  hideItem: boolean = true;
  renovatedList: Array<any> = [];
  equipmentList: Array<any> = [];
  softComponentList: Array<any> = [];
  infraConstructionList: Array<any> = [];
  activityListData: Array<any> = [];
  districtCode1: any;
  variables: Array<any> = [];
  workshopList: Array<any> = [];
  remedialClassesList: Array<any> = []
  dataStemCourseList: Array<any> = [];
  dataActivitiesList: Array<any> = [];
  dataListVocational: Array<any> = [];
  itemList: Array<any> = [];
  arrayList: Array<any> = [];
  model: any[] = []
  paramId: number;
  selectedIndex: any;
  activityOtherList: any[];
  FinalLockKey: any;
  isActivityDisabled: boolean = false;
  constructor(
    public notification: NotificationService,
    public api: ApiService,
    public masterService: MasterService,
    public common: Common,
    public route: ActivatedRoute,
    public viewportScroller: ViewportScroller,
    public fb: FormBuilder,
    public auth: CollegeService,
    public sharedService: SharedService,
    public getService: GetService,
    public errorMatcher: CustomErrorStateMatcher, public deleteService: DeleteService
  ) {
    this.paramId = Number(this.route.snapshot.paramMap.get('revId'));
    this.activityForm = this.fb.group({
      activityName: { value: "", disabled: true },
      id: 0,
      activityId: ['0', []],
      howHasItBeenIncluded: [null, [Validators.required]],
      costForActivity: [null, [Validators.required]],
      detailOfHowActivityToBeUndertaken: [null, [Validators.required]],
      timelineForImplementationOfActivity: [null, [Validators.required]],
      // proposedForm: this.fb.array([
      //   this.fb.group({
      //     proposalActivityId: 0,
      //     itemId: []

      //   })
      // ]),
    });

    // this.formArray = this.activityForm.controls.proposedForm as FormArray;
    this.sharedService.getActivityPage.subscribe(res => {
      this.aisheCode = sessionStorage.getItem("userName");
      this.collegeName = sessionStorage.getItem("insName");
      this.insType = this.aisheCode.split(/[\W\d]+/).join("");
      this.districtCode1 = this.aisheCode.split(/[^\d]+/).join("");
      this.stateCode = sessionStorage.getItem("stateCode");
      this.districtCode = sessionStorage.getItem("districtCode");
      if (this.insType === "C") {
        this.instituteCategory = "COLLEGE";
      } if (this.insType === 'U') {
        this.instituteCategory = "UNIVERSITY";
      }
      if (res !== 0) {
        this.componentId = res;
        this.getProposalActivity();
        this.getActivity();
        this.getPageStatusList();
      } else {
        this.componentId = parseInt(this.route.snapshot.paramMap.get("id"));
        this.getProposalActivity();
        this.getActivity();
        this.getPageStatusList();
        if (this.paramId){
          if (this.componentId === this.sharedService.genderComponentId) {
            this.saveLockStatusEquity()
          }
          else {
            this.saveLockStatus()
          }
        }
        
      }
    })

    // this.componentId = sessionStorage.getItem('componentId')

  }

  ngOnInit(): void {


  }

  tabSelected(event) {
    this.selectedIndex = event.index;
  }
  addRecord() {
    this.arrayList.push({
      proposalActivityId: 0,
      itemId: []
    })
  }


  getPageStatusList() {
    this.api.getPageStatus(this.componentId).subscribe(
      (res) => {
        if (res.data && res.data.length) {
          for (let index = 0; index < res.data.length; index++) {
            if (this.componentId === this.sharedService.collegeComponentId) {
              if (res.data[index].moduleName === this.common.strengthClgFinal) {
                this.disabledPage = true;
              }
            } if (this.componentId === this.sharedService.universityComponentId) {
              if (res.data[index].moduleName === this.common.strengthUniv) {
                this.disabledPage = true;
              }
            } if (this.componentId === this.sharedService.meruComponentId) {
              if (res.data[index].moduleName === this.common.meruFinal) {
                this.disabledPage = true;
              }
            } if (this.componentId === this.sharedService.nmdcComponentId) {
              if (res.data[index].moduleName === this.common.nmdcFinal) {
                this.disabledPage = true;
              }
            } if (this.componentId === this.sharedService.genderComponentId) {
              if (res.data[index].moduleName === this.common.genderEquityFinal) {
                this.disabledPage = true;
              }
            }

          }
        }
      },
      (err) => { }
    );
  }
  getProposalActivity() {
    let payload = {
      aisheCode: this.componentId === this.sharedService.collegeComponentId || this.componentId === this.sharedService.universityComponentId || this.componentId === this.sharedService.meruComponentId ? this.aisheCode : '',
      districtCode: this.componentId === this.sharedService.nmdcComponentId || this.componentId === this.sharedService.genderComponentId ? this.districtCode : '',
      componentId: this.componentId
    }
    this.getService.getProposalActivityWithItem(payload).subscribe(
      (res) => {
        this.proposedActivity = [];
        this.proposedActivity = res.data

        // res.forEach((e) => {
        //   if (this.componentId === this.sharedService.collegeComponentId) {
        //     if (e.isStrengthenCollegeActivity) {
        //       this.proposedActivity.push(e);
        //     }
        //   }
        //   if (this.componentId === this.sharedService.universityComponentId) {
        //     if (e.isStrengthenUniversityActivity) {
        //       this.proposedActivity.push(e);
        //     }
        //   }
        //   if (this.componentId === this.sharedService.nmdcComponentId) {
        //     if (e.isNdmcActivity) {
        //       this.proposedActivity.push(e);
        //     }
        //   }
        //   if (this.componentId === this.sharedService.genderComponentId) {
        //     if (e.isEquityActivity) {
        //       this.proposedActivity.push(e);
        //     }
        //   }
        //   if (this.componentId === this.sharedService.meruComponentId) {
        //     if (e.isMeruActivity) {
        //       this.proposedActivity.push(e);
        //     }
        //   }
        // });
      },
      (err) => { }
    );
  }
  add() {
    this.addUpdate = true;
    this.hideButton = false;
    this.addUpdateButton = "Save";
    this.addRecord()
  }
  editRow(item) {
    this.arrayList = [];
    this.model = [];
    let timelineForImplementationOfActivity = null;
    this.hideButton = false;
    this.viewportScroller.scrollToPosition([0, 0]);
    this.addUpdate = true;
    this.addUpdateButton = "Update";
    this.activityForm.patchValue(item);
    this.activityForm.get('activityName').setValue(item.activityName)
    this.activityForm.get('activityName').updateValueAndValidity();
    if (item.proposalWithItem) {
      let activityArray = Object.entries(item.proposalWithItem)
      for (let [key, val] of activityArray) {
        let a = this.proposedActivity.find(ele => ele.proposalActivityId === parseInt(key))
        this.model.push(a)
        this.arrayList.push({
          "proposalActivityId": parseInt(key),
          "itemId": val,

        })

        // this.model['itemDetailsVo'].push({
        //   itemId:val,
        //   itemName:'Laboratory'
        // })

      }
    }
    if (item.timelineForImplementationOfActivity) {
      let date = item.timelineForImplementationOfActivity;
      let split_dateAsString1 = date.split("/");
      timelineForImplementationOfActivity = new Date(
        `${split_dateAsString1[2]}-${split_dateAsString1[1]}-${split_dateAsString1[0]}`
      );
      this.activityForm
        .get("timelineForImplementationOfActivity")
        ?.setValue(timelineForImplementationOfActivity);
    }
    this.getItemData(item.proposalActivityId);
  }
  reset() {
    this.addUpdateButton = "Save";
    this.activityForm.reset();
    this.isFormInvalid = false;
    this.hideItem = true;
    this.activityForm.get("id")?.setValue(0);
  }
  close() {
    this.addUpdateButton = "Save";
    this.addUpdate = false;
    this.hideButton = true;
    this.reset();
  }
  getItemData(data: any) {
    this.hideItem = false;
    if (this.componentId === this.sharedService.genderComponentId) {
      if (data === 1) {
        this.getInfraConsGender();
      } if (data === 2) {
        this.getRenovatedGender();
      } if (data === 3) {
        this.getEquipmentData();
      } if (data === 5) {
        this.getWorkshop();
      } if (data === 6) {
        this.getRemedialData();
      } if (data === 7) {
        this.getStemCourseData();
      } if (data === 8) {
        this.getVocational();
      } if (data === 99) {
        this.getActivitiesData();
      }
    } if (this.componentId === this.sharedService.meruComponentId || this.componentId === this.sharedService.universityComponentId || this.componentId === this.sharedService.collegeComponentId) {
      if (data === 1) {
        this.getInfraCons();
      }
      if (data === 2) {
        this.getRenovated();
      }
      if (data === 3) {
        this.getEquipment();
      }
      if (data === 4) {
        this.getSoftCompoenent();
      }
    }
    if (this.componentId === this.sharedService.nmdcComponentId) {
      if (data === 1) {
        this.getInfraConsNMDC();

      }
      if (data === 2) {
        this.getRenovated();
      }
      if (data === 3) {
        this.getEquipmentNMDC();
      }
      if (data === 4) {
        this.getSoftCompoenent();
      }
    }

  }
  getInfraConsGender() {
    this.api
      .getInfraConstructionGender(this.districtCode1, this.sharedService.genderComponentId)
      .subscribe(
        (res) => {
          this.itemList = []
          res.data.forEach(e => {
            this.itemList.push({
              id: e.id,
              name: e.description
            })
          })
        },
        (err) => { }
      );
  }
  getInfraCons() {
    this.auth
      .getInfraCnstruction(this.aisheCode, this.instituteCategory, this.componentId)
      .subscribe(
        (res) => {
          this.itemList = []
          res.data.forEach(e => {
            this.itemList.push({
              id: e.id,
              name: e.description
            })
          })
        },
        (err) => { }
      );
  }
  getRenovated() {
    this.auth
      .getRenovatedList(this.aisheCode, this.instituteCategory, this.componentId)
      .subscribe(
        (res) => {
          this.itemList = []
          res.data.forEach(e => {
            this.itemList.push({
              id: e.id,
              name: e.description
            })
          })
        },
        (err) => { }
      );
  }
  getInfraConsNMDC() {

    this.getService
      .getInfraCnstruction(
        this.districtCode,
        this.sharedService.nmdcComponentId
      )
      .subscribe(
        (res) => {
          this.itemList = []
          res.data.forEach(e => {
            this.itemList.push({
              id: e.id,
              name: e.description
            })
          })
        },
        (err) => { }
      );
  }
  getEquipmentNMDC() {
    this.getService
      .getEquipmentList(this.districtCode, this.sharedService.nmdcComponentId)
      .subscribe(
        (res) => {
          this.itemList = []
          res.data.forEach(e => {
            this.itemList.push({
              id: e.id,
              name: e.name
            })
          })
        },
        (err) => { }
      );

    // this.auth
    //   .getEquipmentList(this.aisheCode, this.instituteCategory, this.componentId)
    //   .subscribe(
    //     (res) => {
    //       this.itemList = []
    //       res.data.forEach(e => {
    //         this.itemList.push({
    //           id: e.id,
    //           name: e.name
    //         })
    //       })
    //     },
    //     (err) => { }
    //   );
  }
  getEquipment() {
    this.auth
      .getEquipmentList(this.aisheCode, this.instituteCategory, this.componentId)
      .subscribe(
        (res) => {
          this.itemList = []
          res.data.forEach(e => {
            this.itemList.push({
              id: e.id,
              name: e.name
            })
          })
        },
        (err) => { }
      );
  }
  getSoftCompoenent() {
    this.auth
      .getSoftCompoenentList(this.aisheCode, this.instituteCategory, this.componentId)
      .subscribe(
        (res) => {
          this.itemList = []
          res.data.forEach(e => {
            this.itemList.push({
              id: e.id,
              name: e.activity
            })
          })
        },
        (err) => { }
      );
  }
  getRenovatedGender() {
    this.api
      .getinfrastructureRenovationGenderEquity(this.districtCode1, this.sharedService.genderComponentId)
      .subscribe(
        (res) => {
          this.itemList = []
          res.data.forEach(e => {
            this.itemList.push({
              id: e.id,
              name: e.description
            })
          })


        },
        (error) => { }
      );
  }
  getEquipmentData() {
    this.api.getEquipmentGenderEquity(this.aisheCode, this.sharedService.genderComponentId).subscribe(
      (res) => {
        this.itemList = []
        res.data.forEach(e => {
          this.itemList.push({
            id: e.id,
            name: e.name
          })
        })
      },
      (err) => { }
    );
  }
  getWorkshop() {
    this.api.getWorkshopGenderEquity(this.aisheCode, this.sharedService.genderComponentId).subscribe((res) => {
      this.itemList = []
      res.data.forEach(e => {
        this.itemList.push({
          id: e.id,
          name: e.theme
        })
      })
       }, err => {
      console.error('Error fetching page status:', err);
    });
  }
  getVocational() {
    this.api.getVocationalDataGenderEquity(this.districtCode1, this.sharedService.genderComponentId).subscribe(res => {
      this.itemList = []
      res.data.forEach(e => {
        this.itemList.push({
          id: e.id,
          name: e.activity
        })
      })
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getActivitiesData() {
    this.api.getActivitiesGenderEquity(this.districtCode1, this.sharedService.genderComponentId).subscribe((res) => {
      this.itemList = []
      res.data.forEach(e => {
        this.itemList.push({
          id: e.id,
          name: e.activity
        })
      })

    }, (err) => { });
  }
  getStemCourseData() {
    this.api.getStemCourseDataGenderEquity(this.districtCode1, this.sharedService.genderComponentId).subscribe((res) => {
      this.itemList = []
      res.data.forEach(e => {
        this.itemList.push({
          id: e.id,
          name: e.name
        })
      })
    }, error => { });
  }
  getRemedialData() {
    this.api.getRemedialClasssGenderEquity(this.aisheCode, this.sharedService.genderComponentId).subscribe((res) => {
      this.itemList = []
      res.data.forEach(e => {
        this.itemList.push({
          id: e.id,
          name: e.detail
        })
      })
    }, (err) => { })

  }





  onKeypressEvent(event, inputLength) {
    if (event.target.value.length + 1 > inputLength) {
      event.preventDefault();
    }
  }
  compareFn(o1: any, o2: any) {
    return o1.proposalActivityId === o2.proposalActivityId;
  }
  tempArray: Array<any> = [];
  getActivityData() {
    if (this.sharedService.genderComponentId === this.componentId || this.sharedService.nmdcComponentId === this.componentId) {
      this.api.getActivityDetailsForGender(this.districtCode, this.componentId).subscribe(
        (res) => {
          if (res && res.length) {
            this.activityListData = res;
            this.activityListData.forEach(ele => {
              // let array = Object.keys(ele.proposalWithItem);

              // let array1 = Object.values(ele.proposalWithItem)
              // ele['tempArray'] = []
              // ele['tempArray'].push({
              //   proposedId: array,
              //   item: array1
              // })
              if (ele.proposalActivityName) {
                ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
              }
              if (ele.itemName) {
                ele.itemName = Object.values(ele.itemName).toString()
              }

            })
            for (let i = 0; i < this.activityList.length; i++) {
              for (let j = 0; j < this.activityListData.length; j++) {
                if (
                  this.activityList[i].id === this.activityListData[j].activityId
                ) {
                  this.activityList.splice(i, 1);
                }
                else {
                  if (this.activityList[i].equityActivity) {
                    this.activityOtherList = this.activityList
                    }
                }
              }
            }
          } else {
            this.activityListData = []
          }
        },
        (err) => { }
      );
    } else {
      this.api.getActivityDetails(this.aisheCode, this.componentId).subscribe(
        (res) => {
          if (res && res.length) {
            this.activityListData = res;
            this.activityListData.forEach(ele => {
              // let array = Object.keys(ele.proposalWithItem);
              // let array1 = Object.values(ele.proposalWithItem);
              // ele['tempArray'] = []
              // ele['tempArray'].push({
              //   item: array,
              //   proposedId: array1
              // })
              if (ele.proposalActivityName) {
                ele.proposalActivityName = Object.values(ele.proposalActivityName).toString()
              }
              if (ele.itemName) {
                ele.itemName = Object.values(ele.itemName).toString()
              }

            })

            for (let i = 0; i < this.activityList.length; i++) {
              for (let j = 0; j < this.activityListData.length; j++) {
                if (
                  this.activityList[i].id === this.activityListData[j].activityId
                ) {
                  this.activityList.splice(i, 1);
                }
                else {
                  if (this.activityList[i].meruActivity) {
                  this.activityOtherList = this.activityList
                  }
                }
              }
            }
          } else {
            this.activityListData = []
          }
        },
        (err) => { }
      );
    }

  }

  getActivity() {
    this.masterService.getActivityList().subscribe(
      (res) => {
        this.variables = res;
        this.activityList = this.variables.slice();
        this.getActivityData();
      },
      (err) => { }
    );
  }
  save() {
    if (this.activityForm.controls["activityId"].value === "0") {
      this.notification.showValidationMessage("Please select activity !!!");
      this.isFormInvalid = true;
      return;
    } else {
      this.isFormInvalid = false;
    }
    let duplicates1=[]
    // if (this.addUpdateButton === 'Save') {
    //   for (let i = 0; i < this.activityListData.length; i++) {
    //     if (this.activityListData[i].activityId === this.activityForm.controls["activityId"].value) {
    //       for (let j = 0; j < this.activityListData[i].tempArray.length; j++) {
    //         for (let k = 0; k < this.arrayList.length; k++) {
    //           for (let l = 0; l < this.activityListData[i].tempArray[j].proposedId.length; l++) {
    //             if (this.activityListData[i].tempArray[j].proposedId[l].toString() === this.arrayList[k].proposalActivityId.toString()) {
    //               for (let m = 0; m < this.activityListData[i].tempArray[j].item.length; m++) {

    //                 for (let n = 0; n < this.arrayList[k].itemId.length; n++) {
    //                   if(this.activityListData[i].tempArray[j].item[m].toString() === this.arrayList[k].itemId[n].toString()){
    //                     duplicates1.push( this.activityListData[i]);
    //                     this.notification.showValidationMessage('Duplicate entries not allowed !!!');
    //                     return;
    //                   }

    //                 }

    //               }
    //             }

    //           }

    //           // for (let l = 0; l < this.arrayList[k].itemId.length; l++) {
    //           //   for (let m = 0; m < this.activityListData[i].tempArray[j].item.length; m++) {
    //           //     if (this.activityListData[i].tempArray[j].item[m] === this.arrayList[k].itemId) {



    //           //     }

    //           //   }

    //           // }

    //         }

    //       }
    //       for (let j = 0; j < this.arrayList.length; j++) {


    //       }
    //       this.notification.showValidationMessage('Duplicate entries not allowed !!!');
    //       return;
    //     }
    //   }
    // }

    let duplicates = []
    for (let i = 0; i < this.arrayList.length; i++) {
      if (this.arrayList[i].proposalActivityId === 0) {
        this.notification.showValidationMessage('Please select Proposed Sub-Activity !!!');
        return;
      }
      if (this.arrayList[i].itemId.length === 0) {
        this.notification.showValidationMessage('Please select item !!!');
        return;
      }
      for (let j = i + 1; j < this.arrayList.length; j++) {
        if (this.arrayList[i].proposalActivityId === this.arrayList[j].proposalActivityId) {
          duplicates.push(this.arrayList[i]);
        }
      }
    }
    if (duplicates.length !== 0) {
      this.notification.showValidationMessage('Duplicate entries not allowed !!!');
      return;
    }
    let array = {}
    for (let index = 0; index < this.arrayList.length; index++) {
      array[this.arrayList[index].proposalActivityId] = this.arrayList[index].itemId

    }
    if (this.activityForm.invalid) {
      this.isFormInvalid = true;
      this.notification.showWarning()
      return;
    } else {
      this.isFormInvalid = false;
    }

    let timelineForImplementationOfActivity = null;
    if (
      this.activityForm.controls["timelineForImplementationOfActivity"].value
    ) {
      let day: string = this.activityForm.controls[
        "timelineForImplementationOfActivity"
      ].value
        .getDate()
        .toString();
      day = +day < 10 ? "0" + day : day;
      let month: string = (
        this.activityForm.controls[
          "timelineForImplementationOfActivity"
        ].value.getMonth() + 1
      ).toString();
      month = +month < 10 ? "0" + month : month;
      let year =
        this.activityForm.controls[
          "timelineForImplementationOfActivity"
        ].value.getFullYear();
      timelineForImplementationOfActivity = `${day}/${month}/${year}`;
      timelineForImplementationOfActivity.toString();
    }
    let temp = [];
    const input1 = document.getElementById(
      'howHasItBeenIncluded',
    ) as HTMLInputElement | null;

    if (input1 != null) {
      var howHasItBeenIncluded = input1.value
      // var c =input.value.replace(/\n/g, '<br />')
    }
    const input2 = document.getElementById(
      'detailOfHowActivityToBeUndertaken',
    ) as HTMLInputElement | null;

    if (input2 != null) {
      var detailOfHowActivityToBeUndertaken = input2.value
    }
    temp.push({
      id: this.activityForm.controls["id"].value,
      activityId: this.activityForm.controls["activityId"].value,
      componentId: this.componentId,
      howHasItBeenIncluded: howHasItBeenIncluded,
      detailOfHowActivityToBeUndertaken: detailOfHowActivityToBeUndertaken,
      costForActivity: this.activityForm.controls["costForActivity"].value,
      timelineForImplementationOfActivity: timelineForImplementationOfActivity,
      aisheCode: this.componentId === this.sharedService.genderComponentId || this.componentId === this.sharedService.nmdcComponentId ? null : this.aisheCode,
      stateCode: this.stateCode,
      districtCode: this.districtCode,
      instituteCategory: this.componentId === this.sharedService.genderComponentId || this.componentId === this.sharedService.nmdcComponentId ? '' : this.insType,
      proposalWithItem: array,
    });
    let menuActivity = null
    if (this.componentId === this.sharedService.collegeComponentId) {
      menuActivity = this.common.strengthCollegeActivity
    }
    if (this.componentId === this.sharedService.universityComponentId) {
      menuActivity = this.common.strengthUnivActivity
    }
    if (this.componentId === this.sharedService.nmdcComponentId) {
      menuActivity = this.common.nmdcActivity
    }
    if (this.componentId === this.sharedService.genderComponentId) {
      menuActivity = this.common.genderEquityActivity
    }
    if (this.componentId === this.sharedService.meruComponentId) {
      menuActivity = this.common.meruActivity
    }
    this.api
      .saveActivityData(
        temp,
        menuActivity
      )
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.reset();
            this.arrayList = [];
            this.addRecord();
            this.model = []
            this.notification.showSuccess();
            this.getActivityData();
          }
        },
        (err) => { }
      );
  }
  deleteActivity(item) {
    this.common.delete().subscribe(res => {
      if (res) {
        this.deleteService.deleteActivityAll(item).subscribe(res => {
          this.notification.showDelete();
          this.getActivityData()
        }, err => {

        })
      }
    })

  }
  deleteArray(i) {
    this.common.delete().subscribe(res => {
      if (res) {
        this.arrayList.splice(i, 1)

      }
    })
  }

  getValue(value, i) {
    this.arrayList[i]['proposalActivityId'] = value.proposalActivityId
    this.arrayList[i].itemId = []
  }
  getItemValue(value, i) {
    this.arrayList[i].itemId = value

  }

  saveLockStatus(){
    this.getService.getLockListStatus(this.aisheCode, this.sharedService.meruComponentId).subscribe(res => {
      if (res) {
        this.FinalLockKey = res[0]
        if (this.FinalLockKey){
          if (this.FinalLockKey.activityDetail){
            this.isActivityDisabled = true;
          }
        }
        // 
        // this.saveBooleanValue(this.booleanEntity.isProposedCourse, this.insType === 'U' ? this.common.strengthUnivProposed : this.common.strengthClgProposed, this.sharedService.isProposedCourse)
        // this.reset();
      }
     
    })
  }
  saveLockStatusEquity(){
    this.getService.getLockListStatus(this.aisheCode, this.sharedService.genderComponentId).subscribe(res => {
      if (res) {
        this.FinalLockKey = res[0]
        if (this.FinalLockKey){
          if (this.FinalLockKey.activityDetails){
            this.isActivityDisabled = true;
          }
        }
        // 
        // this.saveBooleanValue(this.booleanEntity.isProposedCourse, this.insType === 'U' ? this.common.strengthUnivProposed : this.common.strengthClgProposed, this.sharedService.isProposedCourse)
        // this.reset();
      }
     
    })
  }

  LockProposal(lockValue){
    let commonObj = this.common.newObj
    let filterObjt = Object.entries(commonObj).filter(([key]) => key === lockValue)
    let filterObjValue = filterObjt[0][1]
    let characters = this.aisheCode.split(/[\W\d]+/).join("");
    let temp = {
        aisheCode: this.aisheCode,
        componentId: this.sharedService.meruComponentId,
        constant: lockValue,
        districtCode: sessionStorage.getItem("districtCode"),
        instituteCategory: characters,
        stateCode: this.stateCode,
        status: true
      }
    this.api.postProposalRevisionLock(temp).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccessMessage(`${filterObjValue} has been Loked successfully!!!`);
        this.saveLockStatus();
        // this.reset();
        // this.close()
      }
    });
  }
  LockProposalEquity(lockValue){
    let commonObj = this.common.newObj
    let filterObjt = Object.entries(commonObj).filter(([key]) => key === lockValue)
    let filterObjValue = filterObjt[0][1]
    let characters = this.aisheCode.split(/[\W\d]+/).join("");
    let temp = {
        aisheCode: this.aisheCode,
        componentId: this.sharedService.genderComponentId,
        constant: lockValue,
        districtCode: sessionStorage.getItem("districtCode"),
        // instituteCategory: characters,
        stateCode: this.stateCode,
        status: true
      }
    this.api.postProposalRevisionLock(temp).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccessMessage(`${filterObjValue} has been Loked successfully!!!`);
        this.saveLockStatusEquity();
        // this.reset();
        // this.close()
      }
    });
  }

trackById(index: number, item: any) {
  return item.id;
}
}
