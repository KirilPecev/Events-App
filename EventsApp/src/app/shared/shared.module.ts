import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { HeaderModule } from '../header/header.module';
import { HomePageIndexModule } from '../home-page-index/home-page-index.module';
import { ProfileModule } from '../profile/profile.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    FontAwesomeModule,
    MatInputModule,
    HeaderModule,
    HomePageIndexModule
  ],
  exports: [
    MatToolbarModule,
    FontAwesomeModule,
    MatInputModule,
    HeaderModule,
    HomePageIndexModule,
    ProfileModule
  ]
})
export class SharedModule { }
