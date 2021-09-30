import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonManagerComponent } from './mon-manager.component';

describe('MonManagerComponent', () => {
  let component: MonManagerComponent;
  let fixture: ComponentFixture<MonManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
