import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdirectionComponent } from './listdirection.component';

describe('ListdirectionComponent', () => {
  let component: ListdirectionComponent;
  let fixture: ComponentFixture<ListdirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
