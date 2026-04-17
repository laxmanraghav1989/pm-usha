import { Injectable } from "@angular/core";
import { FormControl, NgForm, FormGroupDirective } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { SharedService } from "../shared/shared.service";
@Injectable({
  providedIn: 'root'
})
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null) {
    return control && control.invalid && control.touched;
  }
}
@Injectable({
  providedIn: 'root'
})
export class  validation{
  remainingText:any
  constructor(public sharedService: SharedService) {}
  valueChange(value) {
    this.remainingText = 1000 - value;
   }
}

