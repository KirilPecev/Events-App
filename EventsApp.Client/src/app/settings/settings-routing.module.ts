import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsComponent } from "./settings.component";
import { AuthGuard } from "../guards/auth/auth.guard";

const settingsRoutes: Routes = [
  {
    path: ":userId",
    component: SettingsComponent,
    canActivateChild: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
