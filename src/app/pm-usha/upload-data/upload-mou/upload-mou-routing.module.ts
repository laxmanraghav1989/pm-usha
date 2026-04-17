import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadMouComponent } from './upload-mou.component';
import { UploadComponent } from './upload/upload.component';
import { ViewUploadComponent } from './view-upload/view-upload.component';
import { NpdGuard } from 'src/app/authentication/npd.guard';
import { ViewMouGuard } from 'src/app/authentication/view-mou.guard';

const routes: Routes = [
  {
    path: '', component: UploadMouComponent,
    children: [
      { path: '', component: UploadComponent },
      { path: 'upload', component: UploadComponent, canActivate:[NpdGuard] },
      { path: 'viewMoU', component: ViewUploadComponent ,canActivate:[ViewMouGuard]}
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadMouRoutingModule { }
