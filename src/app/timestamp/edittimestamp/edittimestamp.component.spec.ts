import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdittimestampComponent } from './edittimestamp.component';

describe('EdittimestampComponent', () => {
  let component: EdittimestampComponent;
  let fixture: ComponentFixture<EdittimestampComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdittimestampComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdittimestampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
