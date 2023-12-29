import {Component, OnInit} from '@angular/core';
import {UserData} from "../../interfaces/user";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {UsersService} from "../../services/users.service";
import {map} from "rxjs/operators";
import {DialogsService} from "../../services/dialogs.service";
import {GeneralDialogComponent} from "../../components/general-dialog/general-dialog.component";
import {UserFormComponent} from "../../components/user-form/user-form.component";

@Component({
  selector: 'users-container-component',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.css']
})
export class UsersContainerComponent implements OnInit {

  success = false
  failure = false

  loading = false

  users: UserData[] = []

  users$ = new Observable<UserData[]>()
  showModal = false;

  constructor(private usersService: UsersService,
              private dialogService: DialogsService) {
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

    this.dialogService.open(GeneralDialogComponent, {
      data: {
        dialogTitle: 'Create user',
        componentData: {},
        component: UserFormComponent
      },
    })
      .afterClosed()
      .pipe(switchMap(value => value ? this.users$ : EMPTY))
      .subscribe({
          next: () => this.popToast(),
          error: () => this.popToast(true),
        }
      )

  }

  editUser(userId: number) {

    this.usersService.getUser(userId)
      .subscribe(user => {

        this.dialogService.open(GeneralDialogComponent, {
          data: {
            dialogTitle: 'Edit user',
            componentData: {user: user},
            component: UserFormComponent
          }
        })
          .afterClosed()
          .pipe(switchMap(value => value ? this.users$ : EMPTY))
          .subscribe({
              next: () => this.popToast(),
              error: () => this.popToast(true),
            }
          )
      })
  }

  deleteUser(userId: number) {
    this.dialogService.confirm("Are you sure you want to delete this user?", "Be careful!")
      .pipe(
        switchMap((value) => value ?
          this.usersService.deleteUser(userId) : EMPTY),
        switchMap(() => this.users$)
      )
      .subscribe({
          next: () => this.popToast(),
          error: () => this.popToast(true),
        }
      )
  }

  private popToast(isError = false) {
    if (isError) {
      this.failure = true
      setTimeout(() => this.failure = false, 3000)
    } else {
      this.success = true
      setTimeout(() => this.success = false, 3000)
    }
  }
}
