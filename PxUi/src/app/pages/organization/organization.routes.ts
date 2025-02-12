import { Routes } from '@angular/router';
import { MorganStanleyLandingComponent } from './morgan-stanley-landing/morgan-stanley-landing.component';
import { NationwideLandingComponent } from './nationwide-landing/nationwide-landing.component';

export default [
    {
        path: 'fi',
        data: { breadcrumb: 'Button' },
        component: MorganStanleyLandingComponent
    },
    { path: 'carrier', data: { breadcrumb: 'Button' }, component: NationwideLandingComponent }
] as Routes;
