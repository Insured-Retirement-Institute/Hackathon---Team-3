import { Component } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { PoliciesComponent } from './components/policies/policies.component';
import { DashboardTotalsComponent } from './components/dashboard-totals/dashboard-totals.component';
import { IAlertBreakdown, OrganizationType } from '../../../models';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, PoliciesComponent, DashboardTotalsComponent],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" />
            <app-dashboard-totals class="contents" (selectedAdvisor)="advisorSelected($event)" (selectedData)="dataSelected($event)" (selectedProduct)="productSelected($event)" />

            <div class="col-span-12"><app-policies [componentType]="componentType" [currentAlertFilter]="currentFilter" [currentProductFilter]="productFilter"></app-policies></div>
        </div>
    `
})
export class Dashboard {
    componentType: OrganizationType = OrganizationType.Both;
    currentFilter: IAlertBreakdown | null = null;
    productFilter: string | null = null;

    advisorSelected(breakdown: any) {
        this.currentFilter = breakdown;
        this.componentType = OrganizationType.FinancialInstitution;
    }

    dataSelected(breakdown: any) {
        this.currentFilter = breakdown;
        this.componentType = OrganizationType.Carrier;
    }

    productSelected(product: any) {
        this.productFilter = product;
    }
}
