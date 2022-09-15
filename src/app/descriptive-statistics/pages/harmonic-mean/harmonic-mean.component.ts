import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { harmonicMean } from 'simple-statistics';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'harmonic-mean',
  templateUrl: './harmonic-mean.component.html',
  styleUrls: ['./harmonic-mean.component.scss']
})
export class HarmonicMeanComponent {

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
    this.result = harmonicMean(this.values);
  }


}
