import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { returnRandomNumbers } from 'src/app/utils/utils';

@Component({
  selector: 'anova',
  templateUrl: './anova.component.html',
  styleUrls: ['./anova.component.scss']
})
export class AnovaComponent implements OnInit {


  constructor(private fb: FormBuilder, private domSanitizer: DomSanitizer, private anovaService: AnovaService) { }

  public imageToShow: any;
  public numberTreatments: number = 3;
  public formGroup = new FormGroup(
    {
      numberTreatments: new FormControl(this.numberTreatments),
      textAreaFormArray: this.fb.array([
        this.fb.group({
          values: new FormControl(returnRandomNumbers(5))
        }),
        this.fb.group({
          values: new FormControl(returnRandomNumbers(5))
        }),
        this.fb.group({
          values: new FormControl(returnRandomNumbers(5))
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
  }

  private updateFormArray(value: number) {
    this.getTextareasFormArray().controls = [];
    for (let i = 0; i < value; ++i) {
      const textarea = this.fb.group({
        values: new FormControl(returnRandomNumbers(5))
      });
      this.getTextareasFormArray().push(textarea);
    }
  }

  public counter(n: number): Array<number> {
    return [...Array(n).keys()].map(i => i + 1);
  }

  public computeAnova(): any {
    console.log('form is', this.formGroup.getRawValue())
    return this.anovaService.getAnovaResults()
      .subscribe(
        result => this.imageToShow = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(result))
      )
  }

}
