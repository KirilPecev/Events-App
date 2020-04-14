import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AnonymousGuard } from "../guards/anonymous/anonymous.guard";

const authRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AnonymousGuard],
  },
  {
    path: "register",
    component: RegisterComponent,
    canActivate: [AnonymousGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
