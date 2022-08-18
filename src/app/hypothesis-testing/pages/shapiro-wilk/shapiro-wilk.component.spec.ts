import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapiroWilkComponent } from './shapiro-wilk.component';

describe('ShapiroWilkComponent', () => {
  let component: ShapiroWilkComponent;
  let fixture: ComponentFixture<ShapiroWilkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapiroWilkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapiroWilkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
