import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomePageFeedComponent } from './home-page-feed/home-page-feed.component';
import { PublicationComponent } from './publication/publication.component';
import { HeaderComponent } from './header/header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { HomePageIndexComponent } from './home-page-index/home-page-index.component';
import { FooterComponent } from './footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';

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
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
