import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../services/web-socket.service';
import { Message } from '@stomp/stompjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {

  showNotification = false;

  constructor(private websocketService: WebSocketService) { }

  ngOnInit(): void {

    this.websocketService.setMessageCallback((message: Message) => {
      this.showNotification = true;
      setTimeout(() => {
        this.showNotification = false;
      }, 5000);
    });
  }

}
