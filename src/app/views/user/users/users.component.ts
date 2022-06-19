import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';

@Component({
    selector: 'app-users-table',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    providers: [UserService]
})
export class UsersComponent implements OnInit {
    rows = [];
    columns = [];
    temp = [];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.columns = this.userService.getDataConf();
        this.rows = this.temp = this.userService.getAll();
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        var columns = Object.keys(this.temp[0]);
        // Removes last "$$index" from "column"
        columns.splice(columns.length - 1);

        // console.log(columns);
        if (!columns.length)
        return;

        const rows = this.temp.filter(function(d) {
        for (let i = 0; i <= columns.length; i++) {
            let column = columns[i];
            // console.log(d[column]);
            if (d[column] && d[column].toString().toLowerCase().indexOf(val) > -1) {
            return true;
            }
        }
        });

        this.rows = rows;

    }
}
