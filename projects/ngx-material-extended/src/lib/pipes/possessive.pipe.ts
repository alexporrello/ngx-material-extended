import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'possessive',
    standalone: true,
    pure: true
})
export class MexPossessivePipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        return possessive(value);
    }
}

export function possessive(value: string | null | undefined): string {
    if (!value || typeof value !== 'string') {
        return '';
    }
    if (value.endsWith('s')) {
        return value + "'";
    }
    return value + "'s";
}
