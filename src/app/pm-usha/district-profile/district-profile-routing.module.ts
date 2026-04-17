import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistrictProfileComponent } from './district-profile.component';
import { DistrictHigherEducationComponent } from './district-higher-education/district-higher-education.component';
import { DProfileComponent } from './d-profile/d-profile.component';

const routes: Routes = [
  {
    path: "",
    component: DistrictProfileComponent,
    children: [{ path: "basicdistrict", component: DProfileComponent },
    { path: "districthighereducation", component: DistrictHigherEducationComponent },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistrictProfileRoutingModule { }
