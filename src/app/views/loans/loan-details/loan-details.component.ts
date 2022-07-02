import { Component, OnInit, Inject, AfterContentChecked, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoanDetailsService } from './loan-details.service';
import { Subscription } from 'rxjs';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { JwtAuthService } from 'app/shared/services/auth/jwt-auth.service';
import { egretAnimations } from 'app/shared/animations/egret-animations';

@Component({
    selector: 'app-loan-details',
    templateUrl: './loan-details.component.html',
    styleUrls: ['./loan-details.component.scss'],
    providers: [
        LoanDetailsService
    ],
    animations: egretAnimations
})
export class LoanDetailsComponent implements OnInit, AfterContentChecked, OnDestroy {
    public items: any[];
    public filteredUser: any[];
    public getItemSub: Subscription;
    public itemForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<LoanDetailsComponent>,
        private fb: FormBuilder,
        private loanDetailsService: LoanDetailsService,
        private snack: MatSnackBar,
        private loader: AppLoaderService,
        private jwtAuth: JwtAuthService
    ) { }

    ngOnInit(): void {
        this.getItems();
        this.buildItemForm();
    }

    ngAfterContentChecked(): void {
        window.dispatchEvent(new Event('resize'));
    }

    buildItemForm() {
        this.itemForm = this.fb.group({
            paymentDate: ['', Validators.required],
            amount: ['', Validators.required]
        })
    }

    getItems() {
        this.items = this.data.payload.loanDetails;
    }

    submit() {
        console.log(this.itemForm.value);
        this.loader.open();
        const { loanDetails, ...rest } = this.data.payload;

        const body = {
            loan: rest,
            loanDetails: {
                paymentDate: formatDate(this.itemForm.get('paymentDate').value, "yyyy-MM-dd", "en-US").toString(),
                amount: this.itemForm.get('amount').value,
                approvedBy: this.jwtAuth?.user?.displayName
            }
        }

        this.loanDetailsService.add(body)
            .subscribe(data => {
                this.items.unshift(data);
                this.items = this.items.slice();
                this.loader.close();
                this.snack.open('Payment Added', 'OK', { duration: 4000 })
            });
    }

    onUpdateLoanTable() {
        this.data.payload.loanDetails = this.items
        this.dialogRef.close(this.data.payload);
    }

    ngOnDestroy(): void {
        if (this.getItemSub) {
            this.getItemSub.unsubscribe()
        }
    }
}
