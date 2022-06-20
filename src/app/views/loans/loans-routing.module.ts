import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoansComponent } from './loans.component';

const routes: Routes = [
    {
        path: 'list',
        component: LoansComponent,
        data: { title: 'Loans', breadcrumb: 'Loans'}
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoansRoutingModule { }
