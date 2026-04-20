import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxTable } from './ngx-table';

describe('NgxTable', () => {
  let component: NgxTable;
  let fixture: ComponentFixture<NgxTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
