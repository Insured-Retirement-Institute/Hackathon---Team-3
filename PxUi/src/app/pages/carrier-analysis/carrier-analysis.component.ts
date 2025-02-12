import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { PolicyService } from '../../../data/services';
import { debounce, Subscription } from 'rxjs';
import { AdvisorAlert, DataAlert, IPolicy, SystemMessage } from '../../../models';
import { ChartModule } from 'primeng/chart';
import { FluidModule } from 'primeng/fluid';
import { DecimalPipe, PercentPipe } from '@angular/common';

@Component({
    selector: 'app-carrier-analysis',
    imports: [SelectModule, FormsModule, ChartModule, FluidModule],
    templateUrl: './carrier-analysis.component.html',
    styleUrl: './carrier-analysis.component.scss',
    providers: [PercentPipe]
})
export class CarrierAnalysisComponent implements OnInit {
    subscriptions: Subscription[] = [];
    chartData: any;
    chartOptions: any;
    dropdownValue: any = null;
    policies: IPolicy[] = [];
    carriers: Map<any, any> | null = null;
    dropdownValues: SelectItem<any>[] = [];

    constructor(
        private readonly policySercice: PolicyService,
        private readonly percentPipe: PercentPipe
    ) {
        this.subscriptions.push(
            this.policySercice.polcies$.subscribe((d) => {
                this.policies = d;
                this.carriers = this.policies.reduce((entryMap, e) => entryMap.set(e.CarrierName, [...(entryMap.get(e.CarrierName) || []), e]), new Map());
            })
        );
    }

    ngOnInit(): void {
        const selectItems: SelectItem[] = [];
        Object.keys(AdvisorAlert).forEach((type) => {
            if (isNaN(Number(type)) === false) {
                // @ts-ignore
                selectItems.push({ value: AdvisorAlert[Number(type)], label: `Advisor Alert - ${AdvisorAlert[Number(type)]}` });
            }
        });
        Object.keys(DataAlert).forEach((type) => {
            if (isNaN(Number(type)) === false) {
                // @ts-ignore

                selectItems.push({ value: DataAlert[Number(type)], label: `Data Alert - ${DataAlert[Number(type)]}` });
            }
        });
        this.dropdownValues = selectItems;
        this.dropdownValue = this.dropdownValues[5];
        this.initChart(this.dropdownValues[5].value, true);
    }

    initChart(selectedValue: any, isAdvisor: boolean) {
        let labels: string[] = [];
        let data: number[] = [];
        if (this.carriers) {
            this.carriers.forEach((value, key) => {
                const polcies: IPolicy[] = value;
                const numPolicies = polcies?.length;

                let systemMessaages;
                if (isAdvisor) {
                    systemMessaages = polcies.filter((d) => {
                        if (d.AdvisorAlerts) {
                            const wtf: string = AdvisorAlert[selectedValue].toString();
                            const foundAlert = d.AdvisorAlerts.find((f) => f.MessageCode === wtf);
                            return foundAlert !== undefined;
                        }
                        return false;
                    });
                } else {
                    systemMessaages = polcies.filter((d) => {
                        if (d.DataAlerts) {
                            const wtf: string = DataAlert[selectedValue].toString();
                            const foundAlert = d.DataAlerts.find((f) => f.MessageCode === wtf);
                            return foundAlert !== undefined;
                        }
                        return false;
                    });
                }
                const percentAlert: number = systemMessaages?.length / numPolicies;
                data.push(percentAlert * 100);

                labels.push(`${key} - ${this.percentPipe.transform(percentAlert, '1.0-2')}`);
            });
        }

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const borderColor = documentStyle.getPropertyValue('--surface-border');
        const textMutedColor = documentStyle.getPropertyValue('--text-color-secondary');

        this.chartData = {
            labels: labels,
            datasets: [
                {
                    type: 'bar',
                    label: '% Alerts',
                    data: data,
                    barThickness: 32,
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                    borderRadius: {
                        topLeft: 8,
                        topRight: 8,
                        bottomLeft: 0,
                        bottomRight: 0
                    }
                }
            ]
        };

        this.chartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    //stacked: true,
                    ticks: {
                        color: textMutedColor
                    },
                    grid: {
                        color: 'transparent',
                        borderColor: 'transparent'
                    }
                },
                y: {
                    //stacked: true,
                    ticks: {
                        color: textMutedColor,
                        min: 0,
                        max: 100
                    },
                    grid: {
                        color: borderColor,
                        borderColor: 'transparent',
                        drawTicks: false
                    }
                }
            }
        };
    }

    alertChange(e: SelectChangeEvent) {
        this.initChart(e.value.value, e.value.label.toString().startsWith('Advisor'));
    }
}

export interface SelectItem<T = any> {
    label?: string;
    value: T;
}
