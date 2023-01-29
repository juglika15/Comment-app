import { Injectable } from '@angular/core';
import dataJSON from '../data.json';
import { Comment, CurrentUser } from './app.component.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // comments: Array<Comment> = JSON.parse(
  //   localStorage.getItem('comments') || JSON.stringify(dataJSON.comments)
  // );
  // currentUser: CurrentUser = JSON.parse(
  //   localStorage.getItem('currentUser') || JSON.stringify(dataJSON.currentUser)
  // );
  // idCounter: number = JSON.parse(
  //   //
  //   //
  //   //
  //   localStorage.getItem('idCounter') || JSON.stringify(7)
  // );
  // updateLocalStorage() {
  //   localStorage.setItem('idCounter', JSON.stringify(this.idCounter));
  //   this.idCounter = JSON.parse(localStorage.getItem('idCounter')!);
  //   localStorage.setItem('comments', JSON.stringify(this.comments));
  //   this.comments = JSON.parse(localStorage.getItem('comments')!);
  //   console.log(this.comments);
  // }
}
