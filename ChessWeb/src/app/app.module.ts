import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { ProfileComponent } from './login/profile/profile.component';
import { RegisterComponent } from './login/register/register.component';
import { ToastComponent } from './toast/toast.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HighScoresComponent } from './high-scores/high-scores.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChessModule } from "./chess/chess.module";

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterComponent,
    ToastComponent,
    MainPageComponent,
    HighScoresComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    ChessModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
