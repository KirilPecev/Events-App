import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleError } from './error-handler';
import { Publication } from '../models/publication-model';

Injectable()
export class PublicationService {
    constructor(private http: HttpClient) { }

    create(data) {
        const url = "";
        this.http.post<Publication>(url, data)
            .pipe(
                catchError(handleError<Publication>("create"))
            );
    }

    edit(data) {
        const url = "";
        this.http.put<Publication>(url, data)
            .pipe(
                catchError(handleError<Publication>("edit"))
            );
    }

    delete(id: number) {
        const url = "";
        this.http.delete<Publication>(url)
            .pipe(
                catchError(handleError<Publication>("delete"))
            );
    }

    all() {
        const url = "";
        this.http.get<Publication[]>(url)
            .pipe(
                catchError(handleError<Publication>("all"))
            );
    }
}