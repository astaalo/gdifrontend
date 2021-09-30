import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifdirectionComponent } from './modifdirection.component';

describe('ModifdirectionComponent', () => {
  let component: ModifdirectionComponent;
  let fixture: ComponentFixture<ModifdirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifdirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifdirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
