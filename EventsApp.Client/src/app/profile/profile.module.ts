import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileComponent } from "./profile.component";
import { UserBasicInformationComponent } from "./user-basic-information/user-basic-information.component";
import { UserContactsComponent } from "./user-contacts/user-contacts.component";
import { UserDaybookComponent } from "./user-daybook/user-daybook.component";
import { UserFriendsComponent } from "./user-friends/user-friends.component";
import { UserInformationComponent } from './user-information/user-information.component';
import { UserPicturesComponent } from './user-pictures/user-pictures.component';

@NgModule({
  imports: [SharedModule, ProfileRoutingModule],
  declarations: [
    ProfileComponent,
    UserBasicInformationComponent,
    UserContactsComponent,
    UserDaybookComponent,
    UserFriendsComponent,
    UserInformationComponent,
    UserPicturesComponent
  ]
})
export class ProfileModule {}
