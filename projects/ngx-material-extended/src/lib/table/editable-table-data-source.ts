import {
    computed,
    effect,
    Signal,
    signal,
    WritableSignal
} from '@angular/core';

export function tableDataSource<T extends object>(
    _data: WritableSignal<T[] | undefined> | Signal<T[] | undefined>
) {
    const filterVals = signal<Record<keyof T, any[]>>({} as any);
    const sortKey = signal<keyof T | undefined>(undefined);
    const sortDir = signal<'asc' | 'desc' | null>(null);

    effect(() => {
        _data();
        filterVals.set({} as any);
        sortKey.set(undefined);
        sortDir.set(null);
    });

    //
    // Filter Logic
    //

    const filterOpts = computed(() => {
        const data = _data();
        if (!data) return {};

        const unique = data.reduce(
            (acc, data) => {
                Object.entries(data).forEach(([k, v]) => {
                    acc[k] ??= new Set<any>();
                    acc[k].add(v);
                    return acc;
                });

                return acc;
            },
            {} as Record<string, Set<any>>
        );

        return Object.entries(unique).reduce(
            (acc, [k, v]) => {
                acc[k] = Array.from(v);
                return acc;
            },
            {} as Record<string, any[]>
        );
    });

    const filteredData = computed(() => {
        const data = _data();
        if (!data) return [];

        const filters = filterVals();
        if (Object.values(filters).length === 0) {
            return data;
        }

        return data.filter((filterVal) => {
            return Object.entries(filters).every(([k, v]) => {
                return (v as any[]).some((f) => f == filterVal[k as keyof T]);
            });
        });
    });

    //
    // Sorting Logic
    //

    const sortedData = computed(() => {
        const data = filteredData();
        if (!data) return;

        const sortCol = sortKey();
        if (!sortCol) return data;

        const asc = (sortDir() ?? 'asc') === 'asc';

        return [...data].sort((a, b) => {
            const result = (a[sortCol] + '').localeCompare(b[sortCol] + '');
            if (asc) return result;
            return result * -1;
        });
    });

    const sortIcon = computed(() => {
        const dir = sortDir();
        if (!dir) return null;

        return dir === 'asc' ? 'arrow_downward' : 'arrow_upward';
    });

    const displayedResultsCount = computed(() => {
        return sortedData()?.length ?? 0;
    });

    //
    // Helper Functions
    //

    const onDataFilter = (key: keyof T, vals: any[]) => {
        filterVals.update((v) => {
            if (vals.length === 0) {
                delete v[key];
            } else {
                v[key] = vals;
            }
            return { ...v };
        });
    };

    const onSort = (key: keyof T) => {
        const _sortKey = sortKey();

        if (_sortKey !== key) {
            sortKey.set(key);
            sortDir.set('asc');
            return;
        }

        const _sortIcon = sortDir();
        if (_sortIcon === 'desc') {
            sortKey.set(undefined);
            sortDir.set(null);
            return;
        }

        sortDir.set('desc');
    };

    return {
        _data,
        value: sortedData,
        filterOpts,
        onDataFilter,
        filteredData,
        onSort,
        sortKey,
        sortIcon,
        displayedResultsCount
    };
}
