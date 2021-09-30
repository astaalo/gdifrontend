import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfincontratComponent } from './interfincontrat.component';

describe('InterfincontratComponent', () => {
  let component: InterfincontratComponent;
  let fixture: ComponentFixture<InterfincontratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfincontratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfincontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
