import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { routing }       from './charts.routing';
import { Charts } from './charts.component';
import { ChartistJs } from './components/chartistJs/chartistJs.component';
import { ChartistJsService } from './components/chartistJs/chartistJs.service';
import { AppTranslationModule } from '../../app.translation.module';

import { ResponsiveTable } from './components/basicTables/components/responsiveTable/responsiveTable.component';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { TabsModule } from 'ng2-tabs';
declare var require: any;

 export function highchartsFactory() {
     return require('highcharts');
 }

 const Highcharts = require('highcharts');
 // This is for all plots, change Date axis to local timezone
 Highcharts.setOptions({
     global: {
         useUTC: false,
     },
 });

@NgModule({
  imports: [
    CommonModule,
    AppTranslationModule,
    FormsModule,
    NgaModule,
    routing,
    ChartModule,
    TabsModule,
  ],
  declarations: [
    Charts,
    ChartistJs,
    ResponsiveTable,
  ],
  providers: [
    ChartistJsService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory,
 },
  ]
})
export class ChartsModule {}
