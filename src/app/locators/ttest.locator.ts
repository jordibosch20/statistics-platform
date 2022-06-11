import { Injectable, ErrorHandler } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AnovaPayloadType } from 'src/app/entities/imagesPayload';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TTestLocator {

    constructor(private httpClient: HttpClient) { }

    public getTTestValues(levelSignificance: number, tTestValues: Array<Array<number>>): Observable<string> {
        const url: string = environment.host + '/ttest';
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
