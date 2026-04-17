import { AbstractControl, ValidationErrors } from '@angular/forms';

export function aisheCodeValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const pattern = /^(C|U|S)-\d{1,5}$/;

  if (value && !pattern.test(value)) {
    return { invalidAisheCode: true };
  }

  return null;
}