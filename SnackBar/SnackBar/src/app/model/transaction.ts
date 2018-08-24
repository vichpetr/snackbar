declare module TRANSACTION {

  export interface Transaction {
    id: number;
    paid: boolean;
    buyer: number;
    snack: number;
    transaction_date: Date;
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
