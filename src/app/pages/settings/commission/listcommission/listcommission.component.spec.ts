import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcommissionComponent } from './listcommission.component';

describe('ListcommissionComponent', () => {
  let component: ListcommissionComponent;
  let fixture: ComponentFixture<ListcommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListcommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
