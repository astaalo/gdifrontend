import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailmanagerComponent } from './detailmanager.component';

describe('DetailmanagerComponent', () => {
  let component: DetailmanagerComponent;
  let fixture: ComponentFixture<DetailmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
