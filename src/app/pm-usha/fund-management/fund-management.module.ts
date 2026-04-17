import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FundManagementRoutingModule } from './fund-management-routing.module';
import { FundManagementComponent } from './fund-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { BriefDetailsComponent } from './brief-details/brief-details.component';
import { UtilizationCertificateComponent } from './utilization-certificate/utilization-certificate.component';
import { ProposalSelectionComponent } from './proposal-selection/proposal-selection.component';
import { ProposalComponent } from './proposal/proposal.component';
import { OverallRemarkComponent } from './overall-remark/overall-remark.component';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import { ESignFundComponent } from './e-sign-fund/e-sign-fund.component';
import { FundDemandComponent } from './fund-demand/fund-demand.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { IfdChecklistComponent } from './ifd-checklist/ifd-checklist.component';




@NgModule({
  declarations: [
    FundManagementComponent,
    BriefDetailsComponent,
    IfdChecklistComponent,
    UtilizationCertificateComponent,
    ProposalSelectionComponent,
    ProposalComponent,
    OverallRemarkComponent,
    ESignFundComponent,
    FundDemandComponent



  ],
  imports: [
    CommonModule,
    FundManagementRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectFilterModule,
    SharedModule,
    MatProgressBarModule,
    MatButtonModule

  ]
})
export class FundManagementModule { }
