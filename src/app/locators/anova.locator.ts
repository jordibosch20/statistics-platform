import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AnovaPayloadType } from 'src/app/entities/imagesPayload';

@Injectable({
    providedIn: 'root'
})
export class HypothesisLocator {

    constructor(private httpClient: HttpClient) { }

    public getAnovaValues(anovaValues: Array<Array<number>>, payload: AnovaPayloadType): Observable<string> {
        // const url: string = `https://europe-west1-statistics-test-74f2e.cloudfunctions.net/hello_http`;
        const url: string = ` http://127.0.0.1:8000/anova`;
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        return this.httpClient.post(url + '/' + payload, JSON.stringify({ 'anovaValues': anovaValues }), {
            observe: 'response',
            responseType: 'blob',
            headers: headers
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

    public getAnovaHomocedasticity(anovaValues: Array<Array<number>>): Observable<string> {
        // const url: string = `https://europe-west1-statistics-test-74f2e.cloudfunctions.net/hello_http`;
        const url: string = ` http://127.0.0.1:8000/anova`;
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post(url + '/homocedasticity', JSON.stringify({ 'anovaValues': anovaValues }), {
            headers: headers,
            observe: 'response'
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

    public getAnovaComputation(anovaValues: Array<Array<number>>): Observable<string> {
        // const url: string = `https://europe-west1-statistics-test-74f2e.cloudfunctions.net/hello_http`;
        const url: string = ` http://127.0.0.1:8000/anova`;
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post(url + '/anovaComputation', JSON.stringify({ 'anovaValues': anovaValues }), {
            headers: headers,
            observe: 'response'
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

    public getAnovaTukey(anovaValues: Array<Array<number>>): Observable<string> {
        // const url: string = `https://europe-west1-statistics-test-74f2e.cloudfunctions.net/hello_http`;
        const url: string = ` http://127.0.0.1:8000/anova`;
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post(url + '/anovaTukey', JSON.stringify({ 'anovaValues': anovaValues }), {
            headers: headers,
            observe: 'response'
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

    public getNormalityComputation(anovaValues: Array<Array<number>>): Observable<string> {
        // const url: string = `https://europe-west1-statistics-test-74f2e.cloudfunctions.net/hello_http`;
        const url: string = ` http://127.0.0.1:8000/anova`;
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return this.httpClient.post(url + '/normalityComputation', JSON.stringify({ 'anovaValues': anovaValues }), {
            headers: headers,
            observe: 'response'
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

    public getTTestValues(levelSignificance: number, tTestValues: Array<Array<number>>): Observable<string> {
        // const url: string = `https://europe-west1-statistics-test-74f2e.cloudfunctions.net/hello_http`;
        const url: string = ` http://127.0.0.1:8000/ttest`;
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        return this.httpClient.post(url, JSON.stringify({
            'levelSignificance': levelSignificance, 'tTestValues': tTestValues
        }), {
            observe: 'response',
            responseType: 'json',
            headers: headers
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
