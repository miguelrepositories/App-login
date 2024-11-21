import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, AsyncValidatorFn } from '@angular/forms';
import { Register } from 'src/app/models/register';
import { SignupService } from 'src/app/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  emailPattern = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
  pwdPattern = '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$';

  constructor(
    private formBuilder: FormBuilder,
    private Service: SignupService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [null, [Validators.required, Validators.pattern(this.pwdPattern)]], 
      confirmPassword: [null, [Validators.required]],
    }, {
      validator: this.compareFields('password', 'confirmPassword') 
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

  onSubmit() {
    if(this.signupForm.valid){
      const obj: Register = {
        ...this.signupForm.value,
      }
      this.Service.register(obj).subscribe((response) => {
        alert("SUCESSO!");
        //actions
      }, (error) => {
        alert("Erro interno no servidor!");
      });
    }
  }
}