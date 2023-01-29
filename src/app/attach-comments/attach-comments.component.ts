import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Comment,
  CurrentUser,
  ActiveSection,
  ActivityType,
  AddReply,
  ContentType,
  DeleteContent,
  ScoreChangeType,
  ScoreChange,
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
    if (item.contentType === ContentType.Commnet) {
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

  // emit edited content
  updatingComment(content: string) {
    this.updateComment.emit(content);
    this.activeSection = null;
  }

  @Output() updateReply = new EventEmitter<string>();
  updatingReply(content: string) {
    this.updateReply.emit(content);
  }

  // attach delete input
  deleteInput(comment: Comment) {
    return (
      this.activeSection?.type === ActivityType.Delete &&
      this.activeSection.id === comment.id
    );
  }

  cancelDelete() {
    this.activeSection = null;
  }

  @Output() delete = new EventEmitter<DeleteContent>();

  deleteReply(item: DeleteContent) {
    this.delete.emit(item);
  }
  deleteComment() {
    this.delete.emit({
      contentType: ContentType.Commnet,
      id: this.activeSection!.id,
      index: this.activeSection!.index,
    });
  }

  // Score change

  @Output() scoreChange = new EventEmitter<ScoreChange>();

  scoreChangeType = ScoreChangeType;

  commentScoreChange(
    index: number,
    score: number,
    scoreChangeType: ScoreChangeType
  ) {
    const item: ScoreChange = {
      contentType: ContentType.Commnet,
      index: index,
      type: ScoreChangeType.Plus,
      id: -1,
    };
    if (score && scoreChangeType === ScoreChangeType.Minus) {
      item.type = ScoreChangeType.Minus;
    }
    this.scoreChange.emit(item);
  }

  replyScoreHandler(item: ScoreChange) {
    this.scoreChange.emit(item);
  }
}
