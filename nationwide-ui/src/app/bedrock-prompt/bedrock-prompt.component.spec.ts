import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedrockPromptComponent } from './bedrock-prompt.component';

describe('BedrockPromptComponent', () => {
  let component: BedrockPromptComponent;
  let fixture: ComponentFixture<BedrockPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BedrockPromptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedrockPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
