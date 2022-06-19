import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardDarkComponent } from './dashboard-dark.component';

describe('DashboardDarkComponent', () => {
  let component: DashboardDarkComponent;
  let fixture: ComponentFixture<DashboardDarkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardDarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
