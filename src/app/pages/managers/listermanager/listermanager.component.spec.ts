import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListermanagerComponent } from './listermanager.component';

describe('ListermanagerComponent', () => {
  let component: ListermanagerComponent;
  let fixture: ComponentFixture<ListermanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListermanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListermanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
