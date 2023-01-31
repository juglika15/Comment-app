import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Comment,
  CurrentUser,
  ActiveSection,
  ActivityType,
  Reply,
  AddReply,
  ContentType,
  DeleteContent,
  ScoreChangeType,
  ScoreChange,
} from 'src/app/app.component.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-attach-replies',
  templateUrl: './attach-replies.component.html',
  styleUrls: ['./attach-replies.component.scss'],
})
export class AttachRepliesComponent {
  constructor(public appService: AppService) {}
  @Input() comments!: Array<Comment>;
  @Input() currentUser!: CurrentUser;
  @Input() comment!: Comment;

  @Input() activeSection!: ActiveSection | null;
  activityType = ActivityType;

  // Reply Inputs
  @Input() replyCommentInput!: string;
  replyReplyInput: string = '';

  // hide unclicked inputs
  @Output() unclick = new EventEmitter<number>();
  @Input() commentIndex!: number;

  // Button click in section
  btnClick(type: ActivityType, reply: Reply, index: number, comment: Comment) {
    this.activeSection = {
      type: type,
      id: reply.id,
      replyingTo: reply.user.username,
      index: index,
    };

    this.replyReplyInput = `@${reply.user.username} `;
    this.unclick.emit(this.comments.indexOf(comment));
  }

  // attach reply inputs
  replyComment(comment: Comment) {
    return (
      this.activeSection?.type === ActivityType.Reply &&
      this.activeSection.id === this.comment.id &&
      this.comments.indexOf(comment) === this.commentIndex
    );
  }

  replyReply(reply: Reply, comment: Comment) {
    return (
      this.activeSection?.type === ActivityType.Reply &&
      this.activeSection.id === reply.id &&
      this.comments.indexOf(comment) === this.commentIndex
    );
  }

  // Emit Reply inputs

  @Output() addComReply = new EventEmitter<AddReply>();

  addCommentReply() {
    this.addComReply.emit({
      contentType: ContentType.Commnet,
      reply: this.replyCommentInput,
      replyingTo: this.activeSection!.replyingTo,
      index: -1,
    });
  }

  @Output() addRepReply = new EventEmitter<AddReply>();

  addReplyReply() {
    this.addRepReply.emit({
      contentType: ContentType.Reply,
      reply: this.replyReplyInput,
      replyingTo: this.activeSection!.replyingTo,
      index: this.activeSection!.index,
      id: this.activeSection!.id,
    });
    this.replyReplyInput = '';
    this.activeSection = null;
  }

  // attach edit input
  editReply(reply: Reply, comment: Comment) {
    return (
      this.activeSection?.type === ActivityType.Edit &&
      this.activeSection.id === reply.id &&
      this.comments.indexOf(comment) === this.commentIndex
    );
  }

  // emit edited content
  @Output() updatingReply = new EventEmitter<string>();
  updateReply(content: string) {
    this.updatingReply.emit(content);
    this.activeSection = null;
  }

  // attach delete input
  deleteInput(reply: Reply) {
    return (
      this.activeSection?.type === ActivityType.Delete &&
      this.activeSection.id === reply.id
    );
  }

  cancelDelete() {
    this.activeSection = null;
  }

  // emit delete info
  @Output() deleteReply = new EventEmitter<DeleteContent>();
  delete() {
    this.deleteReply.emit({
      contentType: ContentType.Reply,
      id: this.activeSection!.id,
      index: this.activeSection!.index,
    });
  }

  // Score change

  @Output() replyScoreChange = new EventEmitter<ScoreChange>();

  scoreChangeType = ScoreChangeType;

  scoreChange(
    index: number,
    score: number,
    scoreChangeType: ScoreChangeType,
    id: number
  ) {
    if (scoreChangeType === ScoreChangeType.Plus) {
      this.replyScoreChange.emit({
        contentType: ContentType.Reply,
        index: index,
        type: ScoreChangeType.Plus,
        id: id,
      });
    }
    if (score && scoreChangeType === ScoreChangeType.Minus) {
      this.replyScoreChange.emit({
        contentType: ContentType.Reply,
        index: index,
        type: ScoreChangeType.Minus,
        id: id,
      });
    }
  }
}
