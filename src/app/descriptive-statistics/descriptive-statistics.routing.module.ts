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
      },
      {
        path: 'mean-median-mode',
        component: VarianceComponent
      },
      {
        path: 'skewness',
        component: VarianceComponent
      },
      {
        path: 'kurtosis',
        component: VarianceComponent
      },
      {
        path: 'geometric-mean',
        component: VarianceComponent
      },
      {
        path: 'harmonic-mean',
        component: VarianceComponent
      },
      {
        path: 'sum-squares',
        component: VarianceComponent
      },
      {
        path: 'sum-cubes',
        component: VarianceComponent
      },
      {
        path: 'sum-inverses',
        component: VarianceComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DescriptiveStatisticsRoutingModule { }
