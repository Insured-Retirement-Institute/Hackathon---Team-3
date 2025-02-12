import { Component } from '@angular/core';

@Component({
  selector: 'bedrock-prompt',
  templateUrl: './bedrock-prompt.component.html',
  styleUrl: './bedrock-prompt.component.css'
})
export class BedrockPromptComponent {
  prompt: string = '';
  output: string = '';

  generateOutput() {
    // Logic to generate output based on the prompt
    this.output = `Output for: ${this.prompt}`;
  }

}