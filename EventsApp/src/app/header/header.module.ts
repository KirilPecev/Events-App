import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';

import { NotificationsComponent } from '../notifications/notifications.component';
import { FriendsComponent } from '../friends/friends.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatBadgeModule
  ],
  exports: [
    MatBadgeModule
  ],
  entryComponents: [NotificationsComponent, FriendsComponent]
})
export class HeaderModule { }
