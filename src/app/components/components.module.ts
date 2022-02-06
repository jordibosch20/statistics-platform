import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderRoutingModule } from 'src/app/components/header/header-routing.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    HeaderRoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class ComponentsModule { }
