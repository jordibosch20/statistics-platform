import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PapaParseService } from 'ngx-papaparse';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { HypothesisTestingService } from 'src/app/hypothesis-testing/service/hypothesis-testing.service';
import { returnRandomNumbers, cleanData } from 'src/app/utils/utils';
import { Validator } from 'src/app/utils/validator';

@Component({
  selector: 'shapiro-wilk',
  templateUrl: './shapiro-wilk.component.html',
  styleUrls: ['./shapiro-wilk.component.scss']
})
export class ShapiroWilkComponent {


  @ViewChild('targetScroll', { static: false }) private scrollElement!: ElementRef;

  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer, private anovaService: AnovaService, private hypothesisTestingService: HypothesisTestingService,
    private papa: PapaParseService) { }

  public selected = false;
  public imageToShow1: any;
  public imageToShow2: any;
  public resultsHomocedasticity: any;
  public resultsAnovaComputation: any;
  public resultsAnovaTukey: any;
  public resultsSaphireWilkNormality: any;
  public numberTreatments: number = 3;
  public isComputing: boolean = false;
  public formGroup = new FormGroup(
    {
      numberTreatments: new FormControl(this.numberTreatments),
      textAreaFormArray: this.fb.array([
        this.fb.group({
          values: new FormControl(returnRandomNumbers(70), Validator.numericValidation)
        })
      ])
    }
  );

  public pdfSrc = "https://firebasestorage.googleapis.com/v0/b/statistics-test-74f2e.appspot.com/o/saphiro-wilk.pdf?alt=media&token=a443c9ee-00c8-4b99-974a-dd5a5f36fed9";

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
    const anovaValues = formValues.textAreaFormArray
      .map(
        textAreaForm => textAreaForm.values
      )
      .map(
        anovaValues => this.transformIntoArray(anovaValues)
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

  public fileupload(event: any, i:number) {
    console.log('textarea i is', i);
    let files = event.target.files;
    let file: File = files.item(0) as File;
    let formData = new FormData();
    formData.append("file", file, file.name);
    console.log('file is', file);

    var reader = new FileReader();
    reader.readAsText(file);
    let test:any = [];
    reader.onload = (event: any) => {
      var csv = event.target.result; // Content of CSV file
      this.papa.parse(csv, {
        skipEmptyLines: true,
        header: false,
        complete: (results) => {
          // console.log(this.test);
          console.log('Results are', results.data[0]);
          let arrayFormGroups = this.getTextareasFormArrayControls();
          ((arrayFormGroups[i] as FormGroup).get('values') as FormControl).setValue(cleanData(results.data[0]));
        }
      });
    }
  }

}
