import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/dialog/confirm-dialog/confirm-dialog.component';
import { routes } from 'src/app/routes';
import { ApiService } from 'src/app/service/api.service';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { Common } from 'src/app/shared/common';
import { SharedService } from 'src/app/shared/shared.service';
import { CollegeService } from '../../dpr/strength-college/service/college.service';
import { map, tap } from 'rxjs/operators';
import { EncryptDecrypt } from 'src/app/utility/encrypt-decrypt';

@Component({
  selector: 'cfs-status-version3',
  templateUrl: './status-version3.component.html',
  styleUrls: ['./status-version3.component.scss']
})
export class StatusVersion3Component implements OnInit {
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
  districtName: string;
  stateName: string;
  showPartial: boolean
  paramId: number;
  heading1 = "Revised Proposal Submission Status"
  FinalLockKey: any;
  isFinalDisabled: boolean = false;
  revComponentId: any;
  instituteCategory: string;
  infraConstructionList: Array<any> = [];
  oldIdArrFilter:any = []
  updateIdArrFilter:any = []
  deleteFilterArr:any = []
  newFilterArr:any = []
  newArray:any = [];
  totalArr:any = []
  existingRecordFilter:any = []
  item1FilterArray:any = []
  itemList: Array<any> = []
  renovatedList: Array<any> = [];
  equipmentList: Array<any> = [];
  softComponentList: Array<any> = [];
  proposedArea: number = 0;
  perUnitCost: number = 0;
  totalCost: number = 0;
  quantity: number = 0;
  targetNumber: any;
  statusId: any;
  FinalLockKey1: boolean;
  finalSubmissionDate: void;
  revComponentIdV3: number;
  justificationText: string = '';
  v3Justification: any;
  workshopDataList: any[];
  remedialClassesList: any[];
  dataListVocational: any[];
  dataActivitiesList: any[];
  constructor(public api: ApiService, public common: Common, public notification: NotificationService, public router: Router,
    public route: ActivatedRoute, public sharedService: SharedService, public getService: GetService, public post: PostService, public dialog: MatDialog, public auth: CollegeService, private encrypt: EncryptDecrypt) {
    this.paramId = Number(this.route.snapshot.paramMap.get('revId'));
    this.aisheCode = sessionStorage.getItem('userName')
    this.stateCode = sessionStorage.getItem('stateCode')
    this.districtCode = sessionStorage.getItem('districtCode');
    
    this.userTypeId = sessionStorage.getItem('userTypeId');
    this.instituteName = sessionStorage.getItem('insName');
    this.districtName = sessionStorage.getItem('districtName');
    this.stateName = sessionStorage.getItem('stateName');
    this.insType = this.aisheCode.split(/[\W\d]+/).join("");
    this.revComponentIdV3 = Number(this.route.snapshot.paramMap.get('id'));
    if (this.paramId === this.sharedService.revPrposalV3) {
      this.id = parseInt(this.route.snapshot.paramMap.get('id'));
      this.revPageData();
      this.getScoreList();
      this.getPropsalStatus()


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
    if (this.insType === 'C') {
      this.instituteCategory = 'COLLEGE'
    } else {
      this.instituteCategory = 'UNIVERSITY'
    }

  }

  ngOnInit(): void {
    this.getPartialPage();
    if (this.revComponentIdV3 === this.sharedService.genderComponentId) {
      this.loadAllMeruData1()
    }
    else {
      this.loadAllMeruData()
    }

  }
  resetPage() {
    this.finalSubmit = true
    this.dateFinalSubmission = ''
    this.undertaking = false
  }

   getPropsalStatus() {
    const encryptedAishe = this.aisheCode ? this.encrypt.getEncryptedValue(this.aisheCode) : '';
    let payload = {
      aisheCode: encryptedAishe
    }
    this.getService.getfinalSubmitProposal(payload).subscribe(res => {
        if (res.data.length && res.data) {
          const StatusFilter = res.data.filter(e=> (e.isEligibleForV3 && this.revComponentIdV3 === e.componentId));
          this.statusId = StatusFilter[0]?.id;
          this.FinalLockKey1 = StatusFilter[0].isV3Locked ? true : false
          this.finalSubmissionDate = StatusFilter[0]?.v3LockedOnString
          this.v3Justification = StatusFilter[0]?.v3Justification ? true : false;
          this.justificationText = StatusFilter[0]?.v3Justification
        }
      },
      (err) => {}
    );
    //   this.progressMonitoring = res[0]
    // })
  }
  getScoreList() {
    if (this.paramId === this.sharedService.revPrposalV3) {
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

  downloadPdfAisheCode1() {
    if (this.id === this.sharedService.genderComponentId || this.id === this.sharedService.nmdcComponentId) {
      let payload = {
      componentId: this.id,
      exportType: 'PDF',
      // aisheCode: this.aisheCode,
      districtCode: (this.id === this.sharedService.genderComponentId || this.id === this.sharedService.nmdcComponentId) ? this.districtCode : '',
      // revisedProposal: true
    }
    this.getService.downloadByAisheCodeReRevisionEquity(payload).subscribe(res => {
      if (res) {
        this.common.viewPdf(res.byteData, res.name)

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
    }
    else {
    let payload = {
      componentId: this.id,
      exportType: 'PDF',
      aisheCode: this.aisheCode,
      // districtCode: (this.id === this.sharedService.genderComponentId || this.id === this.sharedService.nmdcComponentId) ? this.districtCode : '',
      // revisedProposal: true
    }
    this.getService.downloadByAisheCodeReRevision(payload).subscribe(res => {
      if (res) {
        this.common.viewPdf(res.byteData, res.name)

      }
       }, err => {
      console.error('Error fetching page status:', err);
    })
    }
    
    
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
getInfraCons$() {
  return this.api.getInfraCnstructionRevision(
    this.aisheCode,
    this.instituteCategory,
    this.revComponentIdV3,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.infraConstructionList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.infraConstructionList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))

      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

      // this.proposedArea = this.totalArr.reduce((sum, item) => sum + Number(item.proposedArea), 0);
      // this.perUnitCost = this.totalArr.reduce((sum, item) => sum + Number(item.perUnitCost), 0);
      const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      // this.totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      return { schemeName: 'Infrastructure Construction', totalCost };
    })
  );
  }

  getInfraCons1$() {
  return this.api.getInfraCnstructionRevisionV3(
    this.revComponentIdV3,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.infraConstructionList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.infraConstructionList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.infraConstructionList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))

      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

      // this.proposedArea = this.totalArr.reduce((sum, item) => sum + Number(item.proposedArea), 0);
      // this.perUnitCost = this.totalArr.reduce((sum, item) => sum + Number(item.perUnitCost), 0);
      const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      // this.totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      return { schemeName: 'Infrastructure Construction', totalCost };
    })
  );
  }

getRenovated$() {
  return this.api.getRenovatedListRevision(
    this.aisheCode,
    this.instituteCategory,
    this.revComponentIdV3,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.renovatedList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.renovatedList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.renovatedList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

      // this.proposedArea = this.totalArr.reduce((sum, item) => sum + Number(item.proposedArea), 0);
      // this.perUnitCost = this.totalArr.reduce((sum, item) => sum + Number(item.perUnitCost), 0);
      const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      // this.totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      return { schemeName: 'Infrastructure Renovation', totalCost };
    })
  );
  }

  getRenovated1$() {
  return this.api.getRenovatedListRevisionV3(
    this.revComponentIdV3,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.renovatedList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.renovatedList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.renovatedList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

      // this.proposedArea = this.totalArr.reduce((sum, item) => sum + Number(item.proposedArea), 0);
      // this.perUnitCost = this.totalArr.reduce((sum, item) => sum + Number(item.perUnitCost), 0);
      const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      // this.totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
      return { schemeName: 'Infrastructure Renovation', totalCost };
    })
  );
  }

getEquipment$() {
  return this.api.getEquipmentListRevision(
    this.aisheCode,
    this.instituteCategory,
    this.revComponentIdV3,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.equipmentList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.equipmentList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    //  this.quantity = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //   );
    //  this.perUnitCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //   );
    //  this.totalCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //  );
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Equipment', totalCost };
    })
  );
  }

  getEquipment1$() {
  return this.api.getEquipmentListRevisionV3(
    this.revComponentIdV3,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.equipmentList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.equipmentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.equipmentList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    //  this.quantity = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //   );
    //  this.perUnitCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //   );
    //  this.totalCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //  );
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Equipment', totalCost };
    })
  );
  }

getSoftCompoenent$() {
  return this.auth.getSoftCompoenentListRevision(
    this.aisheCode,
    this.revComponentIdV3,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.softComponentList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.softComponentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.softComponentList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))
      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

      // this.quantity = this.totalArr.reduce(
      //    (sum, item) => sum + Number(item.unit),
      //       0
      // );
      // this.perUnitCost = this.totalArr.reduce(
      //    (sum, item) => sum + Number(item.costPerUnit),
      //       0
      // );
      // this.totalCost = this.totalArr.reduce(
      //    (sum, item) => sum + Number(item.totalCost),
      //       0
      // );
      // this.targetNumber = this.totalArr.reduce(
      //    (sum, item) => sum + Number(item.targetNumberOfBeneficiary),
      //       0
      // );

      const totalCost = this.totalArr.reduce(
         (sum, item) => sum + Number(item.totalCost),
            0
      );
      return { schemeName: 'Soft Component', totalCost };
    })
  );
  }

  getWorkshop1$() {
  return this.api.getWorkshopListRevisionV3(
    this.revComponentIdV3,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.workshopDataList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.workshopDataList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.workshopDataList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    //  this.quantity = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //   );
    //  this.perUnitCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //   );
    //  this.totalCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //  );
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Workshop Programme', totalCost };
    })
  );
  }

  getRemidalClass1$() {
  return this.api.getRemidalClassRevisionV3(
    this.revComponentIdV3,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.remedialClassesList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.remedialClassesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.remedialClassesList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    //  this.quantity = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //   );
    //  this.perUnitCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //   );
    //  this.totalCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //  );
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Remedial Class', totalCost };
    })
  );
  }

  getVocational1$() {
  return this.api.getVocationalRevisionV3(
    this.revComponentIdV3,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.dataListVocational = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.dataListVocational = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.dataListVocational.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    //  this.quantity = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //   );
    //  this.perUnitCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //   );
    //  this.totalCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //  );
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Vocational', totalCost };
    })
  );
  }
  getActivity1$() {
  return this.api.getActivityRevisionV3(
    this.revComponentIdV3,
    this.districtCode,
    this.sharedService.pabStatus
  ).pipe(
    map((res) => {
      this.dataActivitiesList = [];
      this.newArray = [];
      this.deleteFilterArr = res.data.filter(item => item.rsV3?.id === 2)
      this.updateIdArrFilter = res.data.filter(item => item.v3 == true && item.rsV3?.id === 3)
      this.item1FilterArray = [...this.updateIdArrFilter, this.existingRecordFilter]
      this.existingRecordFilter = res.data.filter(item => (item.v2 == true && item.v3 == null))
      this.newFilterArr = res.data.filter(item => item.v3 == true && item.rsV3?.id === 1)
      this.oldIdArrFilter = res.data.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
      this.updateIdArrFilter.forEach(item1 => {
        this.oldIdArrFilter.forEach(item2 => {
            if (item1.oldIdV3 === item2.id) {
                this.newArray.push(item2, item1);
            }
        });
      });
      this.newArray = this.newArray.length == 0 ? this.updateIdArrFilter : this.newArray
      this.dataActivitiesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.newArray, ...this.deleteFilterArr];
      this.totalArr = this.dataActivitiesList.filter(item => (item.v2 == true && item.rsV3 === null) || (item.v3 == true && item.rsV3 !== null))


      this.itemList = res.data.map(ele => ({
        id: ele.id,
        name: ele.description
      }));

    //  this.quantity = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.quantity),
    //         0
    //   );
    //  this.perUnitCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.perUnitCost),
    //         0
    //   );
    //  this.totalCost = this.totalArr.reduce(
    //         (sum, item) => sum + Number(item.totalCost),
    //         0
    //  );
    const totalCost = this.totalArr.reduce((sum, item) => sum + Number(item.totalCost), 0);
    return { schemeName: 'Activities', totalCost };
    })
  );
  }

  loadAllMeruData() {
    forkJoin([
      this.getInfraCons$(),
      this.getRenovated$(),
      this.getEquipment$(),
      this.getSoftCompoenent$()
    ]).subscribe({
       next: (res) => {
      this.costList = res; // [{schemeName, totalCost}, ...]
      this.totalCost = this.costList.reduce((sum, item) => sum + item.totalCost, 0);
    },
    error: (err) => {
      console.error('Error fetching cost data:', err);
    }
  });
  }
  loadAllMeruData1() {
    forkJoin([
      this.getInfraCons1$(),
      this.getRenovated1$(),
      this.getEquipment1$(),
      this.getWorkshop1$(),
      this.getRemidalClass1$(),
      this.getVocational1$(),
      this.getActivity1$()
    ]).subscribe({
       next: (res) => {
      this.costList = res; // [{schemeName, totalCost}, ...]
      this.totalCost = this.costList.reduce((sum, item) => sum + item.totalCost, 0);
    },
    error: (err) => {
      console.error('Error fetching cost data:', err);
    }
  });
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
      this.heading = 'Re-Revised Proposal Submission Status'
      this.finalPage = this.common.strengthClg
    } if (this.id === this.sharedService.universityComponentId) {
      this.pageStatusList = this.common.RevisionMenu.filter(ele => ele.module === this.common.module['2']);
      this.getPageStatusListRevision(this.id);
      this.heading = 'Re-Revised Proposal Submission Status'
      this.finalPage = this.common.strengthUnivFinal
    } if (this.id === this.sharedService.meruComponentId) {
      this.pageStatusList = this.common.RevisionMenu.filter(ele => ele.module === this.common.module['3']);
      this.getPageStatusListRevision(this.id);
      this.heading = 'Re-Revised Proposal Submission Status'
      this.finalPage = this.common.meruFinalSubmit
    }
    if (this.id === this.sharedService.genderComponentId) {
      this.pageStatusList = this.common.RevisionMenu.filter(ele => ele.module === this.common.module['4']);
      this.getPageStatusListRevision(this.id);
      this.heading = 'Re-Revised Proposal Submission Status'
      this.finalPage = this.common.genderEquityFinalSubmit
    }
    if (this.id === this.sharedService.nmdcComponentId) {
      this.pageStatusList = this.common.RevisionMenu.filter(ele => ele.module === this.common.module['5']);
      this.getPageStatusListRevision(this.id);
      this.heading = 'Re-Revised Proposal Submission Status'
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
 finalSubmissionRevision(finallockValue: string) {
    let MaxAmount = 0;

    // ✅ Set MaxAmount based on revComponentIdV3
    if (this.revComponentIdV3 === 1) {
      MaxAmount = 1000000000; // 100 Cr
    } else if (this.revComponentIdV3 === 2) {
      MaxAmount = 200000000; // 20 Cr
    } else if (this.revComponentIdV3 === 3) {
      MaxAmount = 50000000; // 5 Cr
    }

 

    // ✅ Validate cost
    if (this.totalCost > MaxAmount && MaxAmount > 0) {
      this.notification.showValidationMessage(
        `Revised cost of proposal is ₹${this.totalCost.toLocaleString()} which is greater than the approved proposal value ₹${MaxAmount.toLocaleString()}`
      );
      return;
    }

    // ✅ Validate justification
    if (!this.justificationText || this.justificationText.trim() === '') {
      this.notification.showValidationMessage('Justification is required to proceed!');
      return;
    }

    // ✅ Validate undertaking checkbox
    if (!this.undertaking) {
      this.notification.showValidationMessage('Please select undertaking!');
      return;
    }
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            width: '25%',
            data: {
              message: 'Are you sure all data are correct?',
            }
  })
      
  dialogRef.afterClosed().subscribe(res =>{
    if(res){
      const payload = [
      {
        id: this.statusId ? this.statusId : 0,
        isV3Locked: true,
        revisedProposalV3Cost: this.totalCost,
        v3Justification: this.justificationText.trim(),
      },
    ];

    this.api.postFinalProposelV3(payload, '2').subscribe(
      (res) => {
        if (res.status === 200) {
          this.notification.showSuccessMessage("Your submission has been successful!");
          this.getPropsalStatus();
        }
      },
      (err) => {
        console.error(err);
      }
    );
    }});
    
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

          if (this.paramId === this.sharedService.revPrposalV3) {
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
