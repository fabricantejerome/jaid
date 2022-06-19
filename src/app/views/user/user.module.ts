import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './users/users.component';


@NgModule({
    declarations: [
      UsersComponent
    ],
    imports: [
        CommonModule,
        MatInputModule,
        NgxDatatableModule,
        UserRoutingModule
    ]
})
export class UserModule { }
