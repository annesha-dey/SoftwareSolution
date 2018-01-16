import { Component } from '@angular/core';

import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';
import { CustomAssociationViewComponent } from './customassociationview.component';

@Component({
  selector: 'association-smart-tables',
  templateUrl: './smartTables.html',
  styleUrls: ['./smartTables.scss'],
})
export class SmartTables {

  query: string = '';
  isLoaded = true;

  settings = {
    pager: {
      perPage : 5,
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
        type: 'number',

      },
      image: {
        title: 'Device Image',
        sort: false,
        filter: false,
        type: 'html',

        valuePrepareFunction: (image) => {
          return ' <img  width="80" height="80" src="' + image + '" /> '
        },
      },
      assetId: {
        title: 'Asset Id',
        type: 'string',
          width: '15%',
      },
      assetName: {
        title: 'Asset Name',
        type: 'string',

        filter: false,
        
      },
      assignmentImage: {
        title: 'Asset Image',
        sort: false,
        filter: false,
        type: 'html',

        valuePrepareFunction: (assignmentImage) => {
          return ' <img  width="80" height="80" src="' + assignmentImage + '" /> '
        },
      },
      assignmentToken: {
        title: 'Assignment Token',
        type: 'string',
     },
      assignmentType: {
        title: 'Assignment Type',
        type: 'string',

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
        field: 'siteName',
        search: query,
      },
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
        field: 'assignmentToken',
        search: query,
      },
      {
        field: 'assignmentType',
        search: query,
      },

    ], false);
  }
}
