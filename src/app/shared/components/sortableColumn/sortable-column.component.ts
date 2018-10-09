import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SortService } from './sort.service';

@Component({
  // tslint:disable-next-line
  selector: '[app-sortable-column]',
  templateUrl: './sortable-column.component.html',
})

/*
* Sortable Column is a module that contains 3 parts to make the sorting of a table work
* The sortable component itself, a small sort service to insert sort events and the sortable table directive that emits the events
* Keep these files together at all times to ensure proper sorting for asc and desc results
*/
export class SortableColumnComponent implements OnInit, OnDestroy {
  constructor(private sortService: SortService) {}
  // tslint:disable-next-line
  @Input('sortable-column')
  sortableColumn: string;
  // tslint:disable-next-line
  @Input('sortable-direction')
  sortableDirection: string;
  columnSortedSubscription: Subscription;

  @HostListener('click')
  sortColumn(): void {
    this.sortableDirection = this.sortableDirection === 'asc' ? 'desc' : 'asc';
    this.sortService.columnSorted({ sortColumn: this.sortableColumn, sortDirection: this.sortableDirection });
  }

  ngOnInit(): void {
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe((event) => {
      if (this.sortableColumn !== event.sortColumn) {
        this.sortableDirection = '';
      }
    });
  }

  ngOnDestroy(): void {
    this.columnSortedSubscription.unsubscribe();
  }
}
