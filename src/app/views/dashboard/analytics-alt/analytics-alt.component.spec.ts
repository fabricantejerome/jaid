import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AnalyticsAltComponent } from './analytics-alt.component';

describe('AnalyticsAltComponent', () => {
  let component: AnalyticsAltComponent;
  let fixture: ComponentFixture<AnalyticsAltComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalyticsAltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyticsAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
