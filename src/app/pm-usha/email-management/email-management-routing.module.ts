import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailManagementComponent } from './email-management.component';
import { EmailManagementSubmitComponent } from './email-management-submit/email-management-submit.component';

const routes: Routes = [{ path: '', component: EmailManagementComponent 
  , children: [
        { path: '', component: EmailManagementSubmitComponent },
        { path: 'emailManagementSubmit', component: EmailManagementSubmitComponent },
      
      ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailManagementRoutingModule { }
