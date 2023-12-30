import {Component, Input, OnInit} from '@angular/core';
import {BookDetail} from "../../interfaces/book";
import {ActivatedRoute, Router} from "@angular/router";
import {BooksService} from "../../services/books.service";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {

  @Input() readCount = 0
  @Input() totalReadCount = 10
  book: BookDetail = {} as BookDetail
  book$ = new Observable<BookDetail>()

  loading = false


  constructor(
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    let isbn: string | null = null;

    activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has("isbn"))
        isbn = paramMap.get("isbn")!
    })

    this.book$ =
      of(true)
        .pipe(
          tap(() => this.loading = true),
          switchMap(() => this.booksService.getBook(isbn!)),
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
    this.router.navigate(["/login"])
  }
}
