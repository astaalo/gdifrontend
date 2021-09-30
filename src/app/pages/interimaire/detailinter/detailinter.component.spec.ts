import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailinterComponent } from './detailinter.component';

describe('DetailinterComponent', () => {
  let component: DetailinterComponent;
  let fixture: ComponentFixture<DetailinterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailinterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailinterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
