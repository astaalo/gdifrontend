import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeragenceComponent } from './listeragence.component';

describe('ListeragenceComponent', () => {
  let component: ListeragenceComponent;
  let fixture: ComponentFixture<ListeragenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeragenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeragenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
