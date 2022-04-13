import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'anova',
  templateUrl: './anova.component.html',
  styleUrls: ['./anova.component.scss']
})
export class AnovaComponent implements OnInit {


  constructor(private domSanitizer: DomSanitizer, private anovaService: AnovaService) { }

  public imageToShow: any;
  public numberTreatments: number = 3;
  public formGroup = new FormGroup(
    {
      numberTreatments: new FormControl(this.numberTreatments)
    }
  );

  ngOnInit() {
    this.formGroup.get("numberTreatments")?.valueChanges
      .pipe(
        tap(
          value => this.numberTreatments = value
        )
      )
      .subscribe()
  }

  public counter(n: number): Array<number> {
    return [...Array(n).keys()].map(i => i + 1);
  }

  public computeAnova(): any {
    return this.anovaService.getAnovaResults()
      .subscribe(
        result => this.imageToShow = this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(result))
      )
  }

}
