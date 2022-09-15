import { Component } from '@angular/core';

@Component({
  selector: 'sum-squares',
  templateUrl: './sum-squares.component.html',
  styleUrls: ['./sum-squares.component.scss']
})
export class SumSquaresComponent {
  public selected: string = 'breakline';
  public calculated: boolean = false;
  public variance: number = 0;

  public commaSelected(): void {
    this.selected = 'comma';
  }
  public breakSelected(): void {
    this.selected = 'breakline';
  }
  public spaceSelected(): void {
    this.selected = 'space';
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: false
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
  ];


  public computeVariance($event: Array<number>): void {
    const observations: Array<number> = $event;
    const mean: number = observations.reduce((prev, curr) => prev + curr, 0) / observations.length;
    const variance: number = observations.reduce((prev, curr) => prev + (curr - mean) ** 2, 0) / (observations.length - 1);
    this.variance = variance;
  }



}
