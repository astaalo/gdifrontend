import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatagenceComponent } from './statagence.component';

describe('StatagenceComponent', () => {
  let component: StatagenceComponent;
  let fixture: ComponentFixture<StatagenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatagenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatagenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
