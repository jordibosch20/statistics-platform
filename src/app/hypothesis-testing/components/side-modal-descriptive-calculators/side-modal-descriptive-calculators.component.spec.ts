import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideModalDescriptiveCalculatorsComponent } from './side-modal-descriptive-calculators.component';

describe('SideModalDescriptiveCalculatorsComponent', () => {
  let component: SideModalDescriptiveCalculatorsComponent;
  let fixture: ComponentFixture<SideModalDescriptiveCalculatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideModalDescriptiveCalculatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideModalDescriptiveCalculatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
