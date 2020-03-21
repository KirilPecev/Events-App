import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/user-model';
import { handleError } from './error-handler';

@Injectable({
    providedIn: "root"
})
export class UserService {
    isLoggedIn: boolean = true;

    constructor(private http: HttpClient) { }

    login(email: string, password: string): Observable<User> {
        const url = "";
        return this.http.post<User>(url, { email, password })
            .pipe(
                catchError(handleError<User>('login'))
            );
    }

    register(data): Observable<User> {
        const url = "";
        return this.http.post<User>(url, { data })
            .pipe(
                catchError(handleError<User>('register'))
            );
    }

    logout(): Observable<any> {
        const url = "";
        return this.http.get<any>(url)
            .pipe(
                catchError(handleError<any>('logout'))
            );
    }
}