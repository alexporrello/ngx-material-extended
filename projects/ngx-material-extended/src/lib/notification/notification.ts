import { Component, ViewEncapsulation } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

import { MexSymbol } from '../symbol/symbol';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatButton, MatAnchor } from '@angular/material/button';

declare type MexNotificationType = 'SUCCESS' | 'WARN' | 'ERROR' | 'MESSAGE';

class MexNotification {
    private _timeout: any;
    private _observer?: Subscriber<boolean>;

    public showTimeout = true;

    constructor(
        public type: MexNotificationType,
        public message: string,
        public icon: string,
        public confirmButtonText?: string,
        public timeout = 5000,
        public opening = true,
        public closed?: boolean
    ) {}

    public start(observer?: Subscriber<boolean>): void {
        this._observer = observer;

        setTimeout(() => {
            this.opening = false;
        }, 0);

        setTimeout(() => {
            this.showTimeout = false;
        }, 5);

        this._timeout = setTimeout(() => {
            this._close();
        }, this.timeout);
    }

    public dismiss(): void {
        this._observer?.next(false);
        clearTimeout(this._timeout);
        this._close();
    }

    public accept(): void {
        this._observer?.next(true);
        clearTimeout(this._timeout);
        this._close();
    }

    private _close(): void {
        this.opening = false;
        setTimeout(() => {
            this.closed = true;
        }, 490);
    }
}

export let notifications: MexNotification[] = [];

export function successConfirmation(
    message: string,
    buttonText: string,
    timeout: number
) {
    return new Observable((observer) => {
        let notification = new MexNotification(
            'SUCCESS',
            message,
            'question_mark',
            buttonText,
            timeout
        );

        notifications.push(notification);
        notification.start(observer);
    });
}

export function success(message: string, allowClose?: boolean): void;
export function success(
    message: string,
    timeout?: number,
    allowClose?: boolean
): void;
export function success(message: string, ...args: any[]): void {
    broadcastMessage('SUCCESS', message, ...args);
}

export function warn(message: string, allowClose?: boolean): void;
export function warn(
    message: string,
    timeout?: number,
    allowClose?: boolean
): void;
export function warn(message: string, ...args: any[]): void {
    broadcastMessage('WARN', message, ...args);
}

export function error(message: string, allowClose?: boolean): void;
export function error(
    message: string,
    timeout?: number,
    allowClose?: boolean
): void;
export function error(message: string, ...args: any[]): void {
    broadcastMessage('ERROR', message, ...args);
}

export function message(message: string, allowClose?: boolean): MexNotification;
export function message(
    message: string,
    timeout?: number,
    allowClose?: boolean
): MexNotification;
export function message(message: string, ...args: any[]): MexNotification {
    return broadcastMessage('MESSAGE', message, ...args);
}

function broadcastMessage(
    type: MexNotificationType,
    message: string,
    ...args: any[]
): MexNotification {
    let timeout = 5000;
    let allowClose = true;

    if (args[0] !== undefined) {
        typeof args[0] === 'number'
            ? (timeout = args[0])
            : (allowClose = args[1]);

        if (args[1] !== undefined) allowClose = args[0];
    }

    let icon;

    switch (type) {
        case 'ERROR':
            icon = 'cancel';
            break;
        case 'WARN':
            icon = 'error';
            break;
        case 'SUCCESS':
            icon = 'thumb_up_alt';
            break;
        default:
            icon = 'info';
    }

    let notification: MexNotification = new MexNotification(
        type,
        message,
        icon,
        undefined,
        timeout
    );

    notifications.push(notification);
    notification.start();

    return notification;
}

@Component({
    selector: 'mex-notifications-overlay',
    templateUrl: './notification.html',
    styleUrl: './notification.scss',
    imports: [MexSymbol, MatAnchor],
    standalone: true,
    animations: [
        trigger('elmNotification', [
            transition(':enter', [
                style({ height: '0' }),
                animate('500ms cubic-bezier(0.8,0.3,0,1)')
            ]),
            transition(':leave', [
                animate(
                    '500ms cubic-bezier(0.8,0.3,0,1)',
                    style({ height: '0', paddingBottom: '0', paddingTop: '0' })
                )
            ])
        ]),
        trigger('elmNotificationTimeout', [
            transition(':leave', [animate('5000ms', style({ width: '0' }))])
        ])
    ],
    encapsulation: ViewEncapsulation.None
})
export class MexNotificationsOverlay {
    constructor() {}

    public get notifications(): MexNotification[] {
        return notifications;
    }
}
