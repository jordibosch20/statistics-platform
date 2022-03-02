import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'descriptive-link',
  templateUrl: './descriptive-link.component.html',
  styleUrls: ['./descriptive-link.component.scss']
})
export class DescriptiveLinkComponent {

  @Input() title: string = '';
  @Input() description: string = '';
  @Input() url: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  navigate(): void {
    this.router.navigate(['/descriptive-statistics/variance']);
  }

}
