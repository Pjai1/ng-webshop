import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SortEvent {
  sortColumn: string;
  sortDirection: string;
}

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}

  private sortedSource = new Subject<SortEvent>();

  columnSorted$ = this.sortedSource.asObservable();

  columnSorted(event: SortEvent) {
    this.sortedSource.next(event);
  }
}
