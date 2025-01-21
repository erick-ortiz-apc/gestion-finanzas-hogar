import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReportsComponent } from './components/reports/reports.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BudgetComponent } from './components/budget/budget.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { IncomeComponent } from './components/income/income.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SavingsComponent } from './components/savings/savings.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { FinanceService } from './services/finance.service';
import { NotificationService } from './services/notification.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IncomeComponent,
    ExpensesComponent,
    TransactionsComponent,
    BudgetComponent,
    SavingsComponent,
    NotificationsComponent,
    StatisticsComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([])
  ],
  providers: [FinanceService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
