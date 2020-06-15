import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositiontransferComponent } from './positiontransfer.component';

describe('PositiontransferComponent', () => {
  let component: PositiontransferComponent;
  let fixture: ComponentFixture<PositiontransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositiontransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositiontransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
