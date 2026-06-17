import { Params } from '@angular/router';
import { InferParamType, Param, ParamType } from './types';

export function parseParams<const TConfig extends Record<string, Param>>(
    params: Params,
    config: TConfig
) {
    return Object.entries(params).reduce(
        (acc, [key, value]) => {
            const _config = config[key];

            if (!_config) return acc;

            if (_config.array) {
                // Coerce non-array values to array
                if (!Array.isArray(value)) value = [value];

                // Parse the values in the array
                acc[key] = (<any[]>value).map((v) =>
                    parseVal(_config.type, v, _config.default)
                );

                return acc;
            }

            acc[key] = parseVal(_config.type, value, _config.default);

            return acc;
        },
        {} as Record<string, any>
    );
}

export function parseVal<T extends ParamType>(
    type: T,
    val: string,
    defaultVal?: InferParamType<T> | Array<InferParamType<T>>
) {
    switch (type) {
        case 'boolean':
            return val === 'true';
        case 'number':
            const asNum = parseInt(val);
            if (!isNaN(asNum)) return asNum;
            return defaultVal ?? null;
        case 'date':
            const asDate = new Date(val);
            if (isNaN(asDate.getTime())) return (defaultVal ?? null) as any;
            return asDate;
        default:
            return val;
    }
}
