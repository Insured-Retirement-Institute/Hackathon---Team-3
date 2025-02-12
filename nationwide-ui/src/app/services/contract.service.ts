import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Policy } from '../interface/policy';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  
  private txapiUrl = 'https://1wdm8rrwaf.execute-api.us-west-2.amazonaws.com/app/api/txlife'; 
  // private txapiUrl = 'http://localhost:8080/api/txlife'; 

  constructor(private http: HttpClient) { }

  getContracts(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.txapiUrl);
  }
}