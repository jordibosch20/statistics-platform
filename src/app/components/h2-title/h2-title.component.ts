import { Component, Input } from '@angular/core';

@Component({
  selector: 'h2-title',
  templateUrl: './h2-title.component.html',
  styleUrls: ['./h2-title.component.scss']
})
export class H2TitleComponent {

  @Input() public title: string = '';

}
