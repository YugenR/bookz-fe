import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from 'rxjs/operators';
import {Constants} from "../utils/constants";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserCreate, UserData, UserDetail, UserUpdate} from "../interfaces/user";
import {FetchParams, PageConverter} from "../interfaces/pagination";
import {IsbnCheckResponse} from "../interfaces/book";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly entities = Constants.entities;
  private readonly crtlPathFragment = this.entities.users;
  private readonly crtlFullPath = `${environment.apiUrl}/${this.crtlPathFragment}`;

  constructor(private http: HttpClient) {
  }

  public getAllUsers(paginationParams : FetchParams | undefined): Observable<PageConverter<UserData>> {
    let sortFilterParams = new HttpParams({fromObject: {...paginationParams}})
    return this.http
      .get(`${this.crtlFullPath}`, {params: sortFilterParams})
      .pipe(map(value => value as PageConverter<UserData>))
  }

  public getUser(userId: number): Observable<UserDetail> {

    return this.http
      .get(`${this.crtlFullPath}/${userId}`)
      .pipe(map(value => value as UserDetail))
  }

  public createUser(user: UserCreate): Observable<UserDetail> {
    return this.http
      .post(`${this.crtlFullPath}`, user)
      .pipe(
        map(value => value as UserDetail)
      )
  }

  public updateUser(userId: number, user: UserUpdate): Observable<UserDetail> {
    return this.http
      .patch(`${this.crtlFullPath}/${userId}`, user)
      .pipe(map(value => value as UserDetail))
  }

  public deleteUser(userId: number): Observable<void> {
    return this.http
      .delete(`${this.crtlFullPath}/${userId}`)
      .pipe(map(() => {
      }))
  }

  public checkEmailAvailability(email: string): Observable<boolean> {

    return this.http
      .get(`${this.crtlFullPath}/${email}/check`)
      .pipe(map(value => value as boolean))
  }

}
