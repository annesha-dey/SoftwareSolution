import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';
import { CustomViewComponent } from './customdeviceview.component';

@Component({
  selector: 'smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss']
})
export class SmartTables {

  query: string = '';
  isLoaded = true;
  settings = {
    pager: {
      perPage: 5,
    },

    actions: { add: false,
      position: 'right'},
      hideSubHeader : true,
    columns: {
      siteName: {
        title: 'Site Name',
        type: 'string',
      },
      hardwareId: {
        title: 'Hardware Id',
        type: 'string',
      },
       assetName: {
         title: 'Device Name',
         type: 'string',
         filter: false,
       },
      createdDate: {
        title: 'Created Date',
        type: 'string',
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

  data = [];
  source: LocalDataSource = new LocalDataSource();
  constructor(protected service: SmartTablesService, public restService: RestServicesService) {
    this.service.getData().then((data) => {
      this.source.load(data);
      this.isLoaded = false;
    });
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
        field: 'hardwareId',
        search: query,
      },
      {
        field: 'assetId',
        search: query,
      },
      {
        field: 'assetName',
        search: query,
      },
      {
        field: 'siteToken',
        search: query,
      },
      {
        field: 'createdDate',
        search: query,
      },

    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

}
