import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MexTable } from './table';

describe('MexTable', () => {
  let component: MexTable;
  let fixture: ComponentFixture<MexTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MexTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MexTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
