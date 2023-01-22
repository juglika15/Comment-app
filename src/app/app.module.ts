import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { FormsModule } from '@angular/forms';
import { AttachCommentsComponent } from './attach-comments/attach-comments.component';
import { AttachRepliesComponent } from './attach-comments/attach-replies/attach-replies.component';

@NgModule({
  declarations: [AppComponent, AddCommentComponent, AttachCommentsComponent, AttachRepliesComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
