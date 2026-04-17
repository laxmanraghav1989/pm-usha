import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UtilizationCertificateModuleComponent } from './utilization-certificate-module.component';
import { ViewUtilizationComponent } from './view-utilization/view-utilization.component';

const routes: Routes = [{
  path: '', component: UtilizationCertificateModuleComponent,
  children: [{ path: 'utilization', component: ViewUtilizationComponent }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilizationCertificateModuleRoutingModule { }
