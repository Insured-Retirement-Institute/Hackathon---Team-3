import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAlertsTotalComponent } from './data-alerts-total.component';

describe('DataAlertsTotalComponent', () => {
  let component: DataAlertsTotalComponent;
  let fixture: ComponentFixture<DataAlertsTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAlertsTotalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAlertsTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
