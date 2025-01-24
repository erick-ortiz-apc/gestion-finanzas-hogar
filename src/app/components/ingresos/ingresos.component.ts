import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  disabledBtnAdd: boolean = false;
  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  data: any[] = [
    {
      id: 1,
      hidden_details: true,
      hidden_edit_view: true,
      hidden_delete_view: true,
      hidden_message_error: true,
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
      hidden_edit_view: true,
      hidden_delete_view: true,
      hidden_message_error: true,
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
      hidden_edit_view: true,
      hidden_delete_view: true,
      hidden_message_error: true,
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
      hidden_edit_view: true,
      hidden_delete_view: true,
      hidden_message_error: true,
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
      hidden_edit_view: true,
      hidden_delete_view: true,
      hidden_message_error: true,
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
    private readonly _formBuilder: FormBuilder,
    private readonly _toastrService: ToastrService,
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
    this.data.sort((a, b) => b.year - a.year);
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
      let newIngreso = {
        id: (this.data.length + 1),
        hidden_details: true,
        hidden_edit_view: true,
        hidden_delete_view: true,
        hidden_message_error: true,
        year: Number(this.ingresoForm.controls['ingresoPeriodo'].value),
        income_details: {
          income_name: this.ingresoForm.controls['ingresoNombre'].value,
          monthly_income: [
            { month: "Enero", amount: 0 },
            { month: "Febrero", amount: 0 },
            { month: "Marzo", amount: 0 },
            { month: "Abril", amount: 0 },
            { month: "Mayo", amount: 0 },
            { month: "Junio", amount: 0 },
            { month: "Julio", amount: 0 },
            { month: "Agosto", amount: 0 },
            { month: "Septiembre", amount: 0 },
            { month: "Octubre", amount: 0 },
            { month: "Noviembre", amount: 0 },
            { month: "Diciembre", amount: 0 }
          ]
        }
      }
      const montoAnual = this.ingresoForm.controls['ingresoTodosMeses'].value == '' ? 0 : this.ingresoForm.controls['ingresoTodosMeses'].value;

      if (this.ingresoForm.controls['ingresoTodosMeses'].value) {
        if (montoAnual > 0) {
          newIngreso.income_details.monthly_income.forEach((mes) =>{
            mes.amount = Number(this.ingresoForm.controls['ingresoMonto'].value);
          });
          this.data.push(newIngreso);
          this.data.sort((a, b) => b.year - a.year);
          this.cancelForm();
          this._toastrService.success('Ingreso añadido correctamente.', 'Gestión de Ingresos');
        } else {
          let hayMontos = false;
          this.meses.forEach((mes) => {
            if (this.ingresoForm.controls[`ingreso${mes}`].value > 0) {
              hayMontos = true;
            }
          });

          if (hayMontos) {

          } else {
            this.hiddenErroMessage = false;
          }
        }
      } else {
      }
    } else {
      this.hiddenErroMessage = false;
    }
  }

  editIncome(id: any) {
    const element = this.data.find(item => item.id === id);
    if (element) {
      element.hidden_edit_view = false;
      this.cancelForm();
      this.disabledBtnAdd = true;
      element.income_details.monthly_income.forEach((income: any) => {
        this.ingresoForm.controls[`ingreso${income.month}`].setValue(income.amount);
      });
    }
  }

  deleteIncome(id: any) {
    const element = this.data.find(item => item.id === id);
    if (element) {
      element.hidden_delete_view = false;
      this.cancelForm();
      this.disabledBtnAdd = true;
    }
  }

  viewForm() {
    this.hiddenForm = false;
  }

  cleanError() {
    this.hiddenErroMessage = true;
  }

  cancelForm() {
    this.hiddenErroMessage = true;
    this.hiddenForm = true;
    this.disabledBtnAdd = false;
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

  cancelEdit(id: any) {
    const element = this.data.find(item => item.id === id);
    if (element) {
      element.hidden_edit_view = true;
      element.hidden_message_error = true;
    }
    this.cancelForm();
  }

  acceptEdit(id: any) {
    const element = this.data.find(item => item.id === id);
    if (element) {
      let hayMontos = false;
      this.meses.forEach((mes) => {
        if (this.ingresoForm.controls[`ingreso${mes}`].value > 0) {
          hayMontos = true;
        }
      });
      if (hayMontos) {
        element.hidden_edit_view = true;
        element.hidden_message_error = true;
        this.meses.forEach((mes) => {
          const itemEdit = element.income_details.monthly_income.find((income: any) => income.month === mes);
          if (itemEdit) {
            itemEdit.amount = (this.ingresoForm.controls[`ingreso${mes}`].value == ''
            || this.ingresoForm.controls[`ingreso${mes}`].value == null)
            ? 0 : this.ingresoForm.controls[`ingreso${mes}`].value;
          }
        });
        this.disabledBtnAdd = false;
        this._toastrService.success('Ingreso editado correctamente.', 'Gestión de Ingresos');
      } else {
        element.hidden_message_error = false;
      }
    }
  }

  hiddenMessageError(id: any) {
    const element = this.data.find(item => item.id === id);
    if (element) {
      element.hidden_message_error = true;
    }
  }

  cancelDelete(id: any) {
    const element = this.data.find(item => item.id === id);
    if (element) {
      element.hidden_delete_view = true;
    }
    this.disabledBtnAdd = false;
  }

  acceptDelete(id: any) {
    this.data = this.data.filter(item => item.id !== id);
    this.data.sort((a, b) => b.year - a.year);
    this.disabledBtnAdd = false;
    this._toastrService.success('Ingreso eliminado correctamente.', 'Gestión de Ingresos');
  }
}