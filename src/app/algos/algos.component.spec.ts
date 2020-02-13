import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgosComponent } from './algos.component';

describe('AlgosComponent', () => {
  let component: AlgosComponent;
  let fixture: ComponentFixture<AlgosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlgosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
