import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdomaineComponent } from './listdomaine.component';

describe('ListdomaineComponent', () => {
  let component: ListdomaineComponent;
  let fixture: ComponentFixture<ListdomaineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdomaineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdomaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
