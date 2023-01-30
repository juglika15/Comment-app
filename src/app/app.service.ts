import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  date: any = new Date();

  getTimeDifference(creditedAt: string, id: number) {
    setInterval(() => {
      this.date = new Date();
    }, 60000);
    if (id > 4) {
      const time: any = new Date(creditedAt);
      if ((this.date - time) / (1000 * 60) < 1) {
        return 'few seconds ago';
      }
      if ((this.date - time) / (1000 * 60) >= 60) {
        return `${Math.floor((this.date - time) / (1000 * 60 * 60))} hour ago`;
      }
      if ((this.date - time) / (1000 * 60) >= 120) {
        return `${Math.floor((this.date - time) / (1000 * 60 * 60))} hours ago`;
      }
      return `${Math.floor((this.date - time) / (1000 * 60))} minutes ago`;
    }
    return creditedAt;
  }
}
