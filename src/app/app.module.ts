import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { BooksContainerComponent } from './containers/books-container-component/books-container.component';
import {HttpClientModule} from "@angular/common/http";
import {UsersContainerComponent} from "./containers/users-container-component/users-container.component";
import {UserCardComponent} from "./components/user-card/user-card.component";
import {PublicContainerComponent} from "./containers/public-container/public-container.component";
import {PrivateContainerComponent} from "./containers/private-container/private-container.component";

@NgModule({
  declarations: [
    AppComponent,
    BookCardComponent,
    UserCardComponent,
    BooksContainerComponent,
    UsersContainerComponent,
    PublicContainerComponent,
    PrivateContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
