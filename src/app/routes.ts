import { Routes } from '@angular/router';
import { GridComponent } from './components/productsGrid/grid.component';
import { TableComponent } from './components/productsTable/table.component';

export const appRoutes: Routes = [
  { path: 'home', component: GridComponent },
  { path: 'list', component: TableComponent },
  { path: '', component: GridComponent, pathMatch: 'full' },
];
