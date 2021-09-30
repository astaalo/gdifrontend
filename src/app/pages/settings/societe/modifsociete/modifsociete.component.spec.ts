import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifsocieteComponent } from './modifsociete.component';

describe('ModifsocieteComponent', () => {
  let component: ModifsocieteComponent;
  let fixture: ComponentFixture<ModifsocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifsocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifsocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
