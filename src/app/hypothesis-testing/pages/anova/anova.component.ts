import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AnovaService } from 'src/app/hypothesis-testing/service/anova.service';
import { DomSanitizer } from '@angular/platform-browser';

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
      provaControl: new FormControl(3)
    }
  );

  public createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
    }, false);
    console.log('image is', image);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

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

  public computeAnova(): any {
    return this.anovaService.getAnovaResults()
      .subscribe(
        result => {
          this.imageToShow = URL.createObjectURL(result);
          this.imageToShow = this.domSanitizer.bypassSecurityTrustUrl(this.imageToShow)
          console.log(this.imageToShow);
        }
      )
  }

}
