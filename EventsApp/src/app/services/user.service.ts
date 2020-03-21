import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: "root"
})
export class UserService {
    isLoggedIn: boolean = false;

    constructor(private http: HttpClient) {
    }

    login(email: string, password: string): Observable<User> {
        const url = "";
        return this.http.post<User>(url, { email, password })
            .pipe(
                catchError(this.handleError<User>('login'))
            );
    }

    handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
            console.log(error);

            return of(result as T);
        }
    }
}