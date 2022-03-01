import { Component, Input } from '@angular/core';

@Component({
  selector: 'descriptive-link',
  templateUrl: './descriptive-link.component.html',
  styleUrls: ['./descriptive-link.component.scss']
})
export class DescriptiveLinkComponent {

  @Input() title: string = '';
  @Input() description: string = '';

}
