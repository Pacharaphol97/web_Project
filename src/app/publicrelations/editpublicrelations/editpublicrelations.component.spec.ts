import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpublicrelationsComponent } from './editpublicrelations.component';

describe('EditpublicrelationsComponent', () => {
  let component: EditpublicrelationsComponent;
  let fixture: ComponentFixture<EditpublicrelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpublicrelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpublicrelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
