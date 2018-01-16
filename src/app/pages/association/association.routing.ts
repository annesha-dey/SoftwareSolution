import { Routes, RouterModule } from '@angular/router';
import { Association } from './association.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Association,
    children: [],
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
