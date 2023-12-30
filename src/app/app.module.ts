import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import {HttpClientModule} from "@angular/common/http";
import {UsersContainerComponent} from "./containers/users-container-component/users-container.component";
import {UserCardComponent} from "./components/user-card/user-card.component";
import {PublicContainerComponent} from "./containers/public-container/public-container.component";
import {PrivateContainerComponent} from "./containers/private-container/private-container.component";
import {MatButtonModule} from "@angular/material/button";
import {GeneralDialogComponent} from "./components/general-dialog/general-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {UserFormComponent} from "./components/user-form/user-form.component";
import {ConfirmDialogComponent} from "./components/confirm-dialog/confirm-dialog.component";
import {AlertDialogComponent} from "./components/alert-dialog/alert-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BookFormComponent} from "./components/book-form/book-form.component";
import { SearchBoxComponent } from './components/search-box/search-box.component';
import {BooksContainerComponent} from "./containers/books-container-component/books-container.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgOptimizedImage} from "@angular/common";
import {BookDetailComponent} from "./components/book-detail/book-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    BookCardComponent,
    BookFormComponent,
    BookDetailComponent,
    UserCardComponent,
    UserFormComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    GeneralDialogComponent,
    BooksContainerComponent,
    UsersContainerComponent,
    PublicContainerComponent,
    PrivateContainerComponent,
    SearchBoxComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    NgOptimizedImage,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
