import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { returnRandomNumbers, cleanData } from 'src/app/utils/utils';
import { HypothesisTestingService } from 'src/app/hypothesis-testing/service/hypothesis-testing.service';
import { Validator } from 'src/app/utils/validator';
import { PapaParseService } from 'ngx-papaparse';

@Component({
  selector: 'kolmogorov-smirnov',
  templateUrl: './kolmogorov-smirnov.component.html',
  styleUrls: ['./kolmogorov-smirnov.component.scss']
})
export class KolmogorovSmirnov implements OnInit {

  dtOptions: DataTables.Settings = {};

  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer, private anovaService: AnovaService, private hypothesisTestingService: HypothesisTestingService,
    private papa: PapaParseService) { }

  public selected = false;
  public imageToShow1: any;
  public imageToShow2: any;
  public resultsHomocedasticity: any;
  public resultskolmogorovSmirnovValues: any;
  public resultsAnovaTukey: any;
  public resultsAnovaNormality: any;
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

  public pdfSrc = "https://firebasestorage.googleapis.com/v0/b/statistics-test-74f2e.appspot.com/o/kolmogorov-smirnov.pdf?alt=media&token=300ac8f6-34de-4604-aca1-6711f0cd8586";


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

  public closePopup():void{
    this.selected = !this.selected;
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
        ([resultskolmogorovSmirnovValues]) => {
          if(!!resultskolmogorovSmirnovValues) {
            this.isComputing = false;
          }
          if(!!resultskolmogorovSmirnovValues) {
            this.resultskolmogorovSmirnovValues = resultskolmogorovSmirnovValues
          }
      })
      )
      .subscribe()
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