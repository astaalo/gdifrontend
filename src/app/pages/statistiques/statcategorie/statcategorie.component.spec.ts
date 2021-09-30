import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatcategorieComponent } from './statcategorie.component';

describe('StatcategorieComponent', () => {
  let component: StatcategorieComponent;
  let fixture: ComponentFixture<StatcategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatcategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatcategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
