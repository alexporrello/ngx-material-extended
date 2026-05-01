export declare interface MexTableColumn<T extends object> {
    key: keyof T;
    title: string;
    noWrap?: boolean;
    href?: 'self';
    date?: boolean;
    disableFilter?: boolean;
}
