import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "environments/environment";
import { Loan } from './interfaces/loan';

@Injectable()
export class LoansService {
    // items: Loan[];
    constructor(private http: HttpClient) {}

    browse(): Observable<any> {
        return this.http.get<Loan[]>(`${environment.apiURL}/loans/`);
    }

    add(loan: Loan): Observable<any> {
        return this.http.post<Loan>(`${environment.apiURL}/loans/`, loan);
    }

    update(loan: Loan): Observable<any> {
        return this.http.patch<Loan>(`${environment.apiURL}/loans/${loan.id}`, loan);
    }
}
