import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { GetService } from './get.service';
// import { PmushaService } from '../pm-usha/ipmr/service/pmusha.service';
import { EncryptDecrypt } from '../utility/encrypt-decrypt';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class GenderEquityValidationService {
  oldIdArrFilter:any = []
  updateIdArrFilter:any = []
  deleteFilterArr:any = []
  newFilterArr:any = []
  newArray:any = [];
  totalArr:any = []
  existingRecordFilter:any = []
  item1FilterArray:any = []
  isInfraConstruction: any[];
  infraconditions: any;
  getremarkData: any;
  monthList1: string[];
  proposedArea: any;
  perUnitCost: any;
  totalCost: any;
  infrsRenovationsData: any[];
  renvoconditions: any[];
  infraRenoproposedArea: any;
  infraRenoperUnitCost: any;
  infraRenototalCost: any;
  equipmentData: any[];
  equpconditions: any[];
  quantity: any;
  equipmentperUnitCost: any;
  equipmenttotalCost: any;
  workshopsData: any;
  workconditions: any[];
  proposedAreaW: any;
  perUnitCostW: any;
  totalCostW: any;
  expectedOutcome: any;
  targetNoParticipant1: any;
  remedialClassesData: any;
  remidalconditions: any[];
  proposedAreaClassReme: any;
  numberofClass: any;
  costPerClassReme: any;
  expectedOutcomeReme: any;
  targetNumberofParticipantsReme: any;
  totalCostReme: any;
  dataListVocational: any;
  vocationalconditions: any[];
  unitV: any;
  costPerUnitV: any;
  totalCostV: any;
  expectedOutcomeV: any;
  targetNoParticipantV: any;
  dataActivitiesList: any;
  proposedconditions: any[];
  unitActivity: any;
  costPerUnitActivity: any;
  totalCostActivity: any;
  targetNoBeneficiaryActivity: any;
  dataOutComeList: any[];
  uniqueDistrictCode: any;
  districtCode: string;
  outcomesData: any;
  month: any;
  year: any;
  outcomeconditions: any[];
  activityDetailData: any;
  activityconditions: any[];
  stateCode: any;
  updateProgressData: any;
  Progressconditions: any[];
  constructor(public api: ApiService,
    public getService: GetService,
    // public getpmService: PmushaService,
    private encrypt: EncryptDecrypt,
    public notification: NotificationService, public sharedService: SharedService) {
      
  this.monthList1 = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
     }

    getInfraConsval(propId: number,
    context: {
      districtCode: any,
      uniqueDistrictCode: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.api
        .getInfraConstructionGenderRevision(
          context.uniqueDistrictCode ? context.uniqueDistrictCode : context.districtCode,
          context.componentId,
          context.pabStatus
        )
        .pipe(
    
          // 🔹 STEP 1: Process Infra Data
          tap(res => {
            const infraData = res?.data || [];
    
            if (context.V3Elegibal) {
              this.updateIdArrFilter = infraData.filter(
                item => item.v3 === true && item.rsV3?.id === 3
              );
              this.existingRecordFilter = infraData.filter(
                item => item.v2 === true && item.v3 == null
              );
              this.newFilterArr = infraData.filter(
                item => item.v3 === true && item.rsV3?.id === 1
              );
              this.oldIdArrFilter = infraData.filter(
                item => item.v2 === true && item.v3 === false && item.rsV3?.id === 3
              );
    
              this.newArray = [];
              this.updateIdArrFilter.forEach(item1 => {
                this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                    this.newArray.push(item2, item1);
                  }
                });
              });
    
              this.isInfraConstruction = [
                ...this.existingRecordFilter,
                ...this.newFilterArr,
                ...this.updateIdArrFilter
              ];
            } else {
              this.isInfraConstruction = infraData.filter(
                x =>
                  (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
                  x?.recordStatus?.id === 1 ||
                  (x?.recordStatus == null && x?.activeStatus === true)
              );
            }
    
            this.isInfraConstruction = this.isInfraConstruction.map(item => ({
              ...item,
              month: context.month,
              year: context.year
            }));
    
            this.updateAggregateValues(context.V3Elegibal);
          }),
    
          // 🔹 STEP 2: Get Remarks
          switchMap(() =>
            this.getService.getRemarkListUpdate(
              propId,
              context.componentId,
              context.aisheCode,
              context.month,
              context.year
            )
          ),
    
          // 🔹 STEP 3: VALIDATION RESULT
          map(res => {
            this.getremarkData = res?.data;
            this.getMergedData(this.isInfraConstruction);
    
            this.infraconditions = [];
    
            this.isInfraConstruction?.forEach(item => {
              const isProgressMissing =
                item?.projectStatusId == null ||
                item?.projectStatusId === 0 ||
                item?.physicalProgress == null;
    
              const isMonthOrYearDifferent =
                Number(item?.previousMonth) !== Number(item?.month) ||
                Number(item?.prevYear) !== Number(item?.year);
    
              if (isProgressMissing || isMonthOrYearDifferent) {
                this.infraconditions.push(item);
              }
            });
    
            if (this.infraconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Infra Construction'!"
              );
              return true;   // ❌ validation failed
            }
    
            return false;    // ✅ validation passed
          }),
    
          // 🔹 STEP 4: ERROR SAFETY
          catchError(err => {
            console.error('Infra validation error', err);
            return of(true); // treat error as validation failure
          })
        );
    }

  updateAggregateValues(V3ElegibalVal) {
  const dataForAggregate = V3ElegibalVal
    ? this.isInfraConstruction   // ✅ V3 me sab allow
    : this.isInfraConstruction.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    // this.isInfraConstruction = this.isInfraConstruction.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    this.proposedArea = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.proposedArea),
      0
    );
    this.perUnitCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.totalCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }
    
    getRenovatedVal(propId: number,
    context: {
      districtCode: any,
      uniqueDistrictCode: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.api
        .getRenovatedListRevisionV3(
          context.componentId, context.uniqueDistrictCode ? context.uniqueDistrictCode : context.districtCode,
          context.pabStatus
        )
        .pipe(
    
          // 🔹 STEP 1: Prepare Renovation Data
          tap(res => {
            const renovatedData = res?.data || [];
    
            if (context.V3Elegibal) {
              this.updateIdArrFilter = renovatedData.filter(
                item => item.v3 === true && item.rsV3?.id === 3
              );
              this.existingRecordFilter = renovatedData.filter(
                item => item.v2 === true && item.v3 == null
              );
              this.newFilterArr = renovatedData.filter(
                item => item.v3 === true && item.rsV3?.id === 1
              );
              this.oldIdArrFilter = renovatedData.filter(
                item => item.v2 === true && item.v3 === false && item.rsV3?.id === 3
              );
    
              this.newArray = [];
              this.updateIdArrFilter.forEach(item1 => {
                this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                    this.newArray.push(item2, item1);
                  }
                });
              });
    
              this.infrsRenovationsData = [
                ...this.existingRecordFilter,
                ...this.newFilterArr,
                ...this.updateIdArrFilter
              ];
            } else {
              this.infrsRenovationsData = renovatedData.filter(
                x =>
                  (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
                  x?.recordStatus?.id === 1 ||
                  (x?.recordStatus == null && x?.activeStatus === true)
              );
            }
    
            this.infrsRenovationsData = this.infrsRenovationsData.map(item => ({
              ...item,
              month: context.month,
              year: context.year
            }));
    
            this.updaterenvoValues(context.V3Elegibal);
          }),
    
          // 🔹 STEP 2: Get Remarks
          switchMap(() =>
            this.getService.getRemarkListUpdate(
              propId,
              context.componentId,
              context.aisheCode,
              context.month,
              context.year
            )
          ),
    
          // 🔹 STEP 3: VALIDATION CHECK
          map(res => {
            this.getremarkData = res?.data;
            this.getMergedData(this.infrsRenovationsData);
    
            this.renvoconditions = [];
    
            this.infrsRenovationsData?.forEach(item => {
              const isProgressMissing =
                item?.projectStatusId == null ||
                item?.projectStatusId === 0 ||
                item?.physicalProgress == null;
    
              const isMonthOrYearDifferent =
                Number(item?.previousMonth) !== Number(item?.month) ||
                Number(item?.prevYear) !== Number(item?.year);
    
              if (isProgressMissing || isMonthOrYearDifferent) {
                this.renvoconditions.push(item);
              }
            });
    
            if (this.renvoconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Infra Renovation'!"
              );
              return true;   // ❌ validation failed
            }
    
            return false;    // ✅ validation passed
          }),
    
          // 🔹 STEP 4: Error Handling
          catchError(err => {
            console.error('Renovation validation error', err);
            return of(true); // treat API error as validation failure
          })
        );
    }

     updaterenvoValues(V3ElegibalVal) {
    const dataForAggregate = V3ElegibalVal
    ? this.infrsRenovationsData   // ✅ V3 me sab allow
    : this.infrsRenovationsData.filter(x =>
        ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
        )
      );
    // this.infrsRenovationsData = this.infrsRenovationsData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    this.infraRenoproposedArea = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.proposedArea),
      0
    );
    this.infraRenoperUnitCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.infraRenototalCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }
    
    getEquipmentVal(propId: number,
    context: {
      districtCode: any,
      uniqueDistrictCode: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.api
        .getEquipmentListRevisionV3(
          context.componentId, context.uniqueDistrictCode ? context.uniqueDistrictCode : context.districtCode,
          context.pabStatus
        )
        .pipe(
    
          // 🔹 STEP 1: Prepare Equipment Data
          tap(res => {
            const equipmentData = res?.data || [];
    
            if (context.V3Elegibal) {
              this.updateIdArrFilter = equipmentData.filter(
                item => item.v3 === true && item.rsV3?.id === 3
              );
              this.existingRecordFilter = equipmentData.filter(
                item => item.v2 === true && item.v3 == null
              );
              this.newFilterArr = equipmentData.filter(
                item => item.v3 === true && item.rsV3?.id === 1
              );
              this.oldIdArrFilter = equipmentData.filter(
                item => item.v2 === true && item.v3 === false && item.rsV3?.id === 3
              );
    
              this.newArray = [];
              this.updateIdArrFilter.forEach(item1 => {
                this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                    this.newArray.push(item2, item1);
                  }
                });
              });
    
              this.equipmentData = [
                ...this.existingRecordFilter,
                ...this.newFilterArr,
                ...this.updateIdArrFilter
              ];
            } else {
              this.equipmentData = equipmentData.filter(
                x =>
                  (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
                  x?.recordStatus?.id === 1 ||
                  (x?.recordStatus == null && x?.activeStatus === true)
              );
            }
    
            this.equipmentData = this.equipmentData.map(item => ({
              ...item,
              month: context.month,
              year: context.year
            }));
    
            this.updateEquiValues(context.V3Elegibal);
          }),
    
          // 🔹 STEP 2: Get Remarks
          switchMap(() =>
            this.getService.getRemarkListUpdate(
              propId,
              context.componentId,
              context.aisheCode,
              context.month,
              context.year
            )
          ),
    
          // 🔹 STEP 3: VALIDATION
          map(res => {
            this.getremarkData = res?.data;
            this.getMergedData(this.equipmentData);
    
            this.equpconditions = [];
    
            this.equipmentData?.forEach(item => {
              const isProgressMissing =
                item?.projectStatusId == null ||
                item?.projectStatusId === 0;
    
              const isMonthOrYearDifferent =
                Number(item?.previousMonth) !== Number(item?.month) ||
                Number(item?.prevYear) !== Number(item?.year);
    
              if (isProgressMissing || isMonthOrYearDifferent) {
                this.equpconditions.push(item);
              }
            });
    
            if (this.equpconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Equipment Procured'!"
              );
              return true;   // ❌ validation failed
            }
    
            return false;    // ✅ validation passed
          }),
    
          // 🔹 STEP 4: Error Handling
          catchError(err => {
            console.error('Equipment validation error', err);
            return of(true); // treat API error as validation failure
          })
        );
    }

  updateEquiValues(V3ElegibalVal) {
    const dataForAggregate = V3ElegibalVal
    ? this.equipmentData   // ✅ V3 me sab allow
    : this.equipmentData.filter(x =>
        ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
        )
      );
    // this.equipmentData = this.equipmentData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    this.quantity = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );
    this.equipmentperUnitCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.equipmenttotalCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }
    
    getWorkshop1Val(propId: number,
    context: {
      districtCode: any,
      uniqueDistrictCode: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.api
        .getWorkshopGenderEquityRevision(
          context.uniqueDistrictCode ? context.uniqueDistrictCode : context.districtCode,
          context.componentId,
          context.pabStatus
        )
        .pipe(
    
          // 🔹 STEP 1: Prepare Workshop Data
          tap(res => {
            const workshopsData = res?.data || [];
          // this.workshopsData = res?.data || [];
          if (context.V3Elegibal) {
            this.updateIdArrFilter = workshopsData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = workshopsData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = workshopsData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = workshopsData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.workshopsData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
          this.workshopsData = workshopsData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true))
          }
           this.workshopsData = this.workshopsData.map(item => ({
               ...item,
                month: context.month,
                year: context.year
            }));
            // this.workshopsData = this.workshopsData.map(item => {
            //   item.month = context.month; // Months are zero-based, so add 1
            //   item.year = this.year;
            //   return item;
            // });
          this.updateWorkValues(context.V3Elegibal);
          // this.updateWorkValues();
        }),
    
          // 🔹 STEP 2: Get Remarks
          switchMap(() =>
            this.getService.getRemarkListUpdate(
              propId,
              context.componentId,
              context.aisheCode,
              context.month,
              context.year
            )
          ),
    
          // 🔹 STEP 3: VALIDATION
          map(res => {
            this.getremarkData = res?.data;
    
            // this.workshopsData = this.workshopsData.filter(
            //   x =>
            //     (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            //     x?.recordStatus?.id === 1 ||
            //     (x?.recordStatus == null && x?.activeStatus === true)
            // );
    
            this.getMergedData(this.workshopsData);
    
            this.workconditions = [];
            this.workshopsData?.forEach(item => {
              const isMonthOrYearDifferent =
                Number(item?.previousMonth) !== Number(item?.month) ||
                Number(item?.prevYear) !== Number(item?.year);
    
              const isStatusMissing =
                item?.projectStatusId == null ||
                item?.projectStatusId === 0;
              if (isStatusMissing || isMonthOrYearDifferent) {
                this.workconditions.push(item);
              }
            });
            if (this.workconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Workshop Programme'!"
              );
              return true;   // ❌ validation failed
            }
    
            return false;    // ✅ validation passed
          }),
    
          // 🔹 STEP 4: Error Handling
          catchError(err => {
            console.error('Workshop validation error', err);
            return of(true); // treat API error as validation failure
          })
        );
    }

  updateWorkValues(v3Eligible) {
    const dataForAggregate = v3Eligible
    ? this.workshopsData   // ✅ V3 me sab allow
    : this.workshopsData.filter(x =>
        ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
        )
      );
    // this.workshopsData = this.workshopsData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    this.proposedAreaW = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.noWorkshop),
      0
    );
    this.perUnitCostW = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.costPerWorkshop),
      0
    );
    this.totalCostW = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    this.expectedOutcome = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.targetNoParticipant1 = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.targetNoParticipant),
      0
    );
  }
    
    getRemedialDataVal(propId: number,
    context: {
      districtCode: any,
      uniqueDistrictCode: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.api
        .getRemedialClasssGenderEquityRevision(
          context.uniqueDistrictCode ? context.uniqueDistrictCode : context.districtCode,
          context.componentId,
          context.pabStatus
        )
        .pipe(
    
          // 🔹 STEP 1: Prepare Remedial Data
          tap(res => {
            const remedialClassesData = res?.data || [];
          // this.remedialClassesData = res.data || [];
        if (context.V3Elegibal) {
           this.updateIdArrFilter = remedialClassesData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = remedialClassesData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = remedialClassesData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = remedialClassesData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.remedialClassesData = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
        }
        else {
          this.remedialClassesData = remedialClassesData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true));
        }
         this.remedialClassesData = this.remedialClassesData.map(item => ({
               ...item,
                month: context.month,
                year: context.year
            }));
          // if (this.remedialClassesData) {
          //   this.remedialClassesData = res.data.map(item => {
          //     item.month = context.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          this.updateClassValues(context.V3Elegibal);
        }),
          switchMap(() =>
            this.getService.getRemarkListUpdate(
              propId,
              context.componentId,
              context.aisheCode,
              context.month,
              context.year
            )
          ),
    
          // 🔹 STEP 3: VALIDATION
          map(res => {
            this.getremarkData = res?.data;
    
            // this.remedialClassesData = this.remedialClassesData.filter(
            //   x =>
            //     (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            //     x?.recordStatus?.id === 1 ||
            //     (x?.recordStatus == null && x?.activeStatus === true)
            // );
    
            this.getMergedData(this.remedialClassesData);
    
            this.remidalconditions = [];
    
            this.remedialClassesData?.forEach(item => {
              const isMonthOrYearDifferent =
                Number(item?.previousMonth) !== Number(item?.month) ||
                Number(item?.prevYear) !== Number(item?.year);
    
              const isStatusMissing =
                item?.projectStatusId == null ||
                item?.projectStatusId === 0;
    
              if (isStatusMissing || isMonthOrYearDifferent) {
                this.remidalconditions.push(item);
              }
            });
    
            if (this.remidalconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Remedial Class'!"
              );
              return true;   // ❌ validation failed
            }
    
            return false;    // ✅ validation passed
          }),
    
          // 🔹 STEP 4: Error Handling
          catchError(err => {
            console.error('Remedial validation error', err);
            return of(true); // treat API error as validation failure
          })
        );
    }

    updateClassValues(v3Eligible) {
     const dataForAggregate = v3Eligible
    ? this.remedialClassesData   // ✅ V3 me sab allow
    : this.remedialClassesData.filter(x =>
        ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
        )
      );
    // this.remedialClassesData = this.remedialClassesData.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
    this.proposedAreaClassReme = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.noWorkshop),
      0
    );
    this.numberofClass = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.noOfClasses),
      0
    );
    this.costPerClassReme = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.costPerClass),
      0
    );
    this.expectedOutcomeReme = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.expectedOutcome),
      0
    );
    this.targetNumberofParticipantsReme = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.targetNoParticipant),
      0
    );
    this.totalCostReme = dataForAggregate.reduce((sum, item) => sum + Number(item.totalCost), 0); 
  }
    
    getVocationalVal(propId: number,
    context: {
      districtCode: any,
      uniqueDistrictCode: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.api
        .getVocationalDataGenderEquityRevision(
          context.uniqueDistrictCode ? context.uniqueDistrictCode : context.districtCode,
          context.componentId,
          context.pabStatus
        )
        .pipe(
    
          // 🔹 STEP 1: Prepare Vocational Data
          tap(res => {
           const dataListVocational = res?.data || [];
           if (context.V3Elegibal) {
            this.updateIdArrFilter = dataListVocational.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = dataListVocational.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = dataListVocational.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = dataListVocational.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.dataListVocational = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
        }
        else {
          this.dataListVocational = dataListVocational.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true))
        }
           this.dataListVocational = this.dataListVocational.map(item => ({
               ...item,
                month: context.month,
                year: context.year
            }));
          // if (this.dataListVocational) {
          //   this.dataListVocational = res.data.map(item => {
          //     item.month = context.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          this.updateVocationalValues(context.V3Elegibal);
        }),
    
          // 🔹 STEP 2: Get Remarks
          switchMap(() =>
            this.getService.getRemarkListUpdate(
              propId,
              context.componentId,
              context.aisheCode,
              context.month,
              context.year
            )
          ),
    
          // 🔹 STEP 3: VALIDATION
          map(res => {
            this.getremarkData = res?.data;
    
            this.dataListVocational = this.dataListVocational.filter(
              x =>
                (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
                x?.recordStatus?.id === 1 ||
                (x?.recordStatus == null && x?.activeStatus === true)
            );
    
            this.getMergedData(this.dataListVocational);
    
            this.vocationalconditions = [];
             this.dataListVocational?.forEach((item,i)=>{
              const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
                if(item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0 && item?.physicalProgress === null || item?.physicalProgress === undefined || isMonthOrYearDifferent){

                  this.vocationalconditions.push(item);

                }
              })
    
            if (this.vocationalconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Vocational'!"
              );
              return true;   // ❌ validation failed
            }
    
            return false;    // ✅ validation passed
          }),
    
          // 🔹 STEP 4: Error Handling
          catchError(err => {
            console.error('Vocational validation error', err);
            return of(true); // treat API error as validation failure
          })
        );
    }

      updateVocationalValues(v3Eligble) {
      const dataForAggregate = v3Eligble
      ? this.dataListVocational   // ✅ V3 me sab allow
      : this.dataListVocational.filter(x =>
          ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
              x?.recordStatus?.id === 1 ||
              (x?.recordStatus === null && x?.activeStatus === true)
          )
        );
      // this.dataListVocational = this.dataListVocational.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
      this.unitV = dataForAggregate.reduce(
        (sum, item) => sum + Number(item.unit),
        0
      );
      this.costPerUnitV = dataForAggregate.reduce(
        (sum, item) => sum + Number(item.costPerUnit),
        0
      );
      this.totalCostV = dataForAggregate.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
      this.expectedOutcomeV = dataForAggregate.reduce(
        (sum, item) => sum + Number(item.expectedOutcome),
        0
      );
      this.targetNoParticipantV = dataForAggregate.reduce(
        (sum, item) => sum + Number(item.targetNoParticipant),
        0
      );
  }
    
    getProposalEquityVal(propId: number,
    context: {
      districtCode: any,
      uniqueDistrictCode: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.api
        .getActivitiesGenderEquityRevision(
          context.uniqueDistrictCode ? context.uniqueDistrictCode : context.districtCode,
          context.componentId,
          context.pabStatus
        )
        .pipe(
    
          // 🔹 STEP 1: Prepare Activities Data
          tap(res => {
             const dataActivitiesList = res?.data || [];
          if (context.V3Elegibal) {
           this.updateIdArrFilter = dataActivitiesList.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = dataActivitiesList.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = dataActivitiesList.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = dataActivitiesList.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.dataActivitiesList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
        }
        else {
          this.dataActivitiesList = dataActivitiesList.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true))
        }
        
            this.dataActivitiesList = this.dataActivitiesList.map(item => ({
               ...item,
                month: context.month,
                year: context.year
            }));
          // if (this.dataActivitiesList) {
          //   this.dataActivitiesList = res.data.map(item => {
          //     item.month = context.month; // Months are zero-based, so add 1
          //     item.year = this.year;
          //     return item;
          //   });
          // }
          this.updateProposedValues(context.V3Elegibal);
        }),
          // 🔹 STEP 2: Get Remarks
          switchMap(() =>
            this.getService.getRemarkListUpdate(
              propId,
              context.componentId,
              context.aisheCode,
              context.month,
              context.year
            )
          ),
    
          // 🔹 STEP 3: VALIDATION
          map(res => {
            this.getremarkData = res?.data;
    
            this.dataActivitiesList = this.dataActivitiesList.filter(
              x =>
                (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
                x?.recordStatus?.id === 1 ||
                (x?.recordStatus == null && x?.activeStatus === true)
            );
    
            this.getMergedData(this.dataActivitiesList);
    
            this.proposedconditions = [];
            this.dataActivitiesList?.forEach(item => {
              const isMonthOrYearDifferent = Number(item?.previousMonth) !== Number(item?.month) || Number(item?.prevYear) !== Number(item?.year);
                if(item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0 && item?.physicalProgress === null || item?.physicalProgress === undefined || isMonthOrYearDifferent){
    
                  this.proposedconditions
                  .push(item);
    
                }
            });
    
            if (this.proposedconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Proposed Activities'!"
              );
              return true;   // ❌ validation failed
            }
    
            return false;    // ✅ validation passed
          }),
    
          // 🔹 STEP 4: Error Handling
          catchError(err => {
            console.error('Proposal Equity validation error', err);
            return of(true); // fail-safe: stop lock on error
          })
        );
    }

     updateProposedValues(v3Elegible) {
      const dataForAggregate = v3Elegible
      ? this.dataActivitiesList   // ✅ V3 me sab allow
      : this.dataActivitiesList.filter(x =>
          ((x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
              x?.recordStatus?.id === 1 ||
              (x?.recordStatus === null && x?.activeStatus === true)
          )
        );
      // this.dataActivitiesList = this.dataActivitiesList.filter(x => x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true);
      this.unitActivity = dataForAggregate.reduce(
        (sum, item) => sum + Number(item.unit),
        0
      );
      this.costPerUnitActivity = dataForAggregate.reduce(
        (sum, item) => sum + Number(item.costPerUnit),
        0
      );
      this.totalCostActivity = dataForAggregate.reduce(
        (sum, item) => sum + Number(item.totalCost),
        0
      );
      this.targetNoBeneficiaryActivity = dataForAggregate.reduce(
        (sum, item) => sum + Number(item.targetNoBeneficiary),
        0
      );
  }
    
    getOutComeIndicatorVal(propId: number,
    context: {
      districtCode: any,
      uniqueDistrictCode: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.getService.getProposedCome().pipe(
    
        tap(res => {
          this.dataOutComeList = [];
    
          res.forEach((e: any) => {
    
            const targetType = e.targetType === 'float' ? 'number' : e.targetType;
            const baseYearType = e.baseYearType === 'float' ? 'number' : e.baseYearType;
    
            this.dataOutComeList.push({
              indicatorName: e.indicatorName,
              id: e.id,
              baseYear: '',
              outId: 0,
              isProjectCompletedTarget31032024: '',
              isProjectCompletedTarget31032025: '',
              isProjectCompletedTarget31032026: '',
              targetLength: e.targetLength,
              targetRegex: e.targetRegex,
              targetType,
              baseYearLength: e.baseYearLength,
              baseYearRegex: e.baseYearRegex,
              baseYearType,
              indicatorInfo: e.indicatorInfo,
              disabled: 1,
              saveButton: false,
              justification: e.justification
            });
          });
        }),
    
        // 🔹 move to next API
        switchMap(() => this.getProposedOutcomeDataVal(propId, context.districtCode, context.uniqueDistrictCode, context.componentId, context.pabStatus, context.aisheCode, context.month, context.year, context.V3Elegibal)),
    
        catchError(err => {
          console.error('Outcome indicator error', err);
          return of(true); // stop lock
        })
      );
    }
    
    getProposedOutcomeDataVal(propId: number, districtCode: any,
      uniqueDistrictCode: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    ): Observable<boolean> {
    
      return this.api
        .getOutComeGenderEquityRevision(
          uniqueDistrictCode ? uniqueDistrictCode : districtCode,
          componentId,
          this.sharedService.revAddId
        )
        .pipe(
    
          // 🔹 STEP 1: Prepare data
          tap(res => {
            this.outcomesData = (res?.data || []).map(item => ({
              ...item,
              month: month,
              year: year
            }));
          }),
    
          // 🔹 STEP 2: Remarks
          switchMap(() =>
            this.getService.getRemarkListUpdate(
              propId,
              componentId,
              aisheCode,
              month,
              year
            )
          ),
    
          // 🔹 STEP 3: VALIDATION
          map(res => {
            this.getremarkData = res?.data;
            this.getMergedData(this.outcomesData);
    
            // attach indicator info
            this.outcomesData.forEach(outcome => {
              const indicator = this.dataOutComeList.find(
                x => x.id === outcome.outcomeIndicatorId
              );
              if (indicator) {
                outcome['indicatorInfo'] = indicator.indicatorInfo;
              }
            });
    
            this.outcomeconditions = [];
    
            this.outcomesData.forEach(item => {
    
              const isMonthOrYearDifferent =
                Number(item?.previousMonth) !== Number(item?.month) ||
                Number(item?.prevYear) !== Number(item?.year);
    
              const isTarget2024Missing =
                item?.targetFor2024 == null || item?.targetFor2024 === '';
    
              const isTarget2025Missing =
                item?.targetFor2025 == null || item?.targetFor2025 === '';
    
              const isTarget2026Missing =
                item?.targetFor2026 == null || item?.targetFor2026 === '';
    
              if (
                isMonthOrYearDifferent ||
                isTarget2024Missing ||
                isTarget2025Missing ||
                isTarget2026Missing
              ) {
                this.outcomeconditions.push(item);
              }
            });
    
            if (this.outcomeconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Outcome Indicators'!"
              );
              return true; // ❌ validation failed
            }
    
            return false; // ✅ validation passed
          }),
    
          catchError(err => {
            console.error('Outcome validation error', err);
            return of(true);
          })
        );
    }
    
    getActivitiesDataVal(propId: number,
    context: {
      districtCode: any,
      uniqueDistrictCode: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.api
        .getActivityDetailsForGender(
          context.uniqueDistrictCode ? context.uniqueDistrictCode : context.districtCode,
          context.componentId
        )
        .pipe(
    
          /* ---------- STEP 1: Prepare data ---------- */
          tap(res => {
    
            this.activityDetailData = (res || []).map(item => {
    
              if (item.proposalActivityName) {
                item.proposalActivityName =
                  Object.values(item.proposalActivityName).toString();
              }
    
              if (item.itemName) {
                item.itemName = Object.values(item.itemName).toString();
              }
    
              return {
                ...item,
                month: context.month,
                year: context.year
              };
            });
          }),
    
          /* ---------- STEP 2: Fetch remarks ---------- */
          switchMap(() =>
            this.getService.getRemarkListUpdate(
              propId,
              context.componentId,
              context.aisheCode,
              context.month,
              context.year
            )
          ),
    
          /* ---------- STEP 3: Validation ---------- */
          map(res => {
    
            this.getremarkData = res?.data;
            this.getMergedData(this.activityDetailData);
    
            this.activityconditions = [];
    
            this.activityDetailData?.forEach(item => {
    
              const isMonthOrYearDifferent =
                Number(item?.previousMonth) !== Number(item?.month) ||
                Number(item?.prevYear) !== Number(item?.year);
    
              const isProjectStatusMissing =
                item?.projectStatusId == null || item?.projectStatusId === 0;
    
              if (isProjectStatusMissing || isMonthOrYearDifferent) {
                this.activityconditions.push(item);
              }
            });
    
            if (this.activityconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Activities'!"
              );
              return true;   // ❌ validation failed
            }
    
            return false;    // ✅ validation passed
          }),
    
          /* ---------- ERROR ---------- */
          catchError(err => {
            console.error('Activity validation error', err);
            return of(true); // stop submit/lock
          })
        );
    }
    
    
    getFiniacialProgressVal( context: {
      districtCode: any,
      uniqueDistrictCode: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean,
      stateCode: any
    }): Observable<boolean> {
    
      const encryptedAishe = context.aisheCode
        ? this.encrypt.getEncryptedValue(context.aisheCode)
        : '';
    
      const payload = {
        aisheCode: encryptedAishe,
        componentId: context.componentId,
        year: context.year,
        month: context.month,
        stateCode: context.stateCode,
        districtCode: context.uniqueDistrictCode
          ? context.uniqueDistrictCode
          : context.districtCode
      };
    
      return this.getService.getFinacialDetails(payload).pipe(
    
        /* ---------- STEP 1: Prepare Data ---------- */
        tap(res => {
    
          const arr = res?.data || [];
    
          this.updateProgressData = arr.map(item => {
    
            const monthNumber = item?.month ?? context.month;
            const yearValue = item?.year ?? context.year;
    
            return {
              aisheCode: item.aisheCode,
              centralShareApproved: item.centralShareApproved,
              centralShareReleased: item.centralShareReleased,
              centralShareUtilised: item.centralShareUtilised,
              componentId: context.componentId,
              componentName: '',
              districtId: context.uniqueDistrictCode
                ? context.uniqueDistrictCode
                : context.districtCode,
              districtName: '',
              id: item.id,
              month: context.month,
              previousMonth: monthNumber,
              monthName: this.getMonthName(monthNumber),
              rusaLegacyDataId: item.rusaLegacyDataId,
              stateId: context.stateCode,
              stateName: '',
              stateShareApproved: item.stateShareApproved,
              stateShareReleased: item.stateShareReleased,
              stateShareUtilised: item.stateShareUtilised,
              totalAmountApproved: item.totalAmountApproved,
              totalAmountReleased: item.totalAmountReleased,
              physicalProgressTotal: item.physicalProgressTotal,
              totalUtilisation: item.totalUtilisation,
              rusaProjectStatusId: item.rusaProjectStatusId,
              prevYear: yearValue,
              year: context.year
            };
          });
        }),
    
        /* ---------- STEP 2: Validation ---------- */
        map(() => {
    
          this.Progressconditions = [];
    
          this.updateProgressData?.forEach(item => {
    
            const isSameMonthAndYear =
              Number(item?.previousMonth) === Number(item?.month) &&
              Number(item?.prevYear) === Number(item?.year);
    
            const isFinancialDataMissing =
              !item?.centralShareReleased ||
              !item?.centralShareUtilised ||
              !item?.stateShareReleased ||
              !item?.stateShareUtilised ||
              item?.physicalProgressTotal == null ||
              item?.physicalProgressTotal < 0 ||
              !item?.rusaProjectStatusId;
    
            if (isFinancialDataMissing || !isSameMonthAndYear) {
              this.Progressconditions.push(item);
            }
          });
    
          if (this.Progressconditions.length > 0) {
            this.notification.showValidationMessage(
              "Please update Financial Progress details before proceeding!"
            );
            return true;   // ❌ validation failed
          }
    
          return false;    // ✅ validation passed
        }),
    
        /* ---------- ERROR ---------- */
        catchError(err => {
          console.error('Financial Progress error', err);
          return of(true); // block submit
        })
      );
    }

  getMergedData(dataValue){
    
    
    dataValue.forEach(ele => {
      this.getremarkData.forEach(obj => {
        if (ele.id === obj.itemId) {
          ele['idValue'] = obj?.id,
          ele['projectStatusId'] = obj?.projectStatusId,
          ele['physicalProgress'] = obj?.physicalProgress,
          ele['progressRemarks'] = obj?.progressRemarks,
          ele['targetFor2024'] = obj?.targetFor2024,
          ele['targetFor2025'] = obj?.targetFor2025,
          ele['targetFor2026'] = obj?.targetFor2026,
          ele['activityPhoto'] = obj?.activityPhoto,
          ele['previousMonth'] = obj?.month ? obj?.month : this.month,
          ele['prevYear'] = obj?.year ? obj?.year : this.year,
          ele['monthName'] = this.getMonthName(obj?.month)
        }
    });
  })
  }

  getMonthName(monthNumber: number): string {
  return monthNumber ? this.monthList1[monthNumber - 1] : '';
}

    
}
