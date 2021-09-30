import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordforgetMailComponent } from './passwordforget-mail.component';

describe('PasswordforgetMailComponent', () => {
  let component: PasswordforgetMailComponent;
  let fixture: ComponentFixture<PasswordforgetMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordforgetMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordforgetMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
