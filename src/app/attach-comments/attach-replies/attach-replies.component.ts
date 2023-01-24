import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  Comment,
  CurrentUser,
  ActiveComment,
  ActiveCommentType,
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
  @Input() activeComment!: ActiveComment | null;
  activeReply: ActiveComment | null = null;
  @Output() hideComReply = new EventEmitter();
  @Output() addComReply = new EventEmitter<object>();
  @Output() addRepReply = new EventEmitter<object>();
  @Input() replyHide: boolean = false;
  @Output() replyHider = new EventEmitter<boolean>();
  @Input() replyComentInput!: string;
  replyReplyInput: string = '';

  btnClick(btn: string, reply: Reply, index: number) {
    if (btn === 'reply')
      this.activeReply = {
        type: ActiveCommentType.replying,
        id: reply.id,
        replyingTo: reply.user.username,
        index: index,
      };
    if (btn === 'edit')
      this.activeReply = {
        type: ActiveCommentType.editing,
        id: reply.id,
        replyingTo: reply.user.username,
        index: index,
      };
    if (btn === 'delete')
      this.activeReply = {
        type: ActiveCommentType.deleting,
        id: reply.id,
        replyingTo: reply.user.username,
        index: index,
      };

    this.hideComReply.emit();
    this.replyComentInput = '';
    this.replyHider.emit();

    this.replyReplyInput = `@${reply.user.username} `;
  }

  replyComment() {
    if (this.comment.id === this.activeComment?.id) {
    }
    return (
      this.activeComment?.type === ActiveCommentType.replying &&
      this.activeComment.id === this.comment.id
    );
  }

  replyReply(reply: Reply) {
    if (reply.id === this.activeReply?.id) {
    }
    return (
      this.activeReply?.type === ActiveCommentType.replying &&
      this.activeReply.id === reply.id
    );
  }

  addCommentReply() {
    this.addComReply.emit({
      reply: this.replyComentInput,
      replyingTo: this.activeComment?.replyingTo,
    });
  }

  addReplyReply() {
    this.addRepReply.emit({
      reply: this.replyReplyInput,
      replyingTo: this.activeReply?.replyingTo,
      index: this.activeReply?.index,
      id: this.activeReply?.id,
    });
    this.replyReplyInput = '';
    this.activeReply = null;
  }
}
