import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonAgenceComponent } from './mon-agence.component';

describe('MonAgenceComponent', () => {
  let component: MonAgenceComponent;
  let fixture: ComponentFixture<MonAgenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonAgenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonAgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
