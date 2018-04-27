import {Component, OnInit} from '@angular/core';

export interface GroceryList {
  title: string;
  groceries: Groceries[];
}

export interface Groceries {
  name: string;
  amount: number;
}

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.scss']
})

export class UsermanagementComponent implements OnInit {

  groceryList: GroceryList;

  constructor() {
  }

  ngOnInit() {

    this.groceryList = {
      title: 'Boodschappenlijst Werner',
      groceries: [{
        name: 'Bier',
        amount: 24
      }, {
        name: 'Wodka fles',
        amount: 1
      }, {
        name: 'Oranje tompoucen',
        amount: 4
      }]
    };
  }

}
