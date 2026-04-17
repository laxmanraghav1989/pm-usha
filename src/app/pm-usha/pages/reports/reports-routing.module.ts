import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportsComponent } from './reports.component';
import { ReportViewStrengthComponent } from './report-view-strength/report-view-strength.component';
import { ViewCommonInsGuard } from 'src/app/authentication/view-common-ins.guard';
import { ReportViewMeruComponent } from './report-view-meru/report-view-meru.component';
import { ReportViewEquityComponent } from './report-view-equity/report-view-equity.component';
import { ReportVeiwComponent } from './report-veiw/report-veiw.component';

const routes: Routes = [
  {path : '', component : ReportsComponent},
  {path: 'viewReportStrenthRevision/:id/:aisheCode/:tabIndex', component:ReportViewStrengthComponent, canActivate: [ViewCommonInsGuard]},
  {path: 'viewReportStrenthRevisionAch/:id/:aisheCode/:tabIndex/:year/:month/:key', component:ReportViewStrengthComponent, canActivate: [ViewCommonInsGuard]},
  {path: 'viewReportMeruRevision/:id/:aisheCode/:tabIndex', component:ReportViewMeruComponent, canActivate: [ViewCommonInsGuard]},
  {path: 'viewReportMeruRevisionAch/:id/:aisheCode/:tabIndex/:year/:month/:key', component:ReportViewMeruComponent, canActivate: [ViewCommonInsGuard]},
  {path: 'viewReportEquityRevision/:id/:aisheCode/:tabIndex/:districtCode', component:ReportViewEquityComponent, canActivate: [ViewCommonInsGuard]},
  {path: 'viewReportEquityRevisionAch/:id/:aisheCode/:tabIndex/:districtCode/:year/:month/:key', component:ReportViewEquityComponent, canActivate: [ViewCommonInsGuard]},
  {path: 'viewReport/:id', component:ReportVeiwComponent, canActivate: [ViewCommonInsGuard] }];
   


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
