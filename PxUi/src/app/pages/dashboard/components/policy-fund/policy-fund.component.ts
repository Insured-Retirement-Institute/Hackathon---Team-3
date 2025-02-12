import { Component, input } from '@angular/core';
import { PolicyFund } from '../../../../../models';
import { CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';
import { FluidModule } from 'primeng/fluid';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-policy-fund',
    imports: [FluidModule, CurrencyPipe, TableModule, PercentPipe],
    templateUrl: './policy-fund.component.html',
    styleUrl: './policy-fund.component.scss',
    providers: [CurrencyPipe, PercentPipe]
})
export class PolicyFundComponent {
    noData: string = '--';
    //fund = input.required<PolicyFund>();
    funds = input.required<PolicyFund[] | undefined>();
}
