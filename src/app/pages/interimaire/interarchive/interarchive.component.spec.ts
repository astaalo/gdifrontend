import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterarchiveComponent } from './interarchive.component';

describe('InterarchiveComponent', () => {
  let component: InterarchiveComponent;
  let fixture: ComponentFixture<InterarchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterarchiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterarchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
