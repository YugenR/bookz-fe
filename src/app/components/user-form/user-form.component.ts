import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {UserCreate, UserDetail, UserUpdate} from "../../interfaces/user";
import {MatDialogRef} from "@angular/material/dialog";
import {GeneralDialogComponent} from "../general-dialog/general-dialog.component";

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  // The reference to the MatDialog the form is inside which
  dialogRef!: MatDialogRef<GeneralDialogComponent>

  userForm: FormGroup;
  formEntity: UserCreate = {} as UserCreate
  saving = false

  constructor(
    private userService: UsersService,
  ) {
    this.userForm = new FormGroup({
      id: new FormControl(undefined),
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
        Validators.required
      ])
    })
  }

  _user: UserDetail = {} as UserDetail

  @Input() set user(value: UserDetail) {
    console.log("Input user", value)
    this._user = value
    this.userForm.controls["email"].clearValidators()
    this.userForm.patchValue(this._user)
  }

  createUser() {
    this.saving = true
    let formValue = this.userForm.value

    delete formValue.id;

    this.formEntity = {...this.formEntity, ...formValue}


    this.userService.createUser(formValue as UserCreate)
      .subscribe(user => {

        this._user = user
        this.userForm.reset()
        this.userForm.patchValue(user)
        this.formEntity = {} as UserCreate

        if (this.dialogRef)
          this.dialogRef.close(user)

        this.saving = false
      })
  }

  updateUser(userId: number) {
    this.saving = true
    let formValue = this.userForm.value

    delete formValue.id;
    delete formValue.email;

    this.formEntity = {...this.formEntity, ...formValue}


    this.userService.updateUser(userId, formValue as UserUpdate)
      .subscribe(user => {

        this._user = user
        this.userForm.reset()
        this.userForm.patchValue(user)
        this.formEntity = {} as UserCreate

        if (this.dialogRef)
          this.dialogRef.close(user)

        this.saving = false
      })
  }
}
