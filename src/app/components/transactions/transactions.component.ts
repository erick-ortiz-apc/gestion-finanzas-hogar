import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/services/finance.service';
import { Transaction } from 'src/app/models/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private financeService: FinanceService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    // this.financeService.getAllTransactions().subscribe(transactions => {
    //   this.transactions = transactions;
    // });
  }

  editTransaction(transaction: Transaction): void {
    // Lógica para editar la transacción
  }

  deleteTransaction(transactionId: number): void {
    // Lógica para eliminar la transacción
  }
}