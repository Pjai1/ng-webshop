import { Input, Directive } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

// tslint:disable-next-line
@Directive({ selector: '[formState]' })
export class FormStateDataDirective {
  @Input('formState')
  set data(data: any) {
    if (data) {
      this.formGroupDirective.form.patchValue(data);
      this.formGroupDirective.form.markAsPristine();
    }
  }
  constructor(private formGroupDirective: FormGroupDirective) {}
}
