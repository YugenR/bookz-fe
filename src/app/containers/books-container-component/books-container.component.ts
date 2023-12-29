import { Component, OnInit } from '@angular/core';
import {BookData} from "../../interfaces/book";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {BooksService} from "../../services/books.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-books-container-component',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css']
})
export class BooksContainerComponent implements OnInit {

  loading = false

  books: BookData[] = []

  books$ = new Observable<BookData[]>()

  constructor(private booksService: BooksService) {
    this.books$ =
      of(true)
        .pipe(
          tap(() => this.loading = true),
          switchMap(() => this.booksService.getAllBooks(undefined)),
          map(books => {
            this.books = books.list
            this.loading = false
            return books.list
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

    this.books$.subscribe()

  }

  protected readonly Array = Array;
}
