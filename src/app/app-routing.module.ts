import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { AuthGuard } from './authentication/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { ObjectivesComponent } from './pages/objectives/objectives.component';
import { ScopeComponent } from './pages/scope/scope.component';
import { ComponentsComponent } from './pages/components/components.component';
import { InstitutionalStrcutureComponent } from './pages/institutional-strcuture/institutional-strcuture.component';
import { HomeComponent } from './pages/home/home.component';
import { VerifyUserComponent } from './pages/verify-user/verify-user.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { HelpComponent } from './pages/help/help.component';
import { MoreGalleryComponent } from './more-gallery/more-gallery.component';
import { DocumentsComponent } from './pages/documents/documents.component';



const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'app', loadChildren: () => import('./pm-usha/pm-usha.module').then(m => m.PmUshaModule), canLoad: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'objectives', component: ObjectivesComponent },
  { path: 'moreGallery', component: MoreGalleryComponent },
  { path: 'institutionalStructure', component: InstitutionalStrcutureComponent },
  { path: 'scope', component: ScopeComponent },
  { path: 'components', component: ComponentsComponent },
  { path: 'document', component: DocumentsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'verifyUser', component: VerifyUserComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', component: ErrorComponent }
  

];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
