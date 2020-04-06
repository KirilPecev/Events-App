import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CreateEventComponent } from "./create-event/create-event.component";
import { SportEventComponent } from "./sport-event/sport-event.component";
import { OtherEventComponent } from "./other-event/other-event.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { EventsComponent } from "./events.component";
import { AuthGuard } from "../guards/auth/auth.guard";

const authRoutes: Routes = [
  {
    path: "events/create-event",
    component: CreateEventComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "sport-event",
        component: SportEventComponent,
        outlet: "event",
      },
      {
        path: "other-event",
        component: OtherEventComponent,
        outlet: "event",
      },
    ],
  },
  {
    path: "events/details",
    component: EventDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "events",
    component: EventsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
