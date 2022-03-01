import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiveLinkComponent } from './descriptive-link.component';

describe('DescriptiveLinkComponent', () => {
  let component: DescriptiveLinkComponent;
  let fixture: ComponentFixture<DescriptiveLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptiveLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptiveLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
