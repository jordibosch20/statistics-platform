import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { sampleSkewness } from 'simple-statistics';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'skewness',
  templateUrl: './skewness.component.html',
  styleUrls: ['./skewness.component.scss']
})
export class SkewnessComponent {
  public formGroup: FormGroup = new FormGroup({
    values: new FormControl(returnRandomNumbers(70))
  });
  public result:any;
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
    this.result = sampleSkewness(this.values);
  }

}
