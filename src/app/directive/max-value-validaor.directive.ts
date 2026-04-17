import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[maxValueValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: MaxValueValidatorDirective, multi: true}]
})
export class MaxValueValidatorDirective implements Validator{
  // our limit value
  @Input('maxValueValidator') maxValue: string;
  validator: ValidatorFn; 
  numValue: number; 
  constructor() { this.numValue = +this.maxValue}
  //needed by the Validator interface
  validate(control: AbstractControl): ValidationErrors {
    return this.maxValueValidator()(control);
  }

  // If value is valid it will return null 
  // if it's not it will return {'maxValueValidator': { value: control.value}}
  maxValueValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value > this.maxValue ? {'maxValueValidator': { value: control.value}} : null;
    };
  }
}