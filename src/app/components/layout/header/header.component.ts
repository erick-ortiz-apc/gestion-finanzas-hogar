import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebServiceWorker } from '../../../services/web-service-worker.service';
import { AuthenticationService } from '../../auth/service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @Output() activeNotificaciones = new EventEmitter<boolean>();
  @Input() nroNotificacionesNoLeidas = 0;
  currentUser: any;
  verNotificaciones: boolean = false;
  newAppUpdateAvailableSubscription: any;
  isNewAppVersionAvailable: boolean = false;

  constructor(
    private readonly webServiceWorker: WebServiceWorker,
    private readonly _authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.currentUser = this._authenticationService.currentUserValue;
  }

  toggleNotificaciones() {
    this.verNotificaciones = !this.verNotificaciones;
    this.activeNotificaciones.emit(this.verNotificaciones);
  }

  ngOnDestroy(): void {
    this.newAppUpdateAvailableSubscription?.unsubscribe();
  }

  checkIfAppUpdated() {
    this.newAppUpdateAvailableSubscription = this.webServiceWorker.$isAnyNewUpdateAvailable.subscribe((versionAvailableFlag: boolean) => {
      this.isNewAppVersionAvailable = versionAvailableFlag;
    });
  }

  refreshApp() {
    window.location.reload();
  }
}
