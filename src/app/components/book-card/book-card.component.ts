import {Component, Input, OnInit} from '@angular/core';
import {BookData} from "../../interfaces/book";

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() book: BookData | null = null

  readCount = 0

  constructor() { }

  ngOnInit(): void {
  }

}
