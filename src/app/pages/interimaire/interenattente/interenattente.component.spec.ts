import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterenattenteComponent } from './interenattente.component';

describe('InterenattenteComponent', () => {
  let component: InterenattenteComponent;
  let fixture: ComponentFixture<InterenattenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterenattenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterenattenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
