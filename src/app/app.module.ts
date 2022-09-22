import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighchartsChartModule } from 'highcharts-angular';
import { MathjaxModule } from 'mathjax-angular';
import { NgChartsModule } from 'ng2-charts';
import { PapaParseModule } from 'ngx-papaparse';
import { ComponentsModule } from 'src/app/components/components.module';
import { HypothesisTestingModule } from 'src/app/hypothesis-testing/hypothesis-testing.module';
import { WelcomePageModule } from 'src/app/welcome-page/welcome-page.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DescriptiveStatisticsModule } from './descriptive-statistics/descriptive-statistics.module';
import { DistributionsModule } from './distributions/distributions.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    WelcomePageModule,
    HypothesisTestingModule,
    DistributionsModule,
    HighchartsChartModule,
    DescriptiveStatisticsModule,
    NgChartsModule,
    PapaParseModule,
    MathjaxModule.forRoot({
      "config": {
        "loader": {
          "load": ["output/svg", "[tex]/require", "[tex]/ams"]
        },
        "tex": {
          "inlineMath": [["$", "$"]],
          "packages": ["base", "require", "ams"]
        },
        "svg": { "fontCache": "global" }
      },
      "src": "https://cdn.jsdelivr.net/npm/mathjax@3.0.0/es5/startup.js"
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
