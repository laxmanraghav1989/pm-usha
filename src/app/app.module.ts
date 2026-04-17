  import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { AuthGuard } from "src/app/authentication/auth.guard";
import { Interceptor } from "src/app/Interceptor/interceptor.interceptor";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { DatePipe } from "@angular/common";
import { CommonModuleModule } from "src/app/common-module/common-module.module";
import { ErrorComponent } from "src/app/error/error.component";
import { SharedService } from "src/app/shared/shared.service";
import { BrowserModule } from "@angular/platform-browser";
import { ToastrModule } from "ngx-toastr";
import { NgxPaginationModule } from "ngx-pagination";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatSelectFilterModule } from "mat-select-filter";
import { FooterComponent } from "./footer/footer.component";
import { NotificationService } from "./service/notification.service";
import { EncryptDecrypt } from "./utility/encrypt-decrypt";
import { TopBarComponent } from "./pm-usha/pages/top-bar/top-bar.component";
import { AboutComponent } from "./pages/about/about.component";
import { HeaderComponent } from "./header/header.component";
import { ObjectivesComponent } from "./pages/objectives/objectives.component";
import { ScopeComponent } from "./pages/scope/scope.component";
import { ComponentsComponent } from "./pages/components/components.component";
import { InstitutionalStrcutureComponent } from "./pages/institutional-strcuture/institutional-strcuture.component";
import { Common } from "./shared/common";
import { SearchPipe } from "./pipe/search.pipe";
import { HomeComponent } from "./pages/home/home.component";
import { VerifyUserComponent } from "./pages/verify-user/verify-user.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { NpdGuard } from "./authentication/npd.guard";
import { HelpComponent } from "./pages/help/help.component";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { FundManagementModule } from "./pm-usha/fund-management/fund-management.module";
import { ReadMoreDirective } from "./directive/read-more.directive";
import { RequestInterceptor } from "./Interceptor/request.interceptor";
import { GalleryComponent } from "./gallery/gallery.component";
import { MoreGalleryComponent } from "./more-gallery/more-gallery.component";
import { DocumentsComponent } from "./pages/documents/documents.component";
import { NgxSpinnerModule } from "ngx-spinner";

import { AgGridModule } from 'ag-grid-angular';
import { TagNamePipe } from "./utility/tag-name.pipe";

// import { ReadMoreComponent } from './pm-usha/activity/read-more/read-more.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    FooterComponent,
    GalleryComponent,
    TopBarComponent,
    AboutComponent,
    HeaderComponent,
    ObjectivesComponent,
    ScopeComponent,
    ComponentsComponent,
    InstitutionalStrcutureComponent,
    SearchPipe,
    HomeComponent,
    VerifyUserComponent,
    ForgotPasswordComponent,
    HelpComponent,
    ReadMoreDirective,
    MoreGalleryComponent,
    DocumentsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularMaterialModule,
    FundManagementModule,
    // SelectAutocompleteModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      maxOpened: 1,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: "decreasing"
    }),
    CommonModuleModule,
    NgbModule,
    MatSelectFilterModule,
    NgxSpinnerModule,
    AgGridModule
    // AgGridModule
  ],
  providers: [
    Common,
    AuthGuard,
    NpdGuard,
    SharedService,
    NotificationService,
    DatePipe,
    EncryptDecrypt,
    TagNamePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: RequestInterceptor,
    //   multi: true,
    // },
    { provide: MAT_DATE_LOCALE, useValue: "en-GB", multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
