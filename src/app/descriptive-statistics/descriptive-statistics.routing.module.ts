import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptiveStatisticsComponent } from 'src/app/descriptive-statistics/descriptive-statistics.component';
import { DescriptiveStatisticsListComponent } from 'src/app/descriptive-statistics/pages/descriptive-statistics-list/descriptive-statistics-list.component';
import { GeometricMeanComponent } from 'src/app/descriptive-statistics/pages/geometric-mean/geometric-mean.component';
import { HarmonicMeanComponent } from 'src/app/descriptive-statistics/pages/harmonic-mean/harmonic-mean.component';
import { KurtosisComponent } from 'src/app/descriptive-statistics/pages/kurtosis/kurtosis.component';
import { MeanComponent } from 'src/app/descriptive-statistics/pages/mean/mean.component';
import { SkewnessComponent } from 'src/app/descriptive-statistics/pages/skewness/skewness.component';
import { SumCubesComponent } from 'src/app/descriptive-statistics/pages/sum-cubes/sum-cubes.component';
import { SumInversesComponent } from 'src/app/descriptive-statistics/pages/sum-inverses/sum-inverses.component';
import { SumSquaresComponent } from 'src/app/descriptive-statistics/pages/sum-squares/sum-squares.component';
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
        component: MeanComponent
      },
      {
        path: 'skewness',
        component: SkewnessComponent
      },
      {
        path: 'kurtosis',
        component: KurtosisComponent
      },
      {
        path: 'geometric-mean',
        component: GeometricMeanComponent
      },
      {
        path: 'harmonic-mean',
        component: HarmonicMeanComponent
      },
      {
        path: 'sum-squares',
        component: SumSquaresComponent
      },
      {
        path: 'sum-cubes',
        component: SumCubesComponent
      },
      {
        path: 'sum-inverses',
        component: SumInversesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DescriptiveStatisticsRoutingModule { }
