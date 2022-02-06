import { Component } from '@angular/core';
import { NavbarTap } from 'src/app/entities/routingTap';

@Component({
  selector: 'header-menu',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public headerOptions: Array<NavbarTap> = [
    new NavbarTap('Hypothesis testing', 'hypothesis-testing'),
    new NavbarTap('Confidence Interval', '/confidence-interval'),
    new NavbarTap('Regression coefficients', '/regression-coefficients'),
    new NavbarTap('Distributions graphs', '/distribution-graphs')
  ];

}
