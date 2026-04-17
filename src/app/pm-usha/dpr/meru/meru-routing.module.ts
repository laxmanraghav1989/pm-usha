import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeruComponent } from './meru.component';
import { MeruSection1Component } from './meru-section1/meru-section1.component';
import { MeruSection2Component } from './meru-section2/meru-section2.component';
import { MeruSection4Component } from './meru-section4/meru-section4.component';
import { MeruSection5Component } from './meru-section5/meru-section5.component';
import { MeruSectionv3Component } from './meru-version3/meru-sectionv3/meru-sectionv3.component';
import { ProposedOutcomesSourcesV3Component } from './meru-version3/proposed-outcomes-sources-v3/proposed-outcomes-sources-v3.component';

const routes: Routes = [{
  path: '', component: MeruComponent,
  children: [{ path: 'meruSection1', component: MeruSection1Component },
  { path: 'meruSection11/:id', component: MeruSection1Component },
  { path: 'meruSection2', component: MeruSection2Component },
  { path: 'meruSection12/:id', component: MeruSection2Component },
  { path: 'meruSection4', component: MeruSection4Component },
  { path: 'meruSection14/:id', component: MeruSection4Component },
  { path: 'meruSection5', component: MeruSection5Component },
  { path: 'meruSection15/:id', component: MeruSection5Component },
  { path: 'meruSectionV3/:id', component: MeruSectionv3Component },
  { path: 'perposedCourseV3/:id', component: ProposedOutcomesSourcesV3Component },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeruRoutingModule { }
