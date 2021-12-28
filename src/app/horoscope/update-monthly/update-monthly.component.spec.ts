import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMonthlyComponent } from './update-monthly.component';

describe('UpdateMonthlyComponent', () => {
  let component: UpdateMonthlyComponent;
  let fixture: ComponentFixture<UpdateMonthlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMonthlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMonthlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
