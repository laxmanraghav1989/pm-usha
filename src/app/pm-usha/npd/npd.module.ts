import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NpdRoutingModule } from './npd-routing.module';
import { NpdComponent } from './npd.component';
import { StateProfileListComponent } from './state-profile-list/state-profile-list.component';
import { StateProfileDetailComponent } from '../../dialog/state-profile-detail/state-profile-detail.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchstatelistPipe } from './searchstatelist.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewStateProfileComponent } from './view-state-profile/view-state-profile.component';
import { ViewCollegeComponent } from './view-college/view-college.component';
import { CollegeListComponent } from './college-list/college-list.component';
import { ViewGenderEquityComponent } from './view-gender-equity/view-gender-equity.component';
import { ViewNmdcComponent } from './view-nmdc/view-nmdc.component';
import { GenderListComponent } from './gender-list/gender-list.component';
import { ConsolidatedProposalComponent } from './consolidated-proposal/consolidated-proposal.component';
import { MatSelectFilterModule } from 'mat-select-filter';
import { ViewMmerComponent } from './view-mmer/view-mmer.component';
import { IframForwordComponent } from './ifram-forword/ifram-forword.component';
import { ESignSuccessComponent } from './e-sign-success/e-sign-success.component';
import { RusaProgessMoniteringComponent } from './rusa-progess-monitering/rusa-progess-monitering.component';
//import { NumericDirective } from 'src/app/directive/numeric.directive';
//import { OnlyNumericDirective } from 'src/app/directive/only-numeric.directive';
import { ConsolidatedProposalForwordedComponent } from './consolidated-proposal-forworded/consolidated-proposal-forworded.component';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import { RevisedConsolidatedComponent } from './revised-consolidated/revised-consolidated.component';
import { ComparisionMprDataComponent } from './rusa-progess-monitering/comparision-mpr-data/comparision-mpr-data.component';
import { RevisedConsolidatedListComponent } from './revised-consolidated-list/revised-consolidated-list.component';
import { DprConsolidatedComponent } from './dpr-consolidated/dpr-consolidated.component';
import { RusaProgressUpdationComponent } from './rusa-progress-updation/rusa-progress-updation.component';




@NgModule({
  declarations: [
    NpdComponent,
    StateProfileListComponent,
    StateProfileDetailComponent,
    SearchstatelistPipe,
    ViewStateProfileComponent,
    ViewCollegeComponent,
    CollegeListComponent,
    ViewGenderEquityComponent,
    ViewNmdcComponent,
    GenderListComponent,
    ConsolidatedProposalComponent,
    ViewMmerComponent,
    IframForwordComponent,
    ESignSuccessComponent,
    RusaProgessMoniteringComponent,
    ConsolidatedProposalForwordedComponent,
    RevisedConsolidatedComponent,
    ComparisionMprDataComponent,
    RevisedConsolidatedListComponent,
    DprConsolidatedComponent,
    RusaProgressUpdationComponent,
    
  ],
  imports: [
    CommonModule,
    NpdRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectFilterModule,
    SharedModule,
    MatTooltipModule,
  ],
  exports: [CollegeListComponent, GenderListComponent]
})
export class NpdModule { }
