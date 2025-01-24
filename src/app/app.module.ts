import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LocaleFormatPipe } from './pipes/locale-format.pipe';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OdometerComponent } from './components/odometer/odometer.component';
import { IngresosComponent } from './components/ingresos/ingresos.component';
import { GastosComponent } from './components/gastos/gastos.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { MaterialModule } from './material.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IngresosComponent,
    GastosComponent,
    PagosComponent,
    LocaleFormatPipe,
    OdometerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbDropdownModule,
    MaterialModule,
    RouterModule.forRoot([]),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      preventDuplicates: true,
      closeButton: true
    }),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
