import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { TTestService } from 'src/app/hypothesis-testing/service/ttest.service';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 't-test',
  templateUrl: './t-test.component.html',
  styleUrls: ['./t-test.component.scss']
})
export class TTestComponent {

  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer, private tTestService: TTestService) { }

  public imageToShow: any;
  public pValue: any;
  public H0Rejected: boolean = false;
  public isComputing: boolean = false;
  public formGroup = new FormGroup(
    {
      significanceLevel: new FormControl(0.05),
      textAreaFormArray: this.fb.array([
        this.fb.group({
          values: new FormControl(returnRandomNumbers(20))
        }),
        this.fb.group({
          values: new FormControl(returnRandomNumbers(20))
        })
      ])
    }
  );

  public getTextareasFormArray(): FormArray {
    return this.formGroup.get('textAreaFormArray') as FormArray
  }

  public getTextareasFormArrayControls(): Array<FormGroup> {
    return ((this.formGroup.get('textAreaFormArray') as FormArray).controls) as Array<FormGroup>
  }

  public counter(n: number): Array<number> {
    return [...Array(n).keys()].map(i => i + 1);
  }

  private transformIntoArray(value: string | Array<number>): Array<number>{
    if(typeof(value) === 'string'){
      return value.split(',').map(x => Number(x))
    }
    return value;
  }

  public computeTTest(): any {
    this.isComputing = true;
    const formValues: { numberTreatments: number, textAreaFormArray: Array<{ values: Array<number> | string }> } = this.formGroup.getRawValue();
    const anovaValues = formValues.textAreaFormArray
      .map(
        textAreaForm => textAreaForm.values
      )
      .map(
        anovaValues => this.transformIntoArray(anovaValues)
      );
    console.log('anovaValues are', anovaValues);
    return combineLatest([
        this.tTestService.getTTestValues(0.5, anovaValues)
      ])
      .pipe(
        map(
        ([result]) => {
          if(!!result) {
            console.log('result is', result)
            this.isComputing = false;
          }
      })
      )
      .subscribe()
  }

}
