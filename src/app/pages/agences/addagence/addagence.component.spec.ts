import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddagenceComponent } from './addagence.component';

describe('AddagenceComponent', () => {
  let component: AddagenceComponent;
  let fixture: ComponentFixture<AddagenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddagenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddagenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
