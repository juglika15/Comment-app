import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import dataJSON from '../data.json';
import {
  AddReply,
  Comment,
  CurrentUser,
  ReplyType,
} from './app.component.model';

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
    localStorage.getItem('idCounter') || JSON.stringify(7)
  );

  updateLocalStorage() {
    localStorage.setItem('idCounter', JSON.stringify(this.idCounter));
    this.idCounter = JSON.parse(localStorage.getItem('idCounter')!);

    localStorage.setItem('comments', JSON.stringify(this.comments));
    this.comments = JSON.parse(localStorage.getItem('comments')!);
    console.log(this.comments);
  }

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
      this.updateLocalStorage();
    }
  }

  addReplyHandler(item: AddReply) {
    if (item.reply !== `@${item.replyingTo} `) {
      const replyObj = {
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
      };
      if (item.replyType === ReplyType.Commnet) {
        this.comments[item.index].replies.push(replyObj);
      }
      if (item.replyType === ReplyType.Reply) {
        for (const comment of this.comments) {
          if (comment.replies[item.index]?.id === item.id) {
            comment.replies.push(replyObj);
          }
        }
      }
      this.idCounter++;
      this.updateLocalStorage();
    }
  }

  updateTextHandler(content: string) {
    if (content) {
      this.updateLocalStorage();
    }
  }

  deleteHandler(index: number) {
    this.comments.splice(index, 1);
    this.updateLocalStorage();
  }

  deleteRepHandler(item: any) {
    for (const comment of this.comments) {
      if (comment.id === item.id) {
        comment.replies.splice(item.index, 1);
      }
    }
    this.updateLocalStorage();
  }

  scoreMinusHandler(index: number) {
    this.comments[index].score--;
    this.comments.sort((a: Comment, b: Comment) => b.score - a.score);
    this.updateLocalStorage();
  }
  scorePlusHandler(index: number) {
    this.comments[index].score++;
    this.comments.sort((a: Comment, b: Comment) => b.score - a.score);
    this.updateLocalStorage();
  }
}
