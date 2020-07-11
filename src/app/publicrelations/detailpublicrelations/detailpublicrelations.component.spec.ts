import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpublicrelationsComponent } from './detailpublicrelations.component';

describe('DetailpublicrelationsComponent', () => {
  let component: DetailpublicrelationsComponent;
  let fixture: ComponentFixture<DetailpublicrelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailpublicrelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpublicrelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
