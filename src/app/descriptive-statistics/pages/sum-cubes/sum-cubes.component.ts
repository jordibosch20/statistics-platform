import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { mean } from 'simple-statistics';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'sum-cubes',
  templateUrl: './sum-cubes.component.html',
  styleUrls: ['./sum-cubes.component.scss']
})
export class SumCubesComponent {
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
