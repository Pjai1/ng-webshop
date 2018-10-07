import { Directive, OnInit, OnDestroy, Output } from '@angular/core';
import { SortService } from '../services/sort.service';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appSortableTable]',
})
export class SortableTableDirective implements OnInit, OnDestroy {
  constructor(private sortService: SortService) {}

  @Output()
  sorted = new EventEmitter();

  columnSortedSubscription: Subscription;

  ngOnInit(): void {
    this.columnSortedSubscription = this.sortService.columnSorted$.subscribe((event) => {
      this.sorted.emit(event);
    });
  }

  ngOnDestroy(): void {
    this.columnSortedSubscription.unsubscribe();
  }
}
