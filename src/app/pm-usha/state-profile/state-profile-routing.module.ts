import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StateProfileComponent } from "./state-profile.component";
import { ProfileComponent } from "./component/profile/profile.component";
import { PopulationDataComponent } from "./component/population-data/population-data.component";
import { HigherEducationDataComponent } from "./component/higher-education-data/higher-education-data.component";
import { RusaLegacyComponent } from "./rusa-legacy/rusa-legacy.component";

const routes: Routes = [
  {
    path: "",
    component: StateProfileComponent,
    children: [{ path: "basic", component: ProfileComponent },
    { path: "populationData", component: PopulationDataComponent },
    { path: 'highereducation', component: HigherEducationDataComponent },
    { path: 'rusaLegacy', component: RusaLegacyComponent },
   
    
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateProfileRoutingModule { }
