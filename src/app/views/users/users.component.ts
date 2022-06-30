import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../../shared/services/app-confirm/app-confirm.service';
import { AppLoaderService } from '../../shared/services/app-loader/app-loader.service';
import { UserFormComponent } from './user-form/user-form.component';
import { Subscription } from 'rxjs';
import { egretAnimations } from "../../shared/animations/egret-animations";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    animations: egretAnimations
})
export class UsersComponent implements OnInit, OnDestroy {
    public items: any[];
    public filteredUser: any[];
    // public getItemSub: Subscription;
    public userSub: Subscription;
    constructor(
        private dialog: MatDialog,
        private snack: MatSnackBar,
        private usersService: UsersService,
        private confirmService: AppConfirmService,
        private loader: AppLoaderService
    ) { }

    ngOnInit() {
        this.userSub = this.usersService.fetch().subscribe((users) => {
            this.items = users;
            this.filteredUser = users;
        });
    }

    ngOnDestroy() {
        if (this.userSub) {
            this.userSub.unsubscribe()
        }
    }

    // getItems() {
    //     this.getItemSub = this.usersService.getItems()
    //     .subscribe(data => {
    //         this.items = data;
    //         this.filteredUser = data.slice();
    //     })
    // }

    openPopUp(data: any = {}, isNew?) {
        let title = isNew ? 'Add new member' : 'Update member';
        let dialogRef: MatDialogRef<any> = this.dialog.open(UserFormComponent, {
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

            // this.loader.open();

            // if (isNew) {
            //     this.usersService.addItem(res)
            //         .subscribe(data => {
            //             this.items = data;
            //             this.loader.close();
            //             this.snack.open('Member Added!', 'OK', { duration: 4000 })
            //             this.filteredUser = data.slice();
            //         })
            // } else {
            //     this.usersService.updateItem(data._id, res)
            //         .subscribe(data => {
            //             this.items = data;
            //             this.loader.close();
            //             this.snack.open('Member Updated!', 'OK', { duration: 4000 })
            //             this.filteredUser = data.slice();
            //         })
            // }
        })
    }

    deleteItem(row) {
        this.confirmService.confirm({message: `Delete ${row.name}?`})
            .subscribe(res => {
                if (res) {
                this.loader.open();
                this.usersService.remove(row)
                    .subscribe(data => {
                        // this.items = data;
                        this.loader.close();
                        this.filteredUser = this.filteredUser.filter(element => element.id != row.id)
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