import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganStanleyLandingComponent } from './morgan-stanley-landing.component';

describe('MorganStanleyLandingComponent', () => {
  let component: MorganStanleyLandingComponent;
  let fixture: ComponentFixture<MorganStanleyLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MorganStanleyLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MorganStanleyLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
