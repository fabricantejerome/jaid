import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoansService } from './loans.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../shared/services/app-loader/app-loader.service';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../shared/animations/egret-animations";

@Component({
    selector: 'app-loans',
    templateUrl: './loans.component.html',
    styleUrls: ['./loans.component.scss'],
    animations: egretAnimations
})
export class LoansComponent implements OnInit, OnDestroy {
    public items: any[];
    public filteredUser: any[];
    public getItemSub: Subscription;
    constructor(
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private loansService: LoansService,
        private confirmService: AppConfirmService,
        private loader: AppLoaderService
    ) { }

    ngOnInit() {
        this.getItems()
    }

    ngOnDestroy() {
        if (this.getItemSub) {
            this.getItemSub.unsubscribe()
        }
    }

    getItems() {
        this.getItemSub = this.loansService.getItems()
        .subscribe(data => {
            this.items = data;
            this.filteredUser = data.slice();
        })
    }

    openPopUp(data: any = {}, isNew?) {
        let title = isNew ? 'Add New Loan' : 'Update Loan';
        let dialogRef: MatDialogRef<any> = this.dialog.open(LoanFormComponent, {
            width: '720px',
            disableClose: true,
            data: { title: title, payload: data }
        })

        dialogRef.afterClosed()
        .subscribe(res => {
            if(!res) {
                // If user press cancel
                return;
            }

            this.loader.open();

            if (isNew) {
                this.loansService.addItem(res)
                    .subscribe(data => {
                        this.items = data;
                        this.loader.close();
                        this.snack.open('Member Added!', 'OK', { duration: 4000 })
                        this.filteredUser = data.slice();
                    })
            } else {
                this.loansService.updateItem(data._id, res)
                    .subscribe(data => {
                        this.items = data;
                        this.loader.close();
                        this.snack.open('Member Updated!', 'OK', { duration: 4000 })
                        this.filteredUser = data.slice();
                    })
            }
        })
    }

    deleteItem(row) {
        this.confirmService.confirm({message: `Delete ${row.name}?`})
            .subscribe(res => {
                if (res) {
                this.loader.open();
                this.loansService.removeItem(row)
                    .subscribe(data => {
                        this.items = data;
                        this.loader.close();
                        this.snack.open('Member deleted!', 'OK', { duration: 4000 })
                    })
                }
            })
    }

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
}