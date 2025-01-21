import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent {
  incomeForm: FormGroup;
  incomes: any[] = [];

  constructor(private fb: FormBuilder, private financeService: FinanceService) {
    this.incomeForm = this.fb.group({
      source: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required]
    });
  }

  addIncome() {
    if (this.incomeForm.valid) {
      const incomeData = this.incomeForm.value;
      this.financeService.addTransaction({ ...incomeData, type: 'income' });
      this.incomes.push(incomeData);
      this.incomeForm.reset();
    }
  }

  deleteIncome(index: number) {
    this.incomes.splice(index, 1);
  }
}