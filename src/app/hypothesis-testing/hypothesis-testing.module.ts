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

@NgModule({
    declarations: [
        HypothesisTestingComponent,
        AnovaComponent,
        ChiSquaredComponent,
        TestListComponent
    ],
    imports: [
        ComponentsModule,
        HypothesisTestingComponentsModule,
        HypothesesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    exports: [
        HypothesisTestingComponent
    ]
})
export class HypothesisTestingModule { }
