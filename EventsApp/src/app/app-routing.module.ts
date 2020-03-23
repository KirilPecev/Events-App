import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { HomePageIndexComponent } from './home-page-index/home-page-index.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDaybookComponent } from './user-daybook/user-daybook.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { UserBasicInformationComponent } from './user-basic-information/user-basic-information.component';
import { UserContactsComponent } from './user-contacts/user-contacts.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { UserPicturesComponent } from './user-pictures/user-pictures.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { SportEventComponent } from './sport-event/sport-event.component';
import { OtherEventComponent } from './other-event/other-event.component';
import { PublicationComponent } from './publication/publication.component';
import { EventsComponent } from './events/events.component';
import { HomePageFeedComponent } from './home-page-feed/home-page-feed.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: "", component: HomePageIndexComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "feed", canActivate: [AuthGuard], component: HomePageFeedComponent, children: [
      { path: "", component: PublicationComponent, outlet: "feed" },
      { path: "events", component: EventsComponent, outlet: "feed" }
    ]
  },
  {
    path: "profile", canActivateChild: [AuthGuard], component: ProfileComponent, children: [
      { path: "", component: UserDaybookComponent, outlet: "profile" },
      {
        path: "information", component: UserInformationComponent, outlet: "profile", children: [
          { path: "", component: UserContactsComponent, outlet: "info" },
          { path: "contacts", component: UserContactsComponent, outlet: "info" },
          { path: "basic-info", component: UserBasicInformationComponent, outlet: "info" },
        ]
      },
      { path: "friends", component: UserFriendsComponent, outlet: "profile" },
      { path: "pictures", component: UserPicturesComponent, outlet: "profile" }
    ]
  },
  {
    path: "create-event", canActivate: [AuthGuard], component: CreateEventComponent, children: [
      { path: "sport-event", component: SportEventComponent, outlet: "event" },
      { path: "other-event", component: OtherEventComponent, outlet: "event" }
    ]
  },
  { path: "events/details", pathMatch: "full", component: EventDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
