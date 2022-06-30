import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { UserDB } from '../../shared/inmemory-db/users';
// import { Observable, of } from 'rxjs';
// import { delay } from 'rxjs/operators';
import { environment } from "environments/environment";
import { User } from 'app/shared/models/user.model';

@Injectable()
export class UsersService {
    items: any[];
    constructor(
        private http: HttpClient
    ) {}

    //******* Implement your APIs ********
    // getItems(): Observable<any> {
    //     return  of(this.items.slice())
    // }

    // addItem(item): Observable<any> {
    //     item._id = Math.round(Math.random() * 10000000000).toString();
    //     this.items.unshift(item);
    //     return of(this.items.slice()).pipe(delay(1000));
    // }

    // updateItem(id, item) {
    //     this.items = this.items.map(i => {
    //     if(i._id === id) {
    //         return Object.assign({}, i, item);
    //     }
    //     return i;
    //     })
    //     return of(this.items.slice()).pipe(delay(1000));
    // }

    // removeItem(row) {
    //     let i = this.items.indexOf(row);
    //     this.items.splice(i, 1);
    //     return of(this.items.slice()).pipe(delay(1000));
    // }

    fetch() {
        return this.http.get<User[]>(`${environment.apiURL}/users/`);
    }

    remove(user: User) {
        return this.http.delete<User>(`${environment.apiURL}/users/${user.id}`);
    }
}
