import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
// noinspection TypeScriptValidateTypes

// export function loadChildren(path) { return System.import(path); };

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: 'app/pages/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: 'app/pages/register/register.module#RegisterModule'
  },
  {
    path: 'pages',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
      { path: 'editors', loadChildren: './editors/editors.module#EditorsModule' },
      { path: 'components', loadChildren: './components/components.module#ComponentsModule' },
      { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
      { path: 'ui', loadChildren: './ui/ui.module#UiModule' },
      { path: 'forms', loadChildren: './forms/forms.module#FormsModule' },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
      { path: 'maps', loadChildren: './maps/maps.module#MapsModule' },
      { path: 'devices', loadChildren: './devices/devices.module#DeviceModule' },
      { path: 'assets', loadChildren: './assets/assets.module#AssetsModule' },
      { path: 'sites', loadChildren: './sites/sites.module#SitesModule' },
      { path: 'association', loadChildren: './association/association.module#AssociationModule' },
      { path: 'rules', loadChildren: './rules/rules.module#RulesModule' },
      { path: 'predictions', loadChildren: './predictions/predictions.module#PredictionsModule' },
      { path: 'settings', loadChildren: './settings/settings.module#SettingsModule' }

    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
