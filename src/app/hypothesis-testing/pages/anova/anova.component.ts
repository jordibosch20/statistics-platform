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
      provaControl: new FormControl(3)
    }
  );

  ngOnInit() {
    this.formGroup.get("provaControl")?.valueChanges
      .pipe(
        tap(
          () => this.numberTreatments = Number(this.formGroup.get("provaControl")?.value as number)
        ),
        tap(
          () => console.log(this.numberTreatments)
        )
      )
      .subscribe()
  }

  public counter(i: number): Array<number> {
    return Array.from({ length: i }, (_, j) => j + 1)
  }
}
