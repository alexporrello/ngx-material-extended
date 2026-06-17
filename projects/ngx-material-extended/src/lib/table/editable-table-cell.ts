import {
    Component,
    computed,
    ElementRef,
    input,
    model,
    OnDestroy,
    output,
    signal,
    viewChild,
    ViewEncapsulation,
    WritableSignal
} from '@angular/core';

import mexp from 'math-expression-evaluator';

export declare interface MexEditableTableCellEvent {
    value: string;
    oldValue: string;
    /** Immediately updates the value. */
    accept: () => void;
    /** Disables the input and adds loading spinner. */
    submit: () => void;
    /** Indicates success, enables the input. */
    success: () => void;
    /** Indicates failure, enables the input. */
    failure: () => void;
}

export const EditableTdValidator = {
    number: /^[0-9]+([.]*[0-9]+)*$/
};

@Component({
    selector: '[mex-editable-table-cell]',
    templateUrl: './editable-table-cell.html',
    styleUrl: './editable-table-cell.scss',
    host: {
        class: 'mex-table-cell mex-table-cell-base',
        '[class.invalid]': 'invalid()',
        '[class.formula]': 'formula()',
        '[class.unsaved]': 'unsaved()',
        '[class.error]': 'invalid()',
        '(click)': 'inputRef()?.nativeElement?.focus()'
    },
    encapsulation: ViewEncapsulation.None
})
export class MexEditableTableCell implements OnDestroy {
    public readonly inputRef = viewChild<ElementRef<HTMLInputElement>>('input');

    public readonly validator = input<keyof typeof EditableTdValidator>();
    public readonly customValidator = input<RegExp>();
    public readonly emitOnBlur = input<boolean>();

    public readonly value = model('');

    public readonly onValueChange = output<MexEditableTableCellEvent>();
    public readonly onMathEvalError = output<unknown>();

    public readonly invalid = signal(false);
    public readonly formula = signal(false);
    public readonly unsaved = signal(false);
    public readonly loading = signal(false);

    public readonly disabled = model(false);
    public readonly success = signal(false);
    public readonly failure = signal(false);

    private readonly _validator = computed(() => {
        const builtIn = this.validator();
        if (builtIn) return EditableTdValidator[builtIn];

        const custom = this.customValidator();
        if (custom) return custom;

        return null;
    });

    private _colorTimers: ReturnType<typeof setTimeout>[] = [];

    onBlur(input: HTMLInputElement) {
        const newVal = input.value;
        if (!newVal) return;

        if (this.invalid()) return;

        this.unsaved.set(newVal !== this.value());

        if (!this.emitOnBlur()) return;

        if (this.unsaved() && !this.formula()) {
            this._emitValueChange(input);
        }
    }

    onFocus(input: HTMLInputElement) {
        input.select();
        this.unsaved.set(false);
    }

    onInputChange(event: KeyboardEvent, input: HTMLInputElement) {
        const newVal = input.value;

        if (event.key === 'Escape') {
            input.value = this.value();
            this.formula.set(false);
            this.unsaved.set(false);
            this.invalid.set(false);
            input.blur();
            return;
        }

        if (newVal.length === 0) {
            this.formula.set(false);
            this.invalid.set(true);
            return;
        } else {
            this.invalid.set(false);
        }

        // Check for and evaluate math

        if (!newVal.startsWith('=')) {
            this.formula.set(false);
        } else if (newVal.startsWith('=') && event.key === 'Enter') {
            try {
                const result = new mexp().eval(newVal.substring(1));
                input.value = result + '';
                this.formula.set(false);
                this.invalid.set(false);
            } catch (e) {
                this.onMathEvalError.emit(e);
            }

            return;
        } else if (newVal.startsWith('=')) {
            this.formula.set(true);
            return;
        }

        // Check for an evaluate validators

        const validator = this._validator();
        if (validator) {
            const valid = validator.test(newVal);
            if (!valid) {
                this.invalid.set(true);
                return;
            } else {
                this.invalid.set(false);
                return;
            }
        }

        // If key is not enter, there's nothing else to do

        if (event.key !== 'Enter') return;

        // Otherwise, time to submit

        this._emitValueChange(input);
    }

    private _emitValueChange(input: HTMLInputElement) {
        const newVal = input.value;

        this.onValueChange.emit({
            value: newVal,
            oldValue: this.value(),
            accept: () => {
                this.value.set(newVal);
            },
            submit: () => {
                input.blur();
                this.unsaved.set(false);
                this.disabled.set(true);
                this.loading.set(true);
            },
            success: () => {
                this.disabled.set(false);
                this.loading.set(false);
                this.unsaved.set(false);
                this.applyColorTmp(this.success);
            },
            failure: () => {
                this.unsaved.set(true);
                this.disabled.set(false);
                this.loading.set(false);
                this.applyColorTmp(this.failure);
            }
        });
    }

    public applyColorTmp(sig: WritableSignal<boolean>, duration = 2000) {
        sig.set(true);
        const id = setTimeout(() => {
            sig.set(false);
        }, duration);
        this._colorTimers.push(id);
    }

    ngOnDestroy(): void {
        this._colorTimers.forEach(clearTimeout);
    }
}
