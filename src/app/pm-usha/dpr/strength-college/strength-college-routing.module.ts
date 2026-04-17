import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StrengthCollegeComponent } from './strength-college.component';
import { CollegeSection1Component } from './college-section1/college-section1.component';
import { CollegeSection2Component } from './college-section2/college-section2.component';
import { CollegeProposalDetailsComponent } from './college-proposal-details/college-proposal-details.component';
import { CollegeOutcomesComponent } from './college-outcomes/college-outcomes.component';
import { CollegeProposalDetailsV3Component } from './college-version3/college-proposal-details-v3/college-proposal-details-v3.component';
import { CollegeOutcomesV3Component } from './college-version3/college-outcomes-v3/college-outcomes-v3.component';


const routes: Routes = [{ path: '', component: StrengthCollegeComponent,
children: [
  {path: 'section1', component: CollegeSection1Component},
  {path: 'section11/:id', component: CollegeSection1Component},
  {path: 'section2', component: CollegeSection2Component},
  {path: 'section12/:id', component: CollegeSection2Component},
  {path: 'section4', component: CollegeProposalDetailsComponent},
  {path: 'section14/:id', component: CollegeProposalDetailsComponent},
  {path: 'section14V3/:id', component: CollegeProposalDetailsV3Component},
  {path: 'section5', component: CollegeOutcomesComponent},
  {path: 'section15/:id', component: CollegeOutcomesComponent},
  {path: 'perposedOutcomeV3/:id', component: CollegeOutcomesV3Component},
],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrengthCollegeRoutingModule { }
