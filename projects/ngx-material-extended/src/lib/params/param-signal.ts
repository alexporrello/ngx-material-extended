import { effect, inject, signal } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime, Subscription, take } from 'rxjs';

import {
    InferFormControls,
    InferParam,
    InferParamType,
    InferSignals,
    Param,
    ParamType
} from './types';
import { parseParams } from './parse-param';

export function paramSignal<const TConfig extends Record<string, Param>>(
    config: TConfig
): {
    signals: InferSignals<TConfig>;
    set: <K extends keyof TConfig>(key: K, val: InferParam<TConfig[K]>) => void;
    subscriptions: Subscription;
} {
    const route = inject(ActivatedRoute);
    const router = inject(Router);

    type Signals = InferSignals<TConfig>;

    const signals = Object.fromEntries(
        Object.entries(config).map(([key, conf]) => {
            return [key, signal(conf.default ?? null)];
        })
    ) as Signals;

    const subscriptions = new Subscription();

    subscriptions.add(
        route.queryParams.subscribe((params) => {
            Object.entries(parseParams(params, config)).forEach(([k, v]) => {
                if (signals[k]) {
                    signals[k].set(v);
                }
            });
        })
    );

    const set = <K extends keyof TConfig>(
        key: K,
        val: InferParam<TConfig[K]>
    ) => {
        signals[key].set(val);

        const queryParams = Object.entries(signals).reduce(
            (acc, [key, signal]) => {
                const _config = config[key];
                if (!_config) return acc;

                const value = signal();

                if (value === _config.default || value === null) {
                    acc[key] = null;
                } else {
                    acc[key] = value;
                }

                return acc;
            },
            {} as Record<string, any>
        );

        router.navigate([], {
            queryParams,
            queryParamsHandling: 'merge',
            replaceUrl: true
        });
    };

    return {
        signals,
        set,
        subscriptions
    };
}
