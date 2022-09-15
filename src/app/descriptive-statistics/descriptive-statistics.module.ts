import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MathjaxModule } from 'mathjax-angular';
import { NgChartsModule } from 'ng2-charts';
import { ComponentsModule } from 'src/app/components/components.module';
import { DescriptiveComponentsModule } from 'src/app/descriptive-statistics/components/components.module';
import { DescriptiveStatisticsComponent } from 'src/app/descriptive-statistics/descriptive-statistics.component';
import { DescriptiveStatisticsRoutingModule } from 'src/app/descriptive-statistics/descriptive-statistics.routing.module';
import { GeometricMeanComponent } from 'src/app/descriptive-statistics/pages/geometric-mean/geometric-mean.component';
import { HarmonicMeanComponent } from 'src/app/descriptive-statistics/pages/harmonic-mean/harmonic-mean.component';
import { KurtosisComponent } from 'src/app/descriptive-statistics/pages/kurtosis/kurtosis.component';
import { MeanComponent } from 'src/app/descriptive-statistics/pages/mean/mean.component';
import { SkewnessComponent } from 'src/app/descriptive-statistics/pages/skewness/skewness.component';
import { SumCubesComponent } from 'src/app/descriptive-statistics/pages/sum-cubes/sum-cubes.component';
import { SumInversesComponent } from 'src/app/descriptive-statistics/pages/sum-inverses/sum-inverses.component';
import { SumSquaresComponent } from 'src/app/descriptive-statistics/pages/sum-squares/sum-squares.component';
import { HypothesisTestingComponentsModule } from 'src/app/hypothesis-testing/components/components.module';
import { DescriptiveStatisticsListComponent } from './pages/descriptive-statistics-list/descriptive-statistics-list.component';
import { VarianceComponent } from './pages/variance/variance.component';



@NgModule({
  declarations: [
    DescriptiveStatisticsComponent,
    VarianceComponent,
    GeometricMeanComponent,
    HarmonicMeanComponent,
    KurtosisComponent,
    MeanComponent,
    SkewnessComponent,
    SumCubesComponent,
    SumInversesComponent,
    SumSquaresComponent,
    DescriptiveStatisticsListComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DescriptiveComponentsModule,
    HypothesisTestingComponentsModule,
    NgChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MathjaxModule.forChild(),
    DescriptiveStatisticsRoutingModule
  ]
})
export class DescriptiveStatisticsModule { }
