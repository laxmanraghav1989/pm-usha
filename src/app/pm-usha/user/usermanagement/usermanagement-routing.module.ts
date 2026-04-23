import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsermanagementComponent } from './usermanagement.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { EditRegistrationComponent } from './edit-registration/edit-registration.component';
import { RoleGuard } from 'src/app/authentication/role.guard';

const routes: Routes = [
  {
    path: '', component: UsermanagementComponent,
    children: [
      { path: 'add', component: AddUserComponent,canActivate: [RoleGuard], data: [{ role: 'SAA' },{ role: 'SAA-Non-MoU' }], },
      { path: 'add1/:DNO', component: AddUserComponent,canActivate: [RoleGuard], data: [{ role: 'SAA' },{ role: 'SNO' },{ role: 'SAA-Non-MoU' }],},
      { path: 'addUno/:DNO', component: AddUserComponent, canActivate: [RoleGuard], data: [{ role: 'SAA' },{ role: 'SNO' },{ role: 'SAA-Non-MoU' }], },
      { path: 'addCno/:DNO', component: AddUserComponent,canActivate: [RoleGuard], data: [{ role: 'SAA' },{ role: 'SNO' },{ role: 'SAA-Non-MoU' }],},
      { path: 'addTsg/:DNO', component: AddUserComponent,canActivate: [RoleGuard], },

      { path: 'addUserO/:DNO', component: AddUserComponent,canActivate: [RoleGuard], data: [{ role: 'NMD-NPD' }, { role: 'MoE-NPD' }], },
      { path: 'addsaa/:SAA', component: AddUserComponent,canActivate: [RoleGuard], data: [{ role: 'NMD-NPD' }, { role: 'MoE-NPD' }], },
      { path: 'addsaaNone/:SAA', component: AddUserComponent, canActivate: [RoleGuard], data: [{ role: 'NMD-NPD' }, { role: 'MoE-NPD' }], },
      { path: 'addspd/:SAA', component: AddUserComponent, canActivate: [RoleGuard],data: [{ role: 'NMD-NPD' },{ role: 'SAA' },{ role: 'SNO' }, { role: 'MoE-NPD' }],},

         { path: 'addrusa/:RUSAUser', component: AddUserComponent, canActivate: [RoleGuard],data: [{ role: 'NMD-NPD' },{ role: 'SAA' }, { role: 'MoE-NPD' }],},

      { path: 'edit', component: EditRegistrationComponent, canActivate: [RoleGuard],},
      { path: 'view', component: ViewUserComponent,canActivate: [RoleGuard],data: [{ role: 'NMD-NPD' },{ role: 'SAA' },{ role: 'TSG-CC' }, { role: 'TSG-C' },{ role: 'SNO' },{ role: 'PAB-NPD' },{ role: 'MoE-NPD' },{ role: 'SAA-Non-MoU' }], },
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermanagementRoutingModule { }
