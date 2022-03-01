import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { DescriptiveStatisticsComponent } from './descriptive-statistics/descriptive-statistics.component';



@NgModule({
  declarations: [
    DescriptiveStatisticsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class DescriptiveStatisticsModule { }
