import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { PapaParseService } from 'ngx-papaparse';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { HypothesisTestingService } from 'src/app/hypothesis-testing/service/hypothesis-testing.service';
import { TTestService } from 'src/app/hypothesis-testing/service/ttest.service';
import { HypothesisTestingLocator } from 'src/app/locators/hypothesis-testing.locator';
import { returnRandomNumbers, cleanData } from 'src/app/utils/utils';
import { Validator } from 'src/app/utils/validator';

@Component({
  selector: 't-test',
  templateUrl: './t-test.component.html',
  styleUrls: ['./t-test.component.scss']
})
export class TTestComponent {

  @ViewChild('targetScroll', { static: false }) private scrollElement!: ElementRef;

  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer, private tTestService: TTestService, private anovaService: AnovaService, private hypothesisTestingService: HypothesisTestingService,
    private papa: PapaParseService) { }

  public selected = false;
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
          values: new FormControl(returnRandomNumbers(20), Validator.numericValidation)
        }),
        this.fb.group({
          values: new FormControl(returnRandomNumbers(20), Validator.numericValidation)
        })
      ])
    }
  );

  public pdfSrc = "https://firebasestorage.googleapis.com/v0/b/statistics-test-74f2e.appspot.com/o/ttest.pdf?alt=media&token=1776c7e6-9b74-46e5-8f51-c42bcce92e05";


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

  public closePopup():void{
    this.selected = !this.selected;
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
