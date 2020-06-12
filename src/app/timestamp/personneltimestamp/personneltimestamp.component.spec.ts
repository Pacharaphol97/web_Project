import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonneltimestampComponent } from './personneltimestamp.component';

describe('PersonneltimestampComponent', () => {
  let component: PersonneltimestampComponent;
  let fixture: ComponentFixture<PersonneltimestampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonneltimestampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonneltimestampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
