import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Chart } from 'chart.js/auto';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize yearSelected correctly', () => {
    const currentYear = new Date().getFullYear().toString();
    const expectedYear = component.data.some(year => year.year === currentYear) ? currentYear : String(Number(currentYear) - 1);
    expect(component.yearSelected).toBe(expectedYear);
  });

  it('should calculate annual values correctly', () => {
    component.year = component.data.find(year => year.year === '2024'); // Use sample data
    component.calculateAnnualValues();

    expect(component.valueAnualTotalIngresos).toBeGreaterThan(0);
    expect(component.valueAnualTotalGastosE).toBeGreaterThan(0);
    expect(component.valueAnualTotalGastosNoE).toBeGreaterThan(0);
    expect(component.valueAnualTotalRestante).toBe(component.valueAnualTotalIngresos - (component.valueAnualTotalGastosE + component.valueAnualTotalGastosNoE));
  });

  it('should update charts when year changes', () => {
    const initialYear = component.yearSelected;
    const newYear = component.data.find(year => year.year !== initialYear)?.year;
    if (newYear) {
      component.onYearChange(newYear);
      expect(component.yearSelected).toBe(newYear);
      expect(component.chartIngresos.data).toBeDefined();
      expect(component.chartGastos.data).toBeDefined();
      expect(component.chartTotales.data).toBeDefined();
    }
  });

  it('should return correct arrow icon', () => {
    const upIcon = component.getArrowIcon(200, 100);
    const downIcon = component.getArrowIcon(100, 200);
    const noChangeIcon = component.getArrowIcon(100, 100);

    expect(upIcon).toBe('assets/img/flecha-up.svg');
    expect(downIcon).toBe('assets/img/flecha-down.svg');
    expect(noChangeIcon).toBe('assets/img/flecha-no.svg');
  });
});
