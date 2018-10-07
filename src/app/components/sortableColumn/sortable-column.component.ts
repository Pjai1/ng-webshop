import { Component, OnInit, Input, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SortService } from '../../shared/services/sort.service';

@Component({
  // tslint:disable-next-line
  selector: '[app-sortable-column]',
  templateUrl: './sortable-column.component.html',
})
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
