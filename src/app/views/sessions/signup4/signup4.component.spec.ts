import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Signup4Component } from './signup4.component';

describe('Signup4Component', () => {
  let component: Signup4Component;
  let fixture: ComponentFixture<Signup4Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Signup4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
