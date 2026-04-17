import { Component, Input, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GetService } from 'src/app/service/get.service';
import { NotificationService } from 'src/app/service/notification.service';
import { PostService } from 'src/app/service/post.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'cfs-proposal-selection',
  templateUrl: './proposal-selection.component.html',
  styleUrls: ['./proposal-selection.component.scss']
})
export class ProposalSelectionComponent implements OnInit, OnChanges, OnDestroy {
  rusaPhase: any = [];
  finalSubmit: boolean = false;
  arr: any = []
  rusa: any;
  checkbox1: boolean = false;
  fundForm: FormGroup;
  isFormInvalid: boolean;
  @Input() item: any;
  @Input() passStateCode: any;
  @Input() indexId: any;
  //stateCode: any;
  arrFilter: any = [];
  userNPD: any;
  private destroy$ = new Subject<void>();
  constructor(public sharedService: SharedService, public getService: GetService, public fb: FormBuilder, public notification: NotificationService, public postService: PostService) {
    this.userNPD = sessionStorage.getItem('userTypeId');

    // this.stateCode = this.passStateCode;

    this.rusaPhase = [
      { rusa: 'RUSA 1.0', rusaData: [], display: false },
      { rusa: 'RUSA 2.0', rusaData: [], display: false },
      { rusa: 'PM-USHA', rusaData: [], display: false },
    ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.passStateCode = changes.passStateCode.currentValue;
    this.indexId = changes.indexId.currentValue;
    this.item = changes.item.currentValue;

  }
  ngOnInit(): void {
    this.fundForm = this.fb.group({
      amountApprovedCentralShare: [{ value: '', disabled: true }],
      amountApprovedStateShare: ['3'],
      amountApprovedTotal: ['4'],
      amountDemand: [''],
      amountReleasedCentralShare: ['5'],
      amountReleasedStateShare: ['6'],
      amountReleasedTotal: ['7'],
      amountUtilisedCentralShare: ['8'],
      amountUtilisedStateShare: ['9'],
      amountUtilisedTotal: ['10'],
      checked: [true],
      componentId: [''],
      districtCode: [''],
      id: [0],
      stateCode: [''],
      stateFundRequestDetailId: [''],
    });
    if (this.indexId === 3 && this.item && this.item !== "NewDemand") {

      this.sharedService.getfundDemandDetailsData.subscribe((res) => {
        if (res) {
          this.finalSubmit = res.isFinalSubmit;
        } else {
          this.getBriefDetails();
        }
      })
      this.getFundDetails1();
    }
  }

  checkConditions() {
    if (this.indexId === 3 && this.item && this.item !== "NewDemand") {
      this.sharedService.getfundDemandDetailsData
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (res) {
            this.finalSubmit = res.isFinalSubmit;
          } else {
            this.getBriefDetails();
          }
        });
      this.getFundDetails1();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getFundDetails1() {
    let payloadDetails
    if (this?.item && this?.item !== 'NewDemand') {
      payloadDetails = {
        stateCode: this.passStateCode,
        stateFundRequestDetailId: this.item
      }
    } else {
      payloadDetails = {
        stateCode: this.passStateCode,
      }
    }
    this.getService.getFundData(payloadDetails).subscribe(
      (res) => {
        if (res && res.length) {
          if (this.finalSubmit) {
            let array1 = res.filter(e => e.phase === 'RUSA 1' && e.checked === true)
            let array2 = res.filter(e => e.phase === 'RUSA 2' && e.checked === true)
            let array3 = res.filter(e => e.phase === 'PM-USHA' && e.checked === true)
            let arr1 = array1.filter(e => e.checked == true);
            let arr2 = array2.filter(e => e.checked == true);
            let arr3 = array3.filter(e => e.checked == true);
            this.arr = [...arr1, ...arr2, ...arr3];
            let data = array1.map((re) => {
              return {
                ...re,
                'display': re.amountApprovedCentralShare === re.amountReleasedCentralShare ? true : false
              }
            })
            let data1 = array2.map((re) => {
              return {
                ...re,
                'display': re.amountApprovedCentralShare === re.amountReleasedCentralShare ? true : false
              }
            })
            let data2 = array3.map((re) => {
              return {
                ...re,
                'display': re.amountApprovedCentralShare === re.amountReleasedCentralShare ? true : false
              }
            })
            this.rusaPhase['0']['rusaData'] = [...data]
            this.rusaPhase['1']['rusaData'] = [...data1]
            this.rusaPhase['2']['rusaData'] = [...data2]
          } else {
            let array1 = res.filter(e => e.phase === 'RUSA 1')
            let array2 = res.filter(e => e.phase === 'RUSA 2')
            let array3 = res.filter(e => e.phase === 'PM-USHA')
            let arr1 = array1.filter(e => e.checked == true);
            let arr2 = array2.filter(e => e.checked == true);
            let arr3 = array3.filter(e => e.checked == true);
            this.arr = [...arr1, ...arr2, ...arr3];

            let data = array1.map((re) => {
              return {
                ...re,
                'display': re.amountApprovedCentralShare === re.amountReleasedCentralShare ? true : false
              }
            })
            let data1 = array2.map((re) => {
              return {
                ...re,
                'display': re.amountApprovedCentralShare === re.amountReleasedCentralShare ? true : false
              }
            })
            let data2 = array3.map((re) => {
              return {
                ...re,
                'display': re.amountApprovedCentralShare === re.amountReleasedCentralShare ? true : false
              }
            })
            this.rusaPhase['0']['rusaData'] = [...data]
            this.rusaPhase['1']['rusaData'] = [...data1]
            this.rusaPhase['2']['rusaData'] = [...data2]
          }

        }
      },
      (err) => { }
    );

  }

  checkBox(itemId: any, isChecked: boolean, value: any) {

    if (this.arr.length > 0 && !isChecked) {

      this.arr = this.arr.map((el: any) => {
        if (itemId === el.aisheCode && !isChecked && value.id === el.id) {
          return {
            ...el,
            aisheCode: itemId,
            amountApprovedCentralShare: value.amountApprovedCentralShare,
            amountApprovedStateShare: value.amountApprovedStateShare,
            amountApprovedTotal: value.amountApprovedTotal,
            amountDemand: 0,
            amountReleasedCentralShare: value.amountReleasedCentralShare,
            amountReleasedStateShare: value.amountReleasedStateShare,
            amountReleasedTotal: value.amountReleasedTotal,
            amountUtilisedCentralShare: value.amountUtilisedCentralShare,
            amountUtilisedStateShare: value.amountUtilisedStateShare,
            amountUtilisedTotal: value.amountUtilisedTotal,
            checked: isChecked,
            componentId: value.componentId,
            componentName: value.componentName,
            districtCode: value.districtId,
            districtName: value.districtName,
            id: value.id ? value.id : 0,
            institutionName: value.institutionName,
            phase: value.phase,
            rusaLegacyDataId: value.rusaLegacyDataId,
            stateCode: value.stateCode,
            stateFundRequestDetailId: this.item ? this.item : el?.stateFundRequestDetailId
          };
        } else {

          return el;

        }
      });

    } else {
      if (isChecked) {
        this.arr.push({
          "aisheCode": itemId,
          "amountApprovedCentralShare": value.amountApprovedCentralShare,
          "amountApprovedStateShare": value.amountApprovedStateShare,
          "amountApprovedTotal": value.amountApprovedTotal,
          "amountDemand": value.amountDemand,
          "amountReleasedCentralShare": value.amountReleasedCentralShare,
          "amountReleasedStateShare": value.amountReleasedStateShare,
          "amountReleasedTotal": value.amountReleasedTotal,
          "amountUtilisedCentralShare": value.amountUtilisedCentralShare,
          "amountUtilisedStateShare": value.amountUtilisedStateShare,
          "amountUtilisedTotal": value.amountUtilisedTotal,
          "checked": isChecked,
          "componentId": value.componentId,
          "componentName": value.componentName,
          "districtCode": value.districtId,
          "districtName": value.districtName,
          "id": value.id ? value.id : 0,
          "institutionName": value.institutionName,
          "phase": value.phase,
          "rusaLegacyDataId": value.rusaLegacyDataId,
          "stateCode": value.stateCode,
          "stateFundRequestDetailId": this.item
        })
      }
    }
  }

  saveProposal() {
    if (this.arr.length > 0) {
      this.postService.saveFundPrposel(this.arr).subscribe(res => {
        if (res.status === 200) {
          this.notification.showSuccess();
          // this.getFundDetails1();
          this.saveData()
        }
      }, err => {

      })
    }

  }
  saveData() {

    let temp = {
      stateFundBriefDetailId: this.item,
      tabId: 4
    }
    this.postService.saveIfd(temp).subscribe((res) => {
      if (res.statusCode === 200) {
        this.notification.showSuccess();
      }
    })

  }
  getBriefDetails() {
    let payloadDetails;
    if (this?.item && this?.item !== 'NewDemand') {
      payloadDetails = {
        stateCode: this.passStateCode,
        stateFundBriefDetailId: this.item
      }
    } else {
      payloadDetails = {
        stateCode: this.passStateCode,
      }
    }

    this.getService.getBriefData(payloadDetails).subscribe(
      (res) => {
        if (res) {

          this.finalSubmit = res['0'].isFinalSubmit;

        }
      },
      (err) => { }
    );
  }
}
