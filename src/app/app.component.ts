import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import dataJSON from '../data.json';
import { Comment, CurrentUser } from './app.component.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'comment-app';

  comments: Array<Comment> = JSON.parse(
    localStorage.getItem('comments') || JSON.stringify(dataJSON.comments)
  );
  currentUser: CurrentUser = JSON.parse(
    localStorage.getItem('currentUser') || JSON.stringify(dataJSON.currentUser)
  );

  idCounter = 5;

  addCommentHandler(input: string) {
    this.comments.push({
      id: this.comments[this.comments.length - 1].id + 1,
      content: input,
      createdAt: 'now',
      score: 0,
      user: {
        image: {
          png: this.currentUser.image.png,
          webp: this.currentUser.image.webp,
        },
        username: this.currentUser.username,
      },
      replies: [],
    });
    this.idCounter++;
    localStorage.setItem('comments', JSON.stringify(this.comments));
    this.comments = JSON.parse(localStorage.getItem('comments')!);
    console.log(this.comments);
  }
}
