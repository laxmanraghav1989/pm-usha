import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NpdComponent } from './npd.component';
import { StateProfileListComponent } from './state-profile-list/state-profile-list.component';
import { ViewStateProfileComponent } from './view-state-profile/view-state-profile.component';
import { ViewCollegeComponent } from './view-college/view-college.component';
import { CollegeListComponent } from './college-list/college-list.component';
import { ViewGenderEquityComponent } from './view-gender-equity/view-gender-equity.component';
import { ViewNmdcComponent } from './view-nmdc/view-nmdc.component';
import { GenderListComponent } from './gender-list/gender-list.component';
import { ConsolidatedProposalComponent } from './consolidated-proposal/consolidated-proposal.component';
import { AuthGuard } from 'src/app/authentication/auth.guard';
import { ViewCommonGuard } from 'src/app/authentication/view-common.guard';
import { ViewNmdcGuard } from 'src/app/authentication/view-nmdc.guard';
import { ViewMmerComponent } from './view-mmer/view-mmer.component';
import { StateGuard } from 'src/app/authentication/state.guard';
import { IframForwordComponent } from './ifram-forword/ifram-forword.component';
import { ESignSuccessComponent } from './e-sign-success/e-sign-success.component';
import { RusaProgessMoniteringComponent } from './rusa-progess-monitering/rusa-progess-monitering.component';
import { ConsolidatedProposalForwordedComponent } from './consolidated-proposal-forworded/consolidated-proposal-forworded.component';
import { RevisedConsolidatedComponent } from './revised-consolidated/revised-consolidated.component';
import { DprConsolidatedComponent } from './dpr-consolidated/dpr-consolidated.component';
import { RusaProgressUpdationComponent } from './rusa-progress-updation/rusa-progress-updation.component';





const routes: Routes = [{
  path: '', component: NpdComponent,
  children: [{ path: 'stateprofilelist', component: StateProfileListComponent, canActivate: [AuthGuard] },
  { path: 'viewState', component: ViewStateProfileComponent, canActivate: [AuthGuard] },
  { path: 'collegeList/:id/:stateCode', component: CollegeListComponent, canActivate: [AuthGuard] },
  { path: 'universityList/:id/:stateCode', component: CollegeListComponent, canActivate: [AuthGuard] },
  { path: 'meruList/:id/:stateCode', component: CollegeListComponent, canActivate: [AuthGuard] },
  { path: 'nmdcList/:id/:stateCode', component: GenderListComponent, canActivate: [AuthGuard] },
  { path: 'viewMmer', component: ViewMmerComponent },
  { path: 'genderList/:id/:stateCode', component: GenderListComponent, canActivate: [AuthGuard] },
  { path: 'view', component: ViewCollegeComponent, canActivate: [ViewCommonGuard] },
  { path: 'view/:id', component: ViewCollegeComponent, canActivate: [ViewCommonGuard] },
  { path: 'viewGenderEquity', component: ViewGenderEquityComponent, canActivate: [ViewNmdcGuard] },
  { path: 'viewGenderEquity/:id', component: ViewGenderEquityComponent, canActivate: [ViewNmdcGuard] },
  { path: 'viewNmdc', component: ViewNmdcComponent, canActivate: [ViewNmdcGuard] },
  { path: 'viewNmdc/:id', component: ViewNmdcComponent, canActivate: [ViewNmdcGuard] },
  { path: 'consolidatedProposal', component: ConsolidatedProposalComponent, canActivate: [AuthGuard] },
  { path: 'revisedConsolidatedProposal', component: RevisedConsolidatedComponent, canActivate: [AuthGuard] },
  { path: 'dprConsolidatedProposal', component: DprConsolidatedComponent, canActivate: [AuthGuard] },
  { path: 'forword/:src', component: IframForwordComponent, canActivate: [StateGuard] },
  { path: 'e-Sign/:txnId/:status', component: ESignSuccessComponent },
  { path: 'rusaprogressmonitoring', component:RusaProgessMoniteringComponent , canActivate: [AuthGuard] },
  { path: 'rusaprogressupdation', component:RusaProgressUpdationComponent , canActivate: [AuthGuard] },

  {path: 'consolidatedProposalForworded', component:ConsolidatedProposalForwordedComponent},
  

  ]
}]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NpdRoutingModule { }
