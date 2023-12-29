import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {Constants} from "../utils/constants";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {BookCreate, BookData, BookDetail, BookUpdate} from "../interfaces/book";
import {FetchParams, PageConverter} from "../interfaces/pagination";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private readonly entities = Constants.entities;
  private readonly crtlPathFragment = this.entities.books;
  private readonly crtlFullPath = `${environment.apiUrl}/${this.crtlPathFragment}`;

  constructor(private http: HttpClient) {
  }

  public getAllBooks(paginationParams: FetchParams | undefined): Observable<PageConverter<BookData>> {
    let sortFilterParams = new HttpParams({fromObject: {...paginationParams}})
    return this.http
      .get(`${this.crtlFullPath}`, {params: sortFilterParams})
      .pipe(map(value => value as PageConverter<BookData>))
  }

  public getBook(isbn: string): Observable<BookDetail> {

    return this.http
      .get(`${this.crtlFullPath}/${isbn}`)
      .pipe(map(value => value as BookData))
  }

  public createBook(book: BookCreate): Observable<BookDetail> {
    return this.http
      .post(`${this.crtlFullPath}`, book)
      .pipe(
        map(value => value as BookDetail)
      )
  }

  public updateBook(isbn: string, book: BookUpdate): Observable<BookDetail> {
    return this.http
      .patch(`${this.crtlFullPath}/${isbn}`, book)
      .pipe(map(value => value as BookDetail))
  }

  public deleteBook(isbn: string): Observable<void> {
    return this.http
      .delete(`${this.crtlFullPath}/${isbn}`)
      .pipe(map(() => {
      }))
  }

  public readThisBook(userId: number, isbn: string): Observable<void> {
    return this.http
      .put(
        `${environment.apiUrl}/${Constants.entities.users}/${userId}/${Constants.entities.books}/${isbn}`, {})
      .pipe(map(() => {
      }))
  }

}
