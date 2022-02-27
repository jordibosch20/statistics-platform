import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'distributions',
  templateUrl: './distributions.component.html',
  styleUrls: ['./distributions.component.scss']
})
export class DistributionsComponent {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    series: [{
      data: [{ x: 7, y: 10 }, { x: 10, y: 20 }, { x: 15, y: 30 }],
      type: 'line'
    }]
  };
}
