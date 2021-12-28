import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWeeklyComponent } from './update-weekly.component';

describe('UpdateWeeklyComponent', () => {
  let component: UpdateWeeklyComponent;
  let fixture: ComponentFixture<UpdateWeeklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateWeeklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
