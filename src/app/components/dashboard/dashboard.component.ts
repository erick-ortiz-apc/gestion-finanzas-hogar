import { Component } from '@angular/core';
import { FinanceService } from '../../services/finance.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private financeService: FinanceService) {}

  getBalance(): number {
    return this.financeService.getBalance();
  }

  getIncomeVsExpenses(): { income: number; expenses: number } {
    const transactions = this.financeService.getAllTransactions();
    const income = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expenses = transactions
      .filter(transaction => transaction.type === 'expense')
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    return { income, expenses };
  }
}