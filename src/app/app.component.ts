import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webshop-app';
  openPanel: boolean = true;
  openTable: boolean = false;

  toggleTableAndPanelView(): void {
    this.openPanel = !!!this.openPanel;
    this.openTable = !!!this.openTable;
  }
}
