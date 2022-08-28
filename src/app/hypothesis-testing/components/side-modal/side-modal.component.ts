import { Component, Input } from '@angular/core';

@Component({
  selector: 'side-modal',
  templateUrl: './side-modal.component.html',
  styleUrls: ['./side-modal.component.scss']
})
export class SideModalComponent {
  @Input() title: string = '';

  public calculators: any = [
    { name: "Student t-Test", url: '/hypothesis-testing/student-t-test' },
    { name: "Anova Calculator", url: '/hypothesis-testing/anova' },
    { name: "Kolmogorov-Smirnov Calculator", url: '/hypothesis-testing/kolmogorov-smirnov' },
    { name: "Shapiro-Wilk", url: '/hypothesis-testing/shapiro-wilk' },
    { name: "Mann-Whitney U Test", url: '/hypothesis-testing/mann-whitney' },
    { name: "Chi Squared", url: '/hypothesis-testing/chi-squared' }
  ];

}
