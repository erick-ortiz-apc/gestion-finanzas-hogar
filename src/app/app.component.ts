import { IndicadoresService } from './services/indicadores.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestion-finanzas-hogar';
  currentUrl: any = '';
  sidebarWidth: number = 60;
  sidebarComprimido: boolean = true;

  activeDashboard: boolean = true;
  activeMantenedorUsuarios: boolean = false;
  activeFactorCorreccion: boolean = false;
  activeHistorialActividades: boolean = false;
  activeAperturaExclusion: boolean = false;
  activeCierreClientes: boolean = false;
  activeContabilizar: boolean = false;
  activeReporteCierreClientes: boolean = false;

  switchDashboard = false;
  switchMantenedorUsuarios = false;
  switchFactorCorreccion = false;
  switchHistorialActividades = false;
  switchCierreClientes = false;
  switchContabilizar = false;
  switchReporteCierreClientes = false;

  fechaActual: Date | null = null;
  ufValue: number | null = null;
  dolarValue: number | null = null;

  constructor(
    private readonly _router: Router,
    private readonly _indicadoresService: IndicadoresService
  ) { }
  
  ngOnInit() {
    this.fetchIndicatorValues();
    this.definirSeleccionActualSidebar();
  }

  ngAfterViewInit() {
    this._router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.url;
        console.log('URL actual:', this.currentUrl);
        this.definirSeleccionActualSidebar();
      });
  }

  expandSidebar() {
    this.sidebarWidth = 285;
    this.sidebarComprimido = false;
  }

  collapseSidebar() {
    this.sidebarWidth = 60;
    setTimeout(() => { this.sidebarComprimido = true; }, 300);
  }

  definirSeleccionActualSidebar() {
    const currentRoute = this._router.url;
    console.log('Ruta actual:', currentRoute);

    if (currentRoute === '/private/dashboard') {
      console.log('dashboard');
      this.selectOptionSidebar('dashboard');
    } else if (currentRoute === '/private/listado-mantenedor-usuarios') {
      this.selectOptionSidebar('mantenedorUsuarios');
    } else if (currentRoute.includes('/private/gestionar-usuario')) {
      this.selectOptionSidebar('mantenedorUsuarios');
    } else if (currentRoute === '/private/listado-factor-correccion') {
      this.selectOptionSidebar('factorCorreccion');
    } else if (currentRoute === '/private/listado-historial-actividades') {
      this.selectOptionSidebar('historialActividades');
    } else if (currentRoute === '/private/listado-apertura-exclusion') {
      this.selectOptionSidebar('aperturaExclusion');
    } else if (currentRoute.includes('/private/ver-proceso-apertura-exclusion')) {
      this.selectOptionSidebar('aperturaExclusion');
    } else if (currentRoute === '/private/listado-cierre-clientes') {
      this.selectOptionSidebar('cierreClientes');
    } else if (currentRoute === '/private/gestionar-proceso-cierre-cliente') {
      this.selectOptionSidebar('cierreClientes');
    } else if (currentRoute.includes('/private/ver-proceso-cierre-cliente')) {
      this.selectOptionSidebar('cierreClientes');
    } else if (currentRoute.includes('/private/gestionar-cierre-cliente')) {
      this.selectOptionSidebar('cierreClientes');
    } else if (currentRoute === '/private/listado-contabilizar') {
      this.selectOptionSidebar('contabilizar');
    } else if (currentRoute === '/private/listado-reporte-cierre-clientes') {
      this.selectOptionSidebar('reporteCierreClientes');
    } else {
      console.warn('Ruta no reconocida:', currentRoute);
    }
  }

  selectOptionSidebar(option: any) {
    switch (option) {
      case 'dashboard':
        this.activeDashboard = true;
        this.activeMantenedorUsuarios = false;
        this.activeFactorCorreccion = false;
        this.activeHistorialActividades = false;
        this.activeAperturaExclusion = false;
        this.activeCierreClientes = false;
        this.activeContabilizar = false;
        this.activeReporteCierreClientes = false;
        break;
      case 'mantenedorUsuarios':
        this.activeDashboard = false;
        this.activeMantenedorUsuarios = true;
        this.activeFactorCorreccion = false;
        this.activeHistorialActividades = false;
        this.activeAperturaExclusion = false;
        this.activeCierreClientes = false;
        this.activeContabilizar = false;
        this.activeReporteCierreClientes = false;
        break;
      case 'factorCorreccion':
        this.activeDashboard = false;
        this.activeMantenedorUsuarios = false;
        this.activeFactorCorreccion = true;
        this.activeHistorialActividades = false;
        this.activeAperturaExclusion = false;
        this.activeCierreClientes = false;
        this.activeContabilizar = false;
        this.activeReporteCierreClientes = false;
        break;
      case 'historialActividades':
        this.activeDashboard = false;
        this.activeMantenedorUsuarios = false;
        this.activeFactorCorreccion = false;
        this.activeHistorialActividades = true;
        this.activeAperturaExclusion = false;
        this.activeCierreClientes = false;
        this.activeContabilizar = false;
        this.activeReporteCierreClientes = false;
        break;
      case 'cierreClientes':
        this.activeDashboard = false;
        this.activeMantenedorUsuarios = false;
        this.activeFactorCorreccion = false;
        this.activeHistorialActividades = false;
        this.activeAperturaExclusion = false;
        this.activeCierreClientes = true;
        this.activeContabilizar = false;
        this.activeReporteCierreClientes = false;
        break;
      case 'contabilizar':
        this.activeDashboard = false;
        this.activeMantenedorUsuarios = false;
        this.activeFactorCorreccion = false;
        this.activeHistorialActividades = false;
        this.activeAperturaExclusion = false;
        this.activeCierreClientes = false;
        this.activeContabilizar = true;
        this.activeReporteCierreClientes = false;
        break;
      case 'reporteCierreClientes':
        this.activeDashboard = false;
        this.activeMantenedorUsuarios = false;
        this.activeFactorCorreccion = false;
        this.activeHistorialActividades = false;
        this.activeAperturaExclusion = false;
        this.activeCierreClientes = false;
        this.activeContabilizar = false;
        this.activeReporteCierreClientes = true;
        break;
      default:
        console.warn('Opción no reconocida:', option);
        break;
    }
  }

  cambarColorIcono(value: any, option: any) {
    switch (option) {
      case 'dashboard':
        this.switchDashboard = !value;
        break;
      case 'mantenedorUsuarios':
        this.switchMantenedorUsuarios = !value;
        break;
      case 'factorCorreccion':
        this.switchFactorCorreccion = !value;
        break;
      case 'historialActividades':
        this.switchHistorialActividades = !value;
        break;
      case 'cierreClientes':
        this.switchCierreClientes = !value;
        break;
      case 'contabilizar':
        this.switchContabilizar = !value;
        break;
      case 'reporteCierreClientes':
        this.switchReporteCierreClientes = !value;
        break;
      default:
        break;
    }
  }

  fetchIndicatorValues(): void {
    this._indicadoresService.getIndicadores().subscribe({
      next: (response) => {
        if (response) {
          console.log('Respuesta de la API:', response);
          this.fechaActual = new Date();
          this.ufValue = response.uf.valor;
          this.dolarValue = response.dolar.valor;
        }
      },
      error: (error) => {
        console.error('Error al obtener los indicadores:', error);
      }
    });
  }
}