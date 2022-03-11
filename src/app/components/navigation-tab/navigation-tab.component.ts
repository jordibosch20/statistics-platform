import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'navigation-tab',
  templateUrl: './navigation-tab.component.html',
  styleUrls: ['./navigation-tab.component.scss']
})
export class NavigationTabComponent {

  @Input() title: string = '';
  @Input() url: string = '';

  constructor(private router: Router) { }

  navigate(): void {
    this.router.navigate([this.url]);
  }

}
