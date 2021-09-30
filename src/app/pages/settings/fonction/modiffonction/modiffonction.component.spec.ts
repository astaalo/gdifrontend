import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModiffonctionComponent } from './modiffonction.component';

describe('ModiffonctionComponent', () => {
  let component: ModiffonctionComponent;
  let fixture: ComponentFixture<ModiffonctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModiffonctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModiffonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
