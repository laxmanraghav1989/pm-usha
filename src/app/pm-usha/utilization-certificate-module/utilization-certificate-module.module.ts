import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilizationCertificateModuleRoutingModule } from './utilization-certificate-module-routing.module';
import { UtilizationCertificateModuleComponent } from './utilization-certificate-module.component';
import { UtilizationComponent } from './utilization/utilization.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { MatSelectFilterModule } from 'mat-select-filter';
import { ViewUtilizationComponent } from './view-utilization/view-utilization.component';
import { DocumentUploadModule } from '../document-upload/document-upload.module';


@NgModule({
  declarations: [
    UtilizationCertificateModuleComponent,
    UtilizationComponent,
    ViewUtilizationComponent,
  ],
  imports: [
    CommonModule,
    UtilizationCertificateModuleRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatSelectFilterModule,
    DocumentUploadModule,
    

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
  
})
export class UtilizationCertificateModuleModule { }
