import { AbstractControl } from '@angular/forms';

export function passwordMatch(c: AbstractControl) {
    return c.value.password === c.value.confirmPassword ? null : { passwordMatch: true };
}

export function dateValidator(c: AbstractControl) {
    let currentDate = new Date();
    let valueDate = new Date(c.value);
    let result = false;

    if ((currentDate.getFullYear() === valueDate.getFullYear()
        && currentDate.getMonth() === valueDate.getMonth()
        && currentDate.getDate() === valueDate.getDate())
        || currentDate < valueDate) {
        result = true;
    }

    return result ? null : { dateValidator: true };
}