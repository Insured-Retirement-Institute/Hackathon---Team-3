import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyBenefitsComponent } from './policy-benefits.component';

describe('PolicyBenefitsComponent', () => {
  let component: PolicyBenefitsComponent;
  let fixture: ComponentFixture<PolicyBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyBenefitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
