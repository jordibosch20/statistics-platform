import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { DescriptiveCalculatorComponent } from './descriptive-calculator/descriptive-calculator.component';



@NgModule({
  declarations: [
    DescriptiveCalculatorComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule
  ],
  exports: [
    DescriptiveCalculatorComponent
  ]
})
export class DescriptiveComponentsModule { }
