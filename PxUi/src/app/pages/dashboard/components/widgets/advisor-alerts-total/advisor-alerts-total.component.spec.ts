import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorAlertsTotalComponent } from './advisor-alerts-total.component';

describe('AdvisorAlertsTotalComponent', () => {
  let component: AdvisorAlertsTotalComponent;
  let fixture: ComponentFixture<AdvisorAlertsTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdvisorAlertsTotalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvisorAlertsTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
