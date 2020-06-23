import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicrelationsComponent } from './publicrelations.component';

describe('PublicrelationsComponent', () => {
  let component: PublicrelationsComponent;
  let fixture: ComponentFixture<PublicrelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicrelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicrelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
