import { NgModule } from "@angular/core";

import { SharedModule } from "../shared/shared.module";
import { SettingsRoutingModule } from "./settings-routing.module";
import { SettingsComponent } from "./settings.component";
import { GeneralSettingsComponent } from "./general-settings/general-settings.component";
import { SecuritySettingsComponent } from "./security-settings/security-settings.component";

@NgModule({
  imports: [SharedModule, SettingsRoutingModule],
  declarations: [
    SettingsComponent,
    GeneralSettingsComponent,
    SecuritySettingsComponent,
  ],
})
export class SettingsModule {}
