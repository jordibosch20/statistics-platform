import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { HypothesisTestingModule } from 'src/app/hypothesis-testing/hypothesis-testing.module';
import { WelcomePageModule } from 'src/app/welcome-page/welcome-page.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DistributionsModule } from './distributions/distributions.module';
import { DescriptiveStatisticsModule } from './descriptive-statistics/descriptive-statistics.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    WelcomePageModule,
    HypothesisTestingModule,
    DistributionsModule,
    HighchartsChartModule,
    DescriptiveStatisticsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
