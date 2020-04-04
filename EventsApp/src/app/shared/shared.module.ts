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
import { MatDialogModule } from "@angular/material/dialog";
import { FlexLayoutModule } from "@angular/flex-layout";

import { HeaderModule } from "./layout/header/header.module";
import { HomePageIndexModule } from "../home/home.module";
import { UserInformationModule } from "../profile/user-information/user-information.module";
import { PositionsModule } from "../events/positions/positions.module";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatInputModule,
    HeaderModule,
    HomePageIndexModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    PositionsModule,
    MatDialogModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatInputModule,
    MatButtonModule,
    HeaderModule,
    HomePageIndexModule,
    UserInformationModule,
    MatCardModule,
    MatSidenavModule,
    PositionsModule,
    MatDialogModule,
    FlexLayoutModule,
  ],
})
export class SharedModule {}
