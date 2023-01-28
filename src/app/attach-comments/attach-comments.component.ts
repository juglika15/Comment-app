import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Comment,
  CurrentUser,
  ActiveSection,
  ActivityType,
} from '../app.component.model';
@Component({
  selector: 'app-attach-comments',
  templateUrl: './attach-comments.component.html',
  styleUrls: ['./attach-comments.component.scss'],
})
export class AttachCommentsComponent {
  @Input() comments!: Array<Comment>;
  @Input() currentUser!: CurrentUser;

  @Output() addCommentReply = new EventEmitter<object>();
  @Output() addReplyReply = new EventEmitter<any>();
  @Output() updateComment = new EventEmitter<string>();

  activeSection: ActiveSection | null = null;
  activityType = ActivityType;

  replyComentInput: string = '';

  btnClick(type: ActivityType, comment: Comment, index: number) {
    this.activeSection = {
      type: type,
      id: comment.id,
      replyingTo: comment.user.username,
      index: index,
    };

    this.replyComentInput = `@${comment.user.username} `;
  }

  addComReply(item: object) {
    this.addCommentReply.emit({ item: item, index: this.activeSection?.index });
    this.activeSection = null;
    this.replyComentInput = '';
  }

  addRepReply(item: any) {
    this.addReplyReply.emit(item);
  }

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
