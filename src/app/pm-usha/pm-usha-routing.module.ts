import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmUshaComponent } from './pm-usha.component';
import { PrefilledComponent } from './pages/prefilled/prefilled.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UnderDevelopementComponent } from './pages/under-developement/under-developement.component';
import { StatusComponent } from './pages/status/status.component';
import { AuthGuard } from '../authentication/auth.guard';
import { StateGuard } from '../authentication/state.guard';
import { UploadDocGuard } from '../authentication/upload-doc.guard';
import { MeruGuard } from '../authentication/meru.guard';
import { AddUserGuard } from '../authentication/add-user.guard';
import { SanctionModelComponent } from './sanction-model/sanction-model.component';
import { StateIssuesComponent } from './state-issues/state-issues.component';
import { StatusVersion3Component } from './pages/status-version3/status-version3.component';
import { OutcomesDataTargetComponent } from './outcomes-data-target/outcomes-data-target.component';
import { OutcomesDataAchievementComponent } from './outcomes-data-achievement/outcomes-data-achievement.component';
import { OutputOutcomesReportComponent } from './output-outcomes-report/output-outcomes-report.component';
import { IpmrComponent } from './ipmr/ipmr.component';
import { TargetAchievementSummaryComponent } from './target-achievement-summary/target-achievement-summary.component';

const routes: Routes = [{
  path: '', component: PmUshaComponent,
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: PrefilledComponent },
    { path: 'status/:id', component: StatusComponent,canActivate:[MeruGuard] },
    { path: 'statusRevision/:id/:revId', component: StatusComponent },
    { path: 'statusRevisionMeru/:id/:revId', component: StatusComponent },
    { path: 'statusRevisionEquity/:id/:revId', component: StatusComponent },
    { path: 'statusRevisionV3/:id/:revId', component: StatusVersion3Component },
    { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
    { path: 'reports', loadChildren: () => import('./pages/reports/reports-routing.module').then(m => m.ReportsRoutingModule) ,canActivateChild: [StateGuard] },
    { path: 'outcomeSummary', loadChildren: () => import('./pages/outcome-summary-report/outcome-summary-report-routing.module').then(m => m.OutcomeSummaryReportRoutingModule) ,canActivateChild: [StateGuard] },
    { path: 'activityMaster/:id', loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule) },
    { path: 'activityMasterRev/:id/:revId', loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule) },
    { path: 'underDevelopment', component: UnderDevelopementComponent },
    { path: 'component', loadChildren: () => import('./component/component.module').then(m => m.ComponentModule), canActivate: [AuthGuard] },
    { path: 'dpr', loadChildren: () => import('./dpr/dpr.module').then(m => m.DprModule), canActivateChild: [AuthGuard] },
    { path: 'districtProfile', loadChildren: () => import('./district-profile/district-profile.module').then(m => m.DistrictProfileModule), canActivate: [AuthGuard] },
    { path: 'stateProfile', loadChildren: () => import('./state-profile/state-profile.module').then(m => m.StateProfileModule), canActivate: [StateGuard] },
    { path: 'npd', loadChildren: () => import('./npd/npd.module').then(m => m.NpdModule) },
    { path: 'ipmr', loadChildren: () => import('./ipmr/ipmr.module').then(m => m.IpmrModule) },
    { path: 'uploadMou', loadChildren: () => import('./upload-data/upload-mou/upload-mou.module').then(m => m.UploadMouModule) },
    { path: 'emailManagement', loadChildren: () => import('./email-management/email-management.module').then(m => m.EmailManagementModule) },
    { path: 'fundManagement', loadChildren: () => import('./fund-management/fund-management.module').then(m => m.FundManagementModule), canActivate: [AuthGuard] },
    { path: 'proposalrevision', loadChildren: () => import('./proposal-revision/proposal-revision.module').then(m => m.ProposalRevisionModule) },
    { path: 'usermanagement', loadChildren: () => import('./user/usermanagement/usermanagement.module').then(m => m.UsermanagementModule), canActivate: [AddUserGuard] },
    { path: 'audit_log', loadChildren: () => import('./audit-log/audit-log.module').then(m => m.AuditLogModule), },
    { path: 'scrutiny', loadChildren: () => import('./scrutiny/scrutiny.module').then(m => m.ScrutinyModule) },
    { path: 'pmprogresmonit', loadChildren: () => import('./pmprogresmonit/pmprogresmonit.module').then(m => m.PmprogresmonitModule) },
    { path: 'statusnotemanagment', loadChildren: () => import('./status-note/status-note.module').then(m => m.StatusNoteModule), canActivate: [AuthGuard] },
    { path: 'UtilizationCertificate', loadChildren: () => import('./utilization-certificate-module/utilization-certificate-module.module').then(m => m.UtilizationCertificateModuleModule), canActivate: [AuthGuard] },
    { path: 'eventsManagement', loadChildren: () => import('./events-management/events-management.module').then(m => m.EventsManagementModule),canActivate:[UploadDocGuard] },
    { path: 'documentUpload', loadChildren: () => import('./document-upload/document-upload.module').then(m => m.DocumentUploadModule),canActivate:[UploadDocGuard] },
    { path: 'sanctionModel', component: SanctionModelComponent },
    { path: 'stateIssueModel', component: StateIssuesComponent },
    { path: 'outComesTarget', component: OutcomesDataTargetComponent },
    { path: 'outComesAchievement', component: OutcomesDataAchievementComponent },
    { path: 'outComesReport', component: OutputOutcomesReportComponent },
    { path: 'targetAchievementSummary', component: TargetAchievementSummaryComponent },
    // { path: 'ipmr', component: IpmrComponent },
    // { path: '**', redirectTo: 'dashboard' }

   
  
  ]
},
  // { path: 'emailManagement', loadChildren: () => import('./email-management/email-management.module').then(m => m.EmailManagementModule) },








]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmUshaRoutingModule { }
