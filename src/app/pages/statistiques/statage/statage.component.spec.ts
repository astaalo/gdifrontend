import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatageComponent } from './statage.component';

describe('StatageComponent', () => {
  let component: StatageComponent;
  let fixture: ComponentFixture<StatageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
