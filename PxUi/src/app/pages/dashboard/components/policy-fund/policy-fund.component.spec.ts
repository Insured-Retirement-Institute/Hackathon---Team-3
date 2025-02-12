import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyFundComponent } from './policy-fund.component';

describe('PolicyFundComponent', () => {
  let component: PolicyFundComponent;
  let fixture: ComponentFixture<PolicyFundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyFundComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyFundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
