import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { DataTableModule } from 'angular2-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from '@angular/http';

import { SmartTables } from './components/smartTables/smartTables.component';
import { SmartTablesService } from './components/smartTables/smartTables.service';


import { Devices } from './devices.component';
import { routing } from './devices.routing';

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
      Devices,
      SmartTables,

  ],
  providers: [
    SmartTablesService,
  ]
})
export class DeviceModule {}
