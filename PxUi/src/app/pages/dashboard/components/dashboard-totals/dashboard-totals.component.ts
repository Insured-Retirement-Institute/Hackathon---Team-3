import { Component, EventEmitter, Output } from '@angular/core';
import { ProductTypeBreakdownComponent } from '../widgets/producttypebreakdownwidget';
import { AdvisorAlertsTotalComponent } from '../widgets/advisor-alerts-total/advisor-alerts-total.component';
import { DataAlertsTotalComponent } from '../widgets/data-alerts-total/data-alerts-total.component';
import { IAlertBreakdown } from '../../../../../models';

@Component({
    selector: 'app-dashboard-totals',
    imports: [ProductTypeBreakdownComponent, AdvisorAlertsTotalComponent, DataAlertsTotalComponent],
    templateUrl: './dashboard-totals.component.html',
    styleUrl: './dashboard-totals.component.scss'
})
export class DashboardTotalsComponent {
    @Output() selectedAdvisor: EventEmitter<IAlertBreakdown> = new EventEmitter();
    @Output() selectedData: EventEmitter<IAlertBreakdown> = new EventEmitter();
    @Output() selectedProduct: EventEmitter<string> = new EventEmitter();

    advisorSelected(alertBreadown: IAlertBreakdown) {
        this.selectedAdvisor.emit(alertBreadown);
    }

    dataSelected(alertBreadown: IAlertBreakdown) {
        this.selectedData.emit(alertBreadown);
    }

    productSelected(productType: string): void {
        this.selectedProduct.emit(productType);
    }
}
