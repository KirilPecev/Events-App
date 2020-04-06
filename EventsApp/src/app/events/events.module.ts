import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { AuthGuard } from "../guards/auth/auth.guard";
import { EventsRoutingModule } from "./events-routing.module";
import { CreateEventComponent } from "./create-event/create-event.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { OtherEventComponent } from "./other-event/other-event.component";
import { SportEventComponent } from "./sport-event/sport-event.component";
import { EventsComponent } from "./events.component";
import { PositionsComponent } from "./positions/positions.component";

@NgModule({
  imports: [SharedModule, EventsRoutingModule],
  declarations: [
    EventsComponent,
    CreateEventComponent,
    EventDetailsComponent,
    OtherEventComponent,
    SportEventComponent,
    PositionsComponent,
  ],
  providers: [AuthGuard],
})
export class EventsModule {}
