import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordforgetComponent } from './passwordforget.component';

describe('PasswordforgetComponent', () => {
  let component: PasswordforgetComponent;
  let fixture: ComponentFixture<PasswordforgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordforgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordforgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
