import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AnovaPayloadType } from 'src/app/entities/imagesPayload';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HypothesisTestingLocator {

    constructor(private httpClient: HttpClient) { }

    public getHypothesisCharts(anovaValues: Array<Array<number>>, payload: AnovaPayloadType): Observable<string> {
        const url: string = environment.host + '/anova';
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

    public getKolmogorovSmirnovValues(kolmogorovSmirnovValues: Array<Array<number>>): Observable<any> {
        const url: string = environment.host + '/kolmogorov-smirnov';
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        return this.httpClient.post(url, JSON.stringify({
            'kolmogorovSmirnovValues': kolmogorovSmirnovValues
        }), {
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

    public getMannWhitneyValues(mannWhitneyValues: Array<Array<number>>): Observable<any> {
        const url: string = environment.host + '/mann-whitney';
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        return this.httpClient.post(url, JSON.stringify({
            'mannWhitneyValues': mannWhitneyValues
        }), {
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

    public getChiSquaredValues(chiSquaredValues: Array<Array<number>>): Observable<any> {
        const url: string = environment.host + '/chi-squared';
        const headers: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/json'
        })
        return this.httpClient.post(url, JSON.stringify({
            'chiSquaredValues': chiSquaredValues
        }), {
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
