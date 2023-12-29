import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BooksContainerComponent} from "./containers/books-container-component/books-container.component";
import {UsersContainerComponent} from "./containers/users-container-component/users-container.component";
import {PublicContainerComponent} from "./containers/public-container/public-container.component";
import {PrivateContainerComponent} from "./containers/private-container/private-container.component";

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
            path: "books",
            component: BooksContainerComponent,
          },
          {
            path: ":userId",
            component: BooksContainerComponent,
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
