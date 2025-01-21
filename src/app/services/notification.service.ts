import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: { message: string; type: string; date: Date }[] = [];

  constructor() {}

  sendNotification(message: string, type: string) {
    const notification = {
      message,
      type,
      date: new Date()
    };
    this.notifications.push(notification);
  }

  clearNotifications() {
    this.notifications = [];
  }

  getNotifications() {
    return this.notifications;
  }
}