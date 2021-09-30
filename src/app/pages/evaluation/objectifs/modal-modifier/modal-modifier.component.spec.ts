import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalModifierComponent } from './modal-modifier.component';

describe('ModalModifierComponent', () => {
  let component: ModalModifierComponent;
  let fixture: ComponentFixture<ModalModifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalModifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
