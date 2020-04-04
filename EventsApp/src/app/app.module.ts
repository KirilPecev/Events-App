import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout'

import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicationComponent } from './publication/publication.component';
import { HeaderComponent } from './header/header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile/profile.component';

import { SharedModule } from './shared/shared.module';
import { SharePublicationComponent } from './share-publication/share-publication.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { UserDaybookComponent } from './user-daybook/user-daybook.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { UserContactsComponent } from './user-contacts/user-contacts.component';
import { UserBasicInformationComponent } from './user-basic-information/user-basic-information.component';
import { UserFriendsComponent } from './user-friends/user-friends.component';
import { UserPicturesComponent } from './user-pictures/user-pictures.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { SportEventComponent } from './sport-event/sport-event.component';
import { OtherEventComponent } from './other-event/other-event.component';
import { EventsComponent } from './events/events.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { PositionsComponent } from './positions/positions.component';
import { JoinedEventsComponent } from './joined-events/joined-events.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PublicationComponent,
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotificationsComponent,
    FriendsComponent,
    ProfileComponent,
    SharePublicationComponent,
    UpcomingEventsComponent,
    UserDaybookComponent,
    UserInformationComponent,
    UserContactsComponent,
    UserBasicInformationComponent,
    UserFriendsComponent,
    UserPicturesComponent,
    CreateEventComponent,
    SportEventComponent,
    OtherEventComponent,
    EventsComponent,
    EventDetailsComponent,
    PositionsComponent,
    JoinedEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
