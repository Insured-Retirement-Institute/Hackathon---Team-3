import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPolicy, SystemMessage } from '../../../models';
import { combineLatest, map, Observable, ReplaySubject, tap } from 'rxjs';
import { AdvisorAlert, AdvisorAlertDescription, DataAlert, DataAlertDescription, IAlertBreakdown, IAlertTotal, INotification } from '../../../models/notifications';

@Injectable({
    providedIn: 'root'
})
export class PolicyService {
    private _policies: ReplaySubject<IPolicy[]> = new ReplaySubject<IPolicy[]>(1);
    private _alerts: ReplaySubject<INotification[]> = new ReplaySubject<INotification[]>(1);

    constructor(private httpClient: HttpClient) {}

    get polcies$(): Observable<IPolicy[]> {
        return this._policies.asObservable();
    }

    get alerts$(): Observable<INotification[]> {
        return this._alerts.asObservable();
    }

    get policiesWithAlerts$(): Observable<IPolicy[]> {
        return combineLatest([this.polcies$, this.alerts$]).pipe(
            map(([policies, alerts]) => {
                // Combine the values and return a new value
                policies.forEach((p) => {
                    const advisorAlerts = alerts.find((d) => d.TXLife.TXLifeRequest.OLifE.Holding.Policy.PolNumber === p.PolicyNumber && d.TXLife.TXLifeRequest.TransSubType.value == 'Advisor Alert');
                    if (advisorAlerts) {
                        p.AdvisorAlerts = advisorAlerts.TXLife.TXLifeRequest.OLifE.Holding.SystemMessage;
                    }
                    const dataAlerts = alerts.find((d) => d.TXLife.TXLifeRequest.OLifE.Holding.Policy.PolNumber === p.PolicyNumber && d.TXLife.TXLifeRequest.TransSubType.value == 'Data Quality Alert');
                    if (dataAlerts) {
                        p.DataAlerts = dataAlerts.TXLife.TXLifeRequest.OLifE.Holding.SystemMessage;
                    }
                });
                return policies;
            })
        );
    }

    getAllPolicies(): Observable<IPolicy[]> {
        return this.httpClient.get<IPolicy[]>('https://tozzevkh56.execute-api.us-west-2.amazonaws.com/default/readPolicies').pipe(
            tap((response: any) => {
                this._policies.next(response);
            })
        );
    }

    getAllAlerts(): Observable<INotification[]> {
        https: return this.httpClient.get<INotification[]>('https://v9limkh84c.execute-api.us-west-2.amazonaws.com/default/readAlerts').pipe(
            tap((response: any) => {
                this._alerts.next(response);
            })
        );
    }

    getAdvisorAlerts(): Observable<IAlertBreakdown[]> {
        const advisorAlerts: Observable<IAlertBreakdown[]> = this._alerts.pipe(
            map((d) => {
                const alerts: SystemMessage[] = d?.filter((d) => d.TXLife.TXLifeRequest.TransSubType.value == 'Advisor Alert').flatMap((d) => d.TXLife.TXLifeRequest.OLifE.Holding.SystemMessage);

                const groupedMap = alerts.reduce((entryMap, e) => entryMap.set(e.MessageCode, [...(entryMap.get(e.MessageCode) || []), e]), new Map());

                let labels: string[] = [];
                let mapLengths: number[] = [];
                groupedMap.forEach((value, key) => {
                    mapLengths.push(Array.isArray(value) ? value.length : value.length);
                    labels.push(AdvisorAlert[key]);
                });

                const breakdown: IAlertBreakdown[] = [];
                groupedMap.forEach((value, key) => {
                    const eachBreakdon: IAlertBreakdown = {
                        alert: AdvisorAlert[key],
                        alertCount: Array.isArray(value) ? value.length : value.length,
                        alertDescription: AdvisorAlertDescription[key],
                        id: Number(Object.keys(AdvisorAlert).find((d) => d === key))
                    };
                    breakdown.push(eachBreakdon);
                });
                return breakdown;
            })
        );
        return advisorAlerts;
    }

    getDataAlerts(): Observable<IAlertBreakdown[]> {
        const dataAlerts: Observable<IAlertBreakdown[]> = this._alerts.pipe(
            map((d) => {
                const alerts: SystemMessage[] = d?.filter((d) => d.TXLife.TXLifeRequest.TransSubType.value == 'Data Quality Alert').flatMap((d) => d.TXLife.TXLifeRequest.OLifE.Holding.SystemMessage);

                const groupedMap = alerts.reduce((entryMap, e) => entryMap.set(e.MessageCode, [...(entryMap.get(e.MessageCode) || []), e]), new Map());

                let labels: string[] = [];
                let mapLengths: number[] = [];
                groupedMap.forEach((value, key) => {
                    mapLengths.push(Array.isArray(value) ? value.length : value.length);
                    labels.push(DataAlert[key]);
                });

                const breakdown: IAlertBreakdown[] = [];
                groupedMap.forEach((value, key) => {
                    const eachBreakdon: IAlertBreakdown = {
                        alert: DataAlert[key],
                        alertCount: Array.isArray(value) ? value.length : value.length,
                        alertDescription: DataAlertDescription[key],
                        id: Number(Object.keys(DataAlert).find((d) => d === key))
                    };
                    breakdown.push(eachBreakdon);
                });
                return breakdown;
            })
        );
        return dataAlerts;
    }

    getAlertTotals(): Observable<IAlertTotal> {
        const yo: Observable<IAlertTotal> = this.alerts$.pipe(
            map((d) => {
                const advisorAlerts = d?.filter((d) => d.TXLife.TXLifeRequest.TransSubType.value == 'Advisor Alert').flatMap((d) => d.TXLife.TXLifeRequest.OLifE.Holding.SystemMessage);
                const dataAlerts = d?.filter((d) => d.TXLife.TXLifeRequest.TransSubType.value == 'Data Quality Alert').flatMap((d) => d.TXLife.TXLifeRequest.OLifE.Holding.SystemMessage);

                return { policyCount: d?.length, advisorCount: advisorAlerts?.length ?? 0, dataCount: dataAlerts?.length ?? 0 } as IAlertTotal;
            })
        );

        return yo;
    }
}
