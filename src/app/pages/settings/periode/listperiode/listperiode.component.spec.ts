import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListperiodeComponent } from './listperiode.component';

describe('ListperiodeComponent', () => {
  let component: ListperiodeComponent;
  let fixture: ComponentFixture<ListperiodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListperiodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListperiodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
