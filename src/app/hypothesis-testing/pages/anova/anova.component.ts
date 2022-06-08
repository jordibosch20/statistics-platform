import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'anova',
  templateUrl: './anova.component.html',
  styleUrls: ['./anova.component.scss']
})
export class AnovaComponent implements OnInit {

  @ViewChild('targetScroll', { static: false }) private scrollElement!: ElementRef;

  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer, private anovaService: AnovaService) { }

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
      numberTreatments: new FormControl(this.numberTreatments),
      textAreaFormArray: this.fb.array([
        this.fb.group({
          values: new FormControl(returnRandomNumbers(70))
        }),
        this.fb.group({
          values: new FormControl(returnRandomNumbers(70))
        }),
        this.fb.group({
          values: new FormControl(returnRandomNumbers(70))
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

  public computeAnova(): any {
    this.isComputing = true;
    const formValues: { numberTreatments: number, textAreaFormArray: Array<{ values: Array<number> }> } = this.formGroup.getRawValue();
    const anovaValues = formValues.textAreaFormArray
      .map(
        textAreaForm => textAreaForm.values
      )
    console.log('anovaValues are', anovaValues);
    return combineLatest([
        this.anovaService.getAnovaValues(anovaValues),
        this.anovaService.getAnovaHomocedasticity(anovaValues),
        this.anovaService.getAnovaComputation(anovaValues),
        this.anovaService.getAnovaTukey(anovaValues),
        this.anovaService.getNormalityComputation(anovaValues),
      ])
      .pipe(
        map(
        ([result, homocedasticity, anovaComputation, anovaTukey, normalityComputation]) => {
          if(!!result) {
            this.isComputing = false;
            this.imageToShow1 = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(result[0]))
            this.imageToShow2 = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(result[1]))
            setTimeout(() =>  this.scrollElement.nativeElement.scrollIntoView({block:'start', inline: 'nearest', behavior: 'smooth'}), 70);
          }
          if(!!homocedasticity) {
            this.resultsHomocedasticity = homocedasticity
          }
          if(!!anovaComputation) {
            this.resultsAnovaComputation = anovaComputation
          }
          if(!!anovaTukey) {
            this.resultsAnovaTukey = anovaTukey
          }
          if(!!normalityComputation) {
            this.resultsAnovaNormality = normalityComputation
          }
      })
      )
      .subscribe()
  }
}