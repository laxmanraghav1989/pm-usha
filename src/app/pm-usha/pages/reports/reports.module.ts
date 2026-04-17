import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { NpdRoutingModule } from '../../npd/npd-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectFilterModule } from 'mat-select-filter';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReportViewStrengthComponent } from './report-view-strength/report-view-strength.component';
import { ReportViewEquityComponent } from './report-view-equity/report-view-equity.component';
import { ReportViewMeruComponent } from './report-view-meru/report-view-meru.component';
import { ReportVeiwComponent } from './report-veiw/report-veiw.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    ReportViewStrengthComponent,
    ReportViewEquityComponent,
    ReportViewMeruComponent,
    ReportVeiwComponent,

  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    NpdRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectFilterModule,
    SharedModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule
],
exports:[ReportViewStrengthComponent, ReportViewEquityComponent, ReportViewMeruComponent, ReportVeiwComponent]
})
export class ReportsModule { 

}
