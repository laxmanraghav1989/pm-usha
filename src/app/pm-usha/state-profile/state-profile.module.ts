import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StateProfileRoutingModule } from './state-profile-routing.module';
import { StateProfileComponent } from './state-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ProfileComponent } from './component/profile/profile.component';
import { PopulationDataComponent } from './component/population-data/population-data.component';
import { HigherEducationDataComponent } from './component/higher-education-data/higher-education-data.component';
import { RusaLegacyComponent } from './rusa-legacy/rusa-legacy.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectFilterModule } from 'mat-select-filter';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
//import { AllownumberanddecimalDirective } from 'src/app/directive/allownumberanddecimal.directive';



@NgModule({
  declarations: [
    StateProfileComponent,
    ProfileComponent,
    PopulationDataComponent,
    HigherEducationDataComponent,
    RusaLegacyComponent,
    
  ],
  imports: [
    CommonModule,
    StateProfileRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectFilterModule,
    SharedModule
  ]
})
export class StateProfileModule { }
