import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NmdCollegeComponent } from './nmd-college.component';
import { NmdcSection1Component } from './nmdc-section1/nmdc-section1.component';
import { NmdcSection2Component } from './nmdc-section2/nmdc-section2.component';
import { NmdcSection5Component } from './nmdc-section5/nmdc-section5.component';
import { NmdcSection6Component } from './nmdc-section6/nmdc-section6.component';
import { NmdcSection7Component } from './nmdc-section7/nmdc-section7.component';

const routes: Routes = [{ path: '', component: NmdCollegeComponent,
children:[
{path:'nmdcSection1',component:NmdcSection1Component},
{path:'nmdcSection11/:id',component:NmdcSection1Component},
{path:'nmdcSection2', component:NmdcSection2Component},
{path:'nmdcSection12/:id', component:NmdcSection2Component},
{path:'nmdcSection5', component:NmdcSection5Component},
{path:'nmdcSection15/:id', component:NmdcSection5Component},
{path:'nmdcSection6', component:NmdcSection6Component},
{path:'nmdcSection16/:id', component:NmdcSection6Component},
{path:'nmdcSection7', component:NmdcSection7Component},
{path:'nmdcSection17/:id', component:NmdcSection7Component}
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NmdCollegeRoutingModule { }
