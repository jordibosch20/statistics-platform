import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoadmapRoutingModule } from './roadmap-routing.module';
import { RoadmapComponent } from './roadmap.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    RoadmapComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RoadmapRoutingModule
  ]
})
export class RoadmapModule { }
