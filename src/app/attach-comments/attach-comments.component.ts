import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Comment,
  CurrentUser,
  ActiveSection,
  ActivityType,
  AddReply,
  ReplyType,
} from '../app.component.model';
@Component({
  selector: 'app-attach-comments',
  templateUrl: './attach-comments.component.html',
  styleUrls: ['./attach-comments.component.scss'],
})
export class AttachCommentsComponent {
  @Input() comments!: Array<Comment>;
  @Input() currentUser!: CurrentUser;

  @Output() updateComment = new EventEmitter<string>();

  activeSection: ActiveSection | null = null;
  activityType = ActivityType;

  replyCommentInput: string = '';

  // hide unclicked inputs
  commentIndex = -Infinity;
  press(index: number) {
    this.commentIndex = index;
  }

  // attach reply inputs
  btnClick(type: ActivityType, comment: Comment, index: number) {
    this.activeSection = {
      type: type,
      id: comment.id,
      replyingTo: comment.user.username,
      index: index,
    };
    this.replyCommentInput = `@${comment.user.username} `;
  }

  // Emit Reply input
  @Output() addReply = new EventEmitter<AddReply>();

  addingReply(item: AddReply) {
    if (item.replyType === ReplyType.Commnet) {
      item.index = this.activeSection!.index;
    }
    this.addReply.emit(item);
    this.activeSection = null;
    this.replyCommentInput = '';
  }

  // attach edit input
  editComment(comment: Comment) {
    return (
      this.activeSection?.type === ActivityType.Edit &&
      this.activeSection.id === comment.id
    );
  }

  updatingComment(content: string) {
    this.updateComment.emit(content);
    this.activeSection = null;
  }

  @Output() updateReply = new EventEmitter<string>();
  updatingReply(content: string) {
    this.updateReply.emit(content);
  }

  cancelDelete() {
    this.activeSection = null;
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
      this.activeSection?.type === ActivityType.Delete &&
      this.activeSection.id === comment.id
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
