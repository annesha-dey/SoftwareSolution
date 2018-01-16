import { Routes, RouterModule } from '@angular/router';
import { Settings } from './settings.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Settings,
    children: [ ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
