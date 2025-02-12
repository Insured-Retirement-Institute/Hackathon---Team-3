import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SystemMessage } from '../interface/systemmessage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contract-alert',
  templateUrl: './contract-alert.component.html',
  styleUrls: ['./contract-alert.component.css']
})
export class ContractAlertComponent implements OnInit {
  
  contractNumber: string = '';
  systemMessages: SystemMessage[] = [];
  displayedColumns: string[] = ['Description', 'Severity Code'];
  chatMessages: string[] = [];
  userMessage: string = '';
  additionalInfo: string = '';

  private bedrockApiUrl = 'https://1wdm8rrwaf.execute-api.us-west-2.amazonaws.com/app/api/bedrock'; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {
    this.contractNumber = data.alerts.polNumber;
    this.systemMessages = data.alerts.systemMessages;
  }

  ngOnInit(): void {
  }

  sendMessage() {
    if (this.userMessage.trim()) {
      const message = this.userMessage;
      this.chatMessages.push(`You: ${message}`);
      this.userMessage = '';

      // Send the message to the Bedrock API
      this.http.post(this.bedrockApiUrl, { "prompt" : message }, { responseType: 'text' }).subscribe((response: string) => {
        this.chatMessages.push(`Bedrock API: ${response}`);
      });
    }
  }

}
