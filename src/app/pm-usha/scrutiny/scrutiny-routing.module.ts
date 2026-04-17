import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrutinyComponent } from './scrutiny.component';
import { StateProfileScrutinyComponent } from './state-profile-scrutiny/state-profile-scrutiny.component';
import { CollegeScrutinyListComponent } from './college-scrutiny-list/college-scrutiny-list.component';
import { GenderScrutinyListComponent } from './gender-scrutiny-list/gender-scrutiny-list.component';

const routes: Routes = [{ path: '', component: ScrutinyComponent ,
children: [{ path: 'stateprofilescrutiny', component: StateProfileScrutinyComponent },
// { path: 'collegescrutinylist', component: CollegeScrutinyListComponent, canActivate: [AuthGuard] },
{ path: 'collegescrutinylist/:id', component:CollegeScrutinyListComponent },
{ path: 'universityscrutinylist/:id', component:CollegeScrutinyListComponent },
{ path: 'meruscrutinylist/:id', component:CollegeScrutinyListComponent},
{ path: 'genderscrutinylist/:id', component: GenderScrutinyListComponent},
{ path: 'nmdcscrutinylist/:id', component: GenderScrutinyListComponent},
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrutinyRoutingModule { }
