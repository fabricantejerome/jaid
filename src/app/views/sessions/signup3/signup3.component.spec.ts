import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Signup3Component } from './signup3.component';

describe('Signup3Component', () => {
  let component: Signup3Component;
  let fixture: ComponentFixture<Signup3Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Signup3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Signup3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
