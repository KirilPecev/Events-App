import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';

import { HeaderModule } from '../header/header.module';
import { HomePageIndexModule } from '../home/home.module';
import { UserInformationModule } from '../user-information/user-information.module';
import { PositionsModule } from '../positions/positions.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatInputModule,
    HeaderModule,
    HomePageIndexModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    PositionsModule,
    MatDialogModule
  ],
  exports: [
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
    MatDialogModule
  ]
})
export class SharedModule { }
