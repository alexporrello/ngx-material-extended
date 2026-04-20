import { signal, WritableSignal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

export function formSignal<T>(): {
    control: FormControl<T | null>;
    signal: WritableSignal<T | null>;
    subscription: Subscription;
} {
    const control = new FormControl<T | null>(null);
    const sig = signal<T | null>(null);

    const subscription = new Subscription();
    subscription.add(() => {
        control.valueChanges.subscribe((change) => {
            console.log(change);
            sig.set(change);
        });
    });

    return {
        control,
        signal: sig,
        subscription
    };
}
