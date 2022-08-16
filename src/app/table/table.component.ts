import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import {TableDataSource, TableDataType} from './table-datasource';
import {SelectionModel} from "@angular/cdk/collections";
import {ActivatedRoute} from "@angular/router";
import {TableData} from "./table-data";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableDataType>;
  checkboxColumn = "select"
  dataSource: TableDataSource;
  showCheckbox: boolean = false;
  allowMultipleSelection: boolean = false;
  selection = new SelectionModel<TableDataType>(this.allowMultipleSelection, [])

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  activatedRouteData = this.activatedRoute.data.subscribe(data => {
    this.showCheckbox = data["showCheckbox"] === null ? false : data["showCheckbox"]
    this.allowMultipleSelection = data["allowMultipleSelection"] === null ? false : data["allowMultipleSelection"]
  })

  constructor(private activatedRoute: ActivatedRoute) {
    this.dataSource = new TableDataSource(TableData);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;

    this.showCheckbox ? this.displayedColumns.unshift(this.checkboxColumn) : null
    this.allowMultipleSelection ? this.selection = new SelectionModel<TableDataType>(this.allowMultipleSelection, []) : null
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if(!this.allowMultipleSelection) return;
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TableDataType): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }
}
