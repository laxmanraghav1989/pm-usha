import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NmdCollegeRoutingModule } from './nmd-college-routing.module';
import { NmdCollegeComponent } from './nmd-college.component';
import { NmdcSection1Component } from './nmdc-section1/nmdc-section1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DprRoutingModule } from '../dpr-routing.module';
import { NmdcSection2Component } from './nmdc-section2/nmdc-section2.component';
import { NmdcSection5Component } from './nmdc-section5/nmdc-section5.component';
import { NmdcSection6Component } from './nmdc-section6/nmdc-section6.component';
import { NmdcSection7Component } from './nmdc-section7/nmdc-section7.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';


@NgModule({
  declarations: [
    NmdCollegeComponent,
    NmdcSection1Component,
    NmdcSection2Component,
    NmdcSection5Component,
    NmdcSection6Component,
    NmdcSection7Component
  ],
  imports: [
    CommonModule,
    NmdCollegeRoutingModule,
    DprRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectFilterModule,
    SharedModule
  ]
})
export class NmdCollegeModule { }
