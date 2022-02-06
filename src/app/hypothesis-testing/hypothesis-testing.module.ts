import { NgModule } from '@angular/core';
import { HypothesisTestingComponent } from 'src/app/hypothesis-testing/hypothesis-testing.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
    declarations: [
        HypothesisTestingComponent
    ],
    imports: [
        ComponentsModule
    ],
    exports: [
        HypothesisTestingComponent
    ]
})
export class HypothesisTestingModule { }
