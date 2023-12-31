import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BooksService} from "../../services/books.service";
import {BookCreate, BookDetail, BookUpdate} from "../../interfaces/book";
import {MatDialogRef} from "@angular/material/dialog";
import {GeneralDialogComponent} from "../general-dialog/general-dialog.component";
import {delay, of, Subscription, switchMap} from "rxjs";

@Component({
  selector: 'book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent {

  // The reference to the MatDialog the form is inside which
  dialogRef!: MatDialogRef<GeneralDialogComponent>

  timeout?: Subscription;

  bookForm: FormGroup;
  formEntity: BookCreate = {} as BookCreate
  saving = false
  checkingIsbn = false
  isbnAlreadyInUse = false
  alreadyUsedBookTitle = ""

  constructor(
    private booksService: BooksService,
  ) {
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      isbn: new FormControl('', [Validators.required]),
      plot: new FormControl('', [])
    })
  }

  _book: BookDetail = {} as BookDetail

  @Input() set book(value: BookDetail) {
    this._book = value
    this.bookForm.controls["isbn"].clearValidators()
    this.bookForm.patchValue(this._book)
  }

  createBook() {
    this.saving = true
    let formValue = this.bookForm.value

    delete formValue.id;

    this.formEntity = {...this.formEntity, ...formValue}


    this.booksService.createBook(formValue as BookCreate)
      .subscribe(book => {

        this._book = book
        this.bookForm.reset()
        this.bookForm.patchValue(book)
        this.formEntity = {} as BookCreate

        if (this.dialogRef)
          this.dialogRef.close(book)

        this.saving = false
      })
  }

  updateBook(isbn: string) {
    this.saving = true
    let formValue = this.bookForm.value

    delete formValue.id;
    delete formValue.email;

    this.formEntity = {...this.formEntity, ...formValue}


    this.booksService.updateBook(isbn, formValue as BookUpdate)
      .subscribe(book => {

        this._book = book
        this.bookForm.reset()
        this.bookForm.patchValue(book)
        this.formEntity = {} as BookCreate

        if (this.dialogRef)
          this.dialogRef.close(book)

        this.saving = false
      })
  }

  checkIsbnAvailability(event: KeyboardEvent) {
    this.checkingIsbn = true
    if (this.timeout !== undefined && !this.timeout.closed)
      this.timeout.unsubscribe()

    this.timeout = of(event)
      .pipe(
        delay(1000),
        switchMap((ev: KeyboardEvent) => {
          if (ev.key.toLowerCase() != 'enter' && this.bookForm.value.isbn) {
            this.isbnAlreadyInUse = false
            return this.booksService
              .checkIsbnAvailability(this.bookForm.value.isbn)
          }
          return of({isUsed: false, title: ""})
        })
      ).subscribe(value => {
        this.isbnAlreadyInUse = value.isUsed
        this.alreadyUsedBookTitle = value.title

        this.checkingIsbn = false
      })
  }
}
