import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { CrudType } from "./crudtype.enum";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private data: Category[];

  constructor() {
    console.log('category service - constructor');
    this.data = [
      new Category('Ivan 1', '#ff0000'),
      new Category('Ivan 2', '#73c6b6'),
      new Category('Ivan 3', '#e67222')
    ];

  }

  getData(): Category[] {
    console.log('category service - getData ' + this.data.length);
    return this.data;
  }

  save(type: CrudType, inst: Category): Category {
    //throw new Error("error in save");

    switch (type) {
      case CrudType.CREATE:
        this.data.push(inst);
        break;
      case CrudType.UPDATE:
        var updinstidx = this.data.findIndex(c => c.name === inst.name);
        if (updinstidx == -1) {
          return this.save(CrudType.CREATE, inst);
        }
        this.data[updinstidx] = inst;
        
        break;
      case CrudType.DELETE:
        var updinstidx = this.data.findIndex(c => c.name === inst.name);
        if (updinstidx == -1) {
          throw new Error("Item is not found - " + inst.name);
        }
        this.data.splice(updinstidx, 1);
        break;
      default:
        break;
    }

    return inst;
  }
}
