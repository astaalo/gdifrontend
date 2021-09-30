import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesdemandesComponent } from './lesdemandes.component';

describe('LesdemandesComponent', () => {
  let component: LesdemandesComponent;
  let fixture: ComponentFixture<LesdemandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesdemandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesdemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
