import { Component, OnInit } from '@angular/core';
import {BookData} from "../../interfaces/book";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {BooksService} from "../../services/books.service";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {UserDetail} from "../../interfaces/user";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'books-container-component',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css']
})
export class BooksContainerComponent implements OnInit {

  loading = false
  user = {} as UserDetail

  books: BookData[] = []

  books$ = new Observable<BookData[]>()
  user$ = new Observable<UserDetail>()
  observable$= new Observable<BookData[]>;
  reload$= new Observable<BookData[]>;

  constructor(
    private booksService: BooksService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute) {

    let userId: number | null = null;

    activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has("userId"))
        userId = +paramMap.get("userId")!
    })

    this.user$ =
      of(true)
        .pipe(
          switchMap(() => this.usersService.getUser(userId!)),
          map(user => {
            this.user = user
            return user
          }),
          catchError((err) => {
            this.loading = false
            //todo error
            console.log(err)
            return EMPTY;
          })

        )

    this.books$ =
      of(true)
        .pipe(
          switchMap(() => this.booksService.getAllBooks(undefined)),
          map(books => {
            this.books = books.list
            return books.list
          }),
          catchError((err) => {
            this.loading = false
            //todo error
            console.log(err)
            return EMPTY;
          })
        )

    this.observable$ = of(true)
      .pipe(
        tap(() => this.loading = true),
        switchMap(() => this.user$),
        switchMap(() => this.books$),
        tap(() => this.loading = false),
        catchError(() => {
          this.loading = false
          return EMPTY;
        })
      )

    this.reload$ = of(true)
      .pipe(
        switchMap(() => this.user$),
        switchMap(() => this.books$),
        catchError(() => {
          this.loading = false
          return EMPTY;
        })
      )
  }

  ngOnInit(): void {

    this.observable$.subscribe(() => {})

  }

  readThisBook(isbn: string) {
    of(true)
      .pipe(
        switchMap(() => this.booksService.readThisBook(this.user.id, isbn)),
        switchMap(() => this.reload$),
      )
      .subscribe(value => {})

  }
}
