import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Comment,
  CurrentUser,
  ActiveSection,
  ActivityType,
  Reply,
} from 'src/app/app.component.model';

@Component({
  selector: 'app-attach-replies',
  templateUrl: './attach-replies.component.html',
  styleUrls: ['./attach-replies.component.scss'],
})
export class AttachRepliesComponent {
  @Input() comments!: Array<Comment>;
  @Input() currentUser!: CurrentUser;
  @Input() comment!: Comment;

  @Input() activeSection!: ActiveSection | null;
  activityType = ActivityType;

  @Output() addComReply = new EventEmitter<object>();
  @Output() addRepReply = new EventEmitter<object>();
  @Input() replyComentInput!: string;

  replyReplyInput: string = '';

  btnClick(type: ActivityType, reply: Reply, index: number) {
    this.activeSection = {
      type: type,
      id: reply.id,
      replyingTo: reply.user.username,
      index: index,
    };

    this.replyReplyInput = `@${reply.user.username} `;
  }

  replyComment() {
    if (this.comment.id === this.activeSection?.id) {
    }
    return (
      this.activeSection?.type === ActivityType.Reply &&
      this.activeSection.id === this.comment.id
    );
  }

  replyReply(reply: Reply) {
    if (reply.id === this.activeSection?.id) {
    }
    return (
      this.activeSection?.type === ActivityType.Reply &&
      this.activeSection.id === reply.id
    );
  }

  addCommentReply() {
    this.addComReply.emit({
      reply: this.replyComentInput,
      replyingTo: this.activeSection?.replyingTo,
    });
  }

  addReplyReply() {
    this.addRepReply.emit({
      reply: this.replyReplyInput,
      replyingTo: this.activeSection?.replyingTo,
      index: this.activeSection?.index,
      id: this.activeSection?.id,
    });
    this.replyReplyInput = '';
    this.activeSection = null;
  }

  editReply(reply: Reply) {
    if (reply.id === this.activeSection?.id) {
    }
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
