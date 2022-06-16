import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { returnRandomNumbers } from 'src/app/utils/utils';
import { HypothesisTestingService } from 'src/app/hypothesis-testing/service/hypothesis-testing.service';

@Component({
  selector: 'kolmogorov-smirnov',
  templateUrl: './kolmogorov-smirnov.component.html',
  styleUrls: ['./kolmogorov-smirnov.component.scss']
})
export class KolmogorovSmirnov implements OnInit {

  @ViewChild('targetScroll', { static: false }) private scrollElement!: ElementRef;

  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer, private anovaService: AnovaService, private hypothesisTestingService: HypothesisTestingService) { }

  public selected = false;
  public imageToShow1: any;
  public imageToShow2: any;
  public resultsHomocedasticity: any;
  public resultsAnovaComputation: any;
  public resultsAnovaTukey: any;
  public resultsAnovaNormality: any;
  public numberTreatments: number = 3;
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

  dtOptions: DataTables.Settings = {};

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
    const kolmogorovSmirnovValues = formValues.textAreaFormArray
      .map(
        textAreaForm => textAreaForm.values
      )
      .map(
        kolmogorovSmirnovValues => this.transformIntoArray(kolmogorovSmirnovValues)
      );
    console.log('kolmogorovSmirnovValues are', kolmogorovSmirnovValues);
    return combineLatest([
        this.hypothesisTestingService.getKolmogorovSmirnovValues(kolmogorovSmirnovValues)
      ])
      .pipe(
        map(
        ([result]) => {
          if(!!result) {
            this.isComputing = false;
            this.imageToShow1 = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(result[0]))
            this.imageToShow2 = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(result[1]))
            setTimeout(() =>  this.scrollElement.nativeElement.scrollIntoView({block:'start', inline: 'nearest', behavior: 'smooth'}), 70);
          }
      })
      )
      .subscribe()
  }
}