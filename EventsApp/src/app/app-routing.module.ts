import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { HomePageIndexComponent } from './home-page-index/home-page-index.component';
import { ProfileComponent } from './profile/profile.component';
import { DaybookComponent } from './daybook/daybook.component';
import { UserInformationComponent } from './user-information/user-information.component';
import { UserBasicInformationComponent } from './user-basic-information/user-basic-information.component';
import { UserContactsComponent } from './user-contacts/user-contacts.component';


const routes: Routes = [
  { path: "", component: HomePageIndexComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "profile", component: ProfileComponent, children: [
      { path: "", component: DaybookComponent, outlet: "profile" },
      {
        path: "information", component: UserInformationComponent, outlet: "profile", children: [
          { path: "", component: UserContactsComponent, outlet: "info" },
          { path: "contacts", component: UserContactsComponent, outlet: "info" },
          { path: "basic-info", component: UserBasicInformationComponent, outlet: "info" }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
