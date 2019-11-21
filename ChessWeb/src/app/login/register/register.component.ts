import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl, FormGroupDirective } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  username = '';
  email = '';
  password = '';
  isLoadingResults = false;
  matcher = new ErrorStateMatcher();

  constructor(private formBuilder: FormBuilder, private router: Router, private service: LoginService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({      
      username : [null, Validators.required],
      email : [null, Validators.required],
      password : [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.service.register(form)
      .subscribe(res => {
        this.router.navigate(['users/login']);
      }, (err) => {
        console.log(err);
        alert(err.error);
    });
  }
}
