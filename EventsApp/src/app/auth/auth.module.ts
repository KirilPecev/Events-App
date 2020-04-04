import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AnonymousGuard } from "../guards/anonymous/anonymous.guard";

@NgModule({
  imports: [SharedModule, AuthRoutingModule],
  declarations: [LoginComponent, RegisterComponent],
  providers: [AnonymousGuard],
})
export class AuthModule {}
