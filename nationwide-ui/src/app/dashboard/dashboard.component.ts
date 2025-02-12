import { Component, OnInit } from '@angular/core';
import { ContractService } from '../services/contract.service';
import { Policy } from '../interface/policy';
import { generate } from 'rxjs';
import { WebSocketService } from '../services/web-socket.service';
import { Message } from '@stomp/stompjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
      trigger('fadeInOut', [
        state('void', style({
          opacity: 0
        })),
        transition('void <=> *', [
          animate(1000)
        ])
      ])
    ]
})
export class DashboardComponent implements OnInit{

  response: Policy[] = [];
  showNotification = false;
  alertsByType: any[] = [];
  // alertsOverTime: any[] = [];
  alertsByProductType: any[] = [];
  alertsOverTime: { name: string, series: { name: string, value: number }[] }[] = [];

  constructor(private contractService: ContractService, private websocketService: WebSocketService) { }

  totalSystemMessages: number = 0;

  ngOnInit(): void {
    this.contractService.getContracts().subscribe((data: Policy[]) => {
      this.response = data;
      this.generateChartValues(data);
    });
    
    this.websocketService.setMessageCallback((message: Message) => {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 5000);
    });
  }

  generateChartValues(data: Policy[]){
    this.calculateTotalAlerts(data);
    this.calculateAlertsByType();
    this.calculateAlertsByProductType();
    this.calculateAlertsOverTime();
  }

  calculateTotalAlerts(data: Policy[]): void {
    data.forEach(policy=>{
      this.totalSystemMessages = this.totalSystemMessages + policy.systemMessages.length;
    });
  }

  calculateAlertsByType(): void {
    const alertTypeCounts: { [key: string]: number } = {};
    const alertTypeMapping: { [key: number]: string } = {
      1: 'Interest Rate Eff Date Before Policy Issue Date',
      2: 'Anniversary Date Missing',
      3: 'Premium Higher than DB',
      4: 'Orphan Policy'
    };

    this.response.forEach(policy => {
        policy.systemMessages.forEach(systemMessage => {
          if (alertTypeCounts[systemMessage.messageCode]) {
            alertTypeCounts[systemMessage.messageCode]++;
          } else {
            alertTypeCounts[systemMessage.messageCode] = 1;
          }
        });
    });

    this.alertsByType = Object.keys(alertTypeCounts).map(key => ({
      name: alertTypeMapping[parseInt(key, 10)],
      value: alertTypeCounts[key]
    }));
  }

  calculateAlertsByProductType(): void {
    const alertByProductTypeCounts: { [key: string]: number } = {};

    this.response.forEach(policy => {
          if (alertByProductTypeCounts[policy.productType]) {
            alertByProductTypeCounts[policy.productType]++;
          } else {
            alertByProductTypeCounts[policy.productType] = 1;
          }
    });

    this.alertsByProductType = Object.keys(alertByProductTypeCounts).map(key => ({
      name: key,
      value: alertByProductTypeCounts[key]
    }));
  }

  calculateAlertsOverTime(): void {
  const alertsMap = new Map<string, number>();

  this.response.forEach(policy => {
    policy.systemMessages.forEach(message => {
      const month = message.messageStartDate.substring(0, 7); // Extract YYYY-MM
      if (alertsMap.has(month)) {
        alertsMap.set(month, alertsMap.get(month)! + 1);
      } else {
        alertsMap.set(month, 1);
      }
    });
  });

  const series = Array.from(alertsMap.entries()).map(([name, value]) => ({ name, value }));

    this.alertsOverTime = [
      {
        name: 'Alerts',
        series: series
      }
    ];
  }

}
