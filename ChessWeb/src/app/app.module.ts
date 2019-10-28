import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { RegisterComponent } from './login/register/register.component';
import { ToastComponent } from './toast/toast.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainPageModule } from './main-page/main-page.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    RegisterComponent,
    ToastComponent,
    MainPageComponent,
    HighScoresComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
