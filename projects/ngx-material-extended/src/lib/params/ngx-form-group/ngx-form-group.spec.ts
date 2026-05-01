import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MexFormGroup } from './ngx-form-group';

describe('NgxFormGroup', () => {
    let component: MexFormGroup;
    let fixture: ComponentFixture<MexFormGroup>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MexFormGroup]
        }).compileComponents();

        fixture = TestBed.createComponent(MexFormGroup);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
