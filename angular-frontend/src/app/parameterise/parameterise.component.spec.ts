import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameteriseComponent } from './parameterise.component';

describe('ParameteriseComponent', () => {
  let component: ParameteriseComponent;
  let fixture: ComponentFixture<ParameteriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParameteriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameteriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
