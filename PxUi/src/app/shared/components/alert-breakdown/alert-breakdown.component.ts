import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAlertBreakdown } from '../../../../models';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-alert-breakdown',
    imports: [CommonModule],
    templateUrl: './alert-breakdown.component.html',
    styleUrl: './alert-breakdown.component.scss'
})
export class AlertBreakdownComponent {
    @Input() alertBreakdown: IAlertBreakdown[] | null = [];
    @Output() selected: EventEmitter<IAlertBreakdown> = new EventEmitter();

    get itemCount(): number {
        return this.alertBreakdown?.length ?? 0;
    }

    alertSelected(alert: IAlertBreakdown): void {
        this.selected.emit(alert);
    }

    orangeWidth(alertCount: number): string {
        return (alertCount / (this.totalErrors ?? 1)) * 100 + '%';
    }

    get totalErrors(): number | undefined {
        return this.alertBreakdown?.map((d) => d.alertCount).reduce((accumulator, current) => accumulator + current, 0);
    }
}
