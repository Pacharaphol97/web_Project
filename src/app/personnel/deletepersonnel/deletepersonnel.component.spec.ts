import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletepersonnelComponent } from './deletepersonnel.component';

describe('DeletepersonnelComponent', () => {
  let component: DeletepersonnelComponent;
  let fixture: ComponentFixture<DeletepersonnelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletepersonnelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletepersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
