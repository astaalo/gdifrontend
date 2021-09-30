import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsiteComponent } from './listsite.component';

describe('ListsiteComponent', () => {
  let component: ListsiteComponent;
  let fixture: ComponentFixture<ListsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
