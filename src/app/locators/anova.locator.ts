import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AnovaLocator {

    constructor(private httpClient: HttpClient) { }

    public connectToEnd(): Observable<string> {
        const url: string = `https://europe-west1-statistics-test-74f2e.cloudfunctions.net/hello_http`;
        return this.httpClient.get(url, {
            observe: 'response',
            responseType: 'blob'
        })
            .pipe(
                map(
                    (event: any) => event.body
                ),
                catchError(
                    err => {
                        console.log('err', err)
                        return of(err)
                    }
                )
            );
    }

}
