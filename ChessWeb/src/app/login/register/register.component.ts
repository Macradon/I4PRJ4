import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class PasswordMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control.dirty || control.touched || isSubmitted);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  firstName = '';
  lastName = '';
  Username = '';
  password = '';
  confirmPassword = '';
  mismatch: boolean;
  isLoadingResults = false;
  matcher = new ErrorMatcher();
  pwmatcher = new PasswordMatcher();
  constructor(private formBuilder: FormBuilder, private router: Router, private service: LoginService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({      
      firstName : [null, Validators.required],
      lastName : [null, Validators.required],
      Username : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    console.log(form)
    this.service.register(form)
      .subscribe(res => {
        this.router.navigate(['login']);
      }, (err) => {
        console.log(err);
        alert(err.error);
    });
  }

  onInput(value) {
    if(this.registerForm.get('password').dirty && this.registerForm.get('confirmPassword').dirty){
      if (this.registerForm.value.password === value || value === '') this.mismatch = false;      
      else this.mismatch = true; 
    }    
  }
}
