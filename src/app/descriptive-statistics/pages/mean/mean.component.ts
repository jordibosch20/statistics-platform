import { Component } from '@angular/core';
import {mean} from 'simple-statistics'
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
  public values: Array<number> = [];
  public compute(): void {
    this.values =  this.formGroup.getRawValue().values;
    this.result = mean(this.values);
  }
}
