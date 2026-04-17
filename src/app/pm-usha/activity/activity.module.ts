import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { CollegeService } from '../dpr/strength-college/service/college.service';
import { HttpService } from '../dpr/strength-college/service/http.service';
import { MatSelectFilterModule } from 'mat-select-filter';
import { ReadExploreComponent } from './read-explore/read-explore.component';


@NgModule({
  declarations: [
    ActivityComponent,
    ReadExploreComponent
  ],
  imports: [
    CommonModule,
    ActivityRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectFilterModule
  ],
  exports:[ReadExploreComponent],
  providers:[CollegeService,HttpService]
})
export class ActivityModule { }
