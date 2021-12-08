import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickpicComponent } from './pickpic.component';

describe('PickpicComponent', () => {
  let component: PickpicComponent;
  let fixture: ComponentFixture<PickpicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickpicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickpicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
