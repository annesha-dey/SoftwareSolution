import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { DataTableModule } from 'angular2-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from '@angular/http';
import { LiveChartComponent } from './components/live-chart.component';
 import { SmartTables } from './components/smartTables/smartTables.component';
 import { SmartTablesService } from './components/smartTables/smartTables.service';


import { Ng2Charts } from './ng2charts.component';
import { routing } from './ng2charts.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    routing,
    Ng2SmartTableModule,
    DataTableModule,
    HttpModule,

  ],
  declarations: [
    Ng2Charts,
    SmartTables,
    LiveChartComponent,
  ],
  providers: [
    SmartTablesService,
  ],

 // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Ng2ChartsModule {}
