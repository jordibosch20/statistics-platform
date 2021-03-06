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
    { name: "Student's t-test", url: '/hypothesis-testing/kourman-cox' },
    { name: "Paired Student's t-test", url: '/hypothesis-testing/kourman-cox' },
    { name: "Kruskal-Wallis H Test", url: '/hypothesis-testing/kourman-cox' },
    { name: "Mann-Whitney U Test", url: '/hypothesis-testing/kourman-cox' },
    { name: "Wilcoxon Signed-Rank Test", url: '/hypothesis-testing/kourman-cox' },
    { name: "Friedman Test", url: '/hypothesis-testing/kourman-cox' },
    { name: "Chi Squared", url: '/hypothesis-testing/chi-squared' }
  ];

}
