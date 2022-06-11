import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AnovaPayloadType } from 'src/app/entities/imagesPayload';
import { AnovaLocator } from 'src/app/locators/anova.locator';

@Injectable({
    providedIn: 'root'
})
export class AnovaService {

    constructor(private anovaLocator: AnovaLocator) { }

    public getAnovaValues(anovaValues: Array<Array<number>>): Observable<Array<any>> {
        const mergedCalls: Array<Observable<any>> = Object.values(AnovaPayloadType).map(
            payload => this.anovaLocator.getAnovaValues(anovaValues, payload as AnovaPayloadType)
        )
        return combineLatest(mergedCalls)
    }

    public getAnovaHomocedasticity(anovaValues: Array<Array<number>>): Observable<any> {
        return this.anovaLocator.getAnovaHomocedasticity(anovaValues);
    }

    public getAnovaComputation(anovaValues: Array<Array<number>>): Observable<any> {
        return this.anovaLocator.getAnovaComputation(anovaValues);
    }

    public getAnovaTukey(anovaValues: Array<Array<number>>): Observable<any> {
        return this.anovaLocator.getAnovaTukey(anovaValues);
    }

    public getNormalityComputation(anovaValues: Array<Array<number>>): Observable<any> {
        return this.anovaLocator.getNormalityComputation(anovaValues);
    }
}