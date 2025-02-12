import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyAlertComponent } from './policy-alert.component';

describe('PolicyAlertComponent', () => {
  let component: PolicyAlertComponent;
  let fixture: ComponentFixture<PolicyAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
