import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableTable } from './editable-table';

describe('EditableTable', () => {
  let component: EditableTable;
  let fixture: ComponentFixture<EditableTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
