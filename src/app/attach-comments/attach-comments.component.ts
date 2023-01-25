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
  @Output() updateComment = new EventEmitter<string>();

  activeComment: ActiveComment | null = null;
  activeCommentType = ActiveCommentType;
  replyHide: boolean = false;

  replyComentInput: string = '';

  btnClick(btn: string, comment: Comment, index: number) {
    if (btn === 'reply') {
      this.activeComment = {
        type: this.activeCommentType.Replying,
        id: comment.id,
        replyingTo: comment.user.username,
        index: index,
      };
    }
    if (btn === 'edit') {
      this.activeComment = {
        type: this.activeCommentType.Editing,
        id: comment.id,
        replyingTo: comment.user.username,
        index: index,
      };
    }
    if (btn === 'delete') {
      this.activeComment = {
        type: this.activeCommentType.Deleting,
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
    return (
      this.activeComment?.type === ActiveCommentType.Editing &&
      this.activeComment.id === comment.id
    );
  }

  updatingComment(content: string) {
    this.updateComment.emit(content);
    this.activeComment = null;
  }

  @Output() updateReply = new EventEmitter<string>();
  updatingReply(content: string) {
    this.updateReply.emit(content);
  }

  cancelDelete() {
    this.activeComment = null;
  }

  @Output() delete = new EventEmitter<number>();
  @Output() deleteRep = new EventEmitter<object>();

  deleteReply(item: object) {
    this.deleteRep.emit(item);
  }
  deleteClick(index: number) {
    this.delete.emit(index);
  }

  deleteComment(comment: Comment) {
    return (
      this.activeComment?.type === ActiveCommentType.Deleting &&
      this.activeComment.id === comment.id
    );
  }

  @Output() scoreMinus = new EventEmitter();
  @Output() scorePlus = new EventEmitter();

  scoreDown(score: number, index: number) {
    if (score) {
      this.scoreMinus.emit(index);
    }
  }

  scoreUp(index: number) {
    this.scorePlus.emit(index);
  }
}
