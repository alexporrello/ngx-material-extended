import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MexButtonSelect } from './button-select';

describe('MexButtonSelect', () => {
    let component: MexButtonSelect;
    let fixture: ComponentFixture<MexButtonSelect>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MexButtonSelect]
        }).compileComponents();

        fixture = TestBed.createComponent(MexButtonSelect);
        component = fixture.componentInstance;
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
