import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {AlertDialogComponent} from "../utils/shared-components/alert-dialog/alert-dialog.component";
import {ConfirmDialogComponent} from "../utils/shared-components/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogsService extends MatDialog {

  alert(title: string, message1: string): any {
    return this.open(AlertDialogComponent, {
      data: {title, message: message1}
    });
  }

  confirm(title: string, message1: string, preWrapMessage?: boolean, confirmTextKey?: string, cancelTextKey?: string): Observable<boolean> {
    return this.open(ConfirmDialogComponent, {
      data: {title, message: message1, preWrapMessage: preWrapMessage, confirmTextKey, cancelTextKey}
    }).afterClosed();

  }

}
