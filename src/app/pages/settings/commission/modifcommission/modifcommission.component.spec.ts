import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifcommissionComponent } from './modifcommission.component';

describe('ModifcommissionComponent', () => {
  let component: ModifcommissionComponent;
  let fixture: ComponentFixture<ModifcommissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifcommissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifcommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
