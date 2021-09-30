import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierinterComponent } from './modifierinter.component';

describe('ModifierinterComponent', () => {
  let component: ModifierinterComponent;
  let fixture: ComponentFixture<ModifierinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifierinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifierinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
