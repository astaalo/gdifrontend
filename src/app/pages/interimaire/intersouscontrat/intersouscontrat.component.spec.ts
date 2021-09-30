import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntersouscontratComponent } from './intersouscontrat.component';

describe('IntersouscontratComponent', () => {
  let component: IntersouscontratComponent;
  let fixture: ComponentFixture<IntersouscontratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntersouscontratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntersouscontratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
