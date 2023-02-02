import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import dataJSON from '../data.json';
import {
  AddReply,
  Comment,
  CurrentUser,
  ContentType,
  DeleteContent,
  ScoreChange,
  ScoreChangeType,
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
    localStorage.getItem('idCounter') || JSON.stringify(5)
  );

  updateLocalStorage() {
    localStorage.setItem('idCounter', JSON.stringify(this.idCounter));
    this.idCounter = JSON.parse(localStorage.getItem('idCounter')!);

    localStorage.setItem('comments', JSON.stringify(this.comments));
    this.comments = JSON.parse(localStorage.getItem('comments')!);
  }

  timestamp = new Date();

  addCommentHandler(input: string) {
    if (input) {
      this.comments.push({
        id: this.idCounter,
        content: input,
        createdAt: this.timestamp.toLocaleString(),
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
        createdAt: this.timestamp.toLocaleString(),
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
      if (item.contentType === ContentType.Commnet) {
        this.comments[item.index].replies.push(replyObj);
      }
      if (item.contentType === ContentType.Reply) {
        this.comments
          .find((comment) => comment.replies.find((reply) => reply?.id))
          ?.replies.push(replyObj);
        // for (const comment of this.comments) {
        //   if (comment.replies[item.index]?.id === item.id) {
        //     comment.replies.push(replyObj);
        //   }
        // }
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

  deleteHandler(item: DeleteContent) {
    if (item.contentType === ContentType.Commnet) {
      this.comments.splice(item.index, 1);
    }
    if (item.contentType === ContentType.Reply) {
      this.comments
        .find((comment) =>
          comment.replies.find((reply) => reply?.id === item.id)
        )
        ?.replies.splice(item.index, 1);
      // for (const comment of this.comments) {
      //   if (comment.replies[item.index]?.id === item.id) {
      //     comment.replies.splice(item.index, 1);
      //   }
      // }
    }
    this.updateLocalStorage();
  }

  scoreChangeHandler(item: ScoreChange) {
    if (item.contentType === ContentType.Reply) {
      for (const comment of this.comments) {
        if (comment.replies[item.index]?.id === item.id) {
          if (item.type === ScoreChangeType.Minus) {
            comment.replies[item.index].score--;
          }
          if (item.type === ScoreChangeType.Plus) {
            comment.replies[item.index].score++;
          }
        }
      }
    }

    if (item.contentType === ContentType.Commnet) {
      if (item.type === ScoreChangeType.Minus) {
        this.comments[item.index].score--;
      }
      if (item.type === ScoreChangeType.Plus) {
        this.comments[item.index].score++;
      }
      this.comments.sort((a: Comment, b: Comment) => b.score - a.score);
    }
    this.updateLocalStorage();
  }
}
