import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { mean } from 'simple-statistics';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'sum-squares',
  templateUrl: './sum-squares.component.html',
  styleUrls: ['./sum-squares.component.scss']
})
export class SumSquaresComponent {
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

  private sumOfSquares(values: Array<number>){
    return values.reduce((total, curr)=>total + curr**2, 0);
  }

  public compute(): void {
    this.values =  this.formGroup.getRawValue().values;
    this.values = this.transformIntoArray(this.values);
    this.result = this.sumOfSquares(this.values);
  }


}
