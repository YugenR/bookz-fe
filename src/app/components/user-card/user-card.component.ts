import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserData} from "../../interfaces/user";

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {

  @Input() user: UserData = {} as UserData
  @Output() edit = new EventEmitter<void>()
  @Output() delete = new EventEmitter<void>()

  constructor() {
  }

  generatePath(userId: number) {
    return `/reserved/${userId}`;
  }

  editUser() {
    this.edit.emit()
  }
  deleteUser() {
    this.delete.emit()
  }
}
