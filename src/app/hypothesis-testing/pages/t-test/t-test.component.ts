import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { HypothesisTestingService } from 'src/app/hypothesis-testing/service/hypothesis-testing.service';
import { TTestService } from 'src/app/hypothesis-testing/service/ttest.service';
import { HypothesisTestingLocator } from 'src/app/locators/hypothesis-testing.locator';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 't-test',
  templateUrl: './t-test.component.html',
  styleUrls: ['./t-test.component.scss']
})
export class TTestComponent {

  @ViewChild('targetScroll', { static: false }) private scrollElement!: ElementRef;

  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer, private tTestService: TTestService, private anovaService: AnovaService, private hypothesisTestingService: HypothesisTestingService) { }

  public imageToShow: any;
  public isComputing: boolean = false;
  public imageToShow1: any;
  public imageToShow2: any;
  public resultsHomocedasticity: any;
  public resultstTestComputation: any;
  public resultsAnovaNormality: any;
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

  dtOptions: DataTables.Settings = {};

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
    const tTestValues = formValues.textAreaFormArray
      .map(
        textAreaForm => textAreaForm.values
      )
      .map(
        tTestValues => this.transformIntoArray(tTestValues)
      );
    console.log('tTest values are', tTestValues);
    return combineLatest([
        this.hypothesisTestingService.getHypothesisCharts(tTestValues),
        this.tTestService.getTTestValues(0.5, tTestValues),
        this.anovaService.getAnovaHomocedasticity(tTestValues),
        this.anovaService.getNormalityComputation(tTestValues),
      ])
      .pipe(
        map(
        ([res, tTestComputation, homocedasticity, normalityComputation]) => {
          if(!!res) {
            this.isComputing = false;
            this.imageToShow1 = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res[0]))
            this.imageToShow2 = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(res[1]))
            setTimeout(() =>  this.scrollElement.nativeElement.scrollIntoView({block:'start', inline: 'nearest', behavior: 'smooth'}), 70);
          }
          if(!!homocedasticity) {
            this.resultsHomocedasticity = homocedasticity
          }
          if(!!tTestComputation) {
            this.resultstTestComputation = tTestComputation
          }
          if(!!normalityComputation) {
            this.resultsAnovaNormality = normalityComputation
          }
      })
      )
      .subscribe()
  }

}
