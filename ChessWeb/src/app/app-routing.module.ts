import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainPageComponent } from "../app/main-page/main-page.component";
import { HighScoresComponent } from "./high-scores/high-scores.component";
import { SignInComponent } from "./login/sign-in/sign-in.component";
import { RegisterComponent } from "./login/register/register.component";
import { AuthGuard } from "./login/auth.guard";
import { ProfileComponent } from "./login/profile/profile.component";
import { GameComponent } from "./chess/game/game.component";

const routes: Routes = [
  { path: "highscores", component: HighScoresComponent },
  { path: "", canActivate: [AuthGuard], component: MainPageComponent },
  { path: "login", component: GameComponent },
  { path: "register", component: RegisterComponent },
  { path: "myprofile", canActivate: [AuthGuard], component: ProfileComponent },
  { path: "game", canActivate: [AuthGuard], component: GameComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

export const routing = RouterModule.forRoot(routes);
