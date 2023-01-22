import { Component, Input } from '@angular/core';
import { Comment, CurrentUser } from '../app.component.model';
@Component({
  selector: 'app-attach-comments',
  templateUrl: './attach-comments.component.html',
  styleUrls: ['./attach-comments.component.scss'],
})
export class AttachCommentsComponent {
  @Input() comments!: Array<Comment>;
  @Input() currentUser!: CurrentUser;
}
