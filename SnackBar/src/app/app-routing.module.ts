import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AvatarsComponent }      from './avatars/avatars.component';
import { SnacksComponent }      from './snacks/snacks.component';
import { AddFormsComponent }      from './add-forms/add-forms.component';
import {TransactionsComponent} from "./transactions/transactions.component";

const routes: Routes = [
  { path: '', redirectTo: '/avatars', pathMatch: 'full' },
  { path: 'avatars', component: AvatarsComponent },
  { path: 'add', component: AddFormsComponent },
  { path: 'snacks/:id', component: SnacksComponent },
  { path: 'transactions/:id', component: TransactionsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
