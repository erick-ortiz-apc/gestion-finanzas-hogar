import { Component } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  notifications: string[] = [];

  constructor(private notificationService: NotificationService) {
    this.loadNotifications();
  }

  loadNotifications() {
    // this.notifications = this.notificationService.getNotifications();
  }

  showAlert(message: string) {
    // this.notificationService.sendNotification(message);
    this.loadNotifications();
  }

  clearNotifications() {
    this.notificationService.clearNotifications();
    this.loadNotifications();
  }
}