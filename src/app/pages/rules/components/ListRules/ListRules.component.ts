import { Component } from '@angular/core';
import { RestServicesService } from '../../../../service/rest.service/rest-services.service';
import { ListRulesService } from './ListRules.service';

@Component({
  selector: 'list-rules',
  templateUrl: './ListRules.html',
  styleUrls: ['./ListRules.scss']
})
export class ListRules {

  chartData:Object;

  constructor(protected service: ListRulesService) {

  }
  ngOnInit() {

  }
}
