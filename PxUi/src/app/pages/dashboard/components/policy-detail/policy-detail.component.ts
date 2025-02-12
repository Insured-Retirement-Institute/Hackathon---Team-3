import { Component, Input, input } from '@angular/core';
import { IPolicy, OrganizationType } from '../../../../../models';
import { FluidModule } from 'primeng/fluid';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { PolicyFundComponent } from '../policy-fund/policy-fund.component';
import { PolicyParticipantsComponent } from '../policy-participants/policy-participants.component';
import { PolicyBenefitsComponent } from '../policy-benefits/policy-benefits.component';
import { PolicyAlertComponent } from '../policy-alert/policy-alert.component';
import { TabsModule } from 'primeng/tabs';

@Component({
    selector: 'app-policy-detail',
    imports: [FluidModule, CurrencyPipe, DatePipe, DividerModule, PolicyFundComponent, PolicyParticipantsComponent, PolicyBenefitsComponent, PolicyAlertComponent, CommonModule, TabsModule],
    templateUrl: './policy-detail.component.html',
    styleUrl: './policy-detail.component.scss',
    providers: [CurrencyPipe, DatePipe]
})
export class PolicyDetailComponent {
    noData: string = '--';
    policy = input.required<IPolicy>();
    @Input() componentType: OrganizationType = OrganizationType.FinancialInstitution;

    get showAdvisorAlerts(): boolean {
        return this.componentType === OrganizationType.Both || this.componentType === OrganizationType.FinancialInstitution;
    }
    
    get showDataAlerts(): boolean {
        return this.componentType === OrganizationType.Both || this.componentType === OrganizationType.Carrier;
    }
    
}
