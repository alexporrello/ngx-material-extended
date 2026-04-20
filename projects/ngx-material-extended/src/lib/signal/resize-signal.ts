import { signal, WritableSignal } from '@angular/core';

export interface ResizeSignal {
    value: WritableSignal<ResizeObserverEntry[]>;
    unobserve: () => void;
    disconnect: () => void;
}

export function resizeSignal(
    _target: Element,
    options?: ResizeObserverOptions
): ResizeSignal {
    const value = signal<ResizeObserverEntry[]>([]);
    const observer = new ResizeObserver((event) => value.set(event));
    observer.observe(_target, options);

    return {
        value,
        unobserve: () => observer.unobserve(_target),
        disconnect: () => observer.disconnect()
    };
}
