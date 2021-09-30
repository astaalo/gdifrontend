import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailattestationComponent } from './detailattestation.component';

describe('DetailattestationComponent', () => {
  let component: DetailattestationComponent;
  let fixture: ComponentFixture<DetailattestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailattestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailattestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
