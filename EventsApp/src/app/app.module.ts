import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomePageFeedComponent } from './home-page-feed/home-page-feed.component';
import { PublicationComponent } from './publication/publication.component';
import { HeaderComponent } from './header/header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { HomePageIndexComponent } from './home-page-index/home-page-index.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { FriendsComponent } from './friends/friends.component';
import { ProfileComponent } from './profile/profile.component';

import { SharedModule } from './shared/shared.module';
import { SharePublicationComponent } from './share-publication/share-publication.component';
import { UpcomingEventsComponent } from './upcoming-events/upcoming-events.component';
import { DaybookComponent } from './daybook/daybook.component';
import { UserInformationComponent } from './user-information/user-information.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageFeedComponent,
    PublicationComponent,
    HeaderComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    HomePageIndexComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    NotificationsComponent,
    FriendsComponent,
    ProfileComponent,
    SharePublicationComponent,
    UpcomingEventsComponent,
    DaybookComponent,
    UserInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
