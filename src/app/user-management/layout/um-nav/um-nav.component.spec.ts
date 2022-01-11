import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmNavComponent } from './um-nav.component';

describe('UmNavComponent', () => {
  let component: UmNavComponent;
  let fixture: ComponentFixture<UmNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UmNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UmNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
