import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DprComponent } from './dpr.component';
import { PrevillageGuard } from 'src/app/authentication/previllage.guard';
import { MeruGuard } from 'src/app/authentication/meru.guard';
import { GenderGuard } from 'src/app/authentication/gender.guard';
import { NmdcGuard } from 'src/app/authentication/nmdc.guard';
import { RevisedDprUploadComponent } from './revised-dpr-upload/revised-dpr-upload.component';



const routes: Routes = [{
  path: '', component: DprComponent,
  children: [
    { path: 'strengthen', loadChildren: () => import('./strength-college/strength-college.module').then(m => m.StrengthCollegeModule),canActivate:[PrevillageGuard] },
    { path: 'nmdCollege', loadChildren: () => import('./nmd-college/nmd-college.module').then(m => m.NmdCollegeModule),canActivate:[NmdcGuard] },
    { path: 'strengthenUniversity', loadChildren: () => import('./strength-university/strength-university.module').then(m => m.StrengthUniversityModule) },
    { path: 'giei', loadChildren: () => import('./giei/giei.module').then(m => m.GIEIModule),canActivate:[GenderGuard] },
    { path: 'meru', loadChildren: () => import('./meru/meru.module').then(m => m.MeruModule),canActivate:[MeruGuard] },
    { path: 'dprRevised', component : RevisedDprUploadComponent },

    
  ]
},
  
  
  
 
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DprRoutingModule { }
