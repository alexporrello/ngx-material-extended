import { signal, WritableSignal } from '@angular/core';

export interface MutationSignal {
    value: WritableSignal<MutationRecord[]>;
    disconnect: () => void;
    takeRecord: () => MutationRecord[];
}

export function mutationSignal(target: Node, options?: MutationObserverInit) {
    const value = signal<MutationRecord[]>([]);
    let mutationObserver = new MutationObserver((event) => value.set(event));
    mutationObserver.observe(target, options);
    return {
        value,
        disconnect: () => mutationObserver.disconnect(),
        takeRecord: () => mutationObserver.takeRecords()
    };
}
