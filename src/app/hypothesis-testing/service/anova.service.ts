import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AnovaPayloadType } from 'src/app/entities/imagesPayload';
import { HypothesisLocator } from 'src/app/locators/anova.locator';

@Injectable({
    providedIn: 'root'
})
export class AnovaService {

    constructor(private hypothesisLocator: HypothesisLocator) { }

    public getAnovaValues(anovaValues: Array<Array<number>>): Observable<Array<any>> {
        const mergedCalls: Array<Observable<any>> = Object.values(AnovaPayloadType).map(
            payload => this.hypothesisLocator.getAnovaValues(anovaValues, payload as AnovaPayloadType)
        )
        return combineLatest(mergedCalls)
    }

    public getAnovaHomocedasticity(anovaValues: Array<Array<number>>): Observable<any> {
        return this.hypothesisLocator.getAnovaHomocedasticity(anovaValues);
    }

    public getAnovaComputation(anovaValues: Array<Array<number>>): Observable<any> {
        return this.hypothesisLocator.getAnovaComputation(anovaValues);
    }

    public getAnovaTukey(anovaValues: Array<Array<number>>): Observable<any> {
        return this.hypothesisLocator.getAnovaTukey(anovaValues);
    }

    public getNormalityComputation(anovaValues: Array<Array<number>>): Observable<any> {
        return this.hypothesisLocator.getNormalityComputation(anovaValues);
    }

    public getTTestValues(levelSignificance: number, tTestValues: Array<Array<number>>): Observable<any> {
        return this.hypothesisLocator.getTTestValues(levelSignificance, tTestValues)
            .pipe(
                tap(
                    res => console.log('service result is', res)
                )
            );
    }
}