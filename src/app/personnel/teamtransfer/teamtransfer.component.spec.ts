import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamtransferComponent } from './teamtransfer.component';

describe('TeamtransferComponent', () => {
  let component: TeamtransferComponent;
  let fixture: ComponentFixture<TeamtransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamtransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamtransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
