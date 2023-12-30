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
  @Input() isInLibrary = true
  @Input() personalLibrary = true
  @Output() read = new EventEmitter<void>()
  @Output() add = new EventEmitter<void>()
  @Output() remove = new EventEmitter<void>()
  @Output() edit = new EventEmitter<void>()
  @Output() delete = new EventEmitter<void>()


  constructor() {
  }

  ngOnInit(): void {
    if (!this.readCount)
      this.readCount = 0
    console.log(this.book)

  }

  readThisBook() {
    this.read.emit()
  }

  addToLibrary() {
    this.add.emit()
  }

  editBook() {
    this.edit.emit()
  }
  deleteBook() {
    this.delete.emit()
  }
  removeBook() {
    this.remove.emit()
  }
}
