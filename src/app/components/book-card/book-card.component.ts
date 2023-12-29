import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookData} from "../../interfaces/book";

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {

  @Input() readCount = 0
  @Input() book: BookData = {} as BookData
  @Input() showReadCount = true
  @Output() read = new EventEmitter<void>()

  constructor() {
  }

  ngOnInit(): void {
    if (!this.readCount)
      this.readCount = 0
  }

  readThisBook() {
    this.read.emit()
  }
}
