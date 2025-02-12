import { Component, input } from '@angular/core';
import { PolicyParticipant } from '../../../../../models';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { FluidModule } from 'primeng/fluid';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-policy-participants',
    imports: [FluidModule, TableModule],
    templateUrl: './policy-participants.component.html',
    styleUrl: './policy-participants.component.scss',
    providers: [CurrencyPipe, PercentPipe]
})
export class PolicyParticipantsComponent {
    noData: string = '--';
    //fund = input.required<PolicyFund>();
    participants = input.required<PolicyParticipant[] | undefined>();
}
