import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';

@Directive({
  selector: '[appInputValidator]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: InputValidatorDirective, multi: true
    }
  ]
})
export class InputValidatorDirective implements Validators {

  constructor() { }

  validate(control:any){
    let input :string = control.value.toString()
    if(input == ''){
      return null
    } else {
      
      return null
    }
  }

}
