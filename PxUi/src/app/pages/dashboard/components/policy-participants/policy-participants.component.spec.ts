import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyParticipantsComponent } from './policy-participants.component';

describe('PolicyParticipantsComponent', () => {
  let component: PolicyParticipantsComponent;
  let fixture: ComponentFixture<PolicyParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolicyParticipantsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
