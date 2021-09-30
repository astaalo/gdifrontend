import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeevaluationComponent } from './listeevaluation.component';

describe('ListeevaluationComponent', () => {
  let component: ListeevaluationComponent;
  let fixture: ComponentFixture<ListeevaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeevaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
