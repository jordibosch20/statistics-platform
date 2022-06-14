import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KolmogorovSmirnov } from './kolmogorov-smirnov.component';

describe('AnovaComponent', () => {
  let component: KolmogorovSmirnov;
  let fixture: ComponentFixture<KolmogorovSmirnov>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KolmogorovSmirnov ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KolmogorovSmirnov);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
