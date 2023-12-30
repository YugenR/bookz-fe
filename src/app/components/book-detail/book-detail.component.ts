import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookDetail} from "../../interfaces/book";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {map} from "rxjs/operators";
import {UserDetail} from "../../interfaces/user";

@Component({
  selector: 'book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input() readCount = 0
  @Input() totalReadCount = 10
  @Input() isbn: string = ""
  book: BookDetail = {} as BookDetail
  @Input() user: UserDetail = {} as UserDetail
  book$ = new Observable<BookDetail>()
  @Output() back = new EventEmitter<void>()


  loading = false


  constructor(
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    this.book$ =
      of(true)
        .pipe(
          tap(() => this.loading = true),
          switchMap(() => this.booksService.getBook(this.isbn)),
          map(book => {
            this.book = book
            return book
          }),
          tap(() => this.loading = false),
          catchError((err) => {
            this.loading = false
            console.log(err)
            return EMPTY;
          })
        )
  }

  ngOnInit(): void {
    this.book$.subscribe()
  }

  backToBooks() {
    this.back.emit()
  }

  getMyReadCount() {
    console.log(this.user.books)
    console.log(this.user.books[this.book.isbn])
    return this.user.books[this.book.isbn]
  }
}
