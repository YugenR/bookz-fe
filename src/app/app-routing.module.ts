import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersContainerComponent} from "./containers/users-container-component/users-container.component";
import {PublicContainerComponent} from "./containers/public-container/public-container.component";
import {PrivateContainerComponent} from "./containers/private-container/private-container.component";
import {BooksContainerComponent} from "./containers/books-container-component/books-container.component";
import {BookCardComponent} from "./components/book-card/book-card.component";
import {BookDetailComponent} from "./components/book-detail/book-detail.component";

const routes: Routes = [
  {
    path: '',
    component: PublicContainerComponent,
    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: UsersContainerComponent
      },
      {
        path: 'reserved',
        component: PrivateContainerComponent,
        children: [
          {
            path: ":userId",
            component: BooksContainerComponent,
          },
          {
            path: "books/:isbn",
            component: BookDetailComponent,
          }
        ]
      },
    ]
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
