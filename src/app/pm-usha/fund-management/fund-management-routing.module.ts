import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FundManagementComponent } from './fund-management.component';
import { ESignFundComponent } from './e-sign-fund/e-sign-fund.component';
import { FundDemandComponent } from './fund-demand/fund-demand.component';
import { UtilizationCertificateComponent } from './utilization-certificate/utilization-certificate.component';

const routes: Routes = [
  {
    path: '', component: FundManagementComponent,
    children: [
      { path: 'fundDemand/:tabId', component: FundDemandComponent },
      { path: 'e-SignFundManagement/:txnId/:tabId/:status', component: ESignFundComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundManagementRoutingModule { }
