import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationwideLandingComponent } from './nationwide-landing.component';

describe('NationwideLandingComponent', () => {
  let component: NationwideLandingComponent;
  let fixture: ComponentFixture<NationwideLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NationwideLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationwideLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
