import {Component, OnInit} from '@angular/core';
import {BookData} from "../../interfaces/book";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {BooksService} from "../../services/books.service";
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {UserDetail} from "../../interfaces/user";
import {UsersService} from "../../services/users.service";
import {GeneralDialogComponent} from "../../components/general-dialog/general-dialog.component";
import {DialogsService} from "../../services/dialogs.service";
import {BookFormComponent} from "../../components/book-form/book-form.component";
import {FetchParams} from "../../interfaces/pagination";
import {Constants} from "../../utils/constants";

@Component({
  selector: 'books-container-component',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css']
})
export class BooksContainerComponent implements OnInit {

  // User for HTTP Params
  fetchParams: FetchParams = {} as FetchParams
  defaultSortColumn = "title"
  direction = "ASC"

  success = false
  failure = false

  loading = false
  user = {} as UserDetail

  books: BookData[] = []

  books$ = new Observable<BookData[]>()
  user$ = new Observable<UserDetail>()
  observable$ = new Observable<BookData[]>;
  reload$ = new Observable<BookData[]>;
  personalLibrary = true;

  constructor(
    private booksService: BooksService,
    private usersService: UsersService,
    private dialogService: DialogsService,
    private activatedRoute: ActivatedRoute) {

    this.fetchParams = {
      page: Constants.pagination.defaultPage,
      num: Constants.pagination.defaultPageSize,
      sort: `${this.defaultSortColumn} ${this.direction}`,
      keyword: ""
    }

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
            this.popToast(true)
            console.log(err)
            return EMPTY;
          })
        )

    this.books$ =
      of(true)
        .pipe(
          switchMap(() => this.booksService.getAllBooks(this.fetchParams)),
          map(books => {
            this.books = books.list
            return books.list
          }),
          catchError((err) => {
            this.loading = false
            this.popToast(true)
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

  logMe(x: any) {
    console.log(x)
  }

  readThisBook(isbn: string) {
    of(true)
      .pipe(
        switchMap(() => this.booksService.readThisBook(this.user.id, isbn)),
        switchMap(() => this.reload$),
      )
      .subscribe(value => {
      })

  }

  addToLibrary(isbn: string) {
    of(true)
      .pipe(
        switchMap(() => this.booksService.addToLibrary(this.user.id, isbn)),
        switchMap(() => this.reload$),
      )
      .subscribe(value => {
      })

  }

  isInLibrary(isbn: string) {
    return this.user.books[isbn] !== undefined
  }

  createBook() {

    this.dialogService.open(GeneralDialogComponent, {
      data: {
        dialogTitle: 'Create new book',
        componentData: {},
        component: BookFormComponent
      },
    })
      .afterClosed()
      .pipe(switchMap(value => value ? this.books$ : EMPTY))
      .subscribe({
        next: () => this.popToast(),
        error: () => this.popToast(true),        }
      )

  }

  editBook(isbn: string) {

    this.booksService.getBook(isbn)
      .subscribe(book => {

        this.dialogService.open(GeneralDialogComponent, {
          data: {
            dialogTitle: 'Edit existing book',
            componentData: {book: book},
            component: BookFormComponent
          }
        })
          .afterClosed()
          .pipe(switchMap(value => value ? this.books$ : EMPTY))
          .subscribe({
            next: () => this.popToast(),
            error: () => this.popToast(true),            }
          )
      })
  }

  deleteBook(isbn: string) {
    this.dialogService.confirm("Are you sure you want to delete this book?", "That's sad.")
      .pipe(
        switchMap((value) => value ?
          this.booksService.deleteBook(isbn) : EMPTY),
        switchMap(() => this.books$)
      )
      .subscribe({
        next: () => this.popToast(),
        error: () => this.popToast(true)
        }
      )
  }



  emitValue(value: string, $event: KeyboardEvent) {
    console.log(value)
  }

  loadKeyword($event: any) {
    this.fetchParams.keyword = $event.keyword
    this.reload$.subscribe()

  }
  sortField(sortField: string) {
    this.fetchParams.sort = `${sortField} ${this.fetchParams.sort.split(" ")[1]}`
    this.reload$.subscribe()
  }

  sortDir(sortDir: string) {
    this.fetchParams.sort = `${this.fetchParams.sort.split(" ")[0]} ${sortDir}`
    this.reload$.subscribe()
  }
  private popToast(isError = false) {
    if (isError) {
      this.failure = true
      setTimeout(() => this.failure = false, 3000)
    } else {
      this.success = true
      setTimeout(() => this.success = false, 3000)
    }
  }

  capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
