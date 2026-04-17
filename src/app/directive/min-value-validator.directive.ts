import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[minValueValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: MinValueValidatorDirective, multi: true}]
})
export class MinValueValidatorDirective implements Validator{
  // our limit value
  @Input('minValueValidator') minValue: string;
  validator: ValidatorFn; 
  numValue: number; 
  constructor() { this.numValue = +this.minValue}
  //needed by the Validator interface
  validate(control: AbstractControl): ValidationErrors {
    return this.minValueValidator()(control);
  }

  // If value is valid it will return null 
  // if it's not it will return {'minValueValidator': { value: control.value}}
  minValueValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      return control.value < this.minValue ? {'minValueValidator': { value: control.value}} : null;
    };
  }
}