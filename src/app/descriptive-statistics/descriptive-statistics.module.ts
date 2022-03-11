import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MathjaxModule } from 'mathjax-angular';
import { NgChartsModule } from 'ng2-charts';
import { ComponentsModule } from 'src/app/components/components.module';
import { DescriptiveComponentsModule } from 'src/app/descriptive-statistics/components/components.module';
import { DescriptiveStatisticsComponent } from 'src/app/descriptive-statistics/descriptive-statistics.component';
import { DescriptiveStatisticsRoutingModule } from 'src/app/descriptive-statistics/descriptive-statistics.routing.module';
import { DescriptiveStatisticsListComponent } from './pages/descriptive-statistics-list/descriptive-statistics-list.component';
import { VarianceComponent } from './pages/variance/variance.component';



@NgModule({
  declarations: [
    DescriptiveStatisticsComponent,
    VarianceComponent,
    DescriptiveStatisticsListComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DescriptiveComponentsModule,
    NgChartsModule,
    MathjaxModule.forChild(),
    DescriptiveStatisticsRoutingModule
  ]
})
export class DescriptiveStatisticsModule { }
