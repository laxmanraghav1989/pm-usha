import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentUploadRoutingModule } from './document-upload-routing.module';
import { DocumentUploadComponent } from './document-upload.component';
import { AngularMaterialModule } from '../../angular-material.module';
import { MatSelectFilterModule } from 'mat-select-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';

@NgModule({
  declarations: [
    DocumentUploadComponent,
    
  ],
  imports: [
    CommonModule,
    DocumentUploadRoutingModule,
    AngularMaterialModule,
    MatSelectFilterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxPaginationModule,
    SharedModule
  ],
  
  exports : [DocumentUploadComponent]
})
export class DocumentUploadModule { }
