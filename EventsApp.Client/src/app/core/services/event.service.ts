import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { handleError } from './error-handler';

Injectable()
export class EventService {
    constructor(private http: HttpClient) { }

    create(data) {
        const url = "";
        this.http.post<Event>(url, data)
            .pipe(
                catchError(handleError<Event>("create"))
            );
    }

    edit(data) {
        const url = "";
        this.http.put<Event>(url, data)
            .pipe(
                catchError(handleError<Event>("edit"))
            );
    }

    delete(id: number) {
        const url = "";
        this.http.delete<Event>(url)
            .pipe(
                catchError(handleError<Event>("delete"))
            );
    }

    details(id: number) {
        const url = "";
        this.http.get<Event>(url)
            .pipe(
                catchError(handleError<Event>("details"))
            );
    }

    all(){
        const url = "";
        this.http.get<Event[]>(url)
            .pipe(
                catchError(handleError<Event>("all"))
            );
    }
}