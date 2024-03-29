import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { HypothesisTestingComponentsModule } from 'src/app/hypothesis-testing/components/components.module';
import { HypothesesRoutingModule } from 'src/app/hypothesis-testing/hypothesis-testing-routing.module';
import { HypothesisTestingComponent } from 'src/app/hypothesis-testing/hypothesis-testing.component';
import { AnovaComponent } from './pages/anova/anova.component';
import { ChiSquaredComponent } from './pages/chi-squared/chi-squared.component';
import { TestListComponent } from './pages/test-list/test-list.component';
import { TTestComponent } from './pages/t-test/t-test.component';
import { MathjaxModule } from 'mathjax-angular';
import { DataTablesModule } from 'angular-datatables';
import { KolmogorovSmirnov } from 'src/app/hypothesis-testing/pages/kolmogorov-smirnov/kolmogorov-smirnov.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ShapiroWilkComponent } from 'src/app/hypothesis-testing/pages/shapiro-wilk/shapiro-wilk.component';
import { MannWhitneyComponent } from 'src/app/hypothesis-testing/pages/mann-whitney/mann-whitney.component';

@NgModule({
    declarations: [
        HypothesisTestingComponent,
        AnovaComponent,
        ChiSquaredComponent,
        TestListComponent,
        TTestComponent,
        KolmogorovSmirnov,
        ShapiroWilkComponent,
        MannWhitneyComponent
    ],
    imports: [
        ComponentsModule,
        HypothesisTestingComponentsModule,
        HypothesesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MathjaxModule.forChild(),
        DataTablesModule,
        CommonModule,
        PdfViewerModule
    ],
    exports: [
        HypothesisTestingComponent
    ]
})
export class HypothesisTestingModule { }
