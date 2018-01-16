import {Component, Input} from '@angular/core';

@Component({
  selector: 'responsive-table-chart',
  templateUrl: './responsiveTable.html',
  styleUrls: ['./responsive.scss']
})
export class ResponsiveTable {

  constructor() {
  }
  @Input() turbine_notifications : Array<Object>;
}
