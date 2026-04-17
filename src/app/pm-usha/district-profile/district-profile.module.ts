import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistrictProfileRoutingModule } from './district-profile-routing.module';
import { DistrictProfileComponent } from './district-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { DistrictHigherEducationComponent } from './district-higher-education/district-higher-education.component';
import { DProfileComponent } from './d-profile/d-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DistrictProfileComponent,
    DistrictHigherEducationComponent,
    DProfileComponent
  ],
  imports: [
    CommonModule,
    DistrictProfileRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ]
})
export class DistrictProfileModule { }
