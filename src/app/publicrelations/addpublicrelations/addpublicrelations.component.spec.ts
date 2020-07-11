import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpublicrelationsComponent } from './addpublicrelations.component';

describe('AddpublicrelationsComponent', () => {
  let component: AddpublicrelationsComponent;
  let fixture: ComponentFixture<AddpublicrelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpublicrelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpublicrelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
