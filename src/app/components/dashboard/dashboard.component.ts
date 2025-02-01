import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data!: any;
  yearSelected!: any;
  periodList: any[] = [];
  chartIngresos!: Chart;
  chartGastos!: Chart;
  chartTotales!: Chart;
  valueAnualTotalIngresos: number = 0;
  valueAnualTotalGastosE: number = 0;
  valueAnualTotalGastosNoE: number = 0;
  valueAnualTotalRestante: number = 0;
  dataLineIngresos!: any;
  dataLineGastos!: any;
  dataBarTotales!: any;
  optionsLine!: any;
  optionsBar!: any;
  init: boolean = false;
  
  
  constructor(private readonly _dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getAvailablePeriods();
  }

  getAvailablePeriods() {
    this._dashboardService.getAvailablePeriods().subscribe({
      next: async (response) => {
        this.periodList = response;
        this.yearSelected = this.periodList[0];
        await this.getDataDashboard();
        this.init = true;
        console.log(response);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getDataDashboard() {
    return new Promise<void>((resolve, reject) => {
      this._dashboardService.getDataDashboard(this.yearSelected).subscribe({
        next: (response: any) => {
          this.data = response;
          this.calculateAnnualValues();

          if (this.init) {
            this.updateCharts();
          } else {
            this.initCharts();
          }
          console.log(response);
          resolve();
        },
        error: (error: any) => {
          console.log('error:', error);
          reject(error);
        }
      });
    });
  }

  getArrowIcon(current: number, previous: number | null): string {
    if (previous === null) {
      return 'assets/img/flecha-no.svg';
    }
    if (current > previous) {
      return 'assets/img/flecha-up.svg';
    } else if (current < previous) {
      return 'assets/img/flecha-down.svg';
    } else {
      return 'assets/img/flecha-no.svg';
    }
  }
  
  onYearChange(period: any) {
    this.yearSelected = period;
    this.getDataDashboard();
  }
  
  updateCharts() {
    const data1 = {
      labels: this.data?.months.slice(1).map((month: any) => month?.month?.slice(0, 3)),
      datasets: [
        {
          label: 'Ingresos',
          data: this.data?.months.slice(1).map((month: any) => month.totalIncomes),
          backgroundColor: '#00E676',
          borderColor: '#00E676',
          borderWidth: 1
        }
      ]
    };
  
    const data2 = {
      labels: this.data?.months.slice(1).map((month: any) => month?.month?.slice(0, 3)),
      datasets: [
        {
          label: 'Gastos',
          data: this.data?.months.slice(1).map((month: any) => month.totalEssentialExpenses + month.totalNotEssentialExpenses),
          backgroundColor: '#FF1744',
          borderColor: '#FF1744',
          borderWidth: 1
        }
      ]
    };
  
    const data3 = {
      labels: this.data?.months.slice(1).map((month: any) => month?.month?.slice(0, 3)),
      datasets: [
        {
          label: 'Ingresos',
          data: this.data?.months.slice(1).map((month: any) => month.totalIncomes),
          backgroundColor: '#00E676',
          borderColor: '#00E676',
          borderWidth: 1
        },
        {
          label: 'Gastos Esenciales',
          data: this.data?.months.slice(1).map((month: any) => month.totalEssentialExpenses),
          backgroundColor: '#FF1744',
          borderColor: '#FF1744',
          borderWidth: 1
        },
        {
          label: 'Gastos No Esenciales',
          data: this.data?.months.slice(1).map((month: any) => month.totalNotEssentialExpenses),
          backgroundColor: '#FFD700',
          borderColor: '#FFD700',
          borderWidth: 1
        }
      ]
    };
  
    this.chartIngresos.data = data1;
    this.chartIngresos.update();
  
    this.chartGastos.data = data2;
    this.chartGastos.update();
  
    this.chartTotales.data = data3;
    this.chartTotales.update();
  }

  calculateAnnualValues() {
    const totalIncomes = this.data?.months.reduce((acc: any, month: any) => acc + month.totalIncomes, 0);
    const totalEssentialExpenses = this.data?.months.reduce((acc: any, month: any) => acc + month.totalEssentialExpenses, 0);
    const totalNotEssentialExpenses = this.data?.months.reduce((acc: any, month: any) => acc + month.totalNotEssentialExpenses, 0);
    const totalRemaining = totalIncomes - (totalEssentialExpenses + totalNotEssentialExpenses);
  
    this.valueAnualTotalIngresos = totalIncomes;
    this.valueAnualTotalGastosE = totalEssentialExpenses;
    this.valueAnualTotalGastosNoE = totalNotEssentialExpenses;
    this.valueAnualTotalRestante = totalRemaining;
  
    console.log('Totales anuales calculados:', {
      ingresos: this.valueAnualTotalIngresos,
      gastosE: this.valueAnualTotalGastosE,
      gastosNoE: this.valueAnualTotalGastosNoE,
      restante: this.valueAnualTotalRestante
    });
  }

  initCharts() {
    this.dataLineIngresos = {
      labels: this.data?.months.slice(1).map((month: any) => month?.month?.slice(0, 3)),
      datasets: [
        {
          label: 'Ingresos',
          data: this.data?.months.slice(1).map((month: any) => month.totalIncomes),
          backgroundColor: '#00E676',
          borderColor: '#00E676',
          borderWidth: 1
        }
      ]
    };
    
    this.dataLineGastos = {
      labels: this.data?.months.slice(1).map((month: any) => month?.month?.slice(0, 3)),
      datasets: [
        {
          label: 'Gastos',
          data: this.data?.months.slice(1).map((month: any) => month.totalEssentialExpenses + month.totalNotEssentialExpenses),
          backgroundColor: '#FF1744',
          borderColor: '#FF1744',
          borderWidth: 1
        }
      ]
    };

    this.dataBarTotales = {
      labels: this.data?.months.slice(1).map((month: any) => month?.month?.slice(0, 3)),
      datasets: [
        {
          label: 'Ingresos',
          data: this.data?.months.slice(1).map((month: any) => month.totalIncomes),
          backgroundColor: '#00E676',
          borderColor: '#00E676',
          borderWidth: 1
        },
        {
          label: 'Gastos Esenciales',
          data: this.data?.months.slice(1).map((month: any) => month.totalEssentialExpenses),
          backgroundColor: '#FF1744',
          borderColor: '#FF1744',
          borderWidth: 1
        },
        {
          label: 'Gastos No Esenciales',
          data: this.data?.months.slice(1).map((month: any) => month.totalNotEssentialExpenses),
          backgroundColor: '#FFD700',
          borderColor: '#FFD700',
          borderWidth: 1
        }
      ]
    };
    
    this.optionsLine = {
      responsive: true,
      plugins: {
        legend: {
          display: true
        },
        tooltip: {
          backgroundColor: '#121212',
          callbacks: {
            label: function(context: any) {
              const value = context.raw;
              return `Valor: $ ${value.toLocaleString('es-CL')}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value: number | string) {
              if (typeof value === 'number') {
                return `$ ${value.toLocaleString('es-CL')}`;
              }
              return value;
            }
          }
        }
      }
    };
    
    
    this.optionsBar = {
      responsive: true,
      plugins: {
        legend: {
          display: true
        },
        tooltip: {
          backgroundColor: '#121212',
          callbacks: {
            label: function(context: any) {
              const value = context.raw;
              return `Valor: $ ${value.toLocaleString('es-CL')}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function (value: number | string) {
              if (typeof value === 'number') {
                return `$ ${value.toLocaleString('es-CL')}`;
              }
              return value;
            }
          }
        },
        x: {
          stacked: false
        }
      }
    };
  
    this.chartIngresos = new Chart("chartIngresos", {
      type: 'line' as ChartType,
      data: this.dataLineIngresos,
      options: this.optionsLine
    });
  
    this.chartGastos = new Chart("chartGastos", {
      type: 'line' as ChartType,
      data: this.dataLineGastos,
      options: this.optionsLine
    });
  
    this.chartTotales = new Chart("chartTotales", {
      type: 'bar' as ChartType,
      data: this.dataBarTotales,
      options: this.optionsBar
    });
  }
}
