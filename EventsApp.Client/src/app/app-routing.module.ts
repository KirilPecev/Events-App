import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserSettingsComponent } from "./profile/user-settings/user-settings.component";

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "events",
    loadChildren: () =>
      import("./events/events.module").then((m) => m.EventsModule),
  },
  {
    path: "profile",
    loadChildren: () =>
      import("./profile/profile.module").then((m) => m.ProfileModule),
  },
  {
    path: "settings/:userId",
    component: UserSettingsComponent,
  },
  { path: "**", redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
