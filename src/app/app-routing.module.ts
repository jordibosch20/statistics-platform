import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptiveStatisticsComponent } from 'src/app/descriptive-statistics/descriptive-statistics.component';
import { DistributionsComponent } from 'src/app/distributions/distributions.component';
import { HypothesisTestingComponent } from 'src/app/hypothesis-testing/hypothesis-testing.component';
import { RoadmapComponent } from 'src/app/roadmap/roadmap.component';
import { RoadmapModule } from 'src/app/roadmap/roadmap.module';
import { WelcomePageComponent } from 'src/app/welcome-page/welcome-page.component';


const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'hypothesis-testing', component: HypothesisTestingComponent },
  { path: 'descriptive-statistics', component: DescriptiveStatisticsComponent },
  { path: 'distributions', component: DistributionsComponent },
  { path: 'roadmap', component: RoadmapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
