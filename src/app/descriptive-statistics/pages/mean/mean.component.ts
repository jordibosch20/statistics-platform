import { Component } from '@angular/core';
import {mean, median, mode} from 'simple-statistics'
import { FormControl, FormGroup } from '@angular/forms';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'mean',
  templateUrl: './mean.component.html',
  styleUrls: ['./mean.component.scss']
})
export class MeanComponent {

  public formGroup: FormGroup = new FormGroup({
    values: new FormControl(returnRandomNumbers(70))
  });
  public result:any;
  public resultMedian:any;
  public resultMode:any;
  public values: Array<number> = [];

  private transformIntoArray(value: string | Array<number>): Array<number>{
    if(typeof(value) === 'string'){
      return value.split(',').map(x => Number(x))
    }
    return value;
  }

  public compute(): void {
    this.values =  this.formGroup.getRawValue().values;
    this.values = this.transformIntoArray(this.values);
    this.result = mean(this.values);
    this.resultMedian = median(this.values);
    this.resultMode = mode(this.values);

  }
}
