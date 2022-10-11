import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from "@angular/cdk/collections";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectTitle} from "../store/router.selector";
import {tableSelector} from "../store/table/table.selector";
import {TableDataType} from "../store/table/table-data";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<TableDataType>;
  checkboxColumn = "select"
  editColumn = "edit"
  deleteColumn = "delete"
  dataSource = new MatTableDataSource<TableDataType>();
  showCheckbox: boolean = false;
  allowMultipleSelection: boolean = false;
  selection = new SelectionModel<TableDataType>(this.allowMultipleSelection, [])
  showEdit: boolean = false;
  showDelete: boolean = false;
  showAdd: boolean = false;
  showSearch: boolean = false;
  title?: string;
  tableDataColumns?: string[];
  displayedColumns?: string[];

  activatedRouteData = this.activatedRoute.data.subscribe(data => {
    this.showCheckbox = data["showCheckbox"] === null ? false : data["showCheckbox"]
    this.allowMultipleSelection = data["allowMultipleSelection"] === null ? false : data["allowMultipleSelection"]
    this.showEdit = data["showEdit"] === null ? false : data["showEdit"]
    this.showDelete = data["showDelete"] === null ? false : data["showDelete"]
    this.showAdd = data["showAdd"] === null ? false : data["showAdd"]
    this.showSearch = data["showSearch"] === null ? false : data["showSearch"]
  })

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectTitle).subscribe(title => this.title = title);
    this.store.select(tableSelector.data).subscribe(data => {
      this.dataSource.data = data
      this.tableDataColumns = data.length > 0 ? Object.keys(data[0]): [];
      this.displayedColumns = this.tableDataColumns.slice();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.showCheckbox ? this.displayedColumns?.unshift(this.checkboxColumn) : null
    this.showEdit ? this.displayedColumns?.push(this.editColumn) : null
    this.showDelete ? this.displayedColumns?.push(this.deleteColumn) : null
    this.selection = new SelectionModel<TableDataType>(this.allowMultipleSelection, [])
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

  filterTable(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

}
