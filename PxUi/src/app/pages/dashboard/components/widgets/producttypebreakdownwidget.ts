import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Subscription } from 'rxjs';
import { IPolicy } from '../../../../../models';
import { PolicyService } from '../../../../../data/services';

@Component({
    selector: 'app-policy-type-breakdown',
    standalone: true,
    imports: [ChartModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Product Type Breakdown</div>
        <p-chart type="pie" [data]="chartData" [options]="chartOptions" class="h-80" (onDataSelect)="dataSelect($event)"></p-chart>
    </div>`
})
export class ProductTypeBreakdownComponent implements OnInit, OnDestroy {
    @Output() selected: EventEmitter<string> = new EventEmitter();

    chartData: any;
    chartOptions: any;
    private subscriptions: Subscription[] = [];
    policies!: IPolicy[];

    constructor(private service: PolicyService) {}

    ngOnInit() {
        this.subscriptions.push(
            this.service.polcies$.subscribe((policies) => {
                const policyCounts = policies.reduce((acc, p) => {
                    const type = p.ProductType || 'Unknown'; // Default to 'Unknown' if no ProductType
                    acc[type] = (acc[type] || 0) + 1;
                    return acc;
                }, {});

                const policyTypes = Object.keys(policyCounts);
                const counts = policyTypes.map((type) => policyCounts[type]);

                this.chartData = {
                    labels: policyTypes,
                    datasets: [
                        {
                            data: counts,
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
        const productType: string = this.chartData.labels[e.element.index];
        this.selected.emit(productType);
    }
}
