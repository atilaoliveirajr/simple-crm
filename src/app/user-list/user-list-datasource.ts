import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface UserListItem {
  city: string;
  name: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: UserListItem[] = [
  {name: 1, city: 'Hydrogen'},
  {name: 2, city: 'Helium'},
  {name: 3, city: 'Lithium'},
  {name: 4, city: 'Beryllium'},
  {name: 5, city: 'Boron'},
  {name: 6, city: 'Carbon'},
  {name: 7, city: 'Nitrogen'},
  {name: 8, city: 'Oxygen'},
  {name: 9, city: 'Fluorine'},
  {name: 10, city: 'Neon'},
  {name: 11, city: 'Sodium'},
  {name: 12, city: 'Magnesium'},
  {name: 13, city: 'Aluminum'},
  {name: 14, city: 'Silicon'},
  {name: 15, city: 'Phosphorus'},
  {name: 16, city: 'Sulfur'},
  {name: 17, city: 'Chlorine'},
  {name: 18, city: 'Argon'},
  {name: 19, city: 'Potassium'},
  {name: 20, city: 'Calcium'},
];

/**
 * Data source for the UserList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserListDataSource extends DataSource<UserListItem> {
  data: UserListItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UserListItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-snamee). If you're using server-snamee pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: UserListItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-snamee). If you're using server-snamee sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: UserListItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'city': return compare(a.city, b.city, isAsc);
        case 'name': return compare(+a.name, +b.name, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example name/city columns (for client-snamee sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
