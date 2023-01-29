import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  @Output() addUserComment = new EventEmitter<string>();

  input = '';

  addComment() {
    this.addUserComment.emit(this.input);
    this.input = '';
  }
}
