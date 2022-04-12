import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { AnovaLocator } from 'src/app/locators/anova.locator';

@Injectable({
    providedIn: 'root'
})
export class AnovaService {

    constructor(private anovaLocator: AnovaLocator) { }

    public getAnovaResults(): Observable<any> {
        return this.anovaLocator.connectToEnd()
            .pipe(
                tap(
                    res => console.log('service result is', res)
                )
            );
    }
}