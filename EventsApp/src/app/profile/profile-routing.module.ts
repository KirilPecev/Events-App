import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProfileComponent } from "./profile.component";
import { UserDaybookComponent } from "./user-daybook/user-daybook.component";
import { UserInformationComponent } from "./user-information/user-information.component";
import { UserContactsComponent } from "./user-contacts/user-contacts.component";
import { UserBasicInformationComponent } from "./user-basic-information/user-basic-information.component";
import { UserFriendsComponent } from "./user-friends/user-friends.component";
import { UserPicturesComponent } from "./user-pictures/user-pictures.component";
import { AuthGuard } from "../guards/auth/auth.guard";

const profileRoutes: Routes = [
  {
    path: "profile",
    component: ProfileComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: "", component: UserDaybookComponent, outlet: "profile" },
      {
        path: "information",
        component: UserInformationComponent,
        outlet: "profile",
        children: [
          {
            path: "",
            component: UserContactsComponent,
            outlet: "info",
            pathMatch: "full",
          },
          {
            path: "contacts",
            component: UserContactsComponent,
            outlet: "info",
          },
          {
            path: "basic-info",
            component: UserBasicInformationComponent,
            outlet: "info",
          },
        ],
      },
      {
        path: "friends",
        component: UserFriendsComponent,
        outlet: "profile",
      },
      {
        path: "pictures",
        component: UserPicturesComponent,
        outlet: "profile",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(profileRoutes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
