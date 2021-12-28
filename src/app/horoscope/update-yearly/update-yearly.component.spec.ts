import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateYearlyComponent } from './update-yearly.component';

describe('UpdateYearlyComponent', () => {
  let component: UpdateYearlyComponent;
  let fixture: ComponentFixture<UpdateYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateYearlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
