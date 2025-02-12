import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractInboxComponent } from './contract-inbox.component';

describe('ContractInboxComponent', () => {
  let component: ContractInboxComponent;
  let fixture: ComponentFixture<ContractInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
