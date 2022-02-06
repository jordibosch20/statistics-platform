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
    new NavbarTap('Confidence Interval', ''),
    new NavbarTap('Regression coefficietnts', ''),
    new NavbarTap('Distributions grphs', '')
  ];

}
