import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiveCalculatorComponent } from './descriptive-calculator.component';

describe('DescriptiveCalculatorComponent', () => {
  let component: DescriptiveCalculatorComponent;
  let fixture: ComponentFixture<DescriptiveCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptiveCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptiveCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
