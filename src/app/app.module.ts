import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { RestServicesService } from './service/rest.service/rest-services.service';
import { MqttService } from './service/mqtt.service/mqtt.service';
import { config } from './config/config';
import { NetworkGlobals } from './service/network.globals';
import { GlobalDataService } from './service/globaldata.service';
import { Globals } from './service/globals';
import { CustomViewComponent } from '../app/pages/devices/components/smartTables/customdeviceview.component';
import { CustomAssetsViewComponent } from '../app/pages/assets/components/smartTables/customassetsview.component';
import { CustomAssociationViewComponent } from
                        '../app/pages/association/components/smartTables/customassociationview.component';

import { CustomSitesViewComponent } from '../app/pages/sites/components/smartTables/customsitesview.component';

import { ChartistModule } from '../../src/app/pages/ng2charts/components/chartist.component';

// import { LiveChartComponent } from '../../src/app/pages/ng2charts/components/live-chart.component';
/*
 * Platform and Environment providers/directives/pipes
 */
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';
import { PagesModule } from './pages/pages.module';


// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  RestServicesService,
  NetworkGlobals,
  MqttService,
  GlobalDataService,
  Globals,
];

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    CustomViewComponent,
    CustomAssetsViewComponent,
    CustomAssociationViewComponent,
    CustomSitesViewComponent,

  ],
  imports: [ // import Angular's modules
    BrowserModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule.forRoot(),
    NgbModule.forRoot(),
    PagesModule,
    routing,
    ChartistModule,
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    APP_PROVIDERS,
  ],
  entryComponents: [
    CustomViewComponent,
    CustomAssetsViewComponent,
    CustomAssociationViewComponent,
    CustomSitesViewComponent,
  ],
})

export class AppModule {

  constructor(public appState: AppState) {
  }
}
