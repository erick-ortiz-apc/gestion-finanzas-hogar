import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent {
  expenseForm: FormGroup;
  expenses: any[] = [];

  constructor(private fb: FormBuilder, private financeService: FinanceService) {
    this.expenseForm = this.fb.group({
      amount: ['', [Validators.required]],
      category: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
    this.loadExpenses();
  }

  loadExpenses() {
    this.expenses = this.financeService.getAllTransactions().filter(transaction => transaction.type === 'expense');
  }

  addExpense() {
    if (this.expenseForm.valid) {
      const newExpense = {
        ...this.expenseForm.value,
        type: 'expense'
      };
      this.financeService.addTransaction(newExpense);
      this.loadExpenses();
      this.expenseForm.reset();
    }
  }

  deleteExpense(expenseId: number) {
    // this.financeService.deleteTransaction(expenseId);
    this.loadExpenses();
  }
}