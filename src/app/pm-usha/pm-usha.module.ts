import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PmUshaRoutingModule } from "./pm-usha-routing.module";
import { PmUshaComponent } from "./pm-usha.component";
import { SidebarComponent } from "./pages/sidebar/sidebar.component";
import { InfoBarComponent } from "./pages/info-bar/info-bar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { AngularMaterialModule } from "../angular-material.module";
import { PrefilledComponent } from "./pages/prefilled/prefilled.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { UnderDevelopementComponent } from "./pages/under-developement/under-developement.component";
import { DistrictProfileModule } from "./district-profile/district-profile.module";
import { StatusComponent } from "./pages/status/status.component";
import { BooleanEntity } from "./Entity/boolean-entity";
import { MatSelectFilterModule } from "mat-select-filter";
import { ScrutinyModule } from "./scrutiny/scrutiny.module";
import { ReportsComponent } from "./pages/reports/reports.component";
import { ProposalRevisionModule } from "./proposal-revision/proposal-revision.module";
import { UtilizationCertificateModuleModule } from "./utilization-certificate-module/utilization-certificate-module.module";
import { PmprogresmonitModule } from "./pmprogresmonit/pmprogresmonit.module";
import { NpdModule } from "./npd/npd.module";

import { ReportsModule } from "./pages/reports/reports.module";
import { DocumentUploadModule } from "./document-upload/document-upload.module";
import { SharedModule } from "../shared-module/shared/shared.module";
import { OutcomeSummaryReportModule } from "./pages/outcome-summary-report/outcome-summary-report.module";
import { SanctionModelComponent } from './sanction-model/sanction-model.component';
import { StateIssuesComponent } from './state-issues/state-issues.component';
import { ActivityModule } from "./activity/activity.module";
import { StatusVersion3Component } from './pages/status-version3/status-version3.component';
import { OutcomesDataTargetComponent } from "./outcomes-data-target/outcomes-data-target.component";
import { OutcomesDataAchievementComponent } from './outcomes-data-achievement/outcomes-data-achievement.component';
import { OutputOutcomesReportComponent } from './output-outcomes-report/output-outcomes-report.component';
import { AgGridModule } from "ag-grid-angular";
import { TargetAchievementSummaryComponent } from './target-achievement-summary/target-achievement-summary.component';

@NgModule({
  declarations: [
    PmUshaComponent,
    SidebarComponent,
    InfoBarComponent,
    PrefilledComponent,
    DashboardComponent,
    UnderDevelopementComponent,
    StatusComponent,
    UnderDevelopementComponent,
    ReportsComponent,
    SanctionModelComponent,
    StateIssuesComponent,
    StatusVersion3Component,
    OutcomesDataTargetComponent,
    OutcomesDataAchievementComponent,
    OutputOutcomesReportComponent,
    TargetAchievementSummaryComponent,
  
  ],
  imports: [
    CommonModule,
    PmUshaRoutingModule,
    DistrictProfileModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectFilterModule,
    ScrutinyModule,
    DocumentUploadModule,
    ProposalRevisionModule,
    UtilizationCertificateModuleModule,
    PmprogresmonitModule,
    NpdModule,
    ReportsModule,
    SharedModule,
    OutcomeSummaryReportModule,
    ActivityModule,
    AgGridModule
  
],
 
 

  providers: [BooleanEntity]
})
export class PmUshaModule {}
