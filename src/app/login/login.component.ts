import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @Output() loginEvent = new EventEmitter<void>();

  mail: string = 'test@test.com';
  pass: string = 'Shubham@1';
  signInForm: any = FormGroup;

  generateForm() {
    this.signInForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
        ),
      ]),
    });
  }

  constructor(private fb: FormBuilder) {
    this.generateForm();
  }

  onSubmit() {
    if (
      this.signInForm.value.email === this.mail &&
      this.signInForm.value.password === this.pass
    ) {
      this.loginEvent.emit();
      console.log('Matched');
      this.signInForm.reset();
    }
  }
}
