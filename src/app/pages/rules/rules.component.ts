import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'rules',
  styleUrls: ['./rules.scss'],
  templateUrl: './rules.html'
})
export class Rules {

  constructor(private router: Router){
  }
ngOnInit(){
  this.router.navigate(['/pages/rules/listRules']);
}
}
