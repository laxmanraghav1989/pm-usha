import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeruRoutingModule } from './meru-routing.module';
import { MeruComponent } from './meru.component';
import { MeruSection1Component } from './meru-section1/meru-section1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DprRoutingModule } from '../dpr-routing.module';
import { MeruSection2Component } from './meru-section2/meru-section2.component';
import { MeruSection4Component } from './meru-section4/meru-section4.component';
import { MeruSection5Component } from './meru-section5/meru-section5.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { CollegeService } from '../strength-college/service/college.service';
import { HttpService } from '../strength-college/service/http.service';
import { MeruSectionv3Component } from './meru-version3/meru-sectionv3/meru-sectionv3.component';
import { ProposedOutcomesSourcesV3Component } from './meru-version3/proposed-outcomes-sources-v3/proposed-outcomes-sources-v3.component';
// import { ReadUpdateComponent } from './read-update/read-update.component';


@NgModule({
  declarations: [
    MeruComponent,
    MeruSection1Component,
    MeruSection2Component,
    MeruSection4Component,
    MeruSection5Component,
    MeruSectionv3Component,
    ProposedOutcomesSourcesV3Component,
    // ReadUpdateComponent
  ],
  imports: [
    CommonModule,
    MeruRoutingModule,
    DprRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectFilterModule,
    SharedModule
  ],
  providers:[CollegeService,HttpService]
})
export class MeruModule { }
