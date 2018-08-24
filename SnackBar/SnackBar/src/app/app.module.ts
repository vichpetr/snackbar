import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";


import { AppComponent } from './app.component';
import { AvatarsComponent } from './avatars/avatars.component';
import {
  MatButtonModule, MatCheckboxModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSnackBarModule, MatSortModule, MatTableModule
} from "@angular/material";
import { SnacksComponent } from './snacks/snacks.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import { AddFormsComponent } from './add-forms/add-forms.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TransactionsComponent } from './transactions/transactions.component';


@NgModule({
  declarations: [
    AppComponent,
    AvatarsComponent,
    SnacksComponent,
    AddFormsComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatSnackBarModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
