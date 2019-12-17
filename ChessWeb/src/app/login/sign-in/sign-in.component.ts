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
  Username = '';
  password = '';
  matcher = new ErrorMatcher();
  isLoadingResults = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private service: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'Username' : [null, Validators.required],
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
      if (res) {
        localStorage.setItem('token', res.token.refreshToken.refreshToken);
        localStorage.setItem('username', res.firstName);
        localStorage.setItem('email', res.Username);
        localStorage.setItem('userId', res.Id);        
        this.service.user = res;
        this.router.navigate(['']);
      }
    }, (err) => {
      console.log(err);
    });
  }


}
