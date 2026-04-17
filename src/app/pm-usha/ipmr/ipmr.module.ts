import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IpmrRoutingModule } from './ipmr-routing.module';
import { IpmrComponent } from './ipmr.component';
import { ViewInsCollegeComponent } from './view-ins-college/view-ins-college.component';
import { NpdRoutingModule } from '../npd/npd-routing.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectFilterModule } from 'mat-select-filter';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ViewInsUniverComponent } from './view-ins-univer/view-ins-univer.component';
import { ViewMeruUniverComponent } from './view-meru-univer/view-meru-univer.component';
import { ViewNmdcInsComponent } from './view-nmdc-ins/view-nmdc-ins.component';
import { ViewInsGenderEquityComponent } from './view-ins-gender-equity/view-ins-gender-equity.component';
import { PmushaService } from './service/pmusha.service';
import { HttpService } from './service/http.service';
import { ActivityModule } from "../activity/activity.module";
import { InsLockedMonthComponent } from './ins-locked-month/ins-locked-month.component';


@NgModule({
  declarations: [
    IpmrComponent,
    ViewInsCollegeComponent,
    ViewInsUniverComponent,
    ViewMeruUniverComponent,
    ViewNmdcInsComponent,
    ViewInsGenderEquityComponent,
    InsLockedMonthComponent
  ],
  imports: [
    CommonModule,
    IpmrRoutingModule,
    NpdRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectFilterModule,
    SharedModule,
    MatTooltipModule,
    ActivityModule
],
   providers:[PmushaService, HttpService]
})
export class IpmrModule { }
