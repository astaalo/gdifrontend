import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddattestationComponent } from './addattestation.component';

describe('AddattestationComponent', () => {
  let component: AddattestationComponent;
  let fixture: ComponentFixture<AddattestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddattestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddattestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
