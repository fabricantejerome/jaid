import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoanDetailsDB } from './loan-details';
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root'
})
export class LoanDetailsService {
    constructor(private http: HttpClient) {}

    add(body) {
        return this.http.post<any>(`${environment.apiURL}/loan-details/`, body);
    }
}
