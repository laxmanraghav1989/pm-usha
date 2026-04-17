import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  public routers: typeof routes = routes;
  pageStatusList: Array<any> = [];
  final: boolean = true;
  finalSubmit: boolean = true;
  finalSubmitRevision: boolean = true;
  stateCode: any;
  id: any;
  heading: string
  finalPage: string
  districtCode: string;
  aisheCode: string;
  insType: any;
  userId: string;
  total: number = 0
  dateFinalSubmission: string = ''
  userTypeId: string;
  criteriaList: Array<any> = [];
  undertaking: boolean = false;
  instituteName: string = null
  costList: Array<any> = [];
  totalCost: any = 0
  districtName: string;
  stateName: string;
  showPartial: boolean
  paramId: number;
  heading1 = "Revised Proposal Submission Status"
  FinalLockKey: any;
  isFinalDisabled: boolean = false;
  revComponentId: any;
  constructor(public api: ApiService, public common: Common, public notification: NotificationService, public router: Router,
    public route: ActivatedRoute, public sharedService: SharedService, public getService: GetService, public post: PostService, public dialog: MatDialog) {
    this.paramId = Number(this.route.snapshot.paramMap.get('revId'));
    this.aisheCode = sessionStorage.getItem('userName')
    this.stateCode = sessionStorage.getItem('stateCode')
    this.districtCode = sessionStorage.getItem('districtCode');
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.instituteName = sessionStorage.getItem('insName');
    this.districtName = sessionStorage.getItem('districtName');
    this.stateName = sessionStorage.getItem('stateName');
    if (this.paramId === this.sharedService.revPrposal) {
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.revPageData();
      this.getScoreList();
      this.getCostListRevision()


    } else {
      this.sharedService.getStatus.subscribe(res => {
        this.resetPage()
        if (res !== 0) {
          this.id = parseInt(res);
          this.pageData();
          if (this.id !== 0) {
            this.getScoreList();
            this.getCostList()
          }


        } else {
          this.id = parseInt(this.route.snapshot.paramMap.get('id'));
          this.pageData()
          this.revPageData()
          if (this.id !== 0) {
            this.getScoreList();
            this.getCostList()
          }
        }
      })
    }

  }

  ngOnInit(): void {
    this.getPartialPage();
  }
  resetPage() {
    this.finalSubmit = true
    this.dateFinalSubmission = ''
    this.undertaking = false
  }
  getScoreList() {
    if (this.paramId === this.sharedService.revPrposal) {
      this.getService.getScore(this.id === this.sharedService.meruComponentId || this.id === this.sharedService.universityComponentId || this.id === this.sharedService.collegeComponentId ? this.aisheCode : this.districtCode, this.id).subscribe(res => {
        if (res && res.length) {
          this.criteriaList = res;

          this.total = this.criteriaList.reduce(
            (sum, item) => sum + Number(item.score),
            0
          );
        }

      }, err => {

      })
    }
    else {
      this.getService.getScore(this.id === this.sharedService.meruComponentId || this.id === this.sharedService.universityComponentId || this.id === this.sharedService.collegeComponentId ? this.aisheCode : this.districtCode, this.id).subscribe(res => {
        if (res && res.length) {
          this.criteriaList = res;

          this.total = this.criteriaList.reduce(
            (sum, item) => sum + Number(item.score),
            0
          );
        }

      }, err => {

      })
    }

  }
  getfinalStatusList() {

  }

  downloadPdfAisheCode() {
    let payload = {
      componentId: this.id,
      exportType: 'PDF',
      aisheCode: this.aisheCode,
      districtCode: (this.id === this.sharedService.genderComponentId || this.id === this.sharedService.nmdcComponentId) ? this.districtCode : '',
      revisedProposal: true
    }
    this.getService.downloadByAisheCodeRevision(payload).subscribe(res => {
      if (res) {
        this.common.viewPdf(res.byteData, res.name)

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
    
  }



  getCostList() {
    this.getService.getProposalCost(this.id === this.sharedService.meruComponentId || this.id === this.sharedService.universityComponentId || this.id === this.sharedService.collegeComponentId ? this.aisheCode : this.districtCode, this.id).subscribe(res => {
      if (res && res.length) {
        this.costList = res;
        this.totalCost = this.costList.reduce(
          (sum, item) => sum + Number(item.totalCost),
          0
        );
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getCostListRevision() {
    this.getService.getProposalCostRevision(this.id === this.sharedService.meruComponentId || this.id === this.sharedService.universityComponentId || this.id === this.sharedService.collegeComponentId ? this.aisheCode : this.districtCode, this.id, this.sharedService.revAddId).subscribe(res => {
      if (res && res.length) {
        this.costList = res;
        this.totalCost = this.costList.reduce(
          (sum, item) => sum + Number(item.totalCost),
          0
        );
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  pageData() {
    if (this.id === this.sharedService.stateAtGlanceCompId) {
      this.heading = 'State Profile Submission Status';
      this.pageStatusList = this.common.Menu.filter(ele => ele.module === this.common.module['0']);
      this.finalPage = this.common.stateAtGlanceFinal
      this.getPageStatusList('');
    } if (this.id === this.sharedService.collegeComponentId) {
      this.pageStatusList = this.common.Menu.filter(ele =>
        ele.module === this.common.module['1']
      );
      this.getPageStatusList(this.id);
      this.heading = 'Proposal Submission Status'
      this.finalPage = this.common.strengthClg
    } if (this.id === this.sharedService.universityComponentId) {
      this.pageStatusList = this.common.Menu.filter(ele => ele.module === this.common.module['2']);
      this.getPageStatusList(this.id);
      this.heading = 'Proposal Submission Status'
      this.finalPage = this.common.strengthUnivFinal
    } if (this.id === this.sharedService.meruComponentId) {
      this.pageStatusList = this.common.Menu.filter(ele => ele.module === this.common.module['3']);
      this.getPageStatusList(this.id);
      this.heading = 'Proposal Submission Status'
      this.finalPage = this.common.meruFinalSubmit
    }
    if (this.id === this.sharedService.genderComponentId) {
      this.pageStatusList = this.common.Menu.filter(ele => ele.module === this.common.module['4']);
      this.getPageStatusList(this.id);
      this.heading = 'Proposal Submission Status'
      this.finalPage = this.common.genderEquityFinalSubmit
    }
    if (this.id === this.sharedService.nmdcComponentId) {
      this.pageStatusList = this.common.Menu.filter(ele => ele.module === this.common.module['5']);
      this.getPageStatusList(this.id);
      this.heading = 'Proposal Submission Status'
      this.finalPage = this.common.nmdcFinalSubmit
    }
  }

  revPageData() {
    if (this.id === this.sharedService.collegeComponentId) {
      this.pageStatusList = this.common.RevisionMenu.filter(ele =>
        ele.module === this.common.module['1']
      );
      this.getPageStatusListRevision(this.id);
      this.heading = 'Revised Proposal Submission Status'
      this.finalPage = this.common.strengthClg
    } if (this.id === this.sharedService.universityComponentId) {
      this.pageStatusList = this.common.RevisionMenu.filter(ele => ele.module === this.common.module['2']);
      this.getPageStatusListRevision(this.id);
      this.heading = 'Revised Proposal Submission Status'
      this.finalPage = this.common.strengthUnivFinal
    } if (this.id === this.sharedService.meruComponentId) {
      this.pageStatusList = this.common.RevisionMenu.filter(ele => ele.module === this.common.module['3']);
      this.getPageStatusListRevision(this.id);
      this.heading = 'Revised Proposal Submission Status'
      this.finalPage = this.common.meruFinalSubmit
    }
    if (this.id === this.sharedService.genderComponentId) {
      this.pageStatusList = this.common.RevisionMenu.filter(ele => ele.module === this.common.module['4']);
      this.getPageStatusListRevision(this.id);
      this.heading = 'Revised Proposal Submission Status'
      this.finalPage = this.common.genderEquityFinalSubmit
    }
    if (this.id === this.sharedService.nmdcComponentId) {
      this.pageStatusList = this.common.RevisionMenu.filter(ele => ele.module === this.common.module['5']);
      this.getPageStatusListRevision(this.id);
      this.heading = 'Revised Proposal Submission Status'
      this.finalPage = this.common.nmdcFinalSubmit
    }
  }
  getPageStatusListRevision(id) {
    this.getService.getLockListStatus(this.aisheCode, id).subscribe(res => {
      if (res) {
        this.FinalLockKey = res[0]
        if (this.FinalLockKey) {
          if (this.FinalLockKey.finalSubmit) {
            this.isFinalDisabled = true;
            this.finalSubmitRevision = false;
            this.dateFinalSubmission = this.FinalLockKey.finalSubmissionDateTimeInString
            this.revComponentId = this.FinalLockKey.componentId
          }
        }
      }
      this.pageStatusList.forEach((obj: any) => {
        res.forEach((ele: any) => {
          if (this.common.infraConstruction === obj.page || this.common.buildingConstruction === obj.page) {
            obj.status = ele.infraConstruction;
            obj.compName = "infraConstruction"
          }
          if (this.common.infraRenovation === obj.page) {
            obj.status = ele.infraRenovation
            obj.compName = "infraRenovation"
          }
          if (this.common.equipment === obj.page || this.common.Nmdcequipment === obj.page) {
            obj.status = ele.equipment
            obj.compName = "equipment"
          }
          // if (this.common.Nmdcequipment === obj.page) {
          //   obj.status = ele.equipment
          //   obj.compName = "equipment"
          // }
          if (this.common.softComponent === obj.page) {
            obj.status = ele.softComponent
            obj.compName = "softComponent"
          }
          if (this.common.timeline === obj.page || this.common.infraTimeline === obj.page) {
            obj.status = ele.timeline
            obj.compName = "timeline"
          }
          if (this.common.financialEstimate === obj.page) {
            obj.status = ele.financialEstimate
            obj.compName = "financialEstimate"
          }
          if (this.common.proposedOutcome === obj.page) {
            obj.status = ele.proposedOutcome
            obj.compName = "proposedOutcome"
          }
          if (this.common.otherInformation === obj.page) {
            obj.status = ele.otherInformation
            obj.compName = "otherInformation"
          }
          if (this.common.activityDetail === obj.page) {
            obj.status = ele.activityDetail
            obj.compName = "activityDetail"
          }
          if (this.common.workshop === obj.page) {
            obj.status = ele.workshop
            obj.compName = "workshop"
          }
          if (this.common.remedialClass === obj.page) {
            obj.status = ele.remedialClass
            obj.compName = "remedialClass"
          }
          if (this.common.anyOtherActivities === obj.page) {
            obj.status = ele.anyOtherActivities
            obj.compName = "anyOtherActivities"
          }
          if (this.common.vocational === obj.page) {
            obj.status = ele.vocational
            obj.compName = "vocational"
          }
          if (this.common.activityDetails === obj.page) {
            obj.status = ele.activityDetails
            obj.compName = "activityDetails"
          }
        })
      })
      for (let index = 0; index < this.pageStatusList.length; index++) {
        if (!this.pageStatusList[index].status) {
          this.final = true;
          return;
        } else {
          this.final = false
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }


  getPageStatusList(id) {
    this.api.getPageStatus(id).subscribe(res => {
      this.pageStatusList.forEach((obj: any) => {
        res.data.forEach((ele: any) => {
          if (ele.page === obj.page) {
            obj.status = ele.status
          }
        })
      })
      if (this.id === this.sharedService.stateAtGlanceCompId) {

        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].moduleName === this.common.stateAtGlance) {
            this.finalSubmit = false;
            this.dateFinalSubmission = res.data[index].dateFinalSubmission
            this.undertaking = true
          }
        }
      } if (this.id === this.sharedService.collegeComponentId) {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].moduleName === this.common.strengthClgFinal) {
            this.finalSubmit = false
            this.dateFinalSubmission = res.data[index].dateFinalSubmission
            this.undertaking = true
          }
        }
      } if (this.id === this.sharedService.universityComponentId) {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].moduleName === this.common.strengthUniv) {
            this.finalSubmit = false
            this.dateFinalSubmission = res.data[index].dateFinalSubmission
            this.undertaking = true
          }
        }
      } if (this.id === this.sharedService.meruComponentId) {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].moduleName === this.common.meruFinal) {
            this.finalSubmit = false
            this.dateFinalSubmission = res.data[index].dateFinalSubmission
            this.undertaking = true
          }
        }
      }
      if (this.id === this.sharedService.genderComponentId) {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].moduleName === this.common.genderEquityFinal) {
            this.finalSubmit = false
            this.dateFinalSubmission = res.data[index].dateFinalSubmission
            this.undertaking = true
          }
        }
      }
      if (this.id === this.sharedService.nmdcComponentId) {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].moduleName === this.common.nmdcFinal) {
            this.finalSubmit = false
            this.dateFinalSubmission = res.data[index].dateFinalSubmission
            this.undertaking = true
          }
        }
      }
      // for (let index = 0; index < res.data.length; index++) {
      //   if (res.data[index].moduleName === this.common.stateAtGlance) {
      //     this.finalSubmit = false
      //   }
      // }
      for (let index = 0; index < this.pageStatusList.length; index++) {
        if (!this.pageStatusList[index].status) {
          this.final = true;
          return;
        } else {
          this.final = false
        }
      }

       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  getPartialPage() {
    this.getService.getStatus().subscribe(res => {
      this.showPartial = res
       }, err => {
      console.error('Error fetching page status:', err);
    })
  }
  // validatePage() {
  //   this.getService.pageValidation(this.stateCode).subscribe(res => {

  //      }, err => {
  //     console.error('Error fetching page status:', err);
  //   })
  // }
  submit() {
    if (!this.undertaking) {
      this.notification.showValidationMessage('Please select undertaking !!!');
      return;
    }
    if (this.id === this.sharedService.meruComponentId || this.id === this.sharedService.universityComponentId || this.id == this.sharedService.collegeComponentId) {
      this.aisheCode = sessionStorage.getItem("userName");
      this.insType = this.aisheCode.split(/[\W\d]+/).join("");
      let payload = {
        stateCode: this.stateCode,
        districtCode: this.districtCode,
        insittuteCategory: this.insType,
        aisheCode: this.aisheCode,
        componentId: this.id,
        menu: this.finalPage
      }
      this.common.finalSubmit().subscribe(res => {
        if (res) {
          this.api.finalSubmit(payload).subscribe(res => {
            if (res.status === 200) {
              this.notification.showSuccessMessage('Your submission has been successfull !!!');
              this.finalSubmit = false
              this.getPageStatusList(this.id)
            }
          }, err => {

          })
        }

      })
    } if (this.sharedService.stateAtGlanceCompId === this.id) {
      this.userId = sessionStorage.getItem('userName')
      let payload = {
        stateCode: this.stateCode,
        districtCode: this.districtCode,
        insittuteCategory: '',
        aisheCode: this.userId,
        componentId: '',
        menu: this.finalPage
      }
      this.api.finalSubmit(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccessMessage('Your submission has been successfull !!!');
          this.finalSubmit = false
          this.getPageStatusList('')
        }
      }, err => {

      })

    } if (this.sharedService.nmdcComponentId === this.id || this.sharedService.genderComponentId === this.id) {
      this.userId = sessionStorage.getItem('userName')
      let payload = {
        stateCode: this.stateCode,
        districtCode: this.districtCode,
        insittuteCategory: null,
        aisheCode: this.userId,
        componentId: this.id,
        menu: this.finalPage
      }
      this.api.finalSubmit(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccessMessage('Your submission has been successfull !!!');
          this.finalSubmit = false
          this.getPageStatusList(this.id)
        }
      }, err => {

      })

    }


  }
  finalSubmissionRevision(finallockValue) {

    this.getService.revisionFinalSubmit(this.aisheCode, this.id, this.districtCode, this.sharedService.pabStatus).subscribe(
      (res) => {
        if (res == true) {

          let StatusValue = this.pageStatusList.filter(item => item.status === false);
          if (StatusValue.length > 0) {
            this.notification.showValidationMessage("Please Lock all of the Pages !!!");;
          }
          else if (!this.undertaking) {
            this.notification.showValidationMessage('Please select undertaking !!!');
            return;
          }
          else {
            if (this.id === this.sharedService.genderComponentId || this.id === this.sharedService.nmdcComponentId) {
              this.LockProposalEquity(finallockValue)
            }
            else {
              this.LockProposal(finallockValue)
            }

          }
        }

      },
      (err) => {
      }
    );

  }

  LockProposal(lockValue) {
    let characters = this.aisheCode.split(/[\W\d]+/).join("");
    let temp = {
      aisheCode: this.aisheCode,
      componentId: this.id,
      constant: lockValue,
      districtCode: sessionStorage.getItem("districtCode"),
      instituteCategory: characters,
      stateCode: this.stateCode,
      status: true
    }
    this.api.postProposalRevisionLock(temp).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.revPageData();
      }
    });
  }
  LockProposalEquity(lockValue) {
    let temp = {
      aisheCode: this.aisheCode,
      componentId: this.id,
      constant: lockValue,
      districtCode: sessionStorage.getItem("districtCode"),
      stateCode: this.stateCode,
      status: true
    }
    this.api.postProposalRevisionLock(temp).subscribe((res) => {
      if (res.status === 200) {
        this.notification.showSuccess();
        this.revPageData();
      }
    });
  }
  finalSubmission() {
    if (!this.undertaking) {
      this.notification.showValidationMessage('Please select undertaking !!!');
      return;
    }
    let temp = []
    let array = []
    if (this.id !== 0) {
      this.criteriaList.forEach(element => {
        temp.push({
          "baseId": element.criteriaId,
          "id": 0,
          "instituteName": this.instituteName,
          "score": element.score,
          "value": element.valueForScore
        })
      });
      this.costList.forEach(e => {
        array.push({
          "cost": e.totalCost,
          "id": 0,
          "instituteName": this.instituteName,
          "proposalActivityId": e.proposalActivityId,
          "stateCode": this.stateCode,
          "status": true
        })
      })


    }

    if (this.id === this.sharedService.meruComponentId || this.id === this.sharedService.universityComponentId || this.id == this.sharedService.collegeComponentId || this.id == this.sharedService.genderComponentId) {
      this.aisheCode = sessionStorage.getItem("userName");
      this.insType = this.aisheCode.split(/[\W\d]+/).join("");
      let payload = {
        stateCode: this.stateCode,
        districtCode: this.districtCode,
        instituteCategory: this.insType,
        aisheCode: this.aisheCode,
        componentId: this.id,
        menu: this.finalPage,
        score: temp,
        cost: array,
        totalCost: this.totalCost,
        totalScore: this.total,
        userTypeId: this.userTypeId
      }
      this.common.finalSubmit().subscribe(res => {
        if (res) {
          this.api.finalSubmit(payload).subscribe(res => {
            if (res.status === 200) {
              this.notification.showSuccessMessage('Your submission has been successfull !!!');
              this.finalSubmit = false
              this.getPageStatusList(this.id)
            }
          }, err => {

          })
        }

      })
    } if (this.sharedService.stateAtGlanceCompId === this.id) {
      this.userId = sessionStorage.getItem('userName')
      let payload = {
        stateCode: this.stateCode,
        districtCode: null,
        instituteCategory: '',
        aisheCode: this.userId,
        componentId: '',
        menu: this.finalPage,
        score: temp,
        cost: array,
        totalCost: 0,
        totalScore: 0,
        userTypeId: this.userTypeId
      }
      this.api.finalSubmit(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccessMessage('Your submission has been successfull !!!');
          this.finalSubmit = false
          this.showPartial = false
          this.getPageStatusList('')
        }
      }, err => {

      })

    } if (this.sharedService.nmdcComponentId === this.id || this.sharedService.genderComponentId === this.id) {
      this.userId = sessionStorage.getItem('userName')
      let payload = {
        stateCode: this.stateCode,
        districtCode: this.districtCode,
        instituteCategory: null,
        aisheCode: this.userId,
        componentId: this.id,
        menu: this.finalPage,
        score: temp,
        cost: array,
        totalCost: this.totalCost,
        totalScore: this.total,
        userTypeId: this.userTypeId
      }
      this.api.finalSubmit(payload).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccessMessage('Your submission has been successfull !!!');
          this.finalSubmit = false
          this.getPageStatusList(this.id)
        }
      }, err => {

      })

    }


  }
  openRemarks() {
    this.getService.showUnlockStatus().subscribe(res => {
      if (res && res.length) {
        if (this.id === 0) {
          if (res['0'].requestForUnlockBySaa) {
            let ele = {
              state: true,
              status: res['0']
            }
            this.common.openUnlockStatus(ele)
          } else {
            this.getDetails()
          }
        } else {
          if (res['0'].requestForUnlockByUser) {
            let ele = {
              state: false,
              status: res['0']
            }
            this.common.openUnlockStatus(ele)
          } else {
            this.getDetails()
          }
        }

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })

  }
  getDetails() {
    let data = {
      districtCode: this.districtCode,
      componentId: this.id,
      instituteName: this.instituteName,
      districtName: this.districtName,
      aisheCode: this.aisheCode,
      stateName: this.stateName,
      stateCode: this.stateCode,
      page: true,
      name: this.stateName,
      pageSAA: true
    }
    this.common.unLock(data).subscribe(res => {
      if (res) {
        if (this.id === 0) {
          this.notification.showSuccessMessage('Your Request for unlock State Profile has been saved successfully.')
        } else {
          this.notification.showSuccessMessage('Your Request for unlock Project Proposal has been saved successfully.')

        }
      }
    });
  }
  openRemarksPartialRevision() {
    let characters = this.aisheCode.split(/[\W\d]+/).join("");
    let data = {
      districtCode: this.districtCode,
      stateCode: this.stateCode,
      paramId: this.paramId,
      stateName: this.stateName,
      aisheCode: this.aisheCode,
      componentId: this.id,
      constant: this.common.RevisionUnlockConstantUser,
      instituteCategory: characters,
      status: true,
    }
    this.common.partialUnlockRevision(data).subscribe(res => {
      if (res) {
        this.notification.showSuccessMessage('Your Request for unlock Project Proposal has been saved successfully.')
        this.revPageData();
      }
    })
  }
  openRemarksPartialRevisionEquity() {
    let data = {
      districtCode: this.districtCode,
      stateCode: this.stateCode,
      paramId: this.paramId,
      stateName: this.stateName,
      aisheCode: this.aisheCode,
      componentId: this.id,
      constant: this.common.RevisionUnlockConstantUser,
      status: true,
    }
    this.common.partialUnlockRevision(data).subscribe(res => {
      if (res) {
        this.notification.showSuccessMessage('Your Request for unlock Project Proposal has been saved successfully.')
        this.revPageData();
      }
    })
  }
  openRemarksPartial() {
    this.getService.showUnlockStatus().subscribe(res => {
      if (res && res.length) {
        if (res['0'].requestForUnlockBySaa) {
          let ele = {
            state: true,
            status: res['0']
          }
          this.common.openUnlockStatus(ele)
        }
        else {

          if (this.paramId === this.sharedService.revPrposal) {
            this.insType = this.aisheCode.split(/[\W\d]+/).join("");
            let data = {
              aisheCode: this.aisheCode,
              componentId: this.id,
              districtCode: this.districtCode,
              instituteCategory: this.insType,
              stateCode: this.stateCode,
              paramId: this.paramId,
              stateName: this.stateName,
            }
            this.common.partialUnlock(data).subscribe(res => {
              if (res) {
                this.notification.showSuccessMessage('Your Request to unlock the partially filled State Profile is forwarded to NPD.')
              }
            })
          }
          else {
            let data = {
              stateName: this.stateName,
              userId: this.userId,
              userTypeId: this.userTypeId,
              partialunlock: this.common.stateRequestUnlock,
              stateCode: this.stateCode
            }
            this.common.partialUnlock(data).subscribe(res => {
              if (res) {
                this.notification.showSuccessMessage('Your Request to unlock the partially filled State Profile is forwarded to NPD.')
              }
            })
          }
        }
      }
       }, err => {
      console.error('Error fetching page status:', err);
    })

  }
  viewDetails() {
    if (this.id === this.sharedService.meruComponentId || this.id === this.sharedService.universityComponentId || this.id === this.sharedService.collegeComponentId) {
      sessionStorage.setItem('stateCodeP', this.stateCode);
      sessionStorage.setItem('aisheCode', this.aisheCode);
      this.insType = this.aisheCode.split(/[\W\d]+/).join("");
      sessionStorage.setItem('instituteCategory', this.insType);
      sessionStorage.setItem('componentIdV', this.id);
      this.router.navigate([this.routers.viewCollege])
    } if (this.id === this.sharedService.genderComponentId) {
      sessionStorage.setItem('districtCodeGender', this.districtCode);
      this.router.navigate([this.routers.viewGenderEquity])
    } if (this.id === this.sharedService.nmdcComponentId) {
      sessionStorage.setItem('districtCodeGender', this.districtCode);
      sessionStorage.setItem('stateCodeP', this.stateCode);
      this.router.navigate([this.routers.viewNmdc])
    }
  }

  unlock(unlockId) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '25%',
      data: {
        message: 'Are you sure you want to unlock this page ?',

      }
    }).afterClosed().subscribe(res => {
      if (res == true) {
        let commonObj = this.common.newObj
        let filterObjt = Object.entries(commonObj).filter(([key]) => key === unlockId)
        let filterObjValue = filterObjt[0][1]
        let characters = this.aisheCode.split(/[\W\d]+/).join("");
        let temp = {
          aisheCode: this.aisheCode,
          componentId: this.id,
          constant: unlockId,
          districtCode: sessionStorage.getItem("districtCode"),
          instituteCategory: characters,
          stateCode: this.stateCode,
          status: false


        }
        this.api.postProposalRevisionLock(temp).subscribe((res) => {
          if (res.status === 200) {
            this.notification.showSuccessMessage(`${filterObjValue} has been unlocked successfully!!!`);
            this.revPageData();
          }
        });
      }
      else {
        return
      }

    })
    // let result = confirm("Are you sure you want to unlock this page ?");



  }
  unlockEquity(unlockId) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '25%',
      data: {
        message: 'Are you sure you want to unlock this page ?',

      }
    }).afterClosed().subscribe(res => {
      if (res == true) {
        let commonObj = this.common.newObj
        let filterObjt = Object.entries(commonObj).filter(([key]) => key === unlockId)
        let filterObjValue = filterObjt[0][1]
        let temp = {
          aisheCode: this.aisheCode,
          componentId: this.id,
          constant: unlockId,
          districtCode: sessionStorage.getItem("districtCode"),
          stateCode: this.stateCode,
          status: false


        }
        this.api.postProposalRevisionLock(temp).subscribe((res) => {
          if (res.status === 200) {
            this.notification.showSuccessMessage(`${filterObjValue} has been unlocked successfully!!!`);
            this.revPageData();
          }
        });
      }
      else {
        return
      }

    })
    // let result = confirm("Are you sure you want to unlock this page ?");



  }
}
