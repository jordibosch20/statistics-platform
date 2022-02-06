import { NgModule } from '@angular/core';
import { HypothesesRoutingModule } from 'src/app/hypothesis-testing/hypothesis-testing-routing.module';
import { HypothesisTestingComponent } from 'src/app/hypothesis-testing/hypothesis-testing.component';
import { ComponentsModule } from '../components/components.module';
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
        HypothesesRoutingModule
    ],
    exports: [
        HypothesisTestingComponent
    ]
})
export class HypothesisTestingModule { }
