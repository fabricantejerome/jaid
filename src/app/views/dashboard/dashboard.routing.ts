import { Routes } from '@angular/router';

import { AnalyticsComponent } from './analytics/analytics.component';
import { DashboardDarkComponent } from './dashboard-dark/dashboard-dark.component';
import { CryptocurrencyComponent } from './cryptocurrency/cryptocurrency.component';
import { DefaultDashboardComponent } from './default-dashboard/default-dashboard.component';
import { UserRoleGuard } from 'app/shared/guards/user-role.guard';
import { LearningManagementComponent } from './learning-management/learning-management.component';
import { AnalyticsAltComponent } from './analytics-alt/analytics-alt.component';
import { config } from 'config';

export const DashboardRoutes: Routes = [
    {
        path: 'default',
        component: DefaultDashboardComponent,
        canActivate: [UserRoleGuard],
        data: { title: 'Dashboard', breadcrumb: 'Dashboard', roles: config.authRoles.sa }
    },
    {
        path: 'learning-management',
        component: LearningManagementComponent,
        data: { title: 'Learning management', breadcrumb: 'Learning management' }
    },
    {
        path: 'analytics',
        component: AnalyticsComponent,
        data: { title: 'Analytics', breadcrumb: 'Analytics' }
    },
    {
        path: 'analytics-alt',
        component: AnalyticsAltComponent,
        data: { title: 'Analytics Alternative', breadcrumb: 'Analytics Alternative' }
    },
    {
        path: 'crypto',
        component: CryptocurrencyComponent,
        data: { title: 'Cryptocurrency', breadcrumb: 'Cryptocurrency' }
    },
    {
        path: 'dark',
        component: DashboardDarkComponent,
        data: { title: 'Dark Cards', breadcrumb: 'Dark Cards' }
    }
];
