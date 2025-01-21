import { Component } from '@angular/core';

@Component({
  selector: 'app-savings',
  templateUrl: './savings.component.html',
  styleUrls: ['./savings.component.scss']
})
export class SavingsComponent {
  savingsGoal: number = 0;
  currentSavings: number = 0;

  setSavingsGoal(goal: number): void {
    this.savingsGoal = goal;
  }

  trackProgress(): number {
    return (this.currentSavings / this.savingsGoal) * 100;
  }
}