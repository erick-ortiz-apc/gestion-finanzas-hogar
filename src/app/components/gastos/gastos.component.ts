import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {
gastoForm!: FormGroup;
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
      expense_details: {
        expense_name: "Gasto por compras Erick",
        essential_expense: true,
        monthly_expense: [
          { month: "Enero", amount: 100000 },
          { month: "Febrero", amount: 100000 },
          { month: "Marzo", amount: 100000 },
          { month: "Abril", amount: 100000 },
          { month: "Mayo", amount: 100000 },
          { month: "Junio", amount: 100000 },
          { month: "Julio", amount: 100000 },
          { month: "Agosto", amount: 100000 },
          { month: "Septiembre", amount: 100000 },
          { month: "Octubre", amount: 100000 },
          { month: "Noviembre", amount: 100000 },
          { month: "Diciembre", amount: 100000 }
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
      expense_details: {
        expense_name: "Gasto por compras Erick",
        essential_expense: false,
        monthly_expense: [
          { month: "Enero", amount: 100000 },
          { month: "Febrero", amount: 100000 },
          { month: "Marzo", amount: 100000 },
          { month: "Abril", amount: 100000 },
          { month: "Mayo", amount: 100000 },
          { month: "Junio", amount: 100000 },
          { month: "Julio", amount: 100000 },
          { month: "Agosto", amount: 100000 },
          { month: "Septiembre", amount: 100000 },
          { month: "Octubre", amount: 100000 },
          { month: "Noviembre", amount: 100000 },
          { month: "Diciembre", amount: 100000 }
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
      expense_details: {
        expense_name: "Gasto por compras Conny",
        essential_expense: false,
        monthly_expense: [
          { month: "Enero", amount: 100000 },
          { month: "Febrero", amount: 100000 },
          { month: "Marzo", amount: 100000 },
          { month: "Abril", amount: 100000 },
          { month: "Mayo", amount: 100000 },
          { month: "Junio", amount: 100000 },
          { month: "Julio", amount: 100000 },
          { month: "Agosto", amount: 100000 },
          { month: "Septiembre", amount: 100000 },
          { month: "Octubre", amount: 100000 },
          { month: "Noviembre", amount: 100000 },
          { month: "Diciembre", amount: 100000 }
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
      expense_details: {
        expense_name: "Gasto por compras Erick",
        essential_expense: true,
        monthly_expense: [
          { month: "Enero", amount: 100000 },
          { month: "Febrero", amount: 100000 },
          { month: "Marzo", amount: 100000 },
          { month: "Abril", amount: 100000 },
          { month: "Mayo", amount: 100000 },
          { month: "Junio", amount: 100000 },
          { month: "Julio", amount: 100000 },
          { month: "Agosto", amount: 100000 },
          { month: "Septiembre", amount: 100000 },
          { month: "Octubre", amount: 100000 },
          { month: "Noviembre", amount: 100000 },
          { month: "Diciembre", amount: 100000 }
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
      expense_details: {
        expense_name: "Gasto por compras Erick",
        essential_expense: true,
        monthly_expense: [
          { month: "Enero", amount: 100000 },
          { month: "Febrero", amount: 100000 },
          { month: "Marzo", amount: 100000 },
          { month: "Abril", amount: 100000 },
          { month: "Mayo", amount: 100000 },
          { month: "Junio", amount: 100000 },
          { month: "Julio", amount: 100000 },
          { month: "Agosto", amount: 100000 },
          { month: "Septiembre", amount: 100000 },
          { month: "Octubre", amount: 100000 },
          { month: "Noviembre", amount: 100000 },
          { month: "Diciembre", amount: 100000 }
        ]
      }
    },    
  ];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _toastrService: ToastrService,
  ) {
    this.gastoForm = this._formBuilder.group({
      gastoNombre: ['', Validators.required],
      gastoPeriodo: [''],
      gastoMonto: ['', Validators.required],
      gastoEsencial: [true],
      gastoTodosMeses: [true],
      gastoEnero: [''],
      gastoFebrero: [''],
      gastoMarzo: [''],
      gastoAbril: [''],
      gastoMayo: [''],
      gastoJunio: [''],
      gastoJulio: [''],
      gastoAgosto: [''],
      gastoSeptiembre: [''],
      gastoOctubre: [''],
      gastoNoviembre: [''],
      gastoDiciembre: [''],
    });
  }

  ngOnInit() {
    this.data.sort((a, b) => b.year - a.year);
  }

  onSwitchChangeTodosMeses(event: any) {
    this.gastoForm.patchValue({ gastoTodosMeses: event.target.checked });
    this.hiddenMonths = event.target.checked;
    console.log(this.gastoForm.value);
    if (event.target.checked) {
      this.gastoForm.patchValue({ gastoMonto: this.montoProvisorio });
      this.gastoForm.controls['gastoMonto'].enable();
    } else {
      this.montoProvisorio = this.gastoForm.value.gastoMonto;
      this.gastoForm.patchValue({ gastoEnero: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoFebrero: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoMarzo: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoAbril: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoMayo: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoJunio: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoJulio: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoAgosto: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoSeptiembre: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoOctubre: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoNoviembre: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoDiciembre: this.gastoForm.value.gastoMonto });
      this.gastoForm.patchValue({ gastoMonto: '' });
      this.gastoForm.controls['gastoMonto'].disable();
    }
  }

  createNewExpense() {
    if (this.gastoForm.valid) {
      let newGasto = {
        id: (this.data.length + 1),
        hidden_details: true,
        hidden_edit_view: true,
        hidden_delete_view: true,
        hidden_message_error: true,
        year: Number(this.gastoForm.controls['gastoPeriodo'].value),
        expense_details: {
          expense_name: this.gastoForm.controls['gastoNombre'].value,
          essential_expense: this.gastoForm.controls['gastoEsencial'].value,
          monthly_expense: [
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
      const montoAnual = this.gastoForm.controls['gastoTodosMeses'].value == '' ? 0 : this.gastoForm.controls['gastoTodosMeses'].value;

      if (this.gastoForm.controls['gastoTodosMeses'].value) {
        if (montoAnual > 0) {
          newGasto.expense_details.monthly_expense.forEach((mes) =>{
            mes.amount = Number(this.gastoForm.controls['gastoMonto'].value);
          });
          this.data.push(newGasto);
          this.data.sort((a, b) => b.year - a.year);
          this.cancelForm();
          this._toastrService.success('Gasto añadido correctamente.', 'Gestión de Gastos');
        } else {
          let hayMontos = false;
          this.meses.forEach((mes) => {
            if (this.gastoForm.controls[`gasto${mes}`].value > 0) {
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

  editExpense(id: any) {
    const element = this.data.find(item => item.id === id);
    if (element) {
      element.hidden_edit_view = false;
      this.cancelForm();
      this.disabledBtnAdd = true;
      element.expense_details.monthly_expense.forEach((expense: any) => {
        this.gastoForm.controls[`gasto${expense.month}`].setValue(expense.amount);
      });
    }
  }

  deleteExpense(id: any) {
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
    this.gastoForm.patchValue({
      gastoNombre: '',
      gastoPeriodo: '',
      gastoMonto: '',
      gastoTodosMeses: true,
      gastoEnero: '',
      gastoFebrero: '',
      gastoMarzo: '',
      gastoAbril: '',
      gastoMayo: '',
      gastoJunio: '',
      gastoJulio: '',
      gastoAgosto: '',
      gastoSeptiembre: '',
      gastoOctubre: '',
      gastoNoviembre: '',
      gastoDiciembre: '',
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
        if (this.gastoForm.controls[`gasto${mes}`].value > 0) {
          hayMontos = true;
        }
      });
      if (hayMontos) {
        element.hidden_edit_view = true;
        element.hidden_message_error = true;
        this.meses.forEach((mes) => {
          const itemEdit = element.expense_details.monthly_expense.find((expense: any) => expense.month === mes);
          if (itemEdit) {
            itemEdit.amount = (this.gastoForm.controls[`gasto${mes}`].value == ''
            || this.gastoForm.controls[`gasto${mes}`].value == null)
            ? 0 : this.gastoForm.controls[`gasto${mes}`].value;
          }
        });
        this.disabledBtnAdd = false;
        this._toastrService.success('Gasto editado correctamente.', 'Gestión de Gastos');
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
    this._toastrService.success('Gasto eliminado correctamente.', 'Gestión de Gastos');
  }
}