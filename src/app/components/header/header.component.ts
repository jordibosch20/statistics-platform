import { Component } from '@angular/core';
import { NavbarTap } from 'src/app/entities/routingTap';

@Component({
  selector: 'header-menu',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public headerOptions: Array<NavbarTap> = [
    new NavbarTap('Hypothesis testing', '/hypothesis-testing/testList'),
    // new NavbarTap('Regression coefficients', '/regression-coefficients'),
    new NavbarTap('Descriptive statistcs', '/descriptive-statistics/statistics-list'),
    // new NavbarTap('Distributions graphs', '/distributions'),*/
    new NavbarTap('RoadMap & Information', '/roadmap')
  ];

}
