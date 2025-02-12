import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { PolicyService } from './data/services';
import { inject } from '@angular/core';
import { CarrierAnalysisComponent } from './app/pages/carrier-analysis/carrier-analysis.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            {
                path: '',
                component: Dashboard,
                resolve: {
                    policies: () => inject(PolicyService).getAllPolicies(),
                    alerts: () => inject(PolicyService).getAllAlerts()
                },
            },
            {
                path: 'analysis',
                component: CarrierAnalysisComponent,
  /*               resolve: {
                    policies: () => inject(PolicyService).getAllPolicies(),
                    alerts: () => inject(PolicyService).getAllAlerts()
                }, */
            },
            { path: 'org', loadChildren: () => import('./app/pages/organization/organization.routes') }

            /*             { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') } */
        ]
    },
    /* { path: 'landing', component: Landing }, */
    { path: 'notfound', component: Notfound },
    { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
