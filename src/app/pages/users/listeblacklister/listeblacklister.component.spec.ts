import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeblacklisterComponent } from './listeblacklister.component';

describe('ListeblacklisterComponent', () => {
  let component: ListeblacklisterComponent;
  let fixture: ComponentFixture<ListeblacklisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeblacklisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeblacklisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
