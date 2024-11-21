import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  pwdPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$';

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.newPasswordForm = this.formBuilder.group({
      newPwd: [null, [Validators.required, Validators.pattern(this.pwdPattern)]], 
      checkNewPwd: [null, [Validators.required]],
    }, {
      validator: this.compareFields('newPwd', 'checkNewPwd') 
    });
  }

  compareFields(field: string, otherField: string){
    const validator = (formGroup: FormGroup) => {
      const firstField = formGroup.controls[field];
      const secondField = formGroup.controls[otherField];

      if(firstField.errors){
        return;
      }
      if(firstField.value && secondField.value){
        firstField.value !== secondField.value ? secondField.setErrors({ diff: true}) : null;
      }
    }
    return validator;
  }

  restore() {
    if(this.newPasswordForm.valid){
      //actions
    }
  }
}
