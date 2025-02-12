import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private client: Client;
  private messageCallback!: (message: Message) => void;

  constructor() {
    this.client = new Client({
      brokerURL: 'ws://1wdm8rrwaf.execute-api.us-west-2.amazonaws.com/app/ws',
      connectHeaders: {},
      debug: (str) => {
        console.log(new Date(), str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      webSocketFactory: () => {
        return new SockJS('https://1wdm8rrwaf.execute-api.us-west-2.amazonaws.com/app/ws');
      }
    });

    this.client.onConnect = (frame) => {
      console.log('Connected: ' + frame);
      this.client.subscribe('/topic/notifications', (message: Message) => {
        if (this.messageCallback) {
          this.messageCallback(message);
        }
        this.showNotification(message.body);
      });
    };

    this.client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };
    
    this.client.activate();
  }

  public sendMessage(name: string) {
    const payload = JSON.stringify({ name });
    this.client.publish({ destination: '/app/hello', body: payload });
  }

  private onMessageReceived(message: Message) {
    console.log('Message received from server: ' + message.body);
  }

  public setMessageCallback(callback: (message: Message) => void) {
    this.messageCallback = callback;
  }

  public showNotification(message: string) {
    // Display the notification (e.g., using Angular Material Snackbar)
    console.log('Notification:', message);
  }

  public getNotification(): string{
    return this.messageCallback.toString();
  }

  public getClient(): Client {
    return this.client;
  }
}
