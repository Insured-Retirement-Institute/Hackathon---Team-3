import { Injectable } from '@angular/core';
import { MockApiService } from '../mock-api/public-api';

import { IPolicy } from '../../../models';
import { fullPolicy } from '../../policies/full_policy_dataset';
import { fullNotifications } from '../../alerts/alerts';
import { INotification } from '../../../models/notifications';

@Injectable({ providedIn: 'root' })
export class PolicyMockApi {
    private policies: any[] = fullPolicy;
    private notifications: any[] = fullNotifications;

    constructor(private mockApiService: MockApiService) {
        this.registerHandlers();
    }

    registerHandlers(): void {
        this.mockApiService.onGet('api/policies').reply(({ request }) => {
            const results: IPolicy[] = this.policies;
            // Return the response
            return [200, results];
        });


        this.mockApiService.onGet('api/alerts').reply(({ request }) => {
            const results: INotification[] = this.notifications;
            // Return the response
            return [200, results];
        });

    }
}
