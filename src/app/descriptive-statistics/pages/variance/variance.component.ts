import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { variance, standardDeviation, sampleStandardDeviation} from 'simple-statistics';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'variance',
  templateUrl: './variance.component.html',
  styleUrls: ['./variance.component.scss']
})
export class VarianceComponent {
  public formGroup: FormGroup = new FormGroup({
    values: new FormControl(returnRandomNumbers(70))
  });
  public result:any;
  public resultStandardDeviation:any;
  public resultSampleStandardDeviation:any;
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
    this.result = variance(this.values);
    this.resultStandardDeviation = standardDeviation(this.values);
    this.resultSampleStandardDeviation = sampleStandardDeviation(this.values);
  }
}
