import { inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, Subscription } from 'rxjs';

import { InferFormControls, InferSignals, Param } from './types';
import { parseParams } from './parse-param';

function paramDefault(conf: Param): any {
    if (conf.default !== undefined) return conf.default;
    if (conf.type === 'string') return '';
    return null;
}

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
            return [key, new FormControl(paramDefault(conf))];
        })
    ) as InferFormControls<TConfig>;
    const formGroup = new FormGroup(controls);

    const signals = Object.fromEntries(
        Object.entries(config).map(([key, conf]) => {
            return [key, signal(paramDefault(conf))];
        })
    ) as InferSignals<TConfig>;

    const subscriptions = new Subscription();

    // URL → controls: set each configured param from URL, or reset to default
    subscriptions.add(
        route.queryParams.pipe(takeUntilDestroyed()).subscribe((params) => {
            const parsed = parseParams(params, config);
            Object.entries(config).forEach(([k, conf]) => {
                const v =
                    parsed[k] !== undefined ? parsed[k] : paramDefault(conf);
                if (controls[k]) {
                    controls[k].setValue(v, { emitEvent: false });
                    signals[k].set(v);
                }
            });
        })
    );

    // Controls → URL: per-key debounce using debounceMs from config
    Object.entries(config).forEach(([key, conf]) => {
        subscriptions.add(
            controls[key].valueChanges
                .pipe(
                    debounceTime(conf.debounceMs ?? 300),
                    takeUntilDestroyed()
                )
                .subscribe((value) => {
                    signals[key].set(value);
                    router.navigate([], {
                        queryParams: {
                            [key]:
                                value === paramDefault(conf) ? null : value
                        },
                        queryParamsHandling: 'merge',
                        replaceUrl: true
                    });
                })
        );
    });

    return {
        formGroup,
        signals,
        subscriptions
    };
}
