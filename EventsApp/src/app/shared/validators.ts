import { AbstractControl } from '@angular/forms';

export function passwordMatch(c: AbstractControl) {
    return c.value.password === c.value.confirmPassword ? null : { passwordMatch: true };
}

export function dateTimeValidator(c: AbstractControl) {
    const time = 1;

    let currentDate = new Date();
    let valueDate = new Date(c.value);
    let isValidTime = true;

    let isToday = isDateToday(valueDate);

    if (isToday) {
        currentDate.setHours(currentDate.getHours() + time);
        isValidTime = timeValidator(currentDate, valueDate);
    }

    let isValidDate = dateValidator(currentDate, valueDate);

    return isValidDate && isValidTime ? null : { dateTimeValidator: true };
}

function dateValidator(currentDate: Date, valueDate: Date) {
    if (isDateToday(valueDate) || currentDate < valueDate) {
        return true;
    }

    return false;
}

function timeValidator(currentDate: Date, valueDate: Date) {
    if (currentDate.getTime() < valueDate.getTime()) {
        return true;
    }

    return false;
}

function isDateToday(valueDate: Date) {
    let currentDate = new Date();
    if (currentDate.getFullYear() === valueDate.getFullYear()
        && currentDate.getMonth() === valueDate.getMonth()
        && currentDate.getDate() === valueDate.getDate()) {
        return true;
    }

    return false;
}