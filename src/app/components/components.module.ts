import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderRoutingModule } from 'src/app/components/header/header-routing.component';
import { DescriptiveLinkComponent } from './descriptive-link/descriptive-link.component';
import { H2TitleComponent } from './h2-title/h2-title.component';
import { HeaderComponent } from './header/header.component';
import { NavigationTabComponent } from './navigation-tab/navigation-tab.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    HeaderComponent,
    H2TitleComponent,
    DescriptiveLinkComponent,
    NavigationTabComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule
  ],
  exports: [
    HeaderComponent,
    H2TitleComponent,
    DescriptiveLinkComponent,
    NavigationTabComponent,
    PopupComponent
  ]
})
export class ComponentsModule { }
