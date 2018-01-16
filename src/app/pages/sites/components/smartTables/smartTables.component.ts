import { Component } from '@angular/core';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource } from 'ng2-smart-table';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';
import { CustomSitesViewComponent } from './customsitesview.component';

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
    actions: {
      add: false,
      position: 'right',
    },
    hideSubHeader: true,
    columns: {
      token: {
        title: 'Site Id',
        type: 'string',
     
      },
      name: {
        title: 'Site Name',
        type: 'string',
        filter: false,
        
        // width: '20%',
      },
      createdDate: {
        title: 'Create Date',
        type: 'string',
        // width: '10%',
      },
     

      image: {
        title: 'Image',
        sort: false,
        filter: false,
        type: 'html',
        valuePrepareFunction: (image) => {
          return ' <img  width="80" height="80" src="' + image + '"/> '
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

  removeUser = function (index) {
    this.users.splice(index, 1);
  };

  onSearch(query: string = '') {
    // alert(query);
    this.source.setFilter([{
        field: 'name',
        search: query,
      },
      {
        field: 'description',
        search: query,
      },
      {
        field: 'type',
        search: query,
      },
      {
        field: 'location',
        search: query,
      },
      {
        field: 'rated_power',
        search: query,
      },

    ], false);
  }

}
