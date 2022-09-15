import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { mean } from 'simple-statistics';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'geometric-mean',
  templateUrl: './geometric-mean.component.html',
  styleUrls: ['./geometric-mean.component.scss']
})
export class GeometricMeanComponent {
  public formGroup: FormGroup = new FormGroup({
    values: new FormControl(returnRandomNumbers(70))
  });
  public result:any;
  public values: Array<number> = [];
  public compute(): void {
    this.values =  this.formGroup.getRawValue().values;
    this.result = mean(this.values);
  }

}
