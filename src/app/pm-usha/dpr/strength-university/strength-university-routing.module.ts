import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StrengthUniversityComponent } from './strength-university.component';
import { UniversitySection1Component } from './university-section1/university-section1.component';
import { UniversitySection2Component } from './university-section2/university-section2.component';
import { UniversityProposalDetailsComponent } from './university-proposal-details/university-proposal-details.component';
import { UniversityOutcomesComponent } from './university-outcomes/university-outcomes.component';

const routes: Routes = [{ path: '', component: StrengthUniversityComponent,
children: [{path: 'universitysection1', component: UniversitySection1Component},
{path: 'universitysection2', component: UniversitySection2Component},
{path: 'universitysection4', component: UniversityProposalDetailsComponent},
{path: 'universitysection5', component: UniversityOutcomesComponent},

],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StrengthUniversityRoutingModule { }
