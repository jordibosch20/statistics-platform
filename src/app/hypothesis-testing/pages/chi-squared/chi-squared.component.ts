import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { HypothesisTestingService } from 'src/app/hypothesis-testing/service/hypothesis-testing.service';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'chi-squared',
  templateUrl: './chi-squared.component.html',
  styleUrls: ['./chi-squared.component.scss']
})
export class ChiSquaredComponent {

  @ViewChild('targetScroll', { static: false }) private scrollElement!: ElementRef;

  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer, private anovaService: AnovaService, private hypothesisTestingService: HypothesisTestingService) { }

  public selected = false;
  public imageToShow1: any;
  public imageToShow2: any;
  public resultsHomocedasticity: any;
  public resultsAnovaComputation: any;
  public resultsAnovaTukey: any;
  public resultsSaphireWilkNormality: any;
  public numberTreatments: number = 3;
  public isComputing: boolean = false;
  public dimensionsFormGroup = new FormGroup({
    firstVariable : new FormControl(3),
    secondVariable : new FormControl(4)
  })
  public formGroup = new FormGroup(
    {
      numberTreatments: new FormControl(this.numberTreatments),
      textAreaFormArray: this.fb.array(
        Array.from({length: this.getTotalCells().length}, (_, ) => this.fb.group({
          values: new FormControl(returnRandomNumbers(1))
      }))
    )}
  );
  public gridStyle:any = {};
  public numCols: number = 3;

  public pdfSrc = "https://firebasestorage.googleapis.com/v0/b/statistics-test-74f2e.appspot.com/o/TFM%20(2)-10-12.pdf?alt=media&token=497ed7a9-d4b9-4a02-8ec7-66dd5b08d71f";

  dtOptions: DataTables.Settings = {};

  public getTotalCells(): Array<number>{
    return (Array(this.dimensionsFormGroup.get('firstVariable')?.value as number * this.dimensionsFormGroup.get('secondVariable')?.value as number))
  }

  public getTextareasFormArray(): FormArray {
    return this.formGroup.get('textAreaFormArray') as FormArray
  }

  public getTextareasFormArrayControls(): Array<FormGroup> {
    return ((this.formGroup.get('textAreaFormArray') as FormArray).controls) as Array<FormGroup>
  }

  ngOnInit() {
    this.dimensionsFormGroup.get('firstVariable')?.valueChanges
    .pipe(
      tap(
        numCols => this.numCols = numCols
      ),
      map(
        numCols => this.gridStyle = ({'grid-template-columns':`repeat(${numCols}, 1fr)`})
      ),
      tap(
        gridStyle => console.log('gridStyle', gridStyle)
      )
    ).subscribe()

    this.dimensionsFormGroup.valueChanges
      .pipe(
        map(
          () => this.numberTreatments = this.getTotalCells().length
        ),
        tap(
          value => this.updateFormArray(this.numberTreatments)
        )
      ).subscribe();

      this.dimensionsFormGroup.get("firstVariable")?.valueChanges
      .pipe(
        tap(
          () => this.getTotalCells()
        )
      ).subscribe();

      this.dimensionsFormGroup.get("secondVariable")?.valueChanges
      .pipe(
        tap(
          () => this.getTotalCells()
        )
      ).subscribe();
  }

  private updateFormArray(value: number) {
    this.getTextareasFormArray().controls = [];
    for (let i = 0; i < value; ++i) {
      const textarea = this.fb.group({
        values: new FormControl(returnRandomNumbers(1))
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

  private transformIntoArrayOfArrays(formValues: Array<any>): Array<Array<number>>{
    let appendedResults: Array<number> = [];
    for(let i = 0; i< formValues.length; ++i){
      appendedResults.push(formValues[i].values[0])
    }
    // Get number of elements per subarray
    const numsPerGroup = Math.ceil(appendedResults.length / this.numCols);
    // Create array based on number of groups
    const result = new Array(this.numCols)
      .fill('')
      .map((_, i) => appendedResults.slice(i * numsPerGroup, (i + 1) * numsPerGroup));
    console.log('result', result);
    return result;
  }

  public computeAnova(): any {
    this.isComputing = true;
    const formValues: { numberTreatments: number, textAreaFormArray: Array<{ values: Array<number> | string }> } = this.formGroup.getRawValue();
    this.transformIntoArrayOfArrays(formValues.textAreaFormArray)
    const anovaValues = formValues.textAreaFormArray
      .map(
        textAreaForm => textAreaForm.values
      )
      .map(
        anovaValues =>  this.transformIntoArray(anovaValues)
      );
    return combineLatest([
        this.anovaService.getNormalityComputation(anovaValues),
      ])
      .pipe(
        map(
        ([normalityComputation]) => {
          this.isComputing = false;
          if(!!normalityComputation) {
            this.resultsSaphireWilkNormality = normalityComputation
            console.log('resultsSaphireWilkNormality', this.resultsSaphireWilkNormality)
          }
      })
      )
      .subscribe()
  }

  public closePopup():void{
    this.selected = !this.selected;
  }

}
