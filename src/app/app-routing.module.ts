import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersContainerComponent} from "./containers/users-container-component/users-container.component";
import {PublicContainerComponent} from "./containers/public-container/public-container.component";
import {PrivateContainerComponent} from "./containers/private-container/private-container.component";
import {BooksContainerComponent} from "./containers/books-container-component/books-container.component";

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
        path: 'reserved/:userId',
        component: PrivateContainerComponent,
        children: [
          {
            path: "books",
            component: BooksContainerComponent,
          },
          {
            path: "",
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
