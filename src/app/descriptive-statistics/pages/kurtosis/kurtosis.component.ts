import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {sampleKurtosis} from 'simple-statistics'
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'kurtosis',
  templateUrl: './kurtosis.component.html',
  styleUrls: ['./kurtosis.component.scss']
})
export class KurtosisComponent {

  constructor(){}

  public formGroup: FormGroup = new FormGroup({
    values: new FormControl(returnRandomNumbers(70))
  });
  public result:any;
  public values: Array<number> = [];
  public compute(): void {
    this.values =  this.formGroup.getRawValue().values;
    this.result = sampleKurtosis(this.values);
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: false
  };
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];

}
