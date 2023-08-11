import { AbstractControl, ValidationErrors } from '@angular/forms';

function titleLengthValidator(control: AbstractControl): ValidationErrors | null {
  const minLength = 5;
  const maxLength = 10;

  if (control.value.length < minLength) {
    return {
      errors: [
        {
          message: `The title must be at least ${minLength} characters long.`,
        },
      ],
    };
  }

  if (control.value.length > maxLength) {
    return {
      errors: [
        {
          message: `The title must be no more than ${maxLength} characters long.`,
        },
      ],
    };
  }

  return null;
}

export default titleLengthValidator;