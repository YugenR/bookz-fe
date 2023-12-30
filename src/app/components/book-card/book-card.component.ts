import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookData} from "../../interfaces/book";
import {ActivatedRoute, Router} from "@angular/router";

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


  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    if (!this.readCount)
      this.readCount = 0

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

  bookDetail(isbn: string) {
    // this.router.navigate(["books", isbn]).then();
    this.router.navigate(["books/ISBN-HP"]).then();
  }
}
