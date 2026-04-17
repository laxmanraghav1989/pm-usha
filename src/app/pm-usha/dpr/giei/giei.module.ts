import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GIEIRoutingModule } from './giei-routing.module';
import { GIEIComponent } from './giei.component';
import { GieiSection1Component } from './giei-section1/giei-section1.component';
import { GieiProposalDetailsComponent } from './giei-proposal-details/giei-proposal-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DprRoutingModule } from '../dpr-routing.module';
import { GieiOutcomesComponent } from './giei-outcomes/giei-outcomes.component';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { GieiProposalDetailsV3Component } from './giei-version3/giei-proposal-details-v3/giei-proposal-details-v3.component';
import { GieiOutcomesV3Component } from './giei-version3/giei-outcomes-v3/giei-outcomes-v3.component';


@NgModule({
  declarations: [
    GIEIComponent,
    GieiSection1Component,
    GieiProposalDetailsComponent,
    GieiOutcomesComponent,
    GieiProposalDetailsV3Component,
    GieiOutcomesV3Component
  ],
  imports: [
    CommonModule,
    GIEIRoutingModule,
    DprRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class GIEIModule { }
