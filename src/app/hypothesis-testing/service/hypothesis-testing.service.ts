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

}