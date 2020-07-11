import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpersonnelComponent } from './addpersonnel.component';

describe('AddpersonnelComponent', () => {
  let component: AddpersonnelComponent;
  let fixture: ComponentFixture<AddpersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
