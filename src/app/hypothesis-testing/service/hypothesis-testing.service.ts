import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AnovaPayloadType } from 'src/app/entities/imagesPayload';
import { AnovaLocator } from 'src/app/locators/anova.locator';
import { HypothesisTestingLocator } from 'src/app/locators/hypothesis-testing.locator';

@Injectable({
    providedIn: 'root'
})
export class HypothesisTestingService {

    constructor(private hypothesisTestingLocator: HypothesisTestingLocator) { }

    public getHypothesisCharts(anovaValues: Array<Array<number>>): Observable<Array<any>> {
        const mergedCalls: Array<Observable<any>> = Object.values(AnovaPayloadType).map(
            payload => this.hypothesisTestingLocator.getHypothesisCharts(anovaValues, payload as AnovaPayloadType)
        )
        return combineLatest(mergedCalls)
    }

    public getKolmogorovSmirnovValues(kolmogorovSmirnovValues: Array<Array<number>>): Observable<any> {
        return this.hypothesisTestingLocator.getKolmogorovSmirnovValues(kolmogorovSmirnovValues)
            .pipe(
                tap(
                    res => console.log('kolmogorov smirnov service result is', res)
                )
            );
    }

    public getMannWhitneyValues(mannWhitneyValues: Array<Array<number>>): Observable<any> {
        return this.hypothesisTestingLocator.getMannWhitneyValues(mannWhitneyValues)
            .pipe(
                tap(
                    res => console.log('kolmogorov smirnov service result is', res)
                )
            );
    }

    public getChiSquaredValues(chiSquaredValues: Array<Array<number>>): Observable<any> {
        return this.hypothesisTestingLocator.getChiSquaredValues(chiSquaredValues)
            .pipe(
                tap(
                    res => console.log('kolmogorov smirnov service result is', res)
                )
            );
    }

}