import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoanDetailsDB } from './loan-details';

@Injectable({
    providedIn: 'root'
})
export class LoanDetailsService {
    items: any[];
    constructor(
        private http: HttpClient
    ) {
        let loanDetailsDB = new LoanDetailsDB();
        this.items = loanDetailsDB.loansDetails;
    }

    //******* Implement your APIs ********
    getItems(): Observable<any> {
        return  of(this.items.slice())
    }

    addItem(item): Observable<any> {
        item._id = Math.round(Math.random() * 10000000000).toString();
        item.approved_by = "Jerome Fabricante";
        this.items.unshift(item);
        return of(this.items.slice()).pipe(delay(1000));
    }

    updateItem(id, item) {
        this.items = this.items.map(i => {
        if(i._id === id) {
            return Object.assign({}, i, item);
        }
        return i;
        })
        return of(this.items.slice()).pipe(delay(1000));
    }

    removeItem(row) {
        let i = this.items.indexOf(row);
        this.items.splice(i, 1);
        return of(this.items.slice()).pipe(delay(1000));
    }
}
