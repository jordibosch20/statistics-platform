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

  private transformIntoArray(value: string | Array<number>): Array<number>{
    if(typeof(value) === 'string'){
      return value.split(',').map(x => Number(x))
    }
    return value;
  }

  public compute(): void {
    this.values =  this.formGroup.getRawValue().values;
    this.values = this.transformIntoArray(this.values);
    this.result = sampleKurtosis(this.values);
  }
}
