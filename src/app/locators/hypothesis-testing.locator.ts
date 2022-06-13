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


}
