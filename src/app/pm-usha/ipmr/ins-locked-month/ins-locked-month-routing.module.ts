import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsLockedMonthComponent } from './ins-locked-month.component';
import { ViewInsUniverComponent } from '../view-ins-univer/view-ins-univer.component';

const routes: Routes = [
  {
    path: '',
    component: InsLockedMonthComponent,
    children: [
      {
        path: '',
        component: InsLockedMonthComponent
      },
      {
        path: 'college/:componentId/:lockId/:year/:month/:id/:stateCode',
        component: ViewInsUniverComponent
      },
      // {
      //   path: 'gender/:componentId/:lockId/:year/:month/:id/:stateCode',
      //   component: ViewInstGenderLockComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsLockedMonthRoutingModule { }
