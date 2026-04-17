import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PmprogresmonitRoutingModule } from './pmprogresmonit-routing.module';
import { PmprogresmonitComponent } from './pmprogresmonit.component';
import { CollegePmushaListComponent } from './college-pmusha-list/college-pmusha-list.component';
import { GenderPmushaListComponent } from './gender-pmusha-list/gender-pmusha-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { CollegeLockListComponent } from './college-lock-list/college-lock-list.component';
import { PmUshaReportComponent } from './pm-usha-report/pm-usha-report.component';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProjectItemTaggingComponent } from './project-item-tagging/project-item-tagging.component';
import { ComparisonDataComponent } from './college-lock-list/comparison-data/comparison-data.component';
import { RevisionPmushaListComponent } from './revision-pmusha-list/revision-pmusha-list.component';
import { ReRevisionPmushaListV3Component } from './re-revision-pmusha-list-v3/re-revision-pmusha-list-v3.component';
import { LatestMprDataComponent } from './college-lock-list/latest-mpr-data/latest-mpr-data.component';
import { RevisionFinalListComponent } from './pm-usha-report/revision-final-list/revision-final-list.component';


@NgModule({
  declarations: [
    PmprogresmonitComponent,
    CollegePmushaListComponent,
    GenderPmushaListComponent,
    CollegeLockListComponent,
    PmUshaReportComponent,
    ProjectItemTaggingComponent,
    ComparisonDataComponent,
    RevisionPmushaListComponent,
    ReRevisionPmushaListV3Component,
    LatestMprDataComponent,
    RevisionFinalListComponent
  
  ],
  imports: [
    CommonModule,
    PmprogresmonitRoutingModule,
    NgxPaginationModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectFilterModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  exports:[CollegePmushaListComponent, GenderPmushaListComponent, PmUshaReportComponent]
})
export class PmprogresmonitModule { }
