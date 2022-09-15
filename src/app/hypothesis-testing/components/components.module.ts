import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { SideModalDescriptiveCalculatorsComponent } from 'src/app/hypothesis-testing/components/side-modal-descriptive-calculators/side-modal-descriptive-calculators.component';
import { SideModalComponent } from 'src/app/hypothesis-testing/components/side-modal/side-modal.component';

@NgModule({
  declarations: [
    SideModalComponent,
    SideModalDescriptiveCalculatorsComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    SideModalComponent,
    SideModalDescriptiveCalculatorsComponent
  ]
})
export class HypothesisTestingComponentsModule { }
