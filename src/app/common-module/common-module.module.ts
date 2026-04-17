import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectFilterModule } from 'mat-select-filter';
import { ReadExploreComponent } from '../pm-usha/activity/read-explore/read-explore.component';
@NgModule({
    declarations: [],
    imports: [
        CommonModule, AngularMaterialModule, ReactiveFormsModule, FormsModule,MatSelectFilterModule
    ],
    exports: []
})
export class CommonModuleModule { }
