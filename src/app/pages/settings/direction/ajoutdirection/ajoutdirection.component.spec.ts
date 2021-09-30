import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutdirectionComponent } from './ajoutdirection.component';

describe('AjoutdirectionComponent', () => {
  let component: AjoutdirectionComponent;
  let fixture: ComponentFixture<AjoutdirectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutdirectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutdirectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
