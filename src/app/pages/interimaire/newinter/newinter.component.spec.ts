import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewinterComponent } from './newinter.component';

describe('NewinterComponent', () => {
  let component: NewinterComponent;
  let fixture: ComponentFixture<NewinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
