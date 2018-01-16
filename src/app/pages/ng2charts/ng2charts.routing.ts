import { Routes, RouterModule } from '@angular/router';
import { Ng2Charts } from './ng2charts.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Ng2Charts,
    children: [ ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
