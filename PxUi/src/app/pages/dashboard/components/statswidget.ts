import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { IPolicy, SystemMessage } from '../../../../models';
import { INotification } from '../../../../models/notifications';
import { PolicyService } from '../../../../data/services';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule, CurrencyPipe],
    template: ` <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Total Contracts</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totalContacts }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 !text-xl"></i>
                    </div>
                </div>
                <!--                 <span class="text-primary font-medium">24 new </span>
                <span class="text-muted-color">since last visit</span> -->
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Total Policy Value</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ totalPolicyValue | currency: 'USD' }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-dollar text-orange-500 !text-xl"></i>
                    </div>
                </div>
                <!--                 <span class="text-primary font-medium">%52+ </span>
                <span class="text-muted-color">since last week</span> -->
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Advisor Alerts </span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ advisorAlerts?.length ?? 0 }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-users text-cyan-500 !text-xl"></i>
                    </div>
                </div>
                <!--                 <span class="text-primary font-medium">520 </span>
                <span class="text-muted-color">newly registered</span> -->
            </div>
        </div>
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Data Alerts</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">{{ dataAlerts?.length ?? 0 }}</div>
                    </div>
                    <div class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border" style="width: 2.5rem; height: 2.5rem">
                        <i class="pi pi-comment text-purple-500 !text-xl"></i>
                    </div>
                </div>
                <!--                 <span class="text-primary font-medium">85 </span>
                <span class="text-muted-color">responded</span> -->
            </div>
        </div>`
})
export class StatsWidget {
    private subscriptions: Subscription[] = [];
    policies!: IPolicy[];
    alerts!: INotification[];
    expandedRows = {};
    totalContacts: number | null = null;
    totalPolicyValue: number | null = null;
    advisorAlerts: SystemMessage[] | null = [];
    dataAlerts: SystemMessage[] | null = [];

    constructor(private service: PolicyService) {}
    ngOnDestroy(): void {
        this.subscriptions?.forEach((d) => d?.unsubscribe());
    }

    ngOnInit() {
        this.subscriptions.push(
            this.service.policiesWithAlerts$.subscribe((d: IPolicy[]) => {
                this.policies = d;

                this.totalContacts = this.policies?.length;
                this.totalPolicyValue = this.policies.reduce((accumulator, current) => accumulator + (current?.PolicyValue ?? 0), 0);
            })
        );
        this.subscriptions.push(
            this.service.alerts$.subscribe((d: INotification[]) => {
                this.alerts = d;
                this.advisorAlerts = this.alerts?.filter((d) => d.TXLife.TXLifeRequest.TransSubType.value == 'Advisor Alert').flatMap((d) => d.TXLife.TXLifeRequest.OLifE.Holding.SystemMessage);
                this.dataAlerts = this.alerts?.filter((d) => d.TXLife.TXLifeRequest.TransSubType.value == 'Data Quality Alert').flatMap((d) => d.TXLife.TXLifeRequest.OLifE.Holding.SystemMessage);
            })
        );
    }
}
