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
  
  constructor(
    private readonly _formBuilder: FormBuilder
  ) {
    this.ingresoForm = this._formBuilder.group({
      ingresoNombre: ['', Validators.required],
      ingresoPeriodo: [null],
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
}