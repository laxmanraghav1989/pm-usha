import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadMouRoutingModule } from './upload-mou-routing.module';
import { UploadMouComponent } from './upload-mou.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { UploadComponent } from './upload/upload.component';
import { ViewUploadComponent } from './view-upload/view-upload.component';


@NgModule({
  declarations: [
    UploadMouComponent,
    UploadComponent,
    ViewUploadComponent
  ],
  imports: [
    CommonModule,
    UploadMouRoutingModule,
    AngularMaterialModule,FormsModule,ReactiveFormsModule,MatSelectFilterModule,NgxPaginationModule
  ]
})
export class UploadMouModule { }
