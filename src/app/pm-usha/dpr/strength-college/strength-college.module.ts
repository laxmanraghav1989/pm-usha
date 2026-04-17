import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrengthCollegeRoutingModule } from './strength-college-routing.module';
import { StrengthCollegeComponent } from './strength-college.component';
import { CollegeSection1Component } from './college-section1/college-section1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DprRoutingModule } from '../dpr-routing.module';
import { CollegeSection2Component } from './college-section2/college-section2.component';
import { CollegeProposalDetailsComponent } from './college-proposal-details/college-proposal-details.component';
import { CollegeOutcomesComponent } from './college-outcomes/college-outcomes.component';
import { CollegeService } from './service/college.service';
import { HttpService } from './service/http.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectFilterModule } from 'mat-select-filter';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { CollegeProposalDetailsV3Component } from './college-version3/college-proposal-details-v3/college-proposal-details-v3.component';
import { CollegeOutcomesV3Component } from './college-version3/college-outcomes-v3/college-outcomes-v3.component';



@NgModule({
  declarations: [
    StrengthCollegeComponent,
    CollegeSection1Component,
    CollegeSection2Component,
    CollegeProposalDetailsComponent,
    CollegeOutcomesComponent,
    CollegeProposalDetailsV3Component,
    CollegeOutcomesV3Component
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    StrengthCollegeRoutingModule,
    DprRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectFilterModule,
    SharedModule,
    
  ],
  providers:[CollegeService,HttpService]
})
export class StrengthCollegeModule { }
