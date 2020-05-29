import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpersonnelComponent } from './editpersonnel.component';

describe('EditpersonnelComponent', () => {
  let component: EditpersonnelComponent;
  let fixture: ComponentFixture<EditpersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
