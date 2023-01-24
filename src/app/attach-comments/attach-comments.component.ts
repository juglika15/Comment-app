import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Comment,
  CurrentUser,
  ActiveComment,
  ActiveCommentType,
} from '../app.component.model';
@Component({
  selector: 'app-attach-comments',
  templateUrl: './attach-comments.component.html',
  styleUrls: ['./attach-comments.component.scss'],
})
export class AttachCommentsComponent {
  contructor() {}
  @Input() comments!: Array<Comment>;
  @Input() currentUser!: CurrentUser;
  @Output() addCommentReply = new EventEmitter<object>();
  @Output() addReplyReply = new EventEmitter<any>();
  editInput: string = '';

  activeComment: ActiveComment | null = null;
  activeCommentType = ActiveCommentType;
  replyHide: boolean = false;

  replyComentInput: string = '';

  btnClick(btn: string, comment: Comment, index: number) {
    if (btn === 'reply') {
      this.activeComment = {
        type: this.activeCommentType.replying,
        id: comment.id,
        replyingTo: comment.user.username,
        index: index,
      };
    }
    if (btn === 'edit') {
      this.activeComment = {
        type: this.activeCommentType.editing,
        id: comment.id,
        replyingTo: comment.user.username,
        index: index,
      };
    }
    if (btn === 'delete') {
      this.activeComment = {
        type: this.activeCommentType.deleting,
        id: comment.id,
        replyingTo: comment.user.username,
        index: index,
      };
    }
    this.replyHide = true;

    this.replyComentInput = `@${comment.user.username} `;
  }

  hideComReplyHandler() {
    this.activeComment = null;
  }
  replyHiderHandler() {
    this.replyHide = false;
  }

  addComReply(item: object) {
    this.addCommentReply.emit({ item: item, index: this.activeComment?.index });
    this.activeComment = null;
    this.replyComentInput = '';
  }

  addRepReply(item: any) {
    this.addReplyReply.emit(item);
  }

  editComment(comment: Comment) {
    if (comment.id === this.activeComment?.id) {
    }
    return (
      this.activeComment?.type === ActiveCommentType.editing &&
      this.activeComment.id === comment.id
    );
  }
}
