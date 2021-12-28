import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDailyComponent } from './update-daily.component';

describe('UpdateDailyComponent', () => {
  let component: UpdateDailyComponent;
  let fixture: ComponentFixture<UpdateDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
