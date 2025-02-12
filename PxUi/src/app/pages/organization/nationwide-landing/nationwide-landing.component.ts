import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlertBreakdown, IAlertTotal, IPolicy, OrganizationType } from '../../../../models';
import { PolicyService } from '../../../../data/services';
import { PoliciesComponent } from '../../dashboard/components/policies/policies.component';
import { AlertBreakdownComponent } from '../../../shared/components/alert-breakdown/alert-breakdown.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-nationwide-landing',
    imports: [AlertBreakdownComponent, AsyncPipe, PoliciesComponent],
    templateUrl: './nationwide-landing.component.html',
    styleUrl: './nationwide-landing.component.scss'
})
export class NationwideLandingComponent {
    alerts$!: Observable<IAlertBreakdown[]> | null;
    alert: IAlertBreakdown | null = null;

    componentType: OrganizationType = OrganizationType.Carrier;
    alertTotals$!: Observable<IAlertTotal>;
    policies$!: Observable<IPolicy[]>;

    constructor(private service: PolicyService) {}
    ngOnInit(): void {
        this.alerts$ = this.service.getDataAlerts();
        this.alertTotals$ = this.service.getAlertTotals();
        this.policies$ = this.service.polcies$;
    }

    alertSelected(alert: IAlertBreakdown): void {
        this.alert = alert;
    }
}
