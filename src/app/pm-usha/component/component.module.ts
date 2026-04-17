import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';
import { ComponentComponent } from './component.component';
import { ComponentMappingComponent } from './component-mapping/component-mapping.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ComponentlistComponent } from './componentlist/componentlist.component';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { InstituteListComponent } from './institute-list/institute-list.component';
import { MatSelectFilterModule } from 'mat-select-filter';




@NgModule({
  declarations: [
    ComponentComponent,
    ComponentMappingComponent,
    ComponentlistComponent,
    InstituteListComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,ReactiveFormsModule,NgxPaginationModule,MatSelectFilterModule,
  ],
  
  
})
export class ComponentModule { }
