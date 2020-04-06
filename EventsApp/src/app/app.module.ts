import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/layout/header/header.component";
import { FooterComponent } from "./shared/layout/footer/footer.component";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./auth/auth.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { EventsModule } from "./events/events.module";
import { HomeModule } from "./home/home.module";
import { ProfileModule } from "./profile/profile.module";

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HomeModule,
    AuthModule,
    DashboardModule,
    ProfileModule,
    EventsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
