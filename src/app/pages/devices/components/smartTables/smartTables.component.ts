import { Component } from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
})
export class SmartTables {

  query: string = '';
  image1: 'app/browsers/firefox.svg';
  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
      image: {
        title: 'image',
        sort: false,
        filter: false,
        type: 'html',
        valuePrepareFunction: (image) => { return '<img src="../../../../../assets/images/bucks1.gif" />' }
      },
    },
    add: null,
    defaultStyle: false,
      edit: {
      editButtonContent: '<i class="ion-edit"></i>',
      saveButtonContent: '<i class="ion-checkmark"></i>',
      cancelButtonContent: '<i class="ion-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="ion-trash-a"></i>',
      confirmDelete: true,
    },
  };
// valuePrepareFunction: (image) => { return '<img src="../../../../../assets/images/bucks.gif" />' }
  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: SmartTablesService) {
    this.service.getData().then((data) => {
      this.source.load(data);
    });
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
