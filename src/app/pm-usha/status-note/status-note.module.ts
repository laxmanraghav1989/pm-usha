import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatusNoteRoutingModule } from './status-note-routing.module';
import { SampleFormComponent } from './sample-form/sample-form.component';
import { StatusNoteOneComponent } from './sample-form/status-note-one/status-note-one.component';
import { StatusNoteTwoComponent } from './sample-form/status-note-two/status-note-two.component';
import { StatusNoteThreeComponent } from './sample-form/status-note-three/status-note-three.component';
import { StatusNoteFourComponent } from './sample-form/status-note-four/status-note-four.component';
import { StatusNoteFiveComponent } from './sample-form/status-note-five/status-note-five.component';
import { StatusNoteSixComponent } from './sample-form/status-note-six/status-note-six.component';
import { StatusNoteSevenComponent } from './sample-form/status-note-seven/status-note-seven.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSelectFilterModule } from 'mat-select-filter';
import { SharedModule } from 'src/app/shared-module/shared/shared.module';


@NgModule({
  declarations: [
    SampleFormComponent,
    StatusNoteOneComponent,
    StatusNoteTwoComponent,
    StatusNoteThreeComponent,
    StatusNoteFourComponent,
    StatusNoteFiveComponent,
    StatusNoteSixComponent,
    StatusNoteSevenComponent,
  ],
  imports: [
    CommonModule,
    StatusNoteRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatSelectFilterModule,
    SharedModule
  ]
})
export class StatusNoteModule { }
