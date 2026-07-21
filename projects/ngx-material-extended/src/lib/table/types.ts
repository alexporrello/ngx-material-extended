export declare interface MexTableColumn<T extends object> {
    key: keyof T;
    title: string;
    noWrap?: boolean;
    href?: keyof T;
    date?: boolean;
    dateNarrow?: boolean;
    disableFilter?: boolean;
    clickable?: boolean;
    innerHTML?: boolean;
}
