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

  idCounter: number = JSON.parse(
    localStorage.getItem('idCounter') || JSON.stringify(5)
  );

  addCommentHandler(input: string) {
    if (input) {
      this.comments.push({
        id: this.idCounter,
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
      localStorage.setItem('idCounter', JSON.stringify(this.idCounter));
      this.idCounter = JSON.parse(localStorage.getItem('idCounter')!);

      localStorage.setItem('comments', JSON.stringify(this.comments));
      this.comments = JSON.parse(localStorage.getItem('comments')!);
      console.log(this.comments);
    }
  }

  addCommentReplyHandler(item: any) {
    if (item.item.reply !== `@${item.item.replyingTo} `) {
      this.comments[item.index].replies.push({
        id: this.idCounter,
        content: item.item.reply,
        createdAt: 'now',
        score: 0,
        user: {
          image: {
            png: this.currentUser.image.png,
            webp: this.currentUser.image.webp,
          },
          username: this.currentUser.username,
        },
        replyingTo: item.item.replyingTo,
      });
      this.idCounter++;
      localStorage.setItem('idCounter', JSON.stringify(this.idCounter));
      this.idCounter = JSON.parse(localStorage.getItem('idCounter')!);

      localStorage.setItem('comments', JSON.stringify(this.comments));
      this.comments = JSON.parse(localStorage.getItem('comments')!);
      console.log(this.comments);
    }
  }

  addReplyReplyHandler(item: any) {
    if (item.reply !== `@${item.replyingTo} `) {
      for (const comment of this.comments) {
        if (comment.replies[item.index]?.id === item.id) {
          comment.replies.push({
            id: this.idCounter,
            content: item.reply,
            createdAt: 'now',
            score: 0,
            user: {
              image: {
                png: this.currentUser.image.png,
                webp: this.currentUser.image.webp,
              },
              username: this.currentUser.username,
            },
            replyingTo: item.replyingTo,
          });
          this.idCounter++;
          localStorage.setItem('idCounter', JSON.stringify(this.idCounter));
          this.idCounter = JSON.parse(localStorage.getItem('idCounter')!);

          localStorage.setItem('comments', JSON.stringify(this.comments));
          this.comments = JSON.parse(localStorage.getItem('comments')!);
          console.log(this.comments);
        }
      }
    }
  }
}
