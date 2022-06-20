import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedModule } from '../../shared/shared.module';

import { LoansRoutingModule } from './loans-routing.module';
import { LoansComponent } from './loans.component';
import { LoansService } from './loans.service';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    declarations: [
        LoansComponent,
        LoanFormComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        NgxDatatableModule,
        MatInputModule,
        MatIconModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatChipsModule,
        MatListModule,
        MatTooltipModule,
        MatDialogModule,
        MatSnackBarModule,
        MatSlideToggleModule,
        TranslateModule,
        SharedModule,
        LoansRoutingModule
    ],
    providers: [LoansService]
})
export class LoansModule { }
