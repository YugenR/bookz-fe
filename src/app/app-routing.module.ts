import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BooksContainerComponent} from "./containers/books-container-component/books-container.component";
import {UsersContainerComponent} from "./containers/users-container-component/users-container.component";

const routes: Routes = [
  {
    path: 'login',
    component: UsersContainerComponent,
    children: [
      {
        path: 'books',
        component: BooksContainerComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
