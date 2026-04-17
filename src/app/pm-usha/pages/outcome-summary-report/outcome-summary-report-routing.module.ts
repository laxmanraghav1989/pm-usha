import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutcomeSummaryReportComponent } from './outcome-summary-report.component';
import { OutcomeSummaryComponent } from './outcome-summary/outcome-summary.component';
import { ReportViewEquityComponent } from './report-view-equity/report-view-equity.component';
import { ViewCommonInsGuard } from 'src/app/authentication/view-common-ins.guard';
import { OutcomeViewStrengthComponent } from './outcome-view-strength/outcome-view-strength.component';
import { OutcomeViewMeruComponent } from './outcome-view-meru/outcome-view-meru.component';
import { OutcomeViewEquityComponent } from './outcome-view-equity/outcome-view-equity.component';

const routes: Routes = [
  {path : '', component : OutcomeSummaryReportComponent},
  {path : 'outcome', component : OutcomeSummaryComponent},
  {path: 'viewOutcomeStrenthRevision/:id/:aisheCode/:tabIndex', component:OutcomeViewStrengthComponent, canActivate: [ViewCommonInsGuard]},
  {path: 'viewOutcomeStrenthRevisionAch/:id/:aisheCode/:tabIndex/:year/:month/:key', component:OutcomeViewStrengthComponent, canActivate: [ViewCommonInsGuard]},
  {path: 'viewOutcomeMeruRevision/:id/:aisheCode/:tabIndex', component:OutcomeViewMeruComponent, canActivate: [ViewCommonInsGuard]},
  {path: 'viewOutcomeMeruRevisionAch/:id/:aisheCode/:tabIndex/:year/:month/:key', component:OutcomeViewMeruComponent, canActivate: [ViewCommonInsGuard]},
  {path: 'viewOutcomeEquityRevision/:id/:aisheCode/:tabIndex/:districtCode', component:OutcomeViewEquityComponent, canActivate: [ViewCommonInsGuard]},
  {path: 'viewOutcomeEquityRevisionAch/:id/:aisheCode/:tabIndex/:districtCode/:year/:month/:key', component:OutcomeViewEquityComponent, canActivate: [ViewCommonInsGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutcomeSummaryReportRoutingModule { }
