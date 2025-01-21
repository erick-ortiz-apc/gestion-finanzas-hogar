import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from './notificaciones.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    NotificacionesComponent
  ],
  exports: [
    NotificacionesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MaterialModule
  ]
})
export class NotificacionesModule { }
