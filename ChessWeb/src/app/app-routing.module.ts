import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from '../app/main-page/main-page.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';


const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'highscores', component: HighScoresComponent},
  { path: 'signin', component: SignInComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // når login kræves først{ path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing = RouterModule.forRoot(routes);
