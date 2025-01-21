import { Component } from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {
  budgetLimit: number = 0;
  currentAmount: number = 0;
  budgetAmount: any;
  currentBudget: any;
  budgetAlert: any;

  setBudget(limit: number): void {
    this.budgetLimit = limit;
  }

  checkBudgetAlert(): boolean {
    return this.currentAmount > this.budgetLimit;
  }
}