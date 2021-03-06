import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AnovaPayloadType } from 'src/app/entities/imagesPayload';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AnovaLocator {

    constructor(private httpClient: HttpClient) { }

    public getAnovaHomocedasticity(anovaValues: Array<Array<number>>): Observable<string> {
        const url: string = environment.host + '/anova';
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
        const url: string = environment.host + '/anova';
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
        const url: string = environment.host + '/anova';
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
        const url: string = environment.host + '/anova';
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


}
