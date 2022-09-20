import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { objectEach } from 'highcharts';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { HypothesisTestingService } from 'src/app/hypothesis-testing/service/hypothesis-testing.service';
import { returnRandomNumbers } from 'src/app/utils/utils';
import { Validator } from 'src/app/utils/validator';

@Component({
  selector: 'mann-whitney',
  templateUrl: './mann-whitney.component.html',
  styleUrls: ['./mann-whitney.component.scss']
})
export class MannWhitneyComponent {
  dtOptions: DataTables.Settings = {};

  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer, private anovaService: AnovaService, private hypothesisTestingService: HypothesisTestingService) { }

  public selected = false;
  public imageToShow1: any;
  public imageToShow2: any;
  public resultsHomocedasticity: any;
  public mannWhitneyValues: any;
  public resultsAnovaTukey: any;
  public resultsAnovaNormality: any;
  public resultsMannWhitney: any;
  public numberTreatments: number = 3;
  public isComputing: boolean = false;
  public formGroup = new FormGroup(
    {
      significanceLevel: new FormControl(0.05),
      textAreaFormArray: this.fb.array([
        this.fb.group({
          values: new FormControl(returnRandomNumbers(20), Validator.numericValidation)
        }),
        this.fb.group({
          values: new FormControl(returnRandomNumbers(20), Validator.numericValidation)
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

  ngOnInit() {
    this.formGroup.get("numberTreatments")?.valueChanges
      .pipe(
        tap(
          value => this.numberTreatments = value
        ),
        tap(
          value => this.updateFormArray(value)
        )
      ).subscribe()

      this.dtOptions = {
        pagingType: 'full_numbers'
      };
  }

  private updateFormArray(value: number) {
    this.getTextareasFormArray().controls = [];
    for (let i = 0; i < value; ++i) {
      const textarea = this.fb.group({
        values: new FormControl(returnRandomNumbers(20))
      });
      this.getTextareasFormArray().push(textarea);
    }
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

  public computeAnova(): any {
    this.isComputing = true;
    const formValues: { numberTreatments: number, textAreaFormArray: Array<{ values: Array<number> | string }> } = this.formGroup.getRawValue();
    const mannWhitneyValues = formValues.textAreaFormArray
      .map(
        textAreaForm => textAreaForm.values
      )
      .map(
        mannWhitneyValues => this.transformIntoArray(mannWhitneyValues)
      );
    console.log('mannWhitneyValues are', mannWhitneyValues);
    return combineLatest([
        this.hypothesisTestingService.getMannWhitneyValues(mannWhitneyValues)
      ])
      .pipe(
        map(
        ([mannWhitneyValues]) => {
          if(!!mannWhitneyValues) {
            this.isComputing = false;
          }
          if(!!mannWhitneyValues) {
            this.resultsMannWhitney = mannWhitneyValues
          }
          console.log('resultats mann', this.resultsMannWhitney)
      })
      )
      .subscribe()
  }

  public getKeys(obj: any):Array<string>{
    return Object.keys(obj)
  }
  public getValues(obj: any):Array<string>{
    return Object.values(obj)
    .map(
      (value:any) => value['MWU']
    );
  }
}
