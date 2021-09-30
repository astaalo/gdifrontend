import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailagenceComponent } from './detailagence.component';

describe('DetailagenceComponent', () => {
  let component: DetailagenceComponent;
  let fixture: ComponentFixture<DetailagenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailagenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailagenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
