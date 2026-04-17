import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { GetService } from "src/app/service/get.service";
import { NotificationService } from "src/app/service/notification.service";
import { Common } from "src/app/shared/common";
import { SharedService } from "src/app/shared/shared.service";

@Component({
  selector: "cfs-higher-education-data",
  templateUrl: "./higher-education-data.component.html",
  styleUrls: ["./higher-education-data.component.scss"],
})
export class HigherEducationDataComponent implements OnInit {
  formData: FormGroup;
  formInstitutionsdata: FormGroup;
  formPtr: FormGroup;
  budgetEstimateGSDP: any;
  actualBudgetPer: any;
  accreditationDataform: FormGroup;
  institutionData: Array<any> = [];
  instituteWiseEnrol: Array<any> = [];
  accreditationData: Array<any> = [];
  tableColumns: any;
  key: any[];
  indicatorName: string = "GER";
  heiData: any;
  indicatorId: number = 1;
  tabIndex = 0;
  selectedIndex: any = 0;
  year: any;
  tempData: Array<any> = [];
  expenditureList: Array<any> = [];
  naacAcc: Array<any> = [];
  totalABC: any = 0;
  totalAGrade: any = 0;
  totalAPlusGrade: any = 0;
  totalAPlusPlusGrade: any = 0;
  totalBGrade: any = 0;
  totalBPlusGrade: any = 0;
  totalBPlusPlusGrade: any = 0;
  totalCGrade: any = 0;
  disabledPage: boolean = false;
  isFormInvalid: boolean = false
  stateCode: any
  gerPage: boolean;
  insENrol: boolean;
  naac: boolean;
  expenditure: boolean;
  userTypeId: string;
  constructor(
    public api: ApiService,
    public fb: FormBuilder,
    public notification: NotificationService,
    public common: Common,
    public getService: GetService,
    public sharedService: SharedService
  ) {
    this.stateCode = sessionStorage.getItem('stateCode')
    this.userTypeId=sessionStorage.getItem('userTypeId')
    this.getPageStatusList()
    this.formData = this.fb.group({
      gerId: [0, []],
      enrollmentId: [0, []],
      female: [null, [Validators.required]],
      male: [null, [Validators.required]],
      obcFemale: [null, [Validators.required]],
      obcMale: [null, [Validators.required]],
      obcTotal: [null, [Validators.required]],
      scFemale: [null, [Validators.required]],
      scMale: [null, [Validators.required]],
      scTotal: [null, [Validators.required]],
      stFemale: [null, [Validators.required]],
      stMale: [null, [Validators.required]],
      stTotal: [null, [Validators.required]],
      femaleEnrol: [null, [Validators.required]],
      maleEnrol: [null, [Validators.required]],
      obcFemaleEnrol: [null, [Validators.required]],
      obcMaleEnrol: [null, [Validators.required]],
      obcTotalEnrol: [null, [Validators.required]],
      scFemaleEnrol: [null, [Validators.required]],
      scMaleEnrol: [null, [Validators.required]],
      scTotalEnrol: [null, [Validators.required]],
      stFemaleEnrol: [null, [Validators.required]],
      stMaleEnrol: [null, [Validators.required]],
      stTotalEnrol: [null, [Validators.required]],
      stateCode: this.stateCode,
      total: [null, [Validators.required]],
      totalEnrol: [null, [Validators.required]],
      year: ['', [Validators.required]],
      // ratio: [null, []],
    });
    this.accreditationDataform = this.fb.group({
      id: 0,
      a: ["", []],
      aplus: ["", []],
      aplusplus: ["", []],
      b: ["", []],
      bplus: ["", []],
      bplusplus: ["", []],
      c: ["", []],
      pmushaInstitutionTypeId: 0,
      stateCode: ["", []],
    });

  }

  ngOnInit(): void {
    this.getNaccAcc();
    this.getGERGPI();
    this.getnaacAccreditation();
    this.getInstitutionType();

  }

  onKeypressEvent(event, inputLength) {
    // if (event.target.value.length + 1 > inputLength) {
    //   event.preventDefault();
    // }
    if (event.target.value.length + 1 > inputLength) {

      event.preventDefault();
    }
    // else{
    //   var regex = new RegExp("^[0-9 ]+$");
    //   var str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    //   if (regex.test(str)) {
    //       return true;
    //   }

    //   event.preventDefault();
    //   return false;
    // }
  }
  getPageStatusList() {
    this.api.getPageStatus('').subscribe(res => {
      if (res.data && res.data.length) {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].page === this.common.gerEnrol) {
            this.gerPage = true
          } if (res.data[index].page === this.common.insENrol) {
            this.insENrol = true
          } if (res.data[index].page === this.common.naac) {
            this.naac = true
          } if (res.data[index].page === this.common.expenditure) {
            this.expenditure = true
          }
          // if (res.data[index].moduleName === this.common.stateAtGlance) {
          //   this.disabledPage = true
          // }
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getNaccAcc() {
    this.api.getNacc(this.stateCode).subscribe(
      (res) => {
        if (res.data && res.data.length) {
          this.naacAcc = res.data;
          this.naacAcc["0"]["type"] = "State Govt. University";
          this.naacAcc["1"]["type"] = "State Govt. College";
          this.naacAcc["2"]["type"] = "Private (aided) College";
          this.totalAgrade('grade');
          this.totalAPlusgrade('grade');
          this.totalAPlusPlusgrade('grade');
          this.totalBgrade('grade');
          this.totalBPlusgrade('grade');
          this.totalBPlusPlusgrade('grade');
          this.totalCgrade('grade');
        } else {
          this.naacAcc = this.common.Accreditation;
        }
      },
      (err) => { }
    );
  }
  saveAccreditation(locked: boolean) {
    for (let index = 0; index < this.naacAcc.length; index++) {
      if (this.naacAcc[index].a === null || this.naacAcc[index].aplus === null || this.naacAcc[index].aplusplus === null) {
        this.notification.mandatory();
        return;
      } if (this.naacAcc[index].b === null || this.naacAcc[index].bplus === null || this.naacAcc[index].bplusplus === null) {
        this.notification.mandatory();
        return;
      } if (this.naacAcc[index].c === null) {
        this.notification.mandatory();
        return;
      }

    }
    let temp = [];
    this.naacAcc.forEach((ele) => {
      temp.push(
        {
          a: ele.a,
          aplus: ele.aplus,
          aplusplus: ele.aplusplus,
          b: ele.b,
          bplus: ele.bplus,
          bplusplus: ele.bplusplus,
          c: ele.c,
          id: ele.id,
          pmushaInstitutionTypeId: ele.pmushaInstitutionTypeId,
          stateCode: this.stateCode,
          locked: locked
        })
    });
    this.api.saveAccreditationData(temp, this.common.Menu['4'].value).subscribe(
      (res) => {
        if (res.status === 200) {
          // this.notification.showSuccess();
          this.getNaccAcc();
          if (locked) {
            this.getPageStatusList()
            this.notification.showSuccessMessage(this.sharedService.locked)
          } else {
            this.notification.showSuccess();
          }
        }
      },
      (err) => { }
    );
  }
  getIndicator() {
    return new Promise<any>((resolve, reject) => {
      this.getService.getIndicatorList().subscribe(
        (res) => {
          this.expenditureList = res.filter(
            (ele) => ele.id === 5 || ele.id === 6 || ele.id === 7
          );
          this.expenditureList = this.expenditureList.map((v) => ({
            ...v,
            actualBudget: "",
            budgetEstimate: "",
            expenditureId: 0,
          }));
          resolve(this.expenditureList);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getnaacAccreditation() {
    this.getService.getAccreditation().subscribe((res) => {
      this.accreditationData = res.map((v) => ({ ...v, value: 0 }));
    });
  }
  getInstitutionType() {
    this.getService.getInstituteData().subscribe(
      (res) => {
        res.forEach((element) => {
          if (element.id === 4) {
            this.institutionData.push({
              pmushaInstitutionType: {
                id: element.id,
                type: element.type,
              },

              enrollmentId: 0,
              enrollment: 0,
              totalNo: 0,
            });
            this.institutionData.push({
              pmushaInstitutionType: {
                id: "",
                type: "Total University",
              },
              enrollmentId: 0,
              enrollment: 0,
              totalNo: 0,
            });
          } else if (element.id === 7) {
            this.institutionData.push({
              pmushaInstitutionType: {
                id: element.id,
                type: element.type,
              },
              enrollmentId: 0,
              enrollment: 0,
              totalNo: 0,
            });
            this.institutionData.push({
              pmushaInstitutionType: {
                id: "",
                type: "Total Standalone",
              },
              enrollmentId: 0,
              enrollment: 0,
              totalNo: 0,
            });
          } else if (element.id === 11) {
            this.institutionData.push({
              pmushaInstitutionType: {
                id: element.id,
                type: element.type,
              },
              enrollmentId: 0,
              enrollment: 0,
              totalNo: 0,
            });
            this.institutionData.push({
              pmushaInstitutionType: {
                id: "",
                type: "Total Colleges",
              },
              enrollmentId: 0,
              enrollment: 0,
              totalNo: 0,
            });
            this.institutionData.push({
              pmushaInstitutionType: {
                id: "",
                type: "Total Institution",
              },
              enrollmentId: 0,
              enrollment: 0,
              totalNo: 0,
            });
          } else if (element.id === 17) {
            this.institutionData.push({
              pmushaInstitutionType: {
                id: element.id,
                type: element.type,
              },
              enrollmentId: 0,
              enrollment: 0,
              totalNo: 0,
            });
            this.institutionData.push({
              pmushaInstitutionType: {
                id: "",
                type: "Total Single Discipline Institutions",
              },
              enrollmentId: 0,
              enrollment: 0,
              totalNo: 0,
            });
          } else {
            this.institutionData.push({
              pmushaInstitutionType: {
                id: element.id,
                type: element.type,
              },
              enrollmentId: 0,
              enrollment: 0,
              totalNo: 0,
            });
          }
        });
      },
      (err) => { }
    );
  }
  // getGERGPI() {
  //   return new Promise<any>((resolve, reject) => {
  //     this.api.getProfile().subscribe(
  //       (res) => {
  //         this.heiData = res.data;
  //         if (res.data !== null) {
  //           let ger = res.data.stateHeiDataGerEnrollments.filter(
  //             (ele) => ele.indicator.id === this.indicatorId
  //           );
  //           if (ger.length !== 0) {
  //             this.formData.patchValue(ger["0"]);
  //             this.formData.get("gerId")?.setValue(ger["0"].id);
  //           }
  //         }
  //         resolve(this.heiData);
  //       },
  //       (err) => {
  //         reject(err);
  //       }
  //     );
  //   });
  // }
  compareFn(t1: any, t2: any): boolean {
    return t1 && t2 ? t1.key === t2.key : t1 === t2;
  }
  getGERGPI() {
    return new Promise<any>((resolve, reject) => {
      this.getService.getProfile(this.stateCode).subscribe(
        (res) => {
          this.heiData = res.data;
          if (res.data !== null) {
            let ger = res.data.stateHeiDataGerEnrollments.filter(
              (ele) => ele.indicator.id === 1
            );
            if (ger.length !== 0) {
              this.formData.patchValue(ger["0"]);
              this.formData.get("gerId")?.setValue(ger["0"].id);

              this.formData.get("year").setValue(ger["0"].year);
            }
            let enrol = this.heiData?.stateHeiDataGerEnrollments.filter(
              (ele) => ele.indicator.id === 2
            );
            if (enrol.length !== 0) {
              this.formData.get("year").setValue(enrol["0"].year);
              this.formData.get("enrollmentId").setValue(enrol["0"].id);
              this.formData.get("femaleEnrol").setValue(enrol["0"].female);
              this.formData.get("maleEnrol").setValue(enrol["0"].male);
              this.formData.get("totalEnrol").setValue(enrol["0"].total);

              this.formData.get("obcMaleEnrol").setValue(enrol["0"].obcMale);
              this.formData.get("obcFemaleEnrol").setValue(enrol["0"].obcFemale);
              this.formData.get("obcTotalEnrol").setValue(enrol["0"].obcTotal);

              this.formData.get("scFemaleEnrol").setValue(enrol["0"].scFemale);
              this.formData.get("scMaleEnrol").setValue(enrol["0"].scMale);
              this.formData.get("scTotalEnrol").setValue(enrol["0"].scTotal);

              this.formData.get("stFemaleEnrol").setValue(enrol["0"].stFemale);
              this.formData.get("stMaleEnrol").setValue(enrol["0"].stMale);
              this.formData.get("stTotalEnrol").setValue(enrol["0"].stTotal);






            }
          }
          resolve(this.heiData);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  tabSelected(event: any) {
    this.formData.reset();

    this.selectedIndex = event.index;
    if (this.selectedIndex === 0) {
      this.indicatorName = "GER";
      this.indicatorId = 1;
      let ger = this.heiData?.stateHeiDataGerEnrollments.filter(
        (ele) => ele.indicator.id === this.indicatorId
      );
      if (ger.length !== 0) {
        this.formData.patchValue(ger["0"]);
        this.formData.get("gerId")?.setValue(ger["0"].id);
        this.formData.get("year")?.setValue(ger["0"].year);
      }
      let enrol = this.heiData?.stateHeiDataGerEnrollments.filter(
        (ele) => ele.indicator.id === 2
      );
      if (enrol.length !== 0) {
        this.formData.get("enrollmentId").setValue(enrol["0"].id);
        this.formData.get("femaleEnrol").setValue(enrol["0"].female);
        this.formData.get("maleEnrol").setValue(enrol["0"].male);
        this.formData.get("obcMaleEnrol").setValue(enrol["0"].obcMale);
        this.formData.get("obcFemaleEnrol").setValue(enrol["0"].obcFemale);
        this.formData.get("scFemaleEnrol").setValue(enrol["0"].scFemale);
        this.formData.get("scMaleEnrol").setValue(enrol["0"].scMale);
        this.formData.get("stFemaleEnrol").setValue(enrol["0"].stFemale);
        this.formData.get("stMaleEnrol").setValue(enrol["0"].stFemale);
        this.formData.get("scTotal").setValue(enrol["0"].stFemale);
        this.formData.get("scTotalEnrol").setValue(enrol["0"].scTotal);
        this.formData.get('stTotalEnrol').setValue(enrol["0"].stTotal)
        this.formData.get('obcTotalEnrol').setValue(enrol["0"].obcTotal)
        this.formData.get('totalEnrol').setValue(enrol["0"].total)


      }
    }
    // if (this.selectedIndex === 1) {
    //   this.indicatorId = 2;
    //   this.indicatorName = "Enrollment";   

    //   let enrol = this.heiData?.stateHeiDataGerEnrollments.filter(
    //     (ele) => ele.indicator.id === this.indicatorId
    //   );
    //   if (enrol.length !== 0) {
    //     this.formData.patchValue(enrol["0"]);
    //     this.formData.get("enrollmentId").setValue(enrol["0"].id);
    //   }
    // }
    if (this.selectedIndex === 1) {
      this.indicatorId = 8;
      this.indicatorName = "Number of Institutions data";
      if (this.heiData !== null) {
        this.getInstituionData();
      } else {
        this.institutionData = [];
        this.instituteWiseEnrol = [];
        this.getInstitutionType();
      }
    }
    if (this.selectedIndex === 3) {
      if (this.heiData.stateExpenditureOnHigherEducations.length === 0) {
        this.getIndicator();
      } else {
        let array = [];
        this.heiData.stateExpenditureOnHigherEducations.forEach((obj) => {
          array.push({
            actualBudget: obj.actualBudget,
            budgetEstimate: obj.budgetEstimate,
            expenditureId: obj.id,
            indicatorName: obj.indicator.indicatorName,
            id: obj.indicator.id,
          });


        });
        this.expenditureList = array;
        this.calculatePercentageGSDP(this.expenditureList[0].budgetEstimate, 1)
        this.calculatePercentageGSDPActuals(this.expenditureList[0].actualBudget, 1)
      }
    }
  }
  calculatePercentageGSDP(data: any, y: any) {
    for (let i = 0; i < this.expenditureList.length; i++) {
      this.budgetEstimateGSDP = (this.expenditureList[y].budgetEstimate * 100 / data).toFixed(2)
    }
  }

  calculatePercentageGSDPActuals(data: any, y: any) {

    for (let i = 0; i < this.expenditureList.length; i++) {
      this.actualBudgetPer = (this.expenditureList[y].actualBudget * 100 / data).toFixed(2)
    }

  }
  save(data: any, locked: boolean) {
    if (this.formData.invalid) {
      this.notification.showValidationMessage('All Fields are Mandatory*')
      this.isFormInvalid = true;
      return;
    } else {
      this.isFormInvalid = false;
    }
    let temp = [];
    temp.push({

      id: data.gerId,
      indicator: {
        id: this.indicatorId,
        indicatorName: this.indicatorName,
      },
      male: data.male,
      obcFemale: data.obcFemale,
      obcMale: data.obcMale,
      obcTotal: data.obcTotal,
      scFemale: data.scFemale,
      scMale: data.scMale,
      scTotal: data.scTotal,
      stFemale: data.stFemale,
      stMale: data.stMale,
      stTotal: data.stTotal,
      stateCode: this.stateCode,
      female: data.female,
      total: data.total,
      year: data.year,
    });
    temp.push({
      female: data.femaleEnrol.toString(),
      id: data.enrollmentId,
      indicator: {
        id: 2,
        indicatorName: "Enrollment",
      },
      male: data.maleEnrol.toString(),
      obcFemale: data.obcFemaleEnrol.toString(),
      obcMale: data.obcMaleEnrol.toString(),
      obcTotal: data.obcTotalEnrol.toString(),
      scFemale: data.scFemaleEnrol.toString(),
      scMale: data.scMaleEnrol.toString(),
      scTotal: data.scTotalEnrol.toString(),
      stFemale: data.stFemaleEnrol.toString(),
      stMale: data.stMaleEnrol.toString(),
      stTotal: data.stTotalEnrol.toString(),
      stateCode: this.stateCode,
      total: data.totalEnrol.toString(),
      year: data.year,
    });

    let payload = {
      locked: locked,
      stateHeiDataGerEnrollments: temp,
      menu: this.common.Menu['2'].value
    };
    this.api.saveBasicdata(payload).subscribe(
      (res) => {
        if (res.status === 200) {
          // this.notification.showSuccess();
          this.getGERGPI();
          if (locked) {
            this.getPageStatusList()
            this.notification.showSuccessMessage(this.sharedService.locked)
          } else {
            this.notification.showSuccess();
          }
        }
      },
      (err) => { }
    );
  }
  saveEnrolment(data: any) {
    let payload = {
      stateHeiDataGerEnrollments: [
        {
          female: data.female,
          id: data.enrollmentId,
          indicator: {
            id: 2,
            indicatorName: "Enrollment",
          },
          male: data.male,
          obcFemale: data.obcFemale,
          obcMale: data.obcMale,
          obcTotal: data.obcMale + data.obcFemale,
          scFemale: data.scFemale,
          scMale: data.scMale,
          scTotal: data.scMale + data.scFemale,
          stFemale: data.stFemale,
          stMale: data.stMale,
          stTotal: data.stMale + data.stFemale,
          stateCode: this.stateCode,
          total: data.total,
          year: data.year,
        },
      ],
    };
    this.api.saveBasicdata(payload).subscribe(
      (res) => {
        if (res.status === 200) {
          this.getPageStatusList()
          this.notification.showSuccess();
          this.getGERGPI().then((res) => {
            let enrol = res.stateHeiDataGerEnrollments.filter(
              (ele) => ele.indicator.id === this.indicatorId
            );
            if (enrol.length !== 0) {
              this.formData.patchValue(enrol["0"]);
              this.formData.get("enrollmentId").setValue(enrol["0"].id);
            }
          });
        }
      },
      (err) => { }
    );
  }

  saveInstitutionData(locked: boolean) {
    if (!this.year) {
      this.notification.showValidationMessage('Please select year !!!');
      return;
    }

    let temp = [];
    this.institutionData.forEach((element) => {
      if (element["pmushaInstitutionType"].id) {
        temp.push({
          enrollment: element.enrollment.toString(),
          id: element.enrollmentId,
          pmushaInstitutionType: {
            id: element["pmushaInstitutionType"].id,
            type: element["pmushaInstitutionType"].type,
          },
          stateCode: this.stateCode,
          totalNo: element.totalNo,
          year: this.year,
        });
      }
    });

    let payload = {
      locked: locked,
      stateHeiNumberCountEnrollments: [...temp],
      menu: this.common.Menu['3'].value
    };
    this.api.saveBasicdata(payload).subscribe(
      (res) => {
        if (res.status === 200) {
          if (locked) {
            this.getPageStatusList()
            this.notification.showSuccessMessage(this.sharedService.locked)
          } else {
            this.notification.showSuccess();
          }

          // this.notification.showSuccess();
          this.getGERGPI().then((envires) => {
            this.getInstituionData();
          });
        }
      },
      (err) => { }
    );
  }

  saveExpenditure(locked: boolean) {
    for (let index = 0; index < this.expenditureList.length; index++) {
      if (this.expenditureList[index].actualBudget === null || this.expenditureList[index].budgetEstimate === null) {
        this.notification.mandatory();
        return;
      }
      if (this.expenditureList[1].budgetEstimate > this.expenditureList[0].budgetEstimate) {
        this.notification.showValidationMessage('Total Expenditure on Higher Education should be less then GSDP in Budget Estimates !!!');
        return;
      }
      if (this.expenditureList[1].budgetEstimate === this.expenditureList[0].budgetEstimate) {
        this.notification.showValidationMessage('Total Expenditure on Higher Education should be less then GSDP in  Budget Estimates !!!');
        return;
      }
      if (this.expenditureList[1].actualBudget > this.expenditureList[0].actualBudget) {
        this.notification.showValidationMessage('Total Expenditure on Higher Education should be less then GSDP in Actuals) !!!');
        return;
      }
      if (this.expenditureList[1].actualBudget === this.expenditureList[0].actualBudget) {
        this.notification.showValidationMessage('Total Expenditure on Higher Education should be less then GSDP in Actuals)!!!');
        return;
      }
    }
    let temp = [];
    this.expenditureList.forEach((ele) => {
      temp.push({
        actualBudget: ele.actualBudget,
        budgetEstimate: ele.budgetEstimate,
        id: ele.expenditureId,
        indicator: {
          id: ele.id,
          indicatorName: ele.indicatorName,
        },
        stateCode: this.stateCode,
        yearActualBudget: 2021,
        yearBudgetEstimate: 2022,
      });
    });
    let payload = {
      locked: locked,
      stateExpenditureOnHigherEducations: temp,
      menu: this.common.Menu['5'].value
    };
    this.api.saveBasicdata(payload).subscribe(
      (res) => {
        if (res.status === 200) {
          if (locked) {
            this.getPageStatusList()
            this.notification.showSuccessMessage(this.sharedService.locked)
          } else {
            this.notification.showSuccess();
          }
          // this.notification.showSuccess();
          let array = [];
          this.getGERGPI().then((ele) => {
            ele.stateExpenditureOnHigherEducations.forEach((obj) => {
              array.push({
                actualBudget: obj.actualBudget,
                budgetEstimate: obj.budgetEstimate,
                expenditureId: obj.id,
                indicatorName: obj.indicator.indicatorName,
                id: obj.indicator.id,
              });
            });
            this.expenditureList = array;
            this.calculatePercentageBudget()
            this.calculatePercentageActual()
          });
        }
      },
      (err) => { }
    );
  }
  element: Array<any> = [];
  // saveAccreditation() {
  //   let payload = {
  //     //accreditationId
  //     data: [
  //       {
  //         id: 1,
  //         a: this.accreditationDataform.controls["UniversitiesA"].value,
  //         aplus: this.accreditationDataform.controls["UniversitiesA1"].value,
  //         aplusplus:
  //           this.accreditationDataform.controls["UniversitiesA2"].value,
  //         b: this.accreditationDataform.controls["UniversitiesA3"].value,
  //         bplus: this.accreditationDataform.controls["UniversitiesA4"].value,
  //         bplusplus:
  //           this.accreditationDataform.controls["UniversitiesA5"].value,
  //         c: this.accreditationDataform.controls["UniversitiesA6"].value,
  //         pmushaInstitutionTypeId: 2,
  //         stateCode: this.stateCode,
  //       },
  //       {
  //         id: 2,
  //         a: this.accreditationDataform.controls["CollegeA"].value,
  //         aplus: this.accreditationDataform.controls["CollegeA1"].value,
  //         aplusplus: this.accreditationDataform.controls["CollegeA2"].value,
  //         b: this.accreditationDataform.controls["CollegeA3"].value,
  //         bplus: this.accreditationDataform.controls["CollegeA4"].value,
  //         bplusplus: this.accreditationDataform.controls["CollegeA5"].value,
  //         c: this.accreditationDataform.controls["CollegeA6"].value,
  //         pmushaInstitutionTypeId: 9,
  //         stateCode: this.stateCode,
  //       },
  //       {
  //         id: 2,
  //         a: this.accreditationDataform.controls["PrivateCollegeA1"].value,
  //         aplus: this.accreditationDataform.controls["PrivateCollegeA2"].value,
  //         aplusplus:
  //           this.accreditationDataform.controls["PrivateCollegeA3"].value,
  //         b: this.accreditationDataform.controls["PrivateCollegeA4"].value,
  //         bplus: this.accreditationDataform.controls["PrivateCollegeA5"].value,
  //         bplusplus:
  //           this.accreditationDataform.controls["PrivateCollegeA6"].value,
  //         c: this.accreditationDataform.controls["PrivateCollegeA7"].value,
  //         pmushaInstitutionTypeId: 10,
  //         stateCode: this.stateCode,
  //       },
  //     ],
  //   };

  //   this.api.saveBasicdata(payload).subscribe((res) => {
  //     if (res.status === 200) {
  //       this.notification.showSuccess();
  //     }
  //   });
  // }
  totalAgrade(event: any) {
    this.totalAGrade = this.naacAcc['0'].a + this.naacAcc['1'].a + this.naacAcc['2'].a
  }
  totalAPlusgrade(event: any) {
    this.totalAPlusGrade = this.naacAcc['0'].aplus + this.naacAcc['1'].aplus + this.naacAcc['2'].aplus
  }
  totalAPlusPlusgrade(event: any) {
    this.totalAPlusPlusGrade = this.naacAcc['0'].aplusplus + this.naacAcc['1'].aplusplus + this.naacAcc['2'].aplusplus
  }
  totalBgrade(event: any) {
    this.totalBGrade = this.naacAcc['0'].b + this.naacAcc['1'].b + this.naacAcc['2'].b
  }
  totalBPlusgrade(event: any) {
    this.totalBPlusGrade = this.naacAcc['0'].bplus + this.naacAcc['1'].bplus + this.naacAcc['2'].bplus
  }
  totalBPlusPlusgrade(event: any) {
    this.totalBPlusPlusGrade = this.naacAcc['0'].bplusplus + this.naacAcc['1'].bplusplus + this.naacAcc['2'].bplusplus
  }
  totalCgrade(event: any) {
    this.totalCGrade = this.naacAcc['0'].c + this.naacAcc['1'].c + this.naacAcc['2'].c
  }


  male(data: any) {
    const t1 = data.obcMale ? data.obcMale : 0;
    const t2 = data.scMale ? data.scMale : 0;
    const t3 = data.stMale ? data.stMale : 0;
    this.formData.get("male").setValue(t1 + t2 + t3);
  }
  female(data: any) {
    const t1 = data.obcFemale ? data.obcFemale : 0;
    const t2 = data.scFemale ? data.scFemale : 0;
    const t3 = data.stFemale ? data.stFemale : 0;
    this.formData.get("female").setValue(t1 + t2 + t3);
  }
  maleEnrol(data: any) {
    const t1 = data.obcMaleEnrol ? data.obcMaleEnrol : 0;
    const t2 = data.scMaleEnrol ? data.scMaleEnrol : 0;
    const t3 = data.stMaleEnrol ? data.stMaleEnrol : 0;
    this.formData.get("maleEnrol").setValue(t1 + t2 + t3);
  }
  femaleEnrol(data: any) {
    const t1 = data.obcFemaleEnrol ? data.obcFemaleEnrol : 0;
    const t2 = data.scFemaleEnrol ? data.scFemaleEnrol : 0;
    const t3 = data.stFemaleEnrol ? data.stFemaleEnrol : 0;
    this.formData.get("femaleEnrol").setValue(t1 + t2 + t3);
  }



  totalValue(value: any) {
    // const t4;
    // const t8
    let m = parseInt(this.institutionData["0"].totalNo?this.institutionData["0"].totalNo:0)
    let m1 = parseInt(this.institutionData["2"].totalNo?this.institutionData["2"].totalNo:0)
    let m2 = parseInt(this.institutionData["1"].totalNo?this.institutionData["1"].totalNo:0)
    let m3 = parseInt(this.institutionData["3"].totalNo?this.institutionData["3"].totalNo:0)
    const total4 = m + m1 + m2 + m3;
    this.institutionData["4"].totalNo=total4;
  //  this.institutionData["4"].totalNo = this.institutionData["0"].totalNo?this.institutionData["0"].totalNo:0 + this.institutionData["1"].totalNo?this.institutionData["1"].totalNo:0 + this.institutionData["2"].totalNo?this.institutionData["2"].totalNo:0 + this.institutionData["3"].totalNo?this.institutionData["3"].totalNo:0;
   
  let m05 = parseInt(this.institutionData["5"].totalNo?this.institutionData["5"].totalNo:0)
  let m6 = parseInt(this.institutionData["6"].totalNo?this.institutionData["6"].totalNo:0)
  let m7 = parseInt(this.institutionData["7"].totalNo?this.institutionData["7"].totalNo:0)

  const total8 =  m05 + m6 + m7;
  this.institutionData["8"].totalNo=total8;
  //this.institutionData["8"].totalNo = this.institutionData["5"].totalNo?this.institutionData["5"].totalNo:0 + this.institutionData["6"].totalNo?this.institutionData["6"].totalNo:0 + this.institutionData["7"].totalNo?this.institutionData["7"].totalNo:0;
  let m09 = parseInt(this.institutionData["9"].totalNo?this.institutionData["9"].totalNo:0)
  let m10 = parseInt(this.institutionData["10"].totalNo?this.institutionData["10"].totalNo:0)
  let m11 = parseInt(this.institutionData["11"].totalNo?this.institutionData["11"].totalNo:0)
  let m12 = parseInt(this.institutionData["12"].totalNo?this.institutionData["12"].totalNo:0)

  const total13 =  m09 + m10 + m11+m12;
  this.institutionData["13"].totalNo=total13;
  //this.institutionData["13"].totalNo = this.institutionData["9"].totalNo?this.institutionData["9"].totalNo:0 + this.institutionData["10"].totalNo?this.institutionData["10"].totalNo:0 + this.institutionData["11"].totalNo?this.institutionData["11"].totalNo:0 + this.institutionData["12"].totalNo?this.institutionData["12"].totalNo:0;
    
  let m04 = parseInt(this.institutionData["4"].totalNo?this.institutionData["4"].totalNo:0)
  let m8 = parseInt(this.institutionData["8"].totalNo?this.institutionData["8"].totalNo:0)
  let m13 = parseInt(this.institutionData["13"].totalNo?this.institutionData["13"].totalNo:0)


  const total14 =  m04 + m8 +m13;
  this.institutionData["14"].totalNo=total14;
  //this.institutionData["14"].totalNo = this.institutionData["4"].totalNo?this.institutionData["4"].totalNo:0 + this.institutionData["8"].totalNo?this.institutionData["8"].totalNo:0 + this.institutionData["13"].totalNo?this.institutionData["13"].totalNo:0;
   
  let m15 = parseInt(this.institutionData["15"].totalNo?this.institutionData["15"].totalNo:0)
  let m16 = parseInt(this.institutionData["16"].totalNo?this.institutionData["16"].totalNo:0)
  let m17 = parseInt(this.institutionData["17"].totalNo?this.institutionData["17"].totalNo:0)
  let m18 = parseInt(this.institutionData["18"].totalNo?this.institutionData["18"].totalNo:0)
  let m19 = parseInt(this.institutionData["19"].totalNo?this.institutionData["19"].totalNo:0)
  let m20 = parseInt(this.institutionData["20"].totalNo?this.institutionData["20"].totalNo:0)


  const total21 =  m15 + m16 + m17+m18+m19+m20;
  this.institutionData["21"].totalNo=total21;
  //this.institutionData["21"].totalNo = this.institutionData["15"].totalNo?this.institutionData["15"].totalNo:0 + this.institutionData["16"].totalNo?this.institutionData["16"].totalNo:0 + this.institutionData["17"].totalNo?this.institutionData["17"].totalNo:0 + this.institutionData["18"].totalNo?this.institutionData["18"].totalNo:0 + this.institutionData["19"].totalNo?this.institutionData["19"].totalNo:0 + this.institutionData["20"].totalNo?this.institutionData["20"].totalNo:0;
    

  }
  totalValueEnrol(value: any) {
    let m1 = parseFloat(this.institutionData["0"].enrollment?this.institutionData["0"].enrollment:0)
    let m12 = parseFloat(this.institutionData["2"].enrollment?this.institutionData["2"].enrollment:0)
    let m23 = parseFloat(this.institutionData["1"].enrollment?this.institutionData["1"].enrollment:0)
    let m = parseFloat(this.institutionData["3"].enrollment?this.institutionData["3"].enrollment:0)
    const total4 = m1 + m12 + m23 + m;
    const total8 = parseFloat(this.institutionData["5"].enrollment?this.institutionData["5"].enrollment:0) + parseFloat(this.institutionData["6"].enrollment?this.institutionData["6"].enrollment:0) + parseFloat(this.institutionData["7"].enrollment?this.institutionData["7"].enrollment:0);
    const total13 = parseFloat(this.institutionData["9"].enrollment?this.institutionData["9"].enrollment:0) + parseFloat(this.institutionData["10"].enrollment?this.institutionData["10"].enrollment:0) + parseFloat(this.institutionData["11"].enrollment?this.institutionData["11"].enrollment:0) + parseFloat(this.institutionData["12"].enrollment?this.institutionData["12"].enrollment:0);
    const total14 = total4 + total8 + total13;
    const total21 = parseFloat(this.institutionData["15"].enrollment?this.institutionData["15"].enrollment:0) + parseFloat(this.institutionData["16"].enrollment?this.institutionData["16"].enrollment:0) +
      parseFloat(this.institutionData["17"].enrollment?this.institutionData["17"].enrollment:0) +
      parseFloat(this.institutionData["18"].enrollment?this.institutionData["18"].enrollment:0) +
      parseFloat(this.institutionData["19"].enrollment?this.institutionData["19"].enrollment:0) +
      parseFloat(this.institutionData["20"].enrollment?this.institutionData["20"].enrollment:0);

      this.institutionData["4"].enrollment = total4.toFixed(2)
    this.institutionData["8"].enrollment = total8.toFixed(2)
    this.institutionData["13"].enrollment = total13.toFixed(2)
    this.institutionData["14"].enrollment = total14.toFixed(2)
    this.institutionData["21"].enrollment = total21.toFixed(2)
  }
  reset() {
    if (this.selectedIndex === 0) {
      this.formData.reset();
      let ger = this.heiData?.stateHeiDataGerEnrollments.filter(
        (ele) => ele.indicator.id === this.indicatorId
      );
      if (ger.length !== 0) {
        this.formData.get("gerId")?.setValue(ger["0"].id);
      }
      let enrol = this.heiData?.stateHeiDataGerEnrollments.filter(
        (ele) => ele.indicator.id === 2
      );
      if (enrol.length !== 0) {
        this.formData.get('enrollmentId').setValue(enrol['0'].id)
      }
    } if (this.selectedIndex === 1) {

    } if (this.selectedIndex === 2) {

      this.naacAcc.forEach(e => {
        e.a = null,
          e.aplus = null
        e.aplusplus = null,
          e.b = null,
          e.bplus = null
        e.bplusplus = null,
          e.c = null
      });
      this.totalAGrade = 0;
      this.totalAPlusGrade = 0;
      this.totalAPlusPlusGrade = 0;
      this.totalBGrade = 0;
      this.totalBPlusGrade = 0;
      this.totalBPlusPlusGrade = 0;
      this.totalCGrade = 0;
    } if (this.selectedIndex === 3) {
this.expenditureList.forEach(e=>{
  e.budgetEstimate=null,
  e.actualBudget=null
})
    }
  }

  getInstituionData() {
    this.institutionData = [];
    if (this.heiData?.stateHeiNumberCountEnrollments.length === 0) {
      this.getInstitutionType();
    }
    if (
      this.heiData?.stateHeiNumberCountEnrollments &&
      this.heiData?.stateHeiNumberCountEnrollments.length
    ) {
      this.heiData?.stateHeiNumberCountEnrollments.forEach((element) => {
        this.year = element.year
        if (element["pmushaInstitutionType"].id === 4) {
          this.institutionData.push({
            pmushaInstitutionType: {
              id: element["pmushaInstitutionType"].id,
              type: element["pmushaInstitutionType"].type,
            },
            enrollmentId: element.id,
            enrollment: element.enrollment ? element.enrollment : 0,
            totalNo: element.totalNo ? element.totalNo : 0,
          });
          this.institutionData.push({
            pmushaInstitutionType: {
              id: "",
              type: "Total University",
            },
            enrollmentId: 0,
            enrollment: 0,
            totalNo: 0,
          });
        } else if (element["pmushaInstitutionType"].id === 7) {
          this.institutionData.push({
            pmushaInstitutionType: {
              id: element["pmushaInstitutionType"].id,
              type: element["pmushaInstitutionType"].type,
            },
            enrollmentId: element.id,
            enrollment: element.enrollment ? element.enrollment : 0,
            totalNo: element.totalNo ? element.totalNo : 0,
          });
          this.institutionData.push({
            pmushaInstitutionType: {
              id: "",
              type: "Total Standalone",
            },
            enrollmentId: 0,
            enrollment: 0,
            totalNo: 0,
          });
        } else if (element["pmushaInstitutionType"].id === 11) {
          this.institutionData.push({
            pmushaInstitutionType: {
              id: element["pmushaInstitutionType"].id,
              type: element["pmushaInstitutionType"].type,
            },
            enrollmentId: element.id,
            enrollment: element.enrollment ? element.enrollment : 0,
            totalNo: element.totalNo ? element.totalNo : 0,
          });
          this.institutionData.push({
            pmushaInstitutionType: {
              id: "",
              type: "Total Colleges",
            },
            enrollmentId: 0,
            enrollment: element.enrollment ? element.enrollment : 0,
            totalNo: element.totalNo ? element.totalNo : 0,
          });
          this.institutionData.push({
            pmushaInstitutionType: {
              id: "",
              type: "Total Institution",
            },
            enrollmentId: 0,
            enrollment: 0,
            totalNo: 0,
          });
        } else if (element["pmushaInstitutionType"].id === 17) {
          this.institutionData.push({
            pmushaInstitutionType: {
              id: element["pmushaInstitutionType"].id,
              type: element["pmushaInstitutionType"].type,
            },
            enrollmentId: element.id,
            enrollment: element.enrollment ? element.enrollment : 0,
            totalNo: element.totalNo ? element.totalNo : 0,
          });
          this.institutionData.push({
            pmushaInstitutionType: {
              id: "",
              type: "Total Single Discipline Institutions",
            },
            enrollmentId: 0,
            enrollment: 0,
            totalNo: 0,
          });
        } else {
          this.institutionData.push({
            pmushaInstitutionType: {
              id: element["pmushaInstitutionType"].id,
              type: element["pmushaInstitutionType"].type,
            },
            enrollmentId: element.id,
            enrollment: element.enrollment ? element.enrollment : 0,
            totalNo: element.totalNo ? element.totalNo : 0,
          });
        }
      });
      this.totalValue("institution");
      this.totalValueEnrol("enrolment");
    }
  }
  calculatePercentageBudget() {
    if (this.expenditureList[1].budgetEstimate > this.expenditureList[0].budgetEstimate) {
      this.notification.showValidationMessage('Total Expenditure on Higher Education should be less then GSDP in Budget !!!');
      return;
    }
    if (this.expenditureList[1].budgetEstimate === this.expenditureList[0].budgetEstimate) {
      this.notification.showValidationMessage('Total Expenditure on Higher Education should be less then GSDP in Budget !!!');
      return;
    }

    if (this.expenditureList[0].budgetEstimate && this.expenditureList[1].budgetEstimate) {

      let percentage = ((this.expenditureList[1].budgetEstimate / this.expenditureList[0].budgetEstimate) * 100);
      let a = percentage.toFixed(2)
      this.expenditureList[2].budgetEstimate = a
    }

  }
  calculatePercentageActual() {
    if (this.expenditureList[1].actualBudget > this.expenditureList[0].actualBudget) {
      this.notification.showValidationMessage('Total Expenditure on Higher Education should be less then GSDP in Actual !!!');
      return;
    }
    if (this.expenditureList[1].actualBudget === this.expenditureList[0].actualBudget) {
      this.notification.showValidationMessage('Total Expenditure on Higher Education should be less then GSDP in Actual !!!');
      return;
    }

    if (this.expenditureList[0].actualBudget && this.expenditureList[1].actualBudget) {

      let percentage = ((this.expenditureList[1].actualBudget / this.expenditureList[0].actualBudget) * 100);
      let a = percentage.toFixed(2)
      this.expenditureList[2].actualBudget = a
    }
  }
}
