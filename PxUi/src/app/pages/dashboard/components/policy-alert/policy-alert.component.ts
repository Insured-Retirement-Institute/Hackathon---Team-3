import { Component, input } from '@angular/core';
import { SystemMessage } from '../../../../../models';
import { FluidModule } from 'primeng/fluid';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'app-policy-alert',
    imports: [FluidModule, TableModule],
    templateUrl: './policy-alert.component.html',
    styleUrl: './policy-alert.component.scss',
    providers: []
})
export class PolicyAlertComponent {
    noData: string = '--';
    alerts = input.required<SystemMessage[] | undefined>();
}
