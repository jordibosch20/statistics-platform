import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { tap } from 'rxjs/operators';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 't-test',
  templateUrl: './t-test.component.html',
  styleUrls: ['./t-test.component.scss']
})
export class TTestComponent {

  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer, private anovaService: AnovaService) { }

  public imageToShow: any;
  public pValue: any;
  public H0Rejected: boolean = false;
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

  public computeTTest(): any {
    const formValues: { levelSignificance: number, textAreaFormArray: Array<{ values: Array<number> }> } = this.formGroup.getRawValue();
    const tTestValues = formValues.textAreaFormArray
      .map(
        textAreaForm => textAreaForm.values
      )
    const levelSignificance = formValues.levelSignificance
    console.log('tTestValues are', tTestValues);
    return this.anovaService.getTTestValues(levelSignificance, tTestValues)
      .subscribe(
        result => {
          this.pValue = result
          this.H0Rejected = (this.pValue < this.formGroup.get('significanceLevel')?.value)
        }
      )
  }

}
