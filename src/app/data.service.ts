import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
    readonly engineers = [
        {
            name: 'Ada Lovelace',
            team: 'Platform',
            role: 'Staff Engineer',
            tenure: 6
        },
        {
            name: 'Grace Hopper',
            team: 'Platform',
            role: 'Principal Engineer',
            tenure: 11
        },
        {
            name: 'Margaret Hamilton',
            team: 'Infra',
            role: 'Senior Engineer',
            tenure: 3
        },
        {
            name: 'Barbara Liskov',
            team: 'Infra',
            role: 'Staff Engineer',
            tenure: 8
        },
        {
            name: 'Frances Allen',
            team: 'Compiler',
            role: 'Senior Engineer',
            tenure: 2
        }
    ];

    readonly totalTenure = this.engineers.reduce((sum, e) => sum + e.tenure, 0);
}
