import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoansService } from './loans.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../shared/services/app-loader/app-loader.service';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../shared/animations/egret-animations";
import { Loan } from './interfaces/loan';

@Component({
    selector: 'app-loans',
    templateUrl: './loans.component.html',
    styleUrls: ['./loans.component.scss'],
    animations: egretAnimations
})
export class LoansComponent implements OnInit, OnDestroy {
    public items: Loan[];
    public filteredUser: Loan[];
    public loanSub: Subscription;

    constructor(
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private loansService: LoansService,
        private confirmService: AppConfirmService,
        private loader: AppLoaderService
    ) { }

    ngOnInit() {
        this.loanSubscription();
    }

    loanSubscription() {
        this.loanSub = this.loansService.browse().subscribe((loans: Loan[]) => {
            this.items = loans;
            this.filteredUser = loans;
        });
    }

    ngOnDestroy() {
        this.loanSub.unsubscribe();
    }

    openPopUp(data: any = {}, isNew?) {
        let title = isNew ? 'Add New Loan' : 'Update Loan';
        let dialogRef: MatDialogRef<any> = this.dialog.open(LoanFormComponent, {
            width: '720px',
            disableClose: true,
            data: { title: title, payload: data }
        })

        dialogRef.afterClosed()
        .subscribe((res: Loan) => {
            if(!res) {
                // If user press cancel
                return;
            }

            this.loader.open();

            if (isNew) {
                const {id, ...rest } = res;
                this.loansService.add(rest)
                    .subscribe((data: Loan) => {
                        this.items.unshift(data);
                        this.filteredUser = this.items.slice();
                        this.loader.close();
                        this.snack.open('Loan Added!', 'OK', { duration: 4000 })
                    })
            } else {
                console.log(res);
                this.loansService.update(res)
                    .subscribe(data => {
                        const itemIndex = this.items.findIndex((obj => obj.id == res.id));
                        this.items[itemIndex] = data
                        this.filteredUser = this.items.slice();

                        this.loader.close();
                        this.snack.open('Loan Updated!', 'OK', { duration: 4000 })
                    })
            }
        })
    }

    calculateLoanDetailsAmount(row) {
        let sumOfPayment: number;
        let balance: number = row.totalLoan;

        if (row.hasOwnProperty('loanDetails')) {
            sumOfPayment = row.loanDetails.reduce(( sum, { amount } ) => sum + parseFloat(amount) , 0);
            balance = row.totalLoan - sumOfPayment;
        }

        return balance;
    }

    // deleteItem(row) {
    //     this.confirmService.confirm({message: `Delete ${row.name}?`})
    //         .subscribe(res => {
    //             if (res) {
    //             this.loader.open();
    //             this.loansService.removeItem(row)
    //                 .subscribe(data => {
    //                     this.items = data;
    //                     this.loader.close();
    //                     this.snack.open('Member deleted!', 'OK', { duration: 4000 })
    //                     this.filteredUser = data.slice();
    //                 })
    //             }
    //         })
    // }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        var columns = Object.keys(this.items[0]);
        // Removes last "$$index" from "column"
        columns.splice(columns.length - 1);
    
        // console.log(columns);
        if (!columns.length)
            return;
    
        const rows = this.items.filter(function(d) {
            for (let i = 0; i <= columns.length; i++) {
                let column = columns[i];
                // console.log(d[column]);
                if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
                    return true;
                }
            }
        });

        this.filteredUser = rows ? rows : this.items;
    }

    openLoanDetails(data: any = {}, isNew?) {
        const title = isNew ? 'Add Payment' : 'Update Payment';
        const dialogRef: MatDialogRef<any> = this.dialog.open(LoanDetailsComponent, {
            width: '720px',
            disableClose: true,
            data: { title: title, payload: data }
        })
    }
}