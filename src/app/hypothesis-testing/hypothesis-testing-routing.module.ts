import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HypothesisTestingComponent } from 'src/app/hypothesis-testing/hypothesis-testing.component';
import { AnovaComponent } from 'src/app/hypothesis-testing/pages/anova/anova.component';
import { ChiSquaredComponent } from 'src/app/hypothesis-testing/pages/chi-squared/chi-squared.component';
import { KolmogorovSmirnov } from 'src/app/hypothesis-testing/pages/kolmogorov-smirnov/kolmogorov-smirnov.component';
import { MannWhitneyComponent } from 'src/app/hypothesis-testing/pages/mann-whitney/mann-whitney.component';
import { ShapiroWilkComponent } from 'src/app/hypothesis-testing/pages/shapiro-wilk/shapiro-wilk.component';
import { TTestComponent } from 'src/app/hypothesis-testing/pages/t-test/t-test.component';
import { TestListComponent } from 'src/app/hypothesis-testing/pages/test-list/test-list.component';

const routes: Routes = [
  {
    path: 'hypothesis-testing', component: HypothesisTestingComponent,
    children: [
      {
        path: 'testList',
        component: TestListComponent
      },
      {
        path: 'anova',
        component: AnovaComponent
      },
      {
        path: 'student-t-test',
        component: TTestComponent
      },
      {
        path: 'kolmogorov-smirnov',
        component: KolmogorovSmirnov
      },
      {
        path: 'shapiro-wilk',
        component: ShapiroWilkComponent
      },
      {
        path: 'mann-whitney',
        component: MannWhitneyComponent
      },
      {
        path: 'chi-squared',
        component: ChiSquaredComponent
      },
      {
        path: '**',
        component: AnovaComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class HypothesesRoutingModule { }
