import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent {
  @Output() closeNotificaciones = new EventEmitter<any>();
  @Input() notificaciones: any[] = [];
}
