import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {
  ingresoForm!: FormGroup;
  hiddenForm: boolean = true;
  hiddenMonths: boolean = true;
  montoProvisorio: number = 0;
  hiddenErroMessage: boolean = true;
  
  data = [
    {
      id: 1,
      hidden_details: true,
      year: 2022,
      income_details: {
        income_name: "Ingreso por remuneracion Erick",
        monthly_income: [
          { month: "Enero", amount: 1000000 },
          { month: "Febrero", amount: 1000000 },
          { month: "Marzo", amount: 1000000 },
          { month: "Abril", amount: 1000000 },
          { month: "Mayo", amount: 1000000 },
          { month: "Junio", amount: 1000000 },
          { month: "Julio", amount: 1000000 },
          { month: "Agosto", amount: 1000000 },
          { month: "Septiembre", amount: 1000000 },
          { month: "Octubre", amount: 1000000 },
          { month: "Noviembre", amount: 1000000 },
          { month: "Diciembre", amount: 1000000 }
        ]
      }
    },    
    {
      id: 2,
      hidden_details: true,
      year: 2023,
      income_details: {
        income_name: "Ingreso por remuneracion Erick",
        monthly_income: [
          { month: "Enero", amount: 1000000 },
          { month: "Febrero", amount: 1000000 },
          { month: "Marzo", amount: 1000000 },
          { month: "Abril", amount: 1000000 },
          { month: "Mayo", amount: 1000000 },
          { month: "Junio", amount: 1000000 },
          { month: "Julio", amount: 1000000 },
          { month: "Agosto", amount: 1000000 },
          { month: "Septiembre", amount: 1000000 },
          { month: "Octubre", amount: 1000000 },
          { month: "Noviembre", amount: 1000000 },
          { month: "Diciembre", amount: 1000000 }
        ]
      }
    },    
    {
      id: 3,
      hidden_details: true,
      year: 2024,
      income_details: {
        income_name: "Ingreso por remuneracion Conny",
        monthly_income: [
          { month: "Enero", amount: 1000000 },
          { month: "Febrero", amount: 1000000 },
          { month: "Marzo", amount: 1000000 },
          { month: "Abril", amount: 1000000 },
          { month: "Mayo", amount: 1000000 },
          { month: "Junio", amount: 1000000 },
          { month: "Julio", amount: 1000000 },
          { month: "Agosto", amount: 1000000 },
          { month: "Septiembre", amount: 1000000 },
          { month: "Octubre", amount: 1000000 },
          { month: "Noviembre", amount: 1000000 },
          { month: "Diciembre", amount: 1000000 }
        ]
      }
    },    
    {
      id: 4,
      hidden_details: true,
      year: 2024,
      income_details: {
        income_name: "Ingreso por remuneracion Erick",
        monthly_income: [
          { month: "Enero", amount: 1000000 },
          { month: "Febrero", amount: 1000000 },
          { month: "Marzo", amount: 1000000 },
          { month: "Abril", amount: 1000000 },
          { month: "Mayo", amount: 1000000 },
          { month: "Junio", amount: 1000000 },
          { month: "Julio", amount: 1000000 },
          { month: "Agosto", amount: 1000000 },
          { month: "Septiembre", amount: 1000000 },
          { month: "Octubre", amount: 1000000 },
          { month: "Noviembre", amount: 1000000 },
          { month: "Diciembre", amount: 1000000 }
        ]
      }
    },    
    {
      id: 5,
      hidden_details: true,
      year: 2025,
      income_details: {
        income_name: "Ingreso por remuneracion Erick",
        monthly_income: [
          { month: "Enero", amount: 1000000 },
          { month: "Febrero", amount: 1000000 },
          { month: "Marzo", amount: 1000000 },
          { month: "Abril", amount: 1000000 },
          { month: "Mayo", amount: 1000000 },
          { month: "Junio", amount: 1000000 },
          { month: "Julio", amount: 1000000 },
          { month: "Agosto", amount: 1000000 },
          { month: "Septiembre", amount: 1000000 },
          { month: "Octubre", amount: 1000000 },
          { month: "Noviembre", amount: 1000000 },
          { month: "Diciembre", amount: 1000000 }
        ]
      }
    },    
  ];

  constructor(
    private readonly _formBuilder: FormBuilder
  ) {
    this.ingresoForm = this._formBuilder.group({
      ingresoNombre: ['', Validators.required],
      ingresoPeriodo: [''],
      ingresoMonto: ['', Validators.required],
      ingresoTodosMeses: [true],
      ingresoEnero: [''],
      ingresoFebrero: [''],
      ingresoMarzo: [''],
      ingresoAbril: [''],
      ingresoMayo: [''],
      ingresoJunio: [''],
      ingresoJulio: [''],
      ingresoAgosto: [''],
      ingresoSeptiembre: [''],
      ingresoOctubre: [''],
      ingresoNoviembre: [''],
      ingresoDiciembre: [''],
    });
  }

  ngOnInit() {
  }

  onSwitchChange(event: any) {
    this.ingresoForm.patchValue({ ingresoTodosMeses: event.target.checked });
    this.hiddenMonths = event.target.checked;
    console.log(this.ingresoForm.value);
    if (event.target.checked) {
      this.ingresoForm.patchValue({ ingresoMonto: this.montoProvisorio });
      this.ingresoForm.controls['ingresoMonto'].enable();
    } else {
      this.montoProvisorio = this.ingresoForm.value.ingresoMonto;
      this.ingresoForm.patchValue({ ingresoEnero: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoFebrero: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoMarzo: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoAbril: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoMayo: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoJunio: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoJulio: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoAgosto: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoSeptiembre: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoOctubre: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoNoviembre: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoDiciembre: this.ingresoForm.value.ingresoMonto });
      this.ingresoForm.patchValue({ ingresoMonto: '' });
      this.ingresoForm.controls['ingresoMonto'].disable();
    }
  }

  createNewIncome() {
    if (this.ingresoForm.valid) {
      const montoAnual = this.ingresoForm.controls['ingresoTodosMeses'].value == '' ? 0 : this.ingresoForm.controls['ingresoTodosMeses'].value;

      if (this.ingresoForm.controls['ingresoTodosMeses'].value) {
        if (montoAnual > 0) {
          
        } else {
          this.hiddenErroMessage = false;
        }
      } else {
      }
    } else {
      this.hiddenErroMessage = false;
    }
  }

  cleanError() {
    this.hiddenErroMessage = true;
  }

  cancelForm() {
    this.hiddenErroMessage = true;
    this.hiddenForm = true;
    this.ingresoForm.patchValue({
      ingresoNombre: '',
      ingresoPeriodo: '',
      ingresoMonto: '',
      ingresoTodosMeses: true,
      ingresoEnero: '',
      ingresoFebrero: '',
      ingresoMarzo: '',
      ingresoAbril: '',
      ingresoMayo: '',
      ingresoJunio: '',
      ingresoJulio: '',
      ingresoAgosto: '',
      ingresoSeptiembre: '',
      ingresoOctubre: '',
      ingresoNoviembre: '',
      ingresoDiciembre: '',
    });
  }
}