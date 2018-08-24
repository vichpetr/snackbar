import {Component, Input, OnInit} from '@angular/core';
import { Snack } from '../model/snack';
import { Avatar } from '../model/avatar';

import { SnackService } from '../service/snack.service';
import { AvatarService } from '../service/avatar.service';
import { TransactionService } from '../service/transaction.service';
import {MatSnackBar} from "@angular/material";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import {Router} from "@angular/router";

@Component({
  selector: 'app-snacks',
  templateUrl: './snacks.component.html',
  styleUrls: ['./snacks.component.css']
})
export class SnacksComponent implements OnInit {

  snacks : Snack[];
  selectedAvatar : Avatar;
  // avatar: Avatar;
  owner: Avatar;
  cancel_message: string[] = ['Salary not received yet?', 'Nevermind', 'Come on, take one', 'Coward!'];

  constructor(
    public snackBar: MatSnackBar,
    private snackService: SnackService,
    private avatarService: AvatarService,
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private location: Location,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    this.getSnacks();
    this.findAvatar();
  }

  ngOnInit() {

  }

  onSelect(snack: Snack): void {
    this.snackService.selectedSnack = snack;
    this.placeOrder(this.snackService.selectedSnack.owner);
  }

  getSnacks(): void {

    this.snackService.getSnacks().then(result =>{
      this.snackService.snacks = result;
      this.snacks = this.snackService.snacks;
    });

  }

  findAvatar(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    // this.avatarService.findAvatar(id).subscribe(result => {console.log('avatar is ', result);this.avatar = result['data'][0]});
    this.avatarService.findAvatar(id).then(result => {
      this.avatarService.selectedAvatar = result;
      this.selectedAvatar = this.avatarService.selectedAvatar;
    });
  };

  placeOrder(id: number) {
    // this.avatarService.findAvatar(id).subscribe(result =>{console.log('owner is ', result);this.owner = result['data'][0]});
    this.avatarService.findAvatar(id).then(result => {
      this.owner = result;
      this.addTransaction(this.avatarService.selectedAvatar.id, this.snackService.selectedSnack.id);
    });
  }

  static get_random_index(length: number): number{
    return Math.floor(Math.random() * length);
  }

  static get_random_message(array: string[]): string{
    return array[SnacksComponent.get_random_index(array.length)];
  }

  goBack(): void {
    this.snackBar.open(SnacksComponent.get_random_message(this.cancel_message), 'Ok', {duration: 2000, panelClass: ['snackbar']});
    this.location.back();
  }

  addTransaction(buyer: number, snack: number) {
    this.transactionService.addTransaction(buyer, snack).then( result => {
      console.log('Transaction added. ID: ' + result.id);
      if (this.snackService.selectedSnack.owner === this.avatarService.selectedAvatar.id)
      {
        this.snackBar.open("You won't get any money back this way " + this.owner.name, 'Ok', {duration: 5000, panelClass: ['snackbar']})
      }
      else {
        this.snackBar.open(this.avatarService.selectedAvatar.name + " was charged " + this.snackService.selectedSnack.price + " money units for " + this.snackService.selectedSnack.name + " on behalf of " + this.owner.name, 'Ok', {
          duration: 5000,
          panelClass: ['snackbar']
        })
      }
      this.router.navigate(['/']);
    });
  }

}
