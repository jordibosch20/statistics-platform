import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'descriptive-link',
  templateUrl: './descriptive-link.component.html',
  styleUrls: ['./descriptive-link.component.scss']
})
export class DescriptiveLinkComponent {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() url: string = '';
  @Input() center: boolean = false;

  constructor(private router: Router) { }

  navigate(): void {
    this.router.navigate(['/descriptive-statistics/variance']);
  }

}
