import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SettingsComponent } from "./settings.component";
import { AuthGuard } from "../guards/auth/auth.guard";
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { SecuritySettingsComponent } from './security-settings/security-settings.component';

const settingsRoutes: Routes = [
  {
    path: ":userId",
    component: SettingsComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: "account",
        component: GeneralSettingsComponent,
        outlet: "settings"
      },
      {
        path: "security",
        component: SecuritySettingsComponent,
        outlet: "settings"
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
