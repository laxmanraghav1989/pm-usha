import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuditLogRoutingModule } from './audit-log-routing.module';
import { AuditLogComponent } from './audit-log.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivityLogComponent } from './activity-log/activity-log.component';
import { LoginTrailComponent } from './login-trail/login-trail.component';


@NgModule({
  declarations: [
    AuditLogComponent,
    ActivityLogComponent,
    LoginTrailComponent

  ],
  imports: [
    CommonModule,
    AuditLogRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectFilterModule
  ]
})
export class AuditLogModule { }
