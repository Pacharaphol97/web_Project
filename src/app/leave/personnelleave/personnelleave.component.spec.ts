import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelleaveComponent } from './personnelleave.component';

describe('PersonnelleaveComponent', () => {
  let component: PersonnelleaveComponent;
  let fixture: ComponentFixture<PersonnelleaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonnelleaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelleaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
