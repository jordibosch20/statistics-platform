import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { geometricMean } from 'simple-statistics';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'geometric-mean',
  templateUrl: './geometric-mean.component.html',
  styleUrls: ['./geometric-mean.component.scss']
})
export class GeometricMeanComponent {
  public formGroup: FormGroup = new FormGroup({
    values: new FormControl(returnRandomNumbers(30))
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
    this.result = geometricMean(this.values);
  }

}
