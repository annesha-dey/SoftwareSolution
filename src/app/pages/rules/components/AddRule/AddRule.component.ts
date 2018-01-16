import { Component } from '@angular/core';

import { AddRuleService } from './AddRule.service';

@Component({
  selector: 'add-rule',
  templateUrl: './AddRule.html',
  styleUrls: ['./AddRule.scss']
})
export class AddRule {

  chartData:Object;

  constructor() {
  }

  ngOnInit() {
  }
}
