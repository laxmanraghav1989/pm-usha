import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrutinyRoutingModule } from './scrutiny-routing.module';
import { ScrutinyComponent } from './scrutiny.component';
import { StateProfileScrutinyComponent } from './state-profile-scrutiny/state-profile-scrutiny.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchstatelistPipe } from './searchcollegelist.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollegeScrutinyListComponent } from './college-scrutiny-list/college-scrutiny-list.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { GenderScrutinyListComponent } from './gender-scrutiny-list/gender-scrutiny-list.component';
import { MergeConsultantDialogComponent } from 'src/app/dialog/merge-consultant-dialog/merge-consultant-dialog.component';
@NgModule({
  declarations: [
    ScrutinyComponent,
    StateProfileScrutinyComponent,
    SearchstatelistPipe,
    CollegeScrutinyListComponent,
    GenderScrutinyListComponent,
    MergeConsultantDialogComponent
  ],
  imports: [
    CommonModule,
    ScrutinyRoutingModule,
    NgxPaginationModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectFilterModule,
    
  ]
})
export class ScrutinyModule { }
