import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierAnalysisComponent } from './carrier-analysis.component';

describe('CarrierAnalysisComponent', () => {
  let component: CarrierAnalysisComponent;
  let fixture: ComponentFixture<CarrierAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrierAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrierAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
