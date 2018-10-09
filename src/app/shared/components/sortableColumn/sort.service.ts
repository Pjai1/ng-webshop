import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SortEvent {
  sortColumn: string;
  sortDirection: string;
  sortExpression?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}

  private sortedSource = new Subject<SortEvent>();

  columnSorted$ = this.sortedSource.asObservable();

  columnSorted(event: SortEvent) {
    if (event.sortDirection === 'asc') {
      event.sortExpression = `${event.sortColumn}`;
    } else {
      event.sortExpression = `-${event.sortColumn}`;
    }
    this.sortedSource.next(event);
  }
}
