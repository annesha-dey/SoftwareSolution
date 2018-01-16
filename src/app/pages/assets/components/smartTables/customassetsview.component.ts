import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { SmartTablesService } from './smartTables.service';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';


@Component({
  selector: 'custom-view',
  template: `
    <span (click)="onClick()" style="cursor:pointer;color:white;text-decoration:underline;" >{{ renderValue }}</span>
  `,
})
export class CustomAssetsViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) {

}

  ngOnInit() {
    this.renderValue = this.value.toString().toUpperCase();
  }

  onClick() {
    alert(this.renderValue);
    this.router.navigate(['../../components/dashboard/dashboard.module#DashboardModule']);
  }
}
