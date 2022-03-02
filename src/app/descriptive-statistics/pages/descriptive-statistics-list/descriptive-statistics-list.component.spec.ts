import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiveStatisticsListComponent } from './descriptive-statistics-list.component';

describe('DescriptiveStatisticsListComponent', () => {
  let component: DescriptiveStatisticsListComponent;
  let fixture: ComponentFixture<DescriptiveStatisticsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescriptiveStatisticsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptiveStatisticsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
