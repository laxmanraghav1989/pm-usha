import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmprogresmonitComponent } from './pmprogresmonit.component';
import { CollegePmushaListComponent } from './college-pmusha-list/college-pmusha-list.component';
import { GenderPmushaListComponent } from './gender-pmusha-list/gender-pmusha-list.component';
import { CollegeLockListComponent } from './college-lock-list/college-lock-list.component';
import { ProjectItemTaggingComponent } from './project-item-tagging/project-item-tagging.component';
import { ViewCommonInsGuard } from 'src/app/authentication/view-common-ins.guard';
import { ViewTagGuard } from 'src/app/authentication/view-tag.guard';
import { RevisionPmushaListComponent } from './revision-pmusha-list/revision-pmusha-list.component';
import { ReRevisionPmushaListV3Component } from './re-revision-pmusha-list-v3/re-revision-pmusha-list-v3.component';
import { RevisionFinalListComponent } from './pm-usha-report/revision-final-list/revision-final-list.component';

const routes: Routes = [{ path: '', component: PmprogresmonitComponent ,
children: [
{ path: 'collegelocklist', component:CollegeLockListComponent },
// { path: 'projectItemTag', component:ProjectItemTaggingComponent },
{ path: 'collegeprogresslist/:id', component:CollegePmushaListComponent },
{ path: 'universityprogresslist/:id', component:CollegePmushaListComponent },
{ path: 'meruprogresslist/:id', component:CollegePmushaListComponent},
{ path: 'genderprogresslist/:id', component: GenderPmushaListComponent},
{ path: 'nmdcprogresslist/:id', component: GenderPmushaListComponent},

{ path: 'pmushalistRevision/:revision', component:RevisionPmushaListComponent },
{ path: 'pmushalistReRevision/:re-revision', component:ReRevisionPmushaListV3Component },
{ path: 'pmushalistApproved/:revision', component:RevisionFinalListComponent },
{ path: 'collegeprogresslistRevision/:id/:revision', component:CollegePmushaListComponent },
{ path: 'universityprogresslistRevision/:id/:revision', component:CollegePmushaListComponent },
{ path: 'meruprogresslistRevision/:id/:revision', component:CollegePmushaListComponent},
{ path: 'genderpmushalistRevision/:id/:revision', component:GenderPmushaListComponent},
{ path: 'nmdcpmushalistRevision/:id/:revision', component:GenderPmushaListComponent},

{ path: 'collegeProjectItemTag/:revision', component:ProjectItemTaggingComponent, canActivate: [ViewTagGuard] },
// { path: 'universityProjectItemTag/:id/:revision', component:ProjectItemTaggingComponent, canActivate: [ViewTagGuard] },
// { path: 'merupProjectItemTag/:id/:revision', component:ProjectItemTaggingComponent, canActivate: [ViewTagGuard]},
// { path: 'genderProjectItemTag/:id/:revision', component:ProjectItemTaggingComponent, canActivate: [ViewTagGuard]},
]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmprogresmonitRoutingModule { }
