import { Component, OnInit } from '@angular/core';
import {UserData} from "../../interfaces/user";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {UsersService} from "../../services/users.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'users-container-component',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.css']
})
export class UsersContainerComponent implements OnInit {

  loading = false

  users: UserData[] = []

  users$ = new Observable<UserData[]>()
  showModal = false;

  constructor(private usersService: UsersService) {
    this.users$ =
      of(true)
        .pipe(
          tap(() => this.loading = true),
          switchMap(() => this.usersService.getAllUsers(undefined)),
          map(users => {
            this.users = users.list
            this.loading = false
            console.log(users.list)
            return users.list
          }),
          catchError((err) => {
            this.loading = false
            //todo error
            console.log(err)
            return EMPTY;
          })

        )
  }

  ngOnInit(): void {

    this.users$.subscribe()

  }

  createUser() {

  }
}
