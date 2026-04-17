import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditLogComponent } from './audit-log.component';
import { LoginTrailComponent } from './login-trail/login-trail.component';
import { ActivityLogComponent } from './activity-log/activity-log.component';

const routes: Routes = [{
  path: '', component: AuditLogComponent,
  children: [
    { path: 'login_trail', component: LoginTrailComponent },
    { path: 'activity_log', component: ActivityLogComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditLogRoutingModule { }
