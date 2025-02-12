import { Component, EventEmitter, Output } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { flatMap, Subscription } from 'rxjs';
import { PolicyService } from '../../../../../../data/services';
import { AdvisorAlert, IAlertBreakdown, INotification } from '../../../../../../models/notifications';
import { SystemMessage } from '../../../../../../models';

@Component({
    selector: 'app-advisor-alerts-total',
    imports: [ChartModule],
    templateUrl: './advisor-alerts-total.component.html',
    styleUrl: './advisor-alerts-total.component.scss'
})
export class AdvisorAlertsTotalComponent {
    @Output() selected: EventEmitter<IAlertBreakdown> = new EventEmitter();

    chartData: any;
    chartOptions: any;
    private subscriptions: Subscription[] = [];
    notifications!: INotification[];

    constructor(private service: PolicyService) {}

    ngOnInit() {
        this.subscriptions.push(
            this.service.alerts$.subscribe((d: INotification[]) => {
                const alerts: SystemMessage[] = d?.filter((d) => d.TXLife.TXLifeRequest.TransSubType.value == 'Advisor Alert').flatMap((d) => d.TXLife.TXLifeRequest.OLifE.Holding.SystemMessage);

                const groupedMap = alerts.reduce((entryMap, e) => entryMap.set(e.MessageCode, [...(entryMap.get(e.MessageCode) || []), e]), new Map());

                let labels: string[] = [];
                let mapLengths: number[] = [];
                groupedMap.forEach((value, key) => {
                    mapLengths.push(Array.isArray(value) ? value.length : value.length);
                    labels.push(AdvisorAlert[key]);
                });

                this.chartData = {
                    labels: labels,
                    datasets: [
                        {
                            data: mapLengths,
                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40']
                        }
                    ]
                };

                this.chartOptions = {
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false
                };
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions?.forEach((d) => d?.unsubscribe());
    }

    dataSelect(e: any): void {
        const alert: string = AdvisorAlert[this.chartData.labels[e.element.index]];
        const alertBreakdown: IAlertBreakdown = {
            id: Number(alert),
            alert: AdvisorAlert[Number(alert)],
            alertDescription: '',
            alertCount: 1
        };

        this.selected.emit(alertBreakdown);
    }
}
