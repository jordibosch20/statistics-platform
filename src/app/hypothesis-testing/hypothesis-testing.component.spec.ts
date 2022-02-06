import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HypothesisTestingComponent } from './hypothesis-testing.component';


describe('HypothesisTestingComponent', () => {
  let component: HypothesisTestingComponent;
  let fixture: ComponentFixture<HypothesisTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HypothesisTestingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HypothesisTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
