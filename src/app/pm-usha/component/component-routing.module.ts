import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentComponent } from './component.component';
import { ComponentMappingComponent } from './component-mapping/component-mapping.component';
import { ComponentlistComponent } from './componentlist/componentlist.component';
import { InstituteListComponent } from './institute-list/institute-list.component';

const routes: Routes = [{
  path: '', component: ComponentComponent,
  children: [
    { path: '', component: ComponentlistComponent },
    { path: 'componentList', component: ComponentlistComponent },
    { path: 'componentMapping/:id', component: ComponentMappingComponent },
    { path: 'instituteList/:id', component: InstituteListComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
