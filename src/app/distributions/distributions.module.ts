import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { DistributionsComponent } from 'src/app/distributions/distributions.component';


@NgModule({
  declarations: [
    DistributionsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    DistributionsComponent
  ]
})
export class DistributionsModule { }
