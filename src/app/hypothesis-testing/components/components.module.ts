import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';
import { SideModalComponent } from 'src/app/hypothesis-testing/components/side-modal/side-modal.component';

@NgModule({
  declarations: [
    SideModalComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    SideModalComponent
  ]
})
export class HypothesisTestingComponentsModule { }
