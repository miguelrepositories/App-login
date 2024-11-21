import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {
  recoverForm: FormGroup;
  emailPattern = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.recoverForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
    });
  }

  send() {
    this.recoverForm.markAllAsTouched();
    if(this.recoverForm.valid){
      //actions
    }
  }
}
