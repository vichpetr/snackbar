declare module TRANSACTION {

  export interface Transaction {
    entityId: number;
    paid: boolean;
    buyerId: number;
    snackId: number;
    transactionDate: Date;
  }

  export interface ExpandedTransaction {
    id: number;
    paid: boolean;
    snack: string;
    owner: string;
    price: number;
    transaction_date: Date;
  }
}
