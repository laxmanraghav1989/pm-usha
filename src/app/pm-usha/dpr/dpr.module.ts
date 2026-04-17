import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DprRoutingModule } from './dpr-routing.module';
import { DprComponent } from './dpr.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { RevisedDprUploadComponent } from './revised-dpr-upload/revised-dpr-upload.component';

// import { ReadUpdateComponent } from './meru/read-update/read-update.component';



@NgModule({
  declarations: [
    DprComponent,
    RevisedDprUploadComponent,
   
  ],
  imports: [
    CommonModule,
    DprRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DprModule { }
