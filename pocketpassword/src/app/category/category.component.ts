import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Category } from '../models/category';
import { CategoryService } from './category.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CrudType } from "./crudtype.enum";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  pageTitle: string = "Category";

  categList: Category[];

  gridOptions: GridOptions;
  categoryForm: FormGroup;
  currentCategory: Category;
  crudType: CrudType = CrudType.CREATE;
  isSubmitted: boolean = false;

  columnDefs = [
    { headerName: 'Category Name', field: 'name' },
    { headerName: 'Category Color', field: 'backgroundColor' }
  ];

  constructor(private formBuilder: FormBuilder, private categService: CategoryService) { 
    this.categList = categService.getData();

    this.gridOptions = <GridOptions> {
      onSelectionChanged: params => {
        console.log(params.api.getSelectedRows());
        this.currentCategory = params.api.getSelectedRows()[0];

        this.categoryForm.setValue(this.currentCategory);
        this.crudType = CrudType.UPDATE;
        this.isSubmitted = false;
      },
      rowData: categService.getData(),
      columnDefs: this.columnDefs,
      enableCellChangeFlash: true,
      rowSelection: 'single',
      getRowStyle: function(param) {
        return { background: param.data.backgroundColor }
      }

    };
  }

  ngOnInit() {
    //alert('haho');
    this.categoryForm = this.formBuilder.group(
      {
        name: ['', [Validators.required, Validators.minLength(5)]],
        backgroundColor: ['#ffffff', Validators.required]
      }
    )
  }

  itemSelected(item: Category) {
    this.currentCategory = item;
    this.categoryForm.setValue(this.currentCategory);
    this.crudType = CrudType.UPDATE;
    this.isSubmitted = false;
  }

  newCategory() {
    this.currentCategory = new Category('');
    this.categoryForm.setValue(this.currentCategory);
    this.crudType = CrudType.CREATE;
    this.isSubmitted = false;
  }

  onSubmit() {
    console.log(this.categoryForm);
    this.isSubmitted = true;

    if (this.categoryForm.invalid) {
      return;
    }

    this.persist(new Category(this.categoryForm.value.name, this.categoryForm.value.backgroundColor));
  }

  removeCateg(item: Category) {
    this.crudType = CrudType.DELETE;
    this.persist(item);
  }

  private persist(item: Category) {
    this.categService.save(this.crudType, item);
    this.gridOptions.api.setRowData(this.categService.getData());
  }
  get txtCategName() { return this.categoryForm.get('name'); }
}
