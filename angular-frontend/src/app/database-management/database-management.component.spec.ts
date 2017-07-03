import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseManagementComponent } from './database-management.component';

describe('DatabaseManagementComponent', () => {
  let component: DatabaseManagementComponent;
  let fixture: ComponentFixture<DatabaseManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
