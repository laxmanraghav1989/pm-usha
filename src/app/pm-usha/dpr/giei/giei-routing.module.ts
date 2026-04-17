import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GIEIComponent } from './giei.component';
import { GieiSection1Component } from './giei-section1/giei-section1.component';
import { GieiProposalDetailsComponent } from './giei-proposal-details/giei-proposal-details.component';
import { GieiOutcomesComponent } from './giei-outcomes/giei-outcomes.component';
import { GieiProposalDetailsV3Component } from './giei-version3/giei-proposal-details-v3/giei-proposal-details-v3.component';
import { GieiOutcomesV3Component } from './giei-version3/giei-outcomes-v3/giei-outcomes-v3.component';

const routes: Routes = [{ path: '', component: GIEIComponent,
children: [
          {path: 'gieiSection1', component: GieiSection1Component},
          {path: 'gieiSection3', component: GieiProposalDetailsComponent},
          {path: 'gieiSection4', component: GieiOutcomesComponent},
          {path: 'gieiSection11/:id', component: GieiSection1Component},
          {path: 'gieiSection13/:id', component: GieiProposalDetailsComponent},
          {path: 'gieiSection14/:id', component: GieiOutcomesComponent},
          {path: 'gieiOutcomeV3/:id', component: GieiOutcomesV3Component},
          {path: 'gieiSection13V3/:id', component: GieiProposalDetailsV3Component},
],

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GIEIRoutingModule { }
