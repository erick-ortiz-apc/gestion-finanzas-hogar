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
  activeIngresos: boolean = false;
  activeGastos: boolean = false;
  activePagos: boolean = false;

  switchDashboard = false;
  switchIngresos = false;
  switchGastos = false;
  switchPagos = false;

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

    if (currentRoute === '/dashboard') {
      console.log('dashboard');
      this.selectOptionSidebar('dashboard');
    } else if (currentRoute === '/ingresos') {
      this.selectOptionSidebar('ingresos');
    } else if (currentRoute === '/gastos') {
      this.selectOptionSidebar('gastos');
    } else if (currentRoute === '/pagos') {
      this.selectOptionSidebar('pagos');
    } else {
      this.selectOptionSidebar('dashboard');
    }
  }

  selectOptionSidebar(option: any) {
    switch (option) {
      case 'dashboard':
        this.activeDashboard = true;
        this.activeIngresos = false;
        this.activeGastos = false;
        this.activePagos = false;
        break;
      case 'ingresos':
        this.activeDashboard = false;
        this.activeIngresos = true;
        this.activeGastos = false;
        this.activePagos = false;
        break;
      case 'gastos':
        this.activeDashboard = false;
        this.activeIngresos = false;
        this.activeGastos = true;
        this.activePagos = false;    
        break;
      case 'pagos':
        this.activeDashboard = false;
        this.activeIngresos = false;
        this.activeGastos = false;
        this.activePagos = true;
        break;
      default:
        this.activeDashboard = true;
        this.activeIngresos = false;
        this.activeGastos = false;
        this.activePagos = false;
        break;
    }
  }

  cambarColorIcono(value: any, option: any) {
    switch (option) {
      case 'dashboard':
        this.switchDashboard = !value;
        break;
      case 'ingresos':
        this.switchIngresos = !value;
        break;
      case 'gastos':
        this.switchGastos = !value;
        break;
      case 'pagos':
        this.switchPagos = !value;
        break;
      default:
        this.switchDashboard = !value;
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