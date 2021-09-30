import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailevaluationComponent } from './detailevaluation.component';

describe('DetailevaluationComponent', () => {
  let component: DetailevaluationComponent;
  let fixture: ComponentFixture<DetailevaluationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailevaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailevaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
