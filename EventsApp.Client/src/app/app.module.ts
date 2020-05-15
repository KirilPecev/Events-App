import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/layout/header/header.component";
import { FooterComponent } from "./shared/layout/footer/footer.component";
import { SharedModule } from "./shared/shared.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { HomeModule } from "./home/home.module";
import { CoreModule } from "@angular/flex-layout";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from "./core/interceptors/token-interceptor.service";
import { ErrorInterceptorService } from "./core/interceptors/error-interceptor.service";
import { UserService } from "./core/services/user.service";
import { PublicationService } from "./core/services/publication.service";
import { EventService } from './core/services/event.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    DashboardModule,
    AppRoutingModule,
  ],
  providers: [
    UserService,
    PublicationService,
    EventService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
