import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotionViewerComponent } from './motion-viewer.component';

describe('MotionViewerComponent', () => {
  let component: MotionViewerComponent;
  let fixture: ComponentFixture<MotionViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MotionViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MotionViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
