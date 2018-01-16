import { Routes, RouterModule } from '@angular/router';
import { Predictions } from './predictions.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Predictions,
    children: [ ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
