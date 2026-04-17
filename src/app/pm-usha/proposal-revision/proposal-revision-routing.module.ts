import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewStrengthRevisionComponent } from './view-strength-revision/view-strength-revision.component';
import { ViewCommonInsGuard } from 'src/app/authentication/view-common-ins.guard';
import { ProposalRevisionComponent } from './proposal-revision.component';
import { ViewMeruRevisionComponent } from './view-meru-revision/view-meru-revision.component';
import { ViewEquityRevisionComponent } from './view-equity-revision/view-equity-revision.component';
import { ViewNmdcRevisionComponent } from './view-nmdc-revision/view-nmdc-revision.component';
import { ViewMeruCollegeUniversityV3Component } from './view-meru-college-university-v3/view-meru-college-university-v3.component';
import { ViewEquityNmdcRevisionV3Component } from './view-equity-nmdc-revision-v3/view-equity-nmdc-revision-v3.component';

const routes: Routes = [{
  path: '', component:ProposalRevisionComponent,
  children: [
    {path: 'viewStrenthRevision', component:ViewStrengthRevisionComponent, canActivate: [ViewCommonInsGuard] },
    {path: 'viewStrenthRevision/:id', component:ViewStrengthRevisionComponent, canActivate: [ViewCommonInsGuard] },
    {path: 'viewStrenthRevisionApp/:id/:AppId', component:ViewStrengthRevisionComponent, canActivate: [ViewCommonInsGuard] },
    {path: 'viewMeruCollegeUniversityRevisionV3/:id', component:ViewMeruCollegeUniversityV3Component, canActivate: [ViewCommonInsGuard] },
    {path: 'viewMeruCollegeUniversityRevisionAppV3/:id/:AppId', component:ViewMeruCollegeUniversityV3Component, canActivate: [ViewCommonInsGuard] },
    {path: 'viewEquityNMDCRevisionV3/:id', component:ViewEquityNmdcRevisionV3Component, canActivate: [ViewCommonInsGuard] },
    {path: 'viewEquityNMDCRevisionAppV3/:id/:AppId', component:ViewEquityNmdcRevisionV3Component, canActivate: [ViewCommonInsGuard] },
    {path: 'viewMeruRevision', component:ViewMeruRevisionComponent, canActivate: [ViewCommonInsGuard] },
    {path: 'viewMeruRevision/:id', component:ViewMeruRevisionComponent, canActivate: [ViewCommonInsGuard] },
    {path: 'viewMeruRevisionApp/:id/:AppId', component:ViewMeruRevisionComponent, canActivate: [ViewCommonInsGuard] },
    {path: 'viewEquityRevision', component:ViewEquityRevisionComponent, canActivate: [ViewCommonInsGuard] },
    {path: 'viewEquityRevision/:id', component:ViewEquityRevisionComponent, canActivate: [ViewCommonInsGuard] },
    {path: 'viewEquityRevisionApp/:id/:AppId', component:ViewEquityRevisionComponent, canActivate: [ViewCommonInsGuard] },
    {path: 'viewNMDCRevision', component:ViewNmdcRevisionComponent, canActivate: [ViewCommonInsGuard] },
    {path: 'viewNMDCRevision/:id', component:ViewNmdcRevisionComponent, canActivate: [ViewCommonInsGuard] },
    {path: 'viewNMDCRevisionApp/:id/:AppId', component:ViewNmdcRevisionComponent, canActivate: [ViewCommonInsGuard] }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalRevisionRoutingModule { }
