import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Router } from '@angular/router';
import { WebServiceWorker } from '../../../services/web-service-worker.service';
import { KeycloakService } from '../../../services/keycloak.service';
import { of, BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockKeycloakService: jasmine.SpyObj<KeycloakService>;
  let mockWebServiceWorker: jasmine.SpyObj<WebServiceWorker>;
  let updateSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    // Crear mocks de dependencias
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockKeycloakService = jasmine.createSpyObj('KeycloakService', ['logout']);
    mockWebServiceWorker = jasmine.createSpyObj('WebServiceWorker', ['']);
    
    // Inicializamos el BehaviorSubject para simular el observable con comportamiento
    updateSubject = new BehaviorSubject<boolean>(false);
    mockWebServiceWorker.$isAnyNewUpdateAvailable = updateSubject; // Asignamos el BehaviorSubject

    // Configurar el TestBed
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: KeycloakService, useValue: mockKeycloakService },
        { provide: WebServiceWorker, useValue: mockWebServiceWorker }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize user data and nameUser correctly', () => {
      localStorage.setItem('currentUser', JSON.stringify({ firstName: 'John', lastName: 'Doe' }));
      component.ngOnInit();
      expect(component.nameUser).toBe('John Doe');
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from subscriptions on component destroy', () => {
      spyOn(component['mouseoverSubscription'], 'unsubscribe');
      spyOn(component.newAppUpdateAvailableSubscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(component['mouseoverSubscription'].unsubscribe).toHaveBeenCalled();
      expect(component.newAppUpdateAvailableSubscription.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should call logout on keycloakService', () => {
      component.logout();
      expect(mockKeycloakService.logout).toHaveBeenCalled();
    });
  });

  describe('openNotificaciones', () => {
    it('should throw an error as it is not implemented', () => {
      expect(() => component.openNotificaciones()).toThrowError('Method not implemented.');
    });
  });

  describe('checkIfAppUpdated', () => {
    it('should set isNewAppVersionAvailable based on the value from webServiceWorker', fakeAsync(() => {
      component.checkIfAppUpdated();
      updateSubject.next(true);
      tick();
      expect(component.isNewAppVersionAvailable).toBeTrue();
    }));

    it('should handle when no update is available', fakeAsync(() => {
      component.checkIfAppUpdated();
      updateSubject.next(false);
      tick();
      expect(component.isNewAppVersionAvailable).toBeFalse();
    }));
  });

  describe('refreshApp', () => {
    it('should reload the window', () => {
      spyOn(window.location, 'reload');
      component.refreshApp();
      expect(window.location.reload).toHaveBeenCalled();
    });
  });

  describe('onResize', () => {
    it('should set width to 55 when window width is greater than 1190', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1200);
      component.onResize({});
      expect(component.width).toBe(55);
    });

    it('should set width to 0 when window width is less than or equal to 1190', () => {
      spyOnProperty(window, 'innerWidth').and.returnValue(1000);
      component.onResize({});
      expect(component.width).toBe(0);
    });
  });
});
