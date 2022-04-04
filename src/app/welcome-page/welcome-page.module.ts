import { NgModule } from '@angular/core';
import { WelcomePageComponent } from 'src/app/welcome-page/welcome-page.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    WelcomePageComponent
  ],
  imports: [
    ComponentsModule
  ],
  exports: [
    WelcomePageComponent
  ]
})
export class WelcomePageModule { }
