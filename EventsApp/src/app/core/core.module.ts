import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { EventService } from './services/event.service';
import { PublicationService } from './services/publication.service';
import { AuthGuard } from '../guards/auth/auth.guard';
import { AnonymousGuard } from '../guards/anonymous/anonymous.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    UserService,
    EventService,
    PublicationService,
    AuthGuard,
    AnonymousGuard
  ]
})
export class CoreModule { }
