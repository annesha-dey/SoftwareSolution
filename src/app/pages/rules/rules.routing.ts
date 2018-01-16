import { Routes, RouterModule, Router}  from '@angular/router';

import { Rules } from './rules.component';
import { ModuleWithProviders } from '@angular/core';
import { AddRule } from './components/AddRule/AddRule.component';
import { ListRules } from './components/ListRules/ListRules.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Rules,
    children: [
      //{ path: 'treeview', component: TreeViewComponent }
      { path: 'addRule', component: AddRule },
      { path: 'listRules', component: ListRules }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
