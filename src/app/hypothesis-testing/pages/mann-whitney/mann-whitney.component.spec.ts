import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MannWhitneyComponent } from './mann-whitney.component';

describe('MannWhitneyComponent', () => {
  let component: MannWhitneyComponent;
  let fixture: ComponentFixture<MannWhitneyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MannWhitneyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MannWhitneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
