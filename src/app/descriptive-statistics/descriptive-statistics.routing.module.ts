import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptiveStatisticsComponent } from 'src/app/descriptive-statistics/descriptive-statistics.component';
import { DescriptiveStatisticsListComponent } from 'src/app/descriptive-statistics/pages/descriptive-statistics-list/descriptive-statistics-list.component';
import { VarianceComponent } from 'src/app/descriptive-statistics/pages/variance/variance.component';


const routes: Routes = [
  {
    path: 'descriptive-statistics', component: DescriptiveStatisticsComponent,
    children: [
      {
        path: 'statistics-list',
        component: DescriptiveStatisticsListComponent
      },
      {
        path: 'variance',
        component: VarianceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DescriptiveStatisticsRoutingModule { }
