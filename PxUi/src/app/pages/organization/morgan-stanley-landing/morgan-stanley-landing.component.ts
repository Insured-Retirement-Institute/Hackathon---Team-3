import { Component, OnInit } from '@angular/core';

import { PoliciesComponent } from '../../dashboard/components/policies/policies.component';
import { AlertBreakdownComponent } from '../../../shared/components/alert-breakdown/alert-breakdown.component';
import { PolicyService } from '../../../../data/services';
import { Observable } from 'rxjs';
import { IAlertBreakdown, IAlertTotal, IPolicy, OrganizationType } from '../../../../models';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-morgan-stanley-landing',
    imports: [AlertBreakdownComponent, AsyncPipe, PoliciesComponent],
    templateUrl: './morgan-stanley-landing.component.html',
    styleUrl: './morgan-stanley-landing.component.scss',
    providers: [AsyncPipe]
})
export class MorganStanleyLandingComponent implements OnInit {
    alerts$!: Observable<IAlertBreakdown[]> | null;
    alert: IAlertBreakdown | null = null;
    policies$!: Observable<IPolicy[]>;

    componentType: OrganizationType = OrganizationType.FinancialInstitution;
    alertTotals$!: Observable<IAlertTotal> | null;

    constructor(private service: PolicyService) {}
    ngOnInit(): void {
        this.alerts$ = this.service.getAdvisorAlerts();
        this.alertTotals$ = this.service.getAlertTotals();
        this.policies$ = this.service.polcies$;
    }

    alertSelected(alert: IAlertBreakdown): void {
        this.alert = alert;
    }
}
