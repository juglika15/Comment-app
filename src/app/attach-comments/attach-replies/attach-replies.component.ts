import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Comment,
  CurrentUser,
  ActiveSection,
  ActivityType,
  Reply,
  AddReply,
  ReplyType,
} from 'src/app/app.component.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-attach-replies',
  templateUrl: './attach-replies.component.html',
  styleUrls: ['./attach-replies.component.scss'],
  providers: [AppService],
})
export class AttachRepliesComponent {
  constructor(private appService: AppService) {}
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
  replyComment() {
    return (
      this.activeSection?.type === ActivityType.Reply &&
      this.activeSection.id === this.comment.id
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
      replyType: ReplyType.Commnet,
      reply: this.replyCommentInput,
      replyingTo: this.activeSection!.replyingTo,
      index: -1,
      id: this.activeSection!.id,
    });
  }

  @Output() addRepReply = new EventEmitter<AddReply>();

  addReplyReply() {
    this.addRepReply.emit({
      replyType: ReplyType.Reply,
      reply: this.replyReplyInput,
      replyingTo: this.activeSection!.replyingTo,
      index: this.activeSection!.index,
      id: this.activeSection!.id,
    });
    this.replyReplyInput = '';
    this.activeSection = null;
  }

  // attach edit input
  editReply(reply: Reply) {
    return (
      this.activeSection?.type === ActivityType.Edit &&
      this.activeSection.id === reply.id
    );
  }

  @Output() updatingReply = new EventEmitter<string>();
  updateReply(content: string) {
    this.updatingReply.emit(content);
    this.activeSection = null;
  }

  deleteReply(reply: Reply) {
    return (
      this.activeSection?.type === ActivityType.Delete &&
      this.activeSection.id === reply.id
    );
  }
  cancelDelete() {
    this.activeSection = null;
  }

  @Output() deletingReply = new EventEmitter<object>();
  delete(id: number, index: number) {
    this.deletingReply.emit({
      id: id,
      index: index,
    });
  }
}
