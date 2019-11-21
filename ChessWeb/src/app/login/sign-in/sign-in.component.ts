import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../user';

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {

  user: User;
  loginForm: FormGroup;
  email = '';
  password = '';
  matcher = new ErrorMatcher();
  isLoadingResults = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  register() {
    this.router.navigate(['register']);
  }

  onFormSubmit(form: NgForm) {
  this.service
    .login(form)
    .subscribe(res => {
      if (res.token) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', res.user.username);
        this.router.navigate(['programs']);
        //this.service.user = res.user;
      }
    }, (err) => {
      console.log(err);
    });
  }


}