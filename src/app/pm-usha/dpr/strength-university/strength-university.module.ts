import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrengthUniversityRoutingModule } from './strength-university-routing.module';
import { StrengthUniversityComponent } from './strength-university.component';
import { UniversitySection1Component } from './university-section1/university-section1.component';
import { UniversitySection2Component } from './university-section2/university-section2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DprRoutingModule } from '../dpr-routing.module';
import { UniversityProposalDetailsComponent } from './university-proposal-details/university-proposal-details.component';
import { UniversityOutcomesComponent } from './university-outcomes/university-outcomes.component';


@NgModule({
  declarations: [
    StrengthUniversityComponent,
    UniversitySection1Component,
    UniversitySection2Component,
    UniversityProposalDetailsComponent,
    UniversityOutcomesComponent
  ],
  imports: [
    CommonModule,
    StrengthUniversityRoutingModule,    
    DprRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StrengthUniversityModule { }
