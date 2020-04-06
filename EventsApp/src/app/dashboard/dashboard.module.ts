import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { DashboardComponent } from "./dashboard.component";
import { AuthGuard } from "../guards/auth/auth.guard";

@NgModule({
  imports: [SharedModule, DashboardRoutingModule],
  declarations: [DashboardComponent],
  providers: [AuthGuard],
})
export class DashboardModule {}
