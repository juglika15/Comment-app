import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachCommentsComponent } from './attach-comments.component';

describe('AttachCommentsComponent', () => {
  let component: AttachCommentsComponent;
  let fixture: ComponentFixture<AttachCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttachCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
