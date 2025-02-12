import { Component, input } from '@angular/core';
import { PolicyBenefit } from '../../../../../models';
import { FluidModule } from 'primeng/fluid';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';

@Component({
    selector: 'app-policy-benefits',
    imports: [FluidModule, TableModule, CurrencyPipe],
    templateUrl: './policy-benefits.component.html',
    styleUrl: './policy-benefits.component.scss',
    providers: [CurrencyPipe]
})
export class PolicyBenefitsComponent {
    noData: string = '--';
    benefits = input.required<PolicyBenefit[] | undefined>();
}
