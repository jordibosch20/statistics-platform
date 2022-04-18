import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HypothesisTestingComponent } from 'src/app/hypothesis-testing/hypothesis-testing.component';
import { AnovaComponent } from 'src/app/hypothesis-testing/pages/anova/anova.component';
import { ChiSquaredComponent } from 'src/app/hypothesis-testing/pages/chi-squared/chi-squared.component';
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
        path: 'chiSquared',
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
