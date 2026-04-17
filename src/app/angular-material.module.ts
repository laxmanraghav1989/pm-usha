import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';

// import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
   NgxMatDatetimePickerModule,
   NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';


@NgModule({
   imports: [
      CommonModule,
      MatButtonModule,
      // MatToolbarModule,
      // MatBadgeModule,
      // MatSidenavModule,
      // MatListModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      // MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatMenuModule,
      MatAutocompleteModule,
      MatSortModule,
      MatCheckboxModule,
      MatTabsModule,
      MatSlideToggleModule,
      MatCardModule,
      MatIconModule,
      MatDialogModule,
      // MatProgressBarModule,
      MatToolbarModule,
      MatExpansionModule,
      MatDividerModule,
      NgxMatDatetimePickerModule,
      NgxMatTimepickerModule,
      // NgxMatMomentModule,


   ],
   exports: [
      MatButtonModule,
      MatToolbarModule,
      // MatBadgeModule,
      // MatSidenavModule,
      // MatListModule,
      MatGridListModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      // MatChipsModule,
      MatTooltipModule,
      MatTableModule,
      MatPaginatorModule,
      MatMenuModule,
      MatAutocompleteModule,
      MatSortModule,
      MatCheckboxModule,
      MatTabsModule,
      MatSlideToggleModule,
      MatCardModule,
      MatIconModule,
      MatDialogModule,
      // MatProgressBarModule ,
      // MatToolbarModule,
      MatExpansionModule,
      MatDividerModule,
      NgxMatDatetimePickerModule,
      NgxMatTimepickerModule,
      // NgxMatMomentModule,
   ],
   providers: [
      MatDatepickerModule,
   ]
})

export class AngularMaterialModule { }
