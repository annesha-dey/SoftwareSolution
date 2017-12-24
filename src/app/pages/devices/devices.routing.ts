import { Routes, RouterModule }  from '@angular/router';

import { Devices } from './devices.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Devices,
    children: [
      //{ path: 'treeview', component: TreeViewComponent }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
