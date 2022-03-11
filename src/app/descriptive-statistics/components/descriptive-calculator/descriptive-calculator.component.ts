import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'descriptive-calculator',
  templateUrl: './descriptive-calculator.component.html',
  styleUrls: ['./descriptive-calculator.component.scss']
})
export class DescriptiveCalculatorComponent {

  @Input() public title = '';
  @Output() public observationsList: EventEmitter<Array<number>> = new EventEmitter<Array<number>>();
  public parsedText: string = '';
  public selected: string = 'breakline';

  public commaSelected(): void {
    this.selected = 'comma';
  }
  public breakSelected(): void {
    this.selected = 'breakline';
  }
  public spaceSelected(): void {
    this.selected = 'space';
  }

  public parseText(): void {
    switch (this.selected) {
      case 'comma':
        this.convertToNumberArray(',')
        break;
      case 'space':
        this.convertToNumberArray(' ')
        break;
      case 'breakline':
        this.convertToNumberArray('\n')
        break;
    }
  }

  public convertToNumberArray(delimiter: string) {
    const observations: Array<string> = this.parsedText.split(delimiter);
    const numberObservations: Array<number> = observations
      .map(
        character => Number(character)
      )
    this.observationsList.emit(numberObservations);
  }
}
