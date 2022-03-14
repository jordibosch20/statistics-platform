import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'anova',
  templateUrl: './anova.component.html',
  styleUrls: ['./anova.component.scss']
})
export class AnovaComponent implements OnInit {

  public numberTreatments: number = 3;
  public formGroup = new FormGroup(
    {
      numberTreatments: new FormControl(3)
    }
  );

  ngOnInit() {
    this.formGroup.get("numberTreatments")?.valueChanges
      .pipe(
        tap(
          () => this.numberTreatments = this.formGroup.get('numberTreatments')?.value as number
        ),
        tap(
          () => console.log(this.numberTreatments)
        )
      )
      .subscribe()
  }

  public counterrrr(i: number): Array<number> {
    return [1, 2, 3, 4];
  }
}
