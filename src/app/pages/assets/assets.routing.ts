import { Routes, RouterModule } from '@angular/router';
import { Assets } from './assets.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Assets,
    children: [ ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
