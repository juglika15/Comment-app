import { Component, Input } from '@angular/core';
import { Comment, CurrentUser } from 'src/app/app.component.model';

@Component({
  selector: 'app-attach-replies',
  templateUrl: './attach-replies.component.html',
  styleUrls: ['./attach-replies.component.scss'],
})
export class AttachRepliesComponent {
  @Input() comments!: Array<Comment>;
  @Input() currentUser!: CurrentUser;
  @Input() comment!: Comment;
}
