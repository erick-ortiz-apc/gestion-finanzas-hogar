import { AfterViewInit, Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { IUserByPk } from "src/app/interfaces/user.interface";
import { ContextUserService } from "src/app/services/context/context-user.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, AfterViewInit {
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
  isGuest: boolean;

  constructor(
    private readonly _router: Router,
    private readonly _contextUser: ContextUserService
  ) { }

  ngOnInit() {
    this.initializeUserContext();
    this.definirSeleccionActualSidebar();
  }


  /**
 * Observa cambios en el contexto del usuario y actualiza el estado `isGuest`.
 * 
 * @description Este método suscribe al Observable proporcionado por el servicio `_contextUser`
 * para escuchar cambios en la información del usuario bajo la clave `"user"`. 
 * Si la información del usuario está disponible, actualiza la propiedad `isGuest` 
 * basada en el campo `usGuest` del usuario. En caso contrario, establece `isGuest` en `false`.
 * 
 * @returns {void}
 */
  initializeUserContext(): void {
    this._contextUser.watch("user").subscribe((res: IUserByPk) => {
      if (res) {
        this.isGuest = res?.user?.usGuest ?? false;
      } else {
        this.isGuest = false;
      }
    });
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
    if (this.isGuest) return;
    const currentRoute = this._router.url;
    console.log('Ruta actual:', currentRoute);

    if (currentRoute === '/private/home') {
      console.log('home');
      this.selectOptionSidebar('home');
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
    if (this.isGuest) return;
    switch (option) {
      case 'home':
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
}


