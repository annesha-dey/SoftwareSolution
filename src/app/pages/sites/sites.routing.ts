import { Routes, RouterModule } from '@angular/router';
import { Sites } from './sites.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Sites,
    children: [ ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
