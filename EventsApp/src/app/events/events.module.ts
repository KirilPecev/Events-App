import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { MatExpansionModule } from '@angular/material/expansion';
import { EventsRoutingModule } from "./events-routing.module";
import { CreateEventComponent } from "./create-event/create-event.component";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { OtherEventComponent } from "./other-event/other-event.component";
import { SportEventComponent } from "./sport-event/sport-event.component";
import { EventsComponent } from "./events.component";
import { PositionsComponent } from "./positions/positions.component";
import { AuthGuard } from "../guards/auth/auth.guard";

@NgModule({
  imports: [SharedModule, EventsRoutingModule, MatExpansionModule],
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
