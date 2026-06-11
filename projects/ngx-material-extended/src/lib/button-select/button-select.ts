import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    contentChild,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    OnInit,
    Renderer2,
    ViewEncapsulation
} from '@angular/core';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'mex-button-select',
    imports: [],
    templateUrl: './button-select.html',
    styleUrl: './button-select.scss',
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'mex-button-select',
        '(click)': 'openOnClick()'
    }
})
export class MexButtonSelect {
    public readonly host: ElementRef<HTMLButtonElement> = inject(ElementRef);

    public readonly button = contentChild(HTMLButtonElement);
    public readonly matSelect = contentChild(MatSelect);

    constructor() {
        effect(() => {
            console.log(this.button());
        });
    }

    public openOnClick() {
        const select = this.matSelect();
        console.log(select);
        if (!select) return;
        select.open();
        this.host.nativeElement.blur();
    }
}

@Directive({
    selector: '[matSelectTriggerFor]',
    host: {
        '(click)': 'openOnClick()'
    }
})
export class MatSelectTrigger implements AfterViewInit {
    private _hasSelected = false;

    public matSelect = input<MatSelect | undefined>(undefined, {
        alias: 'matSelectTriggerFor'
    });

    constructor(private _renderer: Renderer2) {
        effect(() => {
            if (this._hasSelected) return;
            const select = this.matSelect();
            if (!select) return;
            this._hideMatSelect(select);
        });
    }

    ngAfterViewInit(): void {
        const select = this.matSelect();
        if (!select) {
            throw new Error('matSelectTrigger must be given a MatSelect.');
        }
        this._hideMatSelect(select);
    }

    private _hideMatSelect(select: MatSelect) {
        const trigger: HTMLDivElement =
            select.trigger?.nativeElement?.parentElement;
        if (!trigger) return;

        this._renderer.setStyle(trigger, 'width', '0px');
        this._renderer.setStyle(trigger, 'height', '0px');
        this._renderer.setStyle(trigger, 'overflow', 'hidden');

        this._hasSelected = true;
    }

    public openOnClick() {
        const select = this.matSelect();
        if (!select) return;
        select.open();
    }
}
