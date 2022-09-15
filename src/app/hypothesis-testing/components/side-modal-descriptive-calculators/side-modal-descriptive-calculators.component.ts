import { Component, Input } from '@angular/core';

@Component({
  selector: 'side-modal-descriptive-calculators',
  templateUrl: './side-modal-descriptive-calculators.component.html',
  styleUrls: ['./side-modal-descriptive-calculators.component.scss']
})
export class SideModalDescriptiveCalculatorsComponent {

  public calculators: any = [
    { name: "Variance, Standard Deviation Calculator", url: 'descriptive-statistics/variance' },
    { name: "Mean, Median, Mode Calculator", url: 'descriptive-statistics/mean-median-mode'},
    { name: "Skewness Calculator", url: 'descriptive-statistics/skewness'},
    { name: "Kurtosis Calculator", url: 'descriptive-statistics/kurtosis'},
    { name: "Geometric Mean Calculator", url: 'descriptive-statistics/geometric-mean'},
    { name: "Harmonic Mean Calculator", url: 'descriptive-statistics/harmonic-mean'},
    { name: "Sum of Inverses Calculator", url: 'descriptive-statistics/sum-inverses' },
    { name: "Sum of Squares Calculator", url: 'descriptive-statistics/sum-squares'},
    { name: "Sum of Cubes Calculator", url: 'descriptive-statistics/sum-cubes'}
  ];

}
