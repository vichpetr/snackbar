import {Component, OnInit, ViewChild} from '@angular/core';

import { TransactionService } from '../service/transaction.service';
import { AvatarService } from '../service/avatar.service';
import { SnackService } from '../service/snack.service';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Avatar} from "../model/avatar";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";
import {MatSnackBar} from "@angular/material";
import ExpandedTransaction = TRANSACTION.ExpandedTransaction;
import {TransactionList} from "../model/transactionList";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  avatar: Avatar;

  displayedColumns: string[] = ['select', 'id', 'snack', 'owner', 'price', 'time'];
  dataSource: MatTableDataSource<TRANSACTION.ExpandedTransaction>;
  selection = new SelectionModel<TRANSACTION.ExpandedTransaction>(true, []);
  paidVisible: boolean = false;
  total: number;
  totalUnpaid: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private transactionService: TransactionService,
    private snackService: SnackService,
    private avatarService: AvatarService,
    private route: ActivatedRoute,
    private location: Location,
    public snackBar: MatSnackBar,
  ) {
    this.avatarService.findAvatar(this.avatarService.selectedAvatar.entityId).then(result => {
      this.avatar = result;
      this.reloadTransactions();
    });
  }

  private reloadTransactions() {
    this.transactionService.getTransactions(this.avatar.entityId, this.paidVisible).then(result => {
      this.transactionService.transactions = result;
      this.total = this.transactionService.transactions.totalAll;
      this.totalUnpaid = this.transactionService.transactions.totalUnpaid;
      this.loadTransactions();
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.transactionService.transactions.transactions);
  }

  changePaymentVisible(){
    this.reloadTransactions();
  }

  loadTransactions(){
    this.dataSource = new MatTableDataSource(this.transactionService.transactions.transactions);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'time': return new Date(item.transactionDate);
        default: return item[property];
      }
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  goBack(): void {
    this.location.back();
  }

  Pay(){

    let ids : number[] = [];

    this.selection.selected.forEach((transaction) => {
      if (transaction.paid === false) {
            ids.push(transaction.id);
      }
    });

    this.transactionService.payTransactions(this.avatar.entityId, ids).then(result => {
      this.transactionService.transactions = result;
      this.snackBar.open("You will pay for " + ids.length + " transactions", 'Ok', {duration: 5000, panelClass: ['snackbar']});
      this.selection.clear();
      this.loadTransactions();
    });


  }


}
