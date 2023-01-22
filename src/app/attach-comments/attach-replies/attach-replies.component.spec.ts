import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachRepliesComponent } from './attach-replies.component';

describe('AttachRepliesComponent', () => {
  let component: AttachRepliesComponent;
  let fixture: ComponentFixture<AttachRepliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachRepliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachRepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
