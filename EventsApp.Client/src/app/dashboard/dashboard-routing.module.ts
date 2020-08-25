import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard.component";
import { PublicationComponent } from "../shared/publication/publication.component";
import { EventsComponent } from "../events/events.component";
import { AuthGuard } from "../guards/auth/auth.guard";

const dashboardRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", component: PublicationComponent, outlet: "dashboard" },
      { path: "events", component: EventsComponent, outlet: "dashboard" },
      { path: "events/details:id", component: EventsComponent, outlet: "dashboard" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
