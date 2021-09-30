import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsocieteComponent } from './listsociete.component';

describe('ListsocieteComponent', () => {
  let component: ListsocieteComponent;
  let fixture: ComponentFixture<ListsocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
