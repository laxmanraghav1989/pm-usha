import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IpmrComponent } from './ipmr.component';
import { ViewInsCollegeComponent } from './view-ins-college/view-ins-college.component';
import { ViewCommonGuard } from 'src/app/authentication/view-common.guard';
import { ViewInsUniverComponent } from './view-ins-univer/view-ins-univer.component';
import { ViewMeruUniverComponent } from './view-meru-univer/view-meru-univer.component';
import { ViewNmdcInsComponent } from './view-nmdc-ins/view-nmdc-ins.component';
import { ViewNmdcGuard } from 'src/app/authentication/view-nmdc.guard';
import { ViewInsGenderEquityComponent } from './view-ins-gender-equity/view-ins-gender-equity.component';
import { ViewCommonInsGuard } from 'src/app/authentication/view-common-ins.guard';
import { ViewTagGuard } from 'src/app/authentication/view-tag.guard';
import { InsLockedMonthComponent } from './ins-locked-month/ins-locked-month.component';

const routes: Routes = [{
  path: '', component: IpmrComponent,
  children: [
  { path: 'viewIns', component: ViewInsCollegeComponent, canActivate: [ViewCommonInsGuard] },
  { path: 'viewIns/:id', component: ViewInsCollegeComponent, canActivate: [ViewCommonInsGuard] },
  { path: 'viewInsLock/:id/:uniqueId/:year/:month/:idvalue/:stateCode', component: ViewInsCollegeComponent, canActivate: [ViewCommonInsGuard] },
  { path: 'viewInsLock1/:id/:uniqueId/:year/:month/:idvalue/:stateCode', component: ViewInsUniverComponent },
  { path: 'viewInsProjectTag/:id/:tagId/:idvalue/:stateCode', component: ViewInsCollegeComponent, canActivate: [ViewTagGuard] },
  { path: 'viewReportProjectTag/:id/:reportId/:idvalue/:stateCode/:tabIndex', component: ViewInsCollegeComponent, canActivate: [ViewTagGuard] },
  { path: 'viewUniv', component: ViewInsCollegeComponent, canActivate: [ViewCommonInsGuard] },
  { path: 'viewUniv/:id', component: ViewInsCollegeComponent, canActivate: [ViewCommonInsGuard] },
  { path: 'viewUnivLock/:id/:uniqueId/:year/:month/:idvalue/:stateCode', component: ViewInsCollegeComponent, canActivate: [ViewCommonInsGuard] },
  { path: 'viewUnivProjectTag/:id/:tagId/:idvalue/:stateCode', component: ViewInsCollegeComponent, canActivate: [ViewTagGuard] },
  { path: 'viewReportUnivProjectTag/:id/:reportId/:idvalue/:stateCode/:tabIndex', component: ViewInsCollegeComponent, canActivate: [ViewTagGuard] },
  { path: 'viewMeru', component: ViewInsCollegeComponent, canActivate: [ViewCommonInsGuard] },
  { path: 'viewMeru/:id', component: ViewInsCollegeComponent, canActivate: [ViewCommonInsGuard] },
  { path: 'viewMeruLock/:id/:uniqueId/:year/:month/:idvalue/:stateCode', component: ViewInsCollegeComponent, canActivate: [ViewCommonInsGuard] },
  { path: 'viewMeruProjectTag/:id/:tagId/:idvalue/:stateCode', component: ViewInsCollegeComponent, canActivate: [ViewTagGuard] },
  { path: 'viewReportMeruProjectTag/:id/:reportId/:idvalue/:stateCode/:tabIndex', component: ViewInsCollegeComponent, canActivate: [ViewTagGuard] },
  { path: 'viewNmdc', component: ViewInsGenderEquityComponent, canActivate: [ViewNmdcGuard] },
  { path: 'viewNmdc/:id', component: ViewInsGenderEquityComponent, canActivate: [ViewNmdcGuard] },
  { path: 'viewinsGenderEquity', component: ViewInsGenderEquityComponent, canActivate: [ViewNmdcGuard] },
  { path: 'viewinsGenderEquity/:id', component: ViewInsGenderEquityComponent, canActivate: [ViewNmdcGuard] },
  { path: 'viewGenderProjectTag/:id/:tagId/:idvalue/:stateCode/:districtCode', component: ViewInsGenderEquityComponent, canActivate: [ViewTagGuard] },
  { path: 'viewReportGenderProjectTag/:id/:reportId/:idvalue/:stateCode/:districtCode/:tabIndex', component: ViewInsGenderEquityComponent, canActivate: [ViewTagGuard] },
  { path: 'viewGenderLock/:id/:uniqueId/:year/:month/:idvalue/:stateCode', component: ViewInsGenderEquityComponent, canActivate: [ViewNmdcGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IpmrRoutingModule { }
