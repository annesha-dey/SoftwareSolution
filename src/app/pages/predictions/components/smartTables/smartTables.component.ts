import { Component } from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';


@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
})
export class SmartTables {

  query: string = '';
  image1: 'app/browsers/firefox.svg';
  isLoaded = true;
  settings = {
    pager: {
      perPage : 5,
    },
    hideSubHeader : true,
    actions: { add: false,
      position: 'right'},
    columns: {
      id: {
        title: 'Asset ID',
        type: 'string',
      },
      name: {
        title: 'Asset Name',
        type: 'string',
        filter: false,
      },
      type: {
        title: 'Type',
        type: 'string',
      },
      // assetCategoryId: {
      //   title: 'Asset Category Id',
      //   type: 'string',
      // },
      parameters: {
        title: 'Parameters',
        type: 'html',
        valuePrepareFunction: (value) => { return '<div class="wide">' + value + '</div>'; }
      },

      image: {
        title: 'Image',
        sort: false,
        filter: false,
        type: 'html',
        valuePrepareFunction: (image) => {
          return ' <img  width="80" height="80" src="' + image + '" /> '
        },
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

  constructor(protected service: SmartTablesService, public restService: RestServicesService) {
    this.service.getData().then((data) => {
      this.source.load(data);
      this.isLoaded = false;
    });
   // alert(this.restService.getAllDeviceList());
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      {
        field: 'id',
        search: query,
      },
      {
        field: 'name',
        search: query,
      },
      {
        field: 'type',
        search: query,
      },
      {
        field: 'assetCategoryId',
        search: query,
      },
      {
        field: 'parameters',
        search: query,
      },
      // {
      //   createdDate: 'createdDate',
      //   search: query,
      // },

    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }
}
