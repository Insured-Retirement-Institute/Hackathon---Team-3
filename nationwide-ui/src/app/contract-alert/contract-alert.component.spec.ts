import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractAlertComponent } from './contract-alert.component';

describe('ContractAlertComponent', () => {
  let component: ContractAlertComponent;
  let fixture: ComponentFixture<ContractAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
