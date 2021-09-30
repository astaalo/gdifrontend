import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifEvaluerComponent } from './modif-evaluer.component';

describe('ModifEvaluerComponent', () => {
  let component: ModifEvaluerComponent;
  let fixture: ComponentFixture<ModifEvaluerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifEvaluerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifEvaluerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
