import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { HeaderModule } from '../header/header.module';
import { HomePageIndexModule } from '../home-page-index/home-page-index.module';
import { UserInformationModule } from '../user-information/user-information.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatInputModule,
    HeaderModule,
    HomePageIndexModule,
    MatButtonModule
  ],
  exports: [
    MatToolbarModule,
    FontAwesomeModule,
    MatInputModule,
    MatButtonModule,
    HeaderModule,
    HomePageIndexModule,
    UserInformationModule
  ]
})
export class SharedModule { }
