import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppService {
    public pageTitle = signal<string>('ngx-table Demo')
}