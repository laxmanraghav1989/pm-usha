import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EventsManagementRoutingModule } from "./events-management-routing.module";
import { EventsManagementComponent } from "./events-management.component";
import { EventsComponent } from "./events/events.component";
import { AngularMaterialModule } from "src/app/angular-material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";

import {
  NgxMatNativeDateModule,
  NgxMatDatetimePickerModule
} from "@angular-material-components/datetime-picker";
import { SharedModule } from "src/app/shared-module/shared/shared.module";
import { EventListComponent } from './events/event-list/event-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
//import { AlphabetDirective } from "src/app/directive/alphabet.directive";

@NgModule({
  declarations: [EventsManagementComponent, EventsComponent, EventListComponent],
  imports: [
    CommonModule,
    EventsManagementRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    SharedModule,
    NgxPaginationModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EventsManagementModule {}
