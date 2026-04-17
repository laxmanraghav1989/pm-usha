import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProposalRevisionRoutingModule } from './proposal-revision-routing.module';
import { ProposalRevisionComponent } from './proposal-revision.component';
import { ViewStrengthRevisionComponent } from './view-strength-revision/view-strength-revision.component';
import { NpdRoutingModule } from '../npd/npd-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectFilterModule } from 'mat-select-filter';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PmushaService } from '../ipmr/service/pmusha.service';
import { HttpService } from '../ipmr/service/http.service';
import { CollegeService } from '../dpr/strength-college/service/college.service';
import { ViewMeruRevisionComponent } from './view-meru-revision/view-meru-revision.component';
import { ViewEquityRevisionComponent } from './view-equity-revision/view-equity-revision.component';
import { ViewNmdcRevisionComponent } from './view-nmdc-revision/view-nmdc-revision.component';
import { ViewMeruCollegeUniversityV3Component } from './view-meru-college-university-v3/view-meru-college-university-v3.component';
import { ViewEquityNmdcRevisionV3Component } from './view-equity-nmdc-revision-v3/view-equity-nmdc-revision-v3.component';



@NgModule({
  declarations: [
  ProposalRevisionComponent,
  ViewStrengthRevisionComponent,
  ViewMeruRevisionComponent,
  ViewEquityRevisionComponent,
  ViewNmdcRevisionComponent,
  ViewMeruCollegeUniversityV3Component,
  ViewEquityNmdcRevisionV3Component

  ],
  imports: [
    CommonModule,
    ProposalRevisionRoutingModule,
    NpdRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectFilterModule,
    SharedModule,
    MatTooltipModule
  ],
  providers:[PmushaService, HttpService, CollegeService]
})
export class ProposalRevisionModule { }
