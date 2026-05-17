import {
    AfterViewInit,
    Component,
    contentChild,
    Directive,
    effect,
    ElementRef,
    inject,
    input,
    OnInit,
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
    public matSelect = input<MatSelect | undefined>(undefined, {
        alias: 'matSelectTriggerFor'
    });

    constructor() {
        effect(() => {
            const select = this.matSelect();
            console.log(select?.trigger);
        });
    }

    ngAfterViewInit(): void {
        const select = this.matSelect();
        if (!select) {
            throw new Error('matSelectTrigger must be given a MatSelect.');
        }
        const trigger: HTMLDivElement =
            select.trigger.nativeElement?.parentElement;
        trigger.style.width = '0px';
        trigger.style.height = '0px';
        trigger.style.overflow = 'hidden';
    }

    public openOnClick() {
        const select = this.matSelect();
        console.log(select);
        if (!select) return;
        select.open();
    }
}
