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
export class CollegeUnivValidationService {
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
  infraConstructionList: any[];
  infraproposedArea: any;
  infraperUnitCost: any;
  infratotalCost: any;
  equipmentList: any[];
  softComponentList: any[];
  softconditions: any[];
  quantitySoft: any;
  targetNumber: any;
  courseData: any;
  activityData: any;
  getpropOutcomeData: any;
  renovatedList: any;
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
      instituteCategory: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.api
        .getInfraCnstructionRevision(context.aisheCode, context.instituteCategory, context.componentId, null, context.pabStatus
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
    
              this.infraConstructionList = [
                ...this.existingRecordFilter,
                ...this.newFilterArr,
                ...this.updateIdArrFilter
              ];
            } else {
              this.infraConstructionList = infraData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
            }
    
            this.infraConstructionList = this.infraConstructionList.map(item => ({
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
            this.getMergedData(this.infraConstructionList);
    
            this.infraconditions = [];
    
            this.infraConstructionList?.forEach(item => {
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
    ? this.infraConstructionList   // ✅ V3 me sab allow
    : this.infraConstructionList.filter(x =>
        (
          (
            (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
          )
          && (x?.v3 === null || x?.v3 === false)
        )
      );
    this.infraproposedArea = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.proposedArea),
      0
    );
    this.infraperUnitCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.perUnitCost),
      0
    );
    this.infratotalCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
  }
    
    getRenovatedVal(propId: number,
    context: {
      districtCode: any,
      instituteCategory: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.api
        .getRenovatedListRevision(context.aisheCode, context.instituteCategory, context.componentId, null, context.pabStatus)
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
    
              this.renovatedList = [
                ...this.existingRecordFilter,
                ...this.newFilterArr,
                ...this.updateIdArrFilter
              ];
            } else {
              this.renovatedList = renovatedData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
            }
    
            this.renovatedList = this.renovatedList.map(item => ({
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
            this.getMergedData(this.renovatedList);
    
            this.renvoconditions = [];
    
            this.renovatedList?.forEach(item => {
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
    ? this.renovatedList   // ✅ V3 me sab allow
    : this.renovatedList.filter(x =>
        (
          (
            (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
          )
          && (x?.v3 === null || x?.v3 === false)
        )
      );
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
      instituteCategory: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.api
        .getEquipmentListRevision(context.aisheCode, context.instituteCategory, context.componentId, null, context.pabStatus)
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
    
              this.equipmentList = [
                ...this.existingRecordFilter,
                ...this.newFilterArr,
                ...this.updateIdArrFilter
              ];
            } else {
              this.equipmentList = equipmentData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
            }
    
            this.equipmentList = this.equipmentList.map(item => ({
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
            this.getMergedData(this.equipmentList);
    
            this.equpconditions = [];
    
            this.equipmentList?.forEach(item => {
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
    ? this.equipmentList   // ✅ V3 me sab allow
    : this.equipmentList.filter(x =>
        (
          (
            (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
          )
          && (x?.v3 === null || x?.v3 === false)
        )
      );
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
    
    getSoftCompoenentVal(propId: number,
    context: {
      districtCode: any,
      instituteCategory: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
      return this.getService
        .getSoftCompoenentListVal(context.aisheCode, context.instituteCategory, context.componentId, null, context.pabStatus)
        .pipe(
    
          // 🔹 STEP 1: Prepare Workshop Data
          tap(res => {
           const softData = res?.data || [];
          if (context.V3Elegibal) {
            this.updateIdArrFilter = softData.filter(item => item.v3 == true && item.rsV3?.id === 3)
            this.existingRecordFilter = softData.filter(item => (item.v2 == true && item.v3 == null))
            this.newFilterArr = softData.filter(item => item.v3 == true && item.rsV3?.id === 1)
            this.oldIdArrFilter = softData.filter(item => (item.v2 == true && item.v3 == false) && item.rsV3?.id === 3)
            this.updateIdArrFilter.forEach(item1 => {
              this.oldIdArrFilter.forEach(item2 => {
                  if (item1.oldIdV3 === item2.id) {
                      this.newArray.push(item2, item1);
                  }
              });
          });
          this.softComponentList = [...this.existingRecordFilter, ...this.newFilterArr, ...this.updateIdArrFilter];
          }
          else {
            this.softComponentList = softData.filter(x => (x?.recordStatus?.id === 3 && x?.activeStatus === true || x?.recordStatus?.id === 1 || x?.recordStatus === null && x?.activeStatus === true) && (x.v3 === null || x.v3 === false))
          }

            this.softComponentList = this.softComponentList.map(item => ({
               ...item,
                month: context.month,
                year: context.year
            }));
            this.updateSoftValues(context.V3Elegibal);
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
            this.getMergedData(this.softComponentList);
            this.softconditions = [];
 
            this.softComponentList?.forEach(item => {

              const isMonthOrYearDifferent =
                Number(item?.previousMonth) !== Number(item?.month) ||
                Number(item?.prevYear) !== Number(item?.year);
              
              const isStatusMissing =
                item?.projectStatusId == null ||
                item?.projectStatusId === 0;
    
              if (isStatusMissing || isMonthOrYearDifferent) {
                this.softconditions.push(item);
              }
            });
    
            if (this.softconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Soft Component'!"
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

  updateSoftValues(V3ElegibalVal) {
    const dataForAggregate = V3ElegibalVal
    ? this.softComponentList   // ✅ V3 me sab allow
    : this.softComponentList.filter(x =>
        (
          (
            (x?.recordStatus?.id === 3 && x?.activeStatus === true) ||
            x?.recordStatus?.id === 1 ||
            (x?.recordStatus === null && x?.activeStatus === true)
          )
          && (x?.v3 === null || x?.v3 === false)
        )
      );
   this.quantitySoft = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.unit),
      0
    );
    this.perUnitCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.costPerUnit),
      0
    );
    this.totalCost = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.totalCost),
      0
    );
    this.targetNumber = dataForAggregate.reduce(
      (sum, item) => sum + Number(item.targetNumberOfBeneficiary),
      0
    );
  }

    getProposedCourseDataVal(propId: number,
    context: {
      districtCode: any,
      instituteCategory: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.getService.getProposedCourse(context.aisheCode, context.componentId)
        .pipe(
    
          /* ---------- STEP 1: Prepare data ---------- */
          tap(res => {
    
          this.courseData = res || [];
          if (this.courseData) {
            this.courseData = res.map(item => {
              item.month = context.month; // Months are zero-based, so add 1
              item.year = context.year;
              return item;
            });
          }
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
            this.getMergedData(this.courseData);
    
            this.proposedconditions = [];
    
            this.courseData?.forEach(item => {
    
              const isMonthOrYearDifferent =
                Number(item?.previousMonth) !== Number(item?.month) ||
                Number(item?.prevYear) !== Number(item?.year);
    
              const isProjectStatusMissing =
                item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0;
    
              if (isProjectStatusMissing || isMonthOrYearDifferent) {
                this.proposedconditions.push(item);
              }
            });
    
            if (this.proposedconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Proposed Courses'!"
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
    
    
    
    getOutComeIndicatorVal(
  propId: number,
  context: {
    districtCode: any,
    instituteCategory: any,
    componentId: any,
    pabStatus: any,
    aisheCode: any,
    month: number,
    year: number,
    V3Elegibal: boolean
  }
): Observable<boolean> {

  return this.getService.getProposedCome().pipe(

    tap((res: any[]) => {
      this.dataOutComeList = [];

      res.forEach(e => {

        if (e.targetType === 'float') e.targetType = 'number';
        if (e.baseYearType === 'float') e.baseYearType = 'number';

        const isCollege = context.instituteCategory === 'C'
          ? e.isStrengthenCollegeIndicator
          : e.isStrengthenUniversityIndicator;

        if (isCollege) {
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
            targetType: e.targetType,
            baseYearLength: e.baseYearLength,
            baseYearRegex: e.baseYearRegex,
            baseYearType: e.baseYearType,
            indicatorInfo: e.indicatorInfo,
            disabled: 1,
            saveButton: false,
            justification: e.justification
          });
        }
      });
    }),

    // 🔹 Next API
    switchMap(() =>
      this.getProposedOutcomeDataVal(
        propId,
        context.districtCode,
        context.instituteCategory,
        context.componentId,
        context.pabStatus,
        context.aisheCode,
        context.month,
        context.year,
        context.V3Elegibal
      )
    ),
        catchError(err => {
          console.error('Outcome indicator error', err);
          return of(true); // stop lock
       })
    );
  }
    
    getProposedOutcomeDataVal(propId: number, districtCode: any,
      instituteCategory: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    ): Observable<boolean> {
    
      return this.getService
        .getOutComeRevision(aisheCode, instituteCategory, componentId, null, pabStatus)
        .pipe(
    
          // 🔹 STEP 1: Prepare data
          tap(res => {
            this.getpropOutcomeData = (res?.data || []).map(item => ({
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
            this.getMergedData(this.getpropOutcomeData);
    
            // attach indicator info
            this.getpropOutcomeData.forEach(outcome => {
              const indicator = this.dataOutComeList.find(
                x => x.id === outcome.outcomeIndicatorId
              );
              if (indicator) {
                outcome['indicatorInfo'] = indicator.indicatorInfo;
              }
            });
    
            this.outcomeconditions = [];
    
            this.getpropOutcomeData.forEach(item => {
    
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
                "Please add or update the details in 'Proposed Outcomes'!"
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
      instituteCategory: any,
      componentId: any,
      pabStatus: any,
      aisheCode: any,
      month: number,
      year: number,
      V3Elegibal: boolean
    }): Observable<boolean> {
    
      return this.getService
        .getActivityDetails(context.aisheCode, context.componentId)
        .pipe(
    
          /* ---------- STEP 1: Prepare data ---------- */
          tap(res => {
    
            this.activityData = (res || []).map(item => {
    
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
            this.getMergedData(this.activityData);
    
            this.activityconditions = [];
    
            this.activityData?.forEach(item => {
    
              const isMonthOrYearDifferent =
                Number(item?.previousMonth) !== Number(item?.month) ||
                Number(item?.prevYear) !== Number(item?.year);
    
              const isProjectStatusMissing =
                item?.projectStatusId === null || item?.projectStatusId === undefined || item?.projectStatusId === 0;
    
              if (isProjectStatusMissing || isMonthOrYearDifferent) {
                this.activityconditions.push(item);
              }
            });
    
            if (this.activityconditions.length > 0) {
              this.notification.showValidationMessage(
                "Please add or update the details in 'Activity Details'!"
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
        districtCode: context.districtCode ? context.districtCode : 'ALL'
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
              districtId: context.districtCode,
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
