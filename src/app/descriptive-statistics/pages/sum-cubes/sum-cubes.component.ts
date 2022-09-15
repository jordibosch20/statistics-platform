import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  private transformIntoArray(value: string | Array<number>): Array<number>{
    if(typeof(value) === 'string'){
      return value.split(',').map(x => Number(x))
    }
    return value;
  }

  private sumOfCubes(values: Array<number>){
    return values.reduce((total, curr)=>total + curr**3, 0);
  }

  public compute(): void {
    this.values =  this.formGroup.getRawValue().values;
    this.values = this.transformIntoArray(this.values);
    this.result = this.sumOfCubes(this.values);
  }

}
