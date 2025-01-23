import { Component, OnInit } from '@angular/core';
import { Chart, ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  year: any = {};
  yearSelected: string = '2024';
  yearsList: string[] = [];
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
  
  data = [
    {
      year: '2022',
      months: [
        { shortName: 'Dic', name: "Diciembre", totalIncome: 1650000, essentialExpenses: 580000, nonEssentialExpenses: 520000 },
        { shortName: 'Ene', name: "Enero", totalIncome: 900000, essentialExpenses: 400000, nonEssentialExpenses: 300000 },
        { shortName: 'Feb', name: "Febrero", totalIncome: 950000, essentialExpenses: 420000, nonEssentialExpenses: 320000 },
        { shortName: 'Mar', name: "Marzo", totalIncome: 1000000, essentialExpenses: 430000, nonEssentialExpenses: 350000 },
        { shortName: 'Abr', name: "Abril", totalIncome: 1050000, essentialExpenses: 450000, nonEssentialExpenses: 360000 },
        { shortName: 'May', name: "Mayo", totalIncome: 1100000, essentialExpenses: 470000, nonEssentialExpenses: 380000 },
        { shortName: 'Jun', name: "Junio", totalIncome: 1150000, essentialExpenses: 480000, nonEssentialExpenses: 400000 },
        { shortName: 'Jul', name: "Julio", totalIncome: 1200000, essentialExpenses: 500000, nonEssentialExpenses: 420000 },
        { shortName: 'Ago', name: "Agosto", totalIncome: 1250000, essentialExpenses: 520000, nonEssentialExpenses: 440000 },
        { shortName: 'Sep', name: "Septiembre", totalIncome: 1300000, essentialExpenses: 530000, nonEssentialExpenses: 450000 },
        { shortName: 'Oct', name: "Octubre", totalIncome: 1350000, essentialExpenses: 540000, nonEssentialExpenses: 470000 },
        { shortName: 'Nov', name: "Noviembre", totalIncome: 1400000, essentialExpenses: 550000, nonEssentialExpenses: 480000 },
        { shortName: 'Dic', name: "Diciembre", totalIncome: 1500000, essentialExpenses: 560000, nonEssentialExpenses: 500000 }
      ]
    },
    {
      year: '2023',
      months: [
        { shortName: 'Dic', name: "Diciembre", totalIncome: 1500000, essentialExpenses: 560000, nonEssentialExpenses: 500000 },
        { shortName: 'Ene', name: "Enero", totalIncome: 1100000, essentialExpenses: 450000, nonEssentialExpenses: 370000 },
        { shortName: 'Feb', name: "Febrero", totalIncome: 1150000, essentialExpenses: 470000, nonEssentialExpenses: 380000 },
        { shortName: 'Mar', name: "Marzo", totalIncome: 1200000, essentialExpenses: 480000, nonEssentialExpenses: 400000 },
        { shortName: 'Abr', name: "Abril", totalIncome: 1250000, essentialExpenses: 490000, nonEssentialExpenses: 410000 },
        { shortName: 'May', name: "Mayo", totalIncome: 1300000, essentialExpenses: 500000, nonEssentialExpenses: 420000 },
        { shortName: 'Jun', name: "Junio", totalIncome: 1350000, essentialExpenses: 510000, nonEssentialExpenses: 430000 },
        { shortName: 'Jul', name: "Julio", totalIncome: 1400000, essentialExpenses: 520000, nonEssentialExpenses: 450000 },
        { shortName: 'Ago', name: "Agosto", totalIncome: 1450000, essentialExpenses: 530000, nonEssentialExpenses: 460000 },
        { shortName: 'Sep', name: "Septiembre", totalIncome: 1500000, essentialExpenses: 540000, nonEssentialExpenses: 470000 },
        { shortName: 'Oct', name: "Octubre", totalIncome: 1550000, essentialExpenses: 550000, nonEssentialExpenses: 480000 },
        { shortName: 'Nov', name: "Noviembre", totalIncome: 1600000, essentialExpenses: 560000, nonEssentialExpenses: 500000 },
        { shortName: 'Dic', name: "Diciembre", totalIncome: 1650000, essentialExpenses: 580000, nonEssentialExpenses: 520000 }
      ]
    },
    {
      year: '2024',
      months: [
        { shortName: 'Dic', name: "Diciembre", totalIncome: 1650000, essentialExpenses: 580000, nonEssentialExpenses: 520000 },
        { shortName: 'Ene', name: "Enero", totalIncome: 1000000, essentialExpenses: 450000, nonEssentialExpenses: 350000 },
        { shortName: 'Feb', name: "Febrero", totalIncome: 1000000, essentialExpenses: 450000, nonEssentialExpenses: 450000 },
        { shortName: 'Mar', name: "Marzo", totalIncome: 1200000, essentialExpenses: 400000, nonEssentialExpenses: 450000 },
        { shortName: 'Abr', name: "Abril", totalIncome: 1300000, essentialExpenses: 390000, nonEssentialExpenses: 500000 },
        { shortName: 'May', name: "Mayo", totalIncome: 1150000, essentialExpenses: 350000, nonEssentialExpenses: 520000 },
        { shortName: 'Jun', name: "Junio", totalIncome: 1350000, essentialExpenses: 360000, nonEssentialExpenses: 500000 },
        { shortName: 'Jul', name: "Julio", totalIncome: 1100000, essentialExpenses: 480000, nonEssentialExpenses: 400000 },
        { shortName: 'Ago', name: "Agosto", totalIncome: 1350000, essentialExpenses: 390000, nonEssentialExpenses: 500000 },
        { shortName: 'Sep', name: "Septiembre", totalIncome: 1100000, essentialExpenses: 370000, nonEssentialExpenses: 500000 },
        { shortName: 'Oct', name: "Octubre", totalIncome: 1300000, essentialExpenses: 250000, nonEssentialExpenses: 600000 },
        { shortName: 'Nov', name: "Noviembre", totalIncome: 1000000, essentialExpenses: 320000, nonEssentialExpenses: 500000 },
        { shortName: 'Dic', name: "Diciembre", totalIncome: 1200000, essentialExpenses: 560000, nonEssentialExpenses: 300000 }
      ]
    },
    {
      year: '2025',
      months: [
        { shortName: 'Dic', name: "Diciembre", totalIncome: 1200000, essentialExpenses: 560000, nonEssentialExpenses: 300000 },
        { shortName: 'Ene', name: "Enero", totalIncome: 1000000, essentialExpenses: 450000, nonEssentialExpenses: 350000 },
        { shortName: 'Feb', name: "Febrero", totalIncome: 1200000, essentialExpenses: 400000, nonEssentialExpenses: 300000 }
      ]
    }
  ];
  
  constructor() {}

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.yearSelected = this.data.some((year: any) => year.year == currentYear) 
      ? String(currentYear)
      : String(currentYear - 1);

    this.year = this.data.find(year => year.year === this.yearSelected)!;
    this.yearsList = this.data
      .map(year => year.year)
      .filter(year => year !== this.yearSelected);

    this.dataLineIngresos = {
      labels: this.year.months.slice(1).map((month: any) => month.shortName),
      datasets: [
        {
          label: 'Ingresos',
          data: this.year.months.slice(1).map((month: any) => month.totalIncome),
          backgroundColor: '#00E676',
          borderColor: '#00E676',
          borderWidth: 1
        }
      ]
    };
    
    this.dataLineGastos = {
      labels: this.year.months.slice(1).map((month: any) => month.shortName),
      datasets: [
        {
          label: 'Gastos',
          data: this.year.months.slice(1).map((month: any) => month.essentialExpenses + month.nonEssentialExpenses),
          backgroundColor: '#FF1744',
          borderColor: '#FF1744',
          borderWidth: 1
        }
      ]
    };

    this.dataBarTotales = {
      labels: this.year.months.map((month: any) => month.shortName),
      datasets: [
        {
          label: 'Ingresos',
          data: this.year.months.map((month: any) => month.totalIncome),
          backgroundColor: '#00E676',
          borderColor: '#00E676',
          borderWidth: 1
        },
        {
          label: 'Gastos Esenciales',
          data: this.year.months.map((month: any) => month.essentialExpenses),
          backgroundColor: '#FF1744',
          borderColor: '#FF1744',
          borderWidth: 1
        },
        {
          label: 'Gastos No Esenciales',
          data: this.year.months.map((month: any) => month.nonEssentialExpenses),
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

    this.calculateAnnualValues();
  } 

  getArrowIcon(current: number, previous: number | null): string {
    if (previous === null) {
      return '/assets/img/flecha-no.svg';
    }
    if (current > previous) {
      return '/assets/img/flecha-up.svg';
    } else if (current < previous) {
      return '/assets/img/flecha-down.svg';
    } else {
      return '/assets/img/flecha-no.svg';
    }
  }
  
  onYearChange(year: any) {
    if (this.yearSelected !== undefined) {
      this.yearsList = [...this.yearsList, this.yearSelected];
      this.yearsList.sort((a: any, b: any) => a - b);
    }
    this.yearSelected = year;
    this.year = this.data.find(y => y.year === this.yearSelected)!;
    this.yearsList = this.yearsList.filter(y => y !== this.yearSelected);
    this.updateCharts();
    this.calculateAnnualValues();
  }
  
  updateCharts() {
    const data1 = {
      labels: this.year.months.slice(1).map((month: any) => month.name),
      datasets: [
        {
          label: 'Ingresos',
          data: this.year.months.slice(1).map((month: any) => month.totalIncome),
          backgroundColor: '#00E676',
          borderColor: '#00E676',
          borderWidth: 1
        }
      ]
    };
  
    const data2 = {
      labels: this.year.months.slice(1).map((month: any) => month.name),
      datasets: [
        {
          label: 'Gastos',
          data: this.year.months.slice(1).map((month: any) => month.essentialExpenses + month.nonEssentialExpenses),
          backgroundColor: '#FF1744',
          borderColor: '#FF1744',
          borderWidth: 1
        }
      ]
    };
  
    const data3 = {
      labels: this.year.months.slice(1).map((month: any) => month.name),
      datasets: [
        {
          label: 'Ingresos',
          data: this.year.months.slice(1).map((month: any) => month.totalIncome),
          backgroundColor: '#00E676',
          borderColor: '#00E676',
          borderWidth: 1
        },
        {
          label: 'Gastos Esenciales',
          data: this.year.months.slice(1).map((month: any) => month.essentialExpenses),
          backgroundColor: '#FF1744',
          borderColor: '#FF1744',
          borderWidth: 1
        },
        {
          label: 'Gastos No Esenciales',
          data: this.year.months.slice(1).map((month: any) => month.nonEssentialExpenses),
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
    const totalIncome = this.year.months.reduce((acc: any, month: any) => acc + month.totalIncome, 0);
    const totalEssentialExpenses = this.year.months.reduce((acc: any, month: any) => acc + month.essentialExpenses, 0);
    const totalNonEssentialExpenses = this.year.months.reduce((acc: any, month: any) => acc + month.nonEssentialExpenses, 0);
    const totalRemaining = totalIncome - (totalEssentialExpenses + totalNonEssentialExpenses);
  
    this.valueAnualTotalIngresos = totalIncome;
    this.valueAnualTotalGastosE = totalEssentialExpenses;
    this.valueAnualTotalGastosNoE = totalNonEssentialExpenses;
    this.valueAnualTotalRestante = totalRemaining;
  
    console.log('Totales anuales calculados:', {
      ingresos: this.valueAnualTotalIngresos,
      gastosE: this.valueAnualTotalGastosE,
      gastosNoE: this.valueAnualTotalGastosNoE,
      restante: this.valueAnualTotalRestante
    });
  }
  
}
  