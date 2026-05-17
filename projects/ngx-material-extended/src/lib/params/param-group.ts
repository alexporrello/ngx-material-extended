import { inject, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';

import { InferFormControls, InferSignals, Param } from './types';
import { parseParams } from './parse-param';

export function paramGroup<const TConfig extends Record<string, Param>>(
    config: TConfig
): {
    formGroup: FormGroup<InferFormControls<TConfig>>;
    signals: InferSignals<TConfig>;
    subscriptions: Subscription;
} {
    const route = inject(ActivatedRoute);
    const router = inject(Router);

    const controls = Object.fromEntries(
        Object.entries(config).map(([key, conf]) => {
            return [key, new FormControl(conf.default ?? null)];
        })
    ) as InferFormControls<TConfig>;
    const formGroup = new FormGroup(controls);

    const signals = Object.fromEntries(
        Object.entries(config).map(([key, conf]) => {
            return [key, signal(conf.default ?? null)];
        })
    ) as InferSignals<TConfig>;

    const subscriptions = new Subscription();

    subscriptions.add(
        route.queryParams.subscribe((params) => {
            Object.entries(parseParams(params, config)).forEach(([k, v]) => {
                if (controls[k]) {
                    controls[k].setValue(v, { emitEvent: false });
                    signals[k].set(v);
                }
            });
        })
    );

    subscriptions.add(
        formGroup.valueChanges.pipe(debounceTime(300)).subscribe((changes) => {
            const queryParams: Record<string, any> = {};
            Object.entries(changes).forEach(([key, value]) => {
                const _config = config[key];
                if (!_config) return;

                signals[key].update(() => value);
                queryParams[key] =
                    value === (_config.default ?? null) ? null : value;
            });
            router.navigate([], {
                queryParams,
                queryParamsHandling: 'merge',
                replaceUrl: true
            });
        })
    );

    return {
        formGroup,
        signals,
        subscriptions
    };
}
