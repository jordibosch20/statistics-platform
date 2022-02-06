import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiSquaredComponent } from './chi-squared.component';

describe('ChiSquaredComponent', () => {
  let component: ChiSquaredComponent;
  let fixture: ComponentFixture<ChiSquaredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiSquaredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiSquaredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
