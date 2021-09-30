import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListprofilComponent } from './listprofil.component';

describe('ListprofilComponent', () => {
  let component: ListprofilComponent;
  let fixture: ComponentFixture<ListprofilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListprofilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
