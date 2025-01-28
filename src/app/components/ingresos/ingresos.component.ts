import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IncomeService } from 'src/app/services/income.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  data: any[] = [];
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

  constructor(
    private readonly _incomeService: IncomeService,
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
    this.getListIncome();
  }

  getListIncome() {
    this._incomeService.getListIncomes().subscribe({
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
      let newIngreso: any = {
        inSoPeriod: Number(this.ingresoForm.controls['ingresoPeriodo'].value),
        inSoName: this.ingresoForm.controls['ingresoNombre'].value,
        MonthlyIncomes: []
      }
      const montoAnual = this.ingresoForm.controls['ingresoTodosMeses'].value || 0;

      if (this.ingresoForm.controls['ingresoTodosMeses'].value) {

        if (montoAnual > 0) {
          this.meses.forEach((mes) => {
            return newIngreso?.MonthlyIncomes.push({
              moInMonth: mes,
              moInAmount: this.ingresoForm.controls['ingresoMonto'].value
            });
          });

          this.addIncome(newIngreso);

        } else {
          this.hiddenErroMessage = false;
        }
      } else {
        let hayMontos = false;
        this.meses.forEach((mes) => {
          if (this.ingresoForm.controls[`ingreso${mes}`].value > 0) {
            hayMontos = true;
          }
        });

        if (hayMontos) {
          this.meses.forEach((mes) => {
            return newIngreso?.MonthlyIncomes.push({
              moInMonth: mes,
              moInAmount: this.ingresoForm.controls[`ingreso${mes}`].value || 0
            });
          });

          console.log(this.ingresoForm.value);
          console.log(newIngreso);

          this.addIncome(newIngreso);
        } else {
          this.hiddenErroMessage = false;
        }
      }
    } else {
      this.hiddenErroMessage = false;
    }
  }

  addIncome(body: any) {
    this._incomeService.addIncome(body).subscribe({
      next: (data) => {
        console.log(data);
        this.ingresoForm.controls['ingresoMonto'].enable();
        this.cancelForm();
        this._toastrService.success('Ingreso añadido correctamente.', 'Gestión de Ingresos');
        this.getListIncome();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  editIncome(id: any) {
    const element = this.data.find(item => item?.inSoId === id);
    if (element) {
      element.hidden_edit_view = false;
      this.cancelForm();
      this.disabledBtnAdd = true;
      element?.MonthlyIncomes.forEach((income: any) => {
        this.ingresoForm.controls[`ingreso${income?.moInMonth}`].setValue(income?.moInAmount);
      });
    }
  }

  deleteIncome(id: any) {
    const element = this.data.find(item => item?.inSoId === id);
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
    const element = this.data.find(item => item?.inSoId === id);
    if (element) {
      element.hidden_edit_view = true;
      element.hidden_message_error = true;
    }
    this.cancelForm();
  }

  acceptEdit(id: any) {
    const element = this.data.find(item => item?.inSoId === id);
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
          const itemEdit = element?.MonthlyIncomes.find((income: any) => income?.moInMonth === mes);
          if (itemEdit) {
            itemEdit.moInAmount = (this.ingresoForm.controls[`ingreso${mes}`].value == ''
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
    const element = this.data.find(item => item?.inSoId === id);
    if (element) {
      element.hidden_message_error = true;
    }
  }

  
  acceptDelete(id: any) {
    this._incomeService.deleteIncome(id).subscribe({
      next: (data) => {
        this.disabledBtnAdd = false;
        this._toastrService.success('Ingreso eliminado correctamente.', 'Gestión de Ingresos');
        this.getListIncome();
      }, 
      error: (error) => {
        console.log(error);        
      }
    });
  }

  cancelDelete(id: any) {
    const element = this.data.find(item => item?.inSoId === id);
    if (element) {
      element.hidden_delete_view = true;
    }
    this.disabledBtnAdd = false;
  }
}