import { Observable, of } from 'rxjs';

export function handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
        console.log(error);

        return of(result as T);
    }
}