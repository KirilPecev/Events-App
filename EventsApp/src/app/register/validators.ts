import { AbstractControl } from '@angular/forms';

export function passwordMatch(c: AbstractControl) {
    return c.value.password === c.value.confirmPassword ? null : { passwordMatch: true };
}