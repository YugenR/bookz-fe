import {Component, Input, OnInit} from '@angular/core';
import {UserData} from "../../interfaces/user";

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user: UserData = {} as UserData

  constructor() {
    console.log("user card")
  }

  ngOnInit(): void {
  }

  chooseUser(id: number) {
    console.log(id)
  }
}
