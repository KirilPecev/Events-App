import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatBadgeModule } from "@angular/material/badge";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";

import { JoinedEventsComponent } from "./event-helpers/joined-events/joined-events.component";
import { UpcomingEventsComponent } from "./event-helpers/upcoming-events/upcoming-events.component";
import { FriendsComponent } from "./layout/friends/friends.component";
import { LeftSidebarComponent } from "./layout/left-sidebar/left-sidebar.component";
import { RightSidebarComponent } from "./layout/right-sidebar/right-sidebar.component";
import { NotificationsComponent } from "./layout/notifications/notifications.component";
import { PublicationComponent } from "./publication/publication.component";
import { SharePublicationComponent } from "./publication/share-publication/share-publication.component";

@NgModule({
  declarations: [
    JoinedEventsComponent,
    UpcomingEventsComponent,
    FriendsComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    NotificationsComponent,
    PublicationComponent,
    SharePublicationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    FlexLayoutModule,
    JoinedEventsComponent,
    UpcomingEventsComponent,
    FriendsComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    NotificationsComponent,
    PublicationComponent,
    SharePublicationComponent,
  ],
  entryComponents: [NotificationsComponent, FriendsComponent],
})
export class SharedModule {}