import ExpandedTransaction = TRANSACTION.ExpandedTransaction;

export interface TransactionList {
  totalAll: number;
  totalUnpaid: number;
  transactions: ExpandedTransaction[];
}

