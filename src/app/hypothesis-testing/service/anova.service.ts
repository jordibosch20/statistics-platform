import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { HypothesisLocator } from 'src/app/locators/anova.locator';

@Injectable({
    providedIn: 'root'
})
export class AnovaService {

    constructor(private hypothesisLocator: HypothesisLocator) { }

    public getAnovaValues(anovaValues: Array<Array<number>>): Observable<any> {
        return this.hypothesisLocator.getAnovaValues(anovaValues)
            .pipe(
                tap(
                    res => console.log('service result is', res)
                )
            );
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