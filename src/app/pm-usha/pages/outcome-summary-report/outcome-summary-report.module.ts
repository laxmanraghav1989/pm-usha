import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutcomeSummaryReportRoutingModule } from './outcome-summary-report-routing.module';
import { OutcomeSummaryReportComponent } from './outcome-summary-report.component';
import { NpdRoutingModule } from '../../npd/npd-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectFilterModule } from 'mat-select-filter';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { OutcomeSummaryComponent } from './outcome-summary/outcome-summary.component';
import { ReportViewEquityComponent } from './report-view-equity/report-view-equity.component';
import { OutcomeViewEquityComponent } from './outcome-view-equity/outcome-view-equity.component';
import { OutcomeViewMeruComponent } from './outcome-view-meru/outcome-view-meru.component';
import { OutcomeViewStrengthComponent } from './outcome-view-strength/outcome-view-strength.component';
import { OutcomeAchivementSummaryComponent } from './outcome-achivement-summary/outcome-achivement-summary.component';
import { AgGridModule } from "ag-grid-angular";


@NgModule({
  declarations: [
    OutcomeSummaryReportComponent,
    OutcomeSummaryComponent,
    ReportViewEquityComponent,
    OutcomeViewEquityComponent,
    OutcomeViewMeruComponent,
    OutcomeViewStrengthComponent,
    OutcomeAchivementSummaryComponent
  ],
  imports: [
    CommonModule,
    OutcomeSummaryReportRoutingModule,
    NpdRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectFilterModule,
    SharedModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    AgGridModule
]
})
export class OutcomeSummaryReportModule { }
