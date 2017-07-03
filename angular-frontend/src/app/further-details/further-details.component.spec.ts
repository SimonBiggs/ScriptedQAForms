import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FurtherDetailsComponent } from './further-details.component';

describe('FurtherDetailsComponent', () => {
  let component: FurtherDetailsComponent;
  let fixture: ComponentFixture<FurtherDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FurtherDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FurtherDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
