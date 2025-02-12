import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertBreakdownComponent } from './alert-breakdown.component';

describe('AlertBreakdownComponent', () => {
  let component: AlertBreakdownComponent;
  let fixture: ComponentFixture<AlertBreakdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertBreakdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
