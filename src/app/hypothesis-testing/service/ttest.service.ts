import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AnovaPayloadType } from 'src/app/entities/imagesPayload';
import { AnovaLocator } from 'src/app/locators/anova.locator';
import { TTestLocator } from 'src/app/locators/ttest.locator';

@Injectable({
    providedIn: 'root'
})
export class TTestService {

    constructor(private tTestLocator: TTestLocator) { }

    public getTTestValues(levelSignificance: number, tTestValues: Array<Array<number>>): Observable<any> {
        return this.tTestLocator.getTTestValues(levelSignificance, tTestValues)
            .pipe(
                tap(
                    res => console.log('service result is', res)
                )
            );
    }
}