import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleFormComponent } from './sample-form/sample-form.component';

const routes: Routes = [
  {
    path: '', component: SampleFormComponent,
    children: [
      { path: 'statusNote', component: SampleFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusNoteRoutingModule { }
