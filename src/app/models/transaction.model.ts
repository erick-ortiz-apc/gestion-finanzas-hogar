export interface Transaction {
    id: number;
    amount: number;
    date: Date;
    category: string;
    type: 'income' | 'expense';
}