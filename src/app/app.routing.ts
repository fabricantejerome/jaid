import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const rootRouterConfig: Routes = [
    {
        path: '',
        redirectTo: 'dashboard/default',
        pathMatch: 'full'
    },
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'sessions',
                loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
                data: { title: 'Session'}
            }
        ]
    },
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
                data: { title: 'Dashboard', breadcrumb: ''}
            },
            {
                path: 'loans',
                loadChildren: () => import('./views/loans/loans.module').then(m => m.LoansModule),
                // data: { title: 'User', breadcrumb: 'user'}
            },
            {
                path: 'users',
                loadChildren: () => import('./views/users/users.module').then(m => m.UsersModule),
                // data: { title: 'User', breadcrumb: 'user'}
            },
            {
                path: 'others',
                loadChildren: () => import('./views/others/others.module').then(m => m.OthersModule),
                data: { title: 'Others', breadcrumb: 'OTHERS'}
            },
            {
                path: 'search',
                loadChildren: () => import('./views/search-view/search-view.module').then(m => m.SearchViewModule)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'sessions/404'
    }
];

