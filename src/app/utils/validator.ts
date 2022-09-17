import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Validator {
    public static numericValidation(control: AbstractControl): ValidationErrors | null {
        const formValue: string = control.value as string;
        let arrayValues;
        if(typeof(formValue) === 'string'){
            arrayValues = formValue.split(',');
        }
        else{
            arrayValues = formValue;
        }
        for (let i = 0; i < arrayValues.length; i++) {
            const isNumeric = Validator.isNumeric(arrayValues[i]);
            if(!isNumeric){
                return { message: 'THIS IS NOT NUMERIC' };
            }
        }
        return null;
    }


    private static isNumeric(str:any) {
        //if (typeof str != "string") return false // we only process strings!
        if(typeof(str) === 'string'){
            return !isNaN(str as any) && !!str.length
        }
        return true;
    }
}