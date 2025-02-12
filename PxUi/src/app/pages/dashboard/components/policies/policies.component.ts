import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Table, TableModule, TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { Subscription } from 'rxjs';
import { IPolicy } from '../../../../../models';
import { PolicyService } from '../../../../../data/services';
import { PolicyDetailComponent } from '../policy-detail/policy-detail.component';
import { IAlertBreakdown, INotification, OrganizationType } from '../../../../../models/notifications';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
    selector: 'app-policies',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule, PolicyDetailComponent, IconFieldModule, InputIconModule],
    templateUrl: './policies.component.html',
    styleUrl: './policies.component.scss'
})
export class PoliciesComponent implements OnInit, OnDestroy {
    alertFilter: IAlertBreakdown | null = null;
    productFilter: string | null = null;
    @Input() componentType: OrganizationType = OrganizationType.FinancialInstitution;
    @Input()
    set currentAlertFilter(a: IAlertBreakdown | null) {
        this.alertFilter = a;
        this.applyFilter();
    }

    @Input()
    set currentProductFilter(a: string | null) {
        this.productFilter = a;
        this.applyFilter();
    }

    @ViewChild('search') search!: ElementRef;

    private subscriptions: Subscription[] = [];
    policies!: IPolicy[];
    alerts!: INotification[];
    expandedRows = {};
    filteredPolicies: IPolicy[] = [];

    constructor(private service: PolicyService) {}
    ngOnDestroy(): void {
        this.subscriptions?.forEach((d) => d?.unsubscribe());
    }

    ngOnInit() {
        this.subscriptions.push(
            this.service.policiesWithAlerts$.subscribe((d: IPolicy[]) => {
                this.policies = d;
                this.filteredPolicies = this.policies;
                this.applyFilter();
            })
        );
    }

    onRowExpand(event: TableRowExpandEvent) {
        //    this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    }

    onRowCollapse(event: TableRowCollapseEvent) {
        //  this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    }

    get title(): string | null {
        if (!this.alertFilter && !this.productFilter) {
            return null;
        }
        let subTitle: string = '';
        if (this.productFilter) {
            subTitle += `${this.productFilter} product`;
        }

        if (this.alertFilter) {
            if (subTitle.length > 0) {
                subTitle += ' and ';
            }
            subTitle += `${this.alertFilter.alert} alerts`;
        }
        return `Linited to ${subTitle}`;
    }

    applyFilter(): void {
        this.filteredPolicies = this.policies;
        if (this.policies && this.productFilter) {
            this.filteredPolicies = this.filteredPolicies.filter((d) => d.ProductType === this.productFilter);
        }
        if (this.policies && this.alertFilter) {
            this.filteredPolicies = this.filteredPolicies.filter((d) => {
                const alertsToFilterOn = this.componentType === OrganizationType.FinancialInstitution ? d.AdvisorAlerts : d.DataAlerts;
                const availableAlerts = alertsToFilterOn?.filter((f) => f.MessageCode === this.alertFilter?.id.toString());
                return availableAlerts === undefined ? false : availableAlerts?.length > 0;
            });
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        this.alertFilter = null;
        this.productFilter = null;
        this.search.nativeElement.value = '';
        table.clear();
        this.applyFilter();
    }
}
