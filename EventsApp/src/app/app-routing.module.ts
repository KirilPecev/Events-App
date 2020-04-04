import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
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
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { AnonymousGuard } from './guards/anonymous/anonymous.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent, canActivate: [AnonymousGuard] },
  { path: "register", component: RegisterComponent, canActivate: [AnonymousGuard] },
  {
    path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard], children: [
      { path: "", component: PublicationComponent, outlet: "dashboard" },
      { path: "events", component: EventsComponent, outlet: "dashboard" }
    ]
  },
  {
    path: "profile", component: ProfileComponent, canActivateChild: [AuthGuard], children: [
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
    path: "create-event", component: CreateEventComponent, canActivate: [AuthGuard], children: [
      { path: "sport-event", component: SportEventComponent, outlet: "event" },
      { path: "other-event", component: OtherEventComponent, outlet: "event" }
    ]
  },
  { path: "events/details", pathMatch: "full", component: EventDetailsComponent, canActivate: [AuthGuard] },
  { path: "events", pathMatch: "full", component: EventsComponent, canActivate: [AuthGuard] },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
