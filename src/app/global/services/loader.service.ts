import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { SpinnerComponent } from 'src/app/shared/modal/spinner/spinner.component';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private _loading = new BehaviorSubject<boolean>(false);
  loading$ = this._loading.asObservable();

  constructor(public modal: MatDialog) { }

  show() {
    this.modal.open(SpinnerComponent)
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
    
  }
}