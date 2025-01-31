import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent implements OnInit {

  data: any[] = [];
  gastoForm!: FormGroup;
  hiddenForm: boolean = true;
  hiddenMonths: boolean = true;
  montoProvisorio: number = 0;
  hiddenErroMessage: boolean = true;
  disabledBtnAdd: boolean = false;
  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio',
    'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  constructor(
    private readonly _expenseService: ExpenseService,
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
    this.getListExpense();
  }

  getListExpense() {
    this._expenseService.getListExpenses().subscribe({
      next: (data) => {
        this.data = data.map((item: any) => ({
          ...item,
          hidden_details: true,
          hidden_edit_view: true,
          hidden_delete_view: true,
          hidden_message_error: true,
        }));
      },
      error: (error) => {
        console.log(error);
      }
    });
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
      let newGasto: any = {
        exSoPeriod: Number(this.gastoForm.controls['gastoPeriodo'].value),
        exSoName: this.gastoForm.controls['gastoNombre'].value,
        exSoEssential: this.gastoForm.controls['gastoEsencial'].value,
        MonthlyExpenses: []
      }
      const montoAnual = this.gastoForm.controls['gastoTodosMeses'].value || 0;

      if (this.gastoForm.controls['gastoTodosMeses'].value) {

        if (montoAnual > 0) {
          this.meses.forEach((mes) => {
            return newGasto?.MonthlyExpenses.push({
              moExMonth: mes,
              moExAmount: this.gastoForm.controls['gastoMonto'].value
            });
          });

          this.addExpense(newGasto);

        } else {
          this.hiddenErroMessage = false;
        }
      } else {
        let hayMontos = false;
        this.meses.forEach((mes) => {
          if (this.gastoForm.controls[`gasto${mes}`].value > 0) {
            hayMontos = true;
          }
        });

        if (hayMontos) {
          this.meses.forEach((mes) => {
            return newGasto?.MonthlyExpenses.push({
              moExMonth: mes,
              moExAmount: this.gastoForm.controls[`gasto${mes}`].value || 0
            });
          });

          console.log(this.gastoForm.value);
          console.log(newGasto);

          this.addExpense(newGasto);
        } else {
          this.hiddenErroMessage = false;
        }
      }
    } else {
      this.hiddenErroMessage = false;
    }
  }

  addExpense(body: any) {
    this._expenseService.addExpense(body).subscribe({
      next: (data) => {
        console.log(data);
        this.gastoForm.controls['gastoMonto'].enable();
        this.cancelForm();
        this._toastrService.success('Gasto añadido correctamente.', 'Gestión de Gastos');
        this.getListExpense();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editExpense(id: any) {
    const element = this.data.find(item => item.exSoId === id);
    if (element) {
      element.hidden_edit_view = false;
      this.cancelForm();
      this.disabledBtnAdd = true;
      element.MonthlyExpenses.forEach((expense: any) => {
        this.gastoForm.controls[`gasto${expense.moExMonth}`].setValue(expense.moExAmount);
      });
    }
  }

  deleteExpense(id: any) {
    const element = this.data.find(item => item.exSoId === id);
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
      gastoEsencial: true,
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
    const element = this.data.find(item => item.exSoId === id);
    if (element) {
      element.hidden_edit_view = true;
      element.hidden_message_error = true;
    }
    this.cancelForm();
  }

  acceptEdit(id: any) {
    const element = this.data.find(item => item.exSoId === id);
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
          const itemEdit = element.MonthlyExpenses.find((expense: any) => expense.moExMonth === mes);
          if (itemEdit) {
            itemEdit.moExAmount = (this.gastoForm.controls[`gasto${mes}`].value == ''
            || this.gastoForm.controls[`gasto${mes}`].value == null)
            ? 0 : this.gastoForm.controls[`gasto${mes}`].value;
          }
        });
        const elementEdit = this.data.find(item => item?.exSoId === id);
        console.log({elementEdit});
        this._expenseService.editExpense(elementEdit).subscribe({
          next: (data) => {
            this.disabledBtnAdd = false;
            this._toastrService.success('Gasto editado correctamente.', 'Gestión de Gastos');
            this.getListExpense();
          }, 
          error: (error) => {
            console.log(error);        
          }
        });
      } else {
        element.hidden_message_error = false;
      }
    }
  }

  hiddenMessageError(id: any) {
    const element = this.data.find(item => item.exSoId === id);
    if (element) {
      element.hidden_message_error = true;
    }
  }

  cancelDelete(id: any) {
    const element = this.data.find(item => item.exSoId === id);
    if (element) {
      element.hidden_delete_view = true;
    }
    this.disabledBtnAdd = false;
  }

  acceptDelete(id: any) {
    this._expenseService.deleteExpense(id).subscribe({
      next: (data) => {
        this.disabledBtnAdd = false;
        this._toastrService.success('Gasto eliminado correctamente.', 'Gestión de Gastos');
        this.getListExpense();
      }, 
      error: (error) => {
        console.log(error);        
      }
    });
  }
}