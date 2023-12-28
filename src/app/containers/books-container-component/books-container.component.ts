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

  books: BookData[] = [
    {
      title: "Gone",
      author: "Michael Grant",
      plot: "Strani ragazzi con strani poteri",
      isbn: "XXXXXXXX",
      createdAt: new Date(Date.now())
    },
    {
      title: "Harry Potter",
      author: "J K Rowling",
      plot: "Persone molto disadattate",
      isbn: "XXXXXXXX",
      createdAt: new Date(Date.now())
    },
    {
      title: "Lord of the Rings",
      author: "Tolkien",
      plot: "Strani elfi e nani con strani anelli",
      isbn: "XXXXXXXX",
      createdAt: new Date(Date.now())
    },
    {
      title: "Gone",
      author: "Michael Grant",
      plot: "Strani ragazzi con strani poteri",
      isbn: "XXXXXXXX",
      createdAt: new Date(Date.now())
    },
  ]

  books$ = new Observable<BookData[]>()

  constructor(private booksService: BooksService) {
    this.books$ =
      of(true)
        .pipe(
          tap(() => this.loading = true),
          switchMap(() => this.booksService.getAllBooks(undefined)),
          map(books => {
            this.books = books
            this.loading = false
            return books
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
