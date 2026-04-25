export interface ElmConfirmationOptions {
    dialogType: 'confirmation' | 'success' | 'error';
    headingText: string;
    detailsText?: string;
    confirmText?: string;
    confirmButtonColor?: 'primary' | 'accent' | 'warn';
    cancelButtonColor?: 'primary' | 'accent' | 'warn';
    icon?: string;
    iconColor?: 'primary' | 'accent' | 'warn';
}

export function isElmConfirmationOpts(
    val: unknown
): val is ElmConfirmationOptions {
    return typeof val === 'object' && val !== null && 'headingText' in val;
}
