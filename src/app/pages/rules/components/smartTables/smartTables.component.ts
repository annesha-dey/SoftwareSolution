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
  settings = {
    pager: {
      perPage: 5,
    },
    actions: { add: false,
      position: 'right'},
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      type: {
        title: 'ModuleId',
        type: 'string',
      },
      assetID: {
        title: 'assetID',
        type: 'string',
      },
      occurances: {
        title: 'occurances',
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

  data = [
  ];
  // valuePrepareFunction: (image) => { return '<img src="../../../../../assets/images/bucks.gif" />' }
  source: LocalDataSource = new LocalDataSource();



  constructor(protected service: SmartTablesService, public restService: RestServicesService) {
this.data = [];
    /*  this.source.load(this.data);*/

    this.service.getData().then((data) => {
      this.source.load(data);
    });

  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?' +event.data.name)) {
      console.log(event);
     // this.restService.deleteRule(event.data.ruleId);
      this.restService.deleteRule(event.data.ruleId).subscribe(
        result => console.log(result)
    );
     // event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  getData() {
    return Object.assign([], this.data);
  }


}
