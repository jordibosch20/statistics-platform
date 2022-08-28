import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { HypothesisTestingService } from 'src/app/hypothesis-testing/service/hypothesis-testing.service';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'mann-whitney',
  templateUrl: './mann-whitney.component.html',
  styleUrls: ['./mann-whitney.component.scss']
})
export class MannWhitneyComponent {


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
          values: new FormControl(returnRandomNumbers(7))
      }))
    )}
  );

  public pdfSrc = "https://firebasestorage.googleapis.com/v0/b/statistics-test-74f2e.appspot.com/o/TFM%20(2)-10-12.pdf?alt=media&token=497ed7a9-d4b9-4a02-8ec7-66dd5b08d71f";

  dtOptions: DataTables.Settings = {};

  public getTotalCells(): Array<number>{
    return (Array(this.dimensionsFormGroup.get('firstVariable')?.value as number * this.dimensionsFormGroup.get('secondVariable')?.value as number))
  }

  public getNumberColumns(): Observable<string> | undefined{
    return this.dimensionsFormGroup.get('firstVariable')?.valueChanges
    .pipe(
      tap(
        numberCols => console.log('numberCols', numberCols)
      ),
      map(
        numberColumns => `repeat(${numberColumns}, 1fr)`
      )
    );
  }

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

      this.formGroup.get("dimensionsFormGroup")?.valueChanges
      .pipe(
        tap(
          () => this.getTotalCells()
        )
      ).subscribe()
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
    const anovaValues = formValues.textAreaFormArray
      .map(
        textAreaForm => textAreaForm.values
      )
      .map(
        anovaValues =>  {
          console.log('anovaValues,', anovaValues)
          return this.transformIntoArray(anovaValues)
        }
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
