import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';

import { NotificationsComponent } from '../../../notifications/notifications.component';
import { FriendsComponent } from '../../../friends/friends.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule
  ],
  exports: [
    MatBadgeModule,
    MatMenuModule
  ],
  entryComponents: [NotificationsComponent, FriendsComponent]
})
export class HeaderModule { }
