import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppTranslationModule } from '../../app.translation.module';
import { NgaModule } from '../../theme/nga.module';
import { DataTableModule } from 'angular2-datatable';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ListRules } from './components/ListRules/ListRules.component';
import { AddRule } from './components/AddRule/AddRule.component';
import { addCondition } from './components/AddCondition/addCondition.component';
import { SmartTables } from './components/smartTables/smartTables.component';
import { SmartTablesService } from './components/smartTables/smartTables.service';
import { ListRulesService } from './components/ListRules/ListRules.service';
import { ResponsiveTable } from './components/responsiveTable/responsiveTable.component';
import { BlockForm } from './components/blockForm/blockForm.component';
import { IconButtons } from '../ui/components/buttons/components/iconButtons/iconButtons.component';
import { Rules } from './rules.component';
import { routing } from './rules.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppTranslationModule,
    NgaModule,
    ReactiveFormsModule,
    routing,
    Ng2SmartTableModule,
    DataTableModule,
    HttpModule,
  ],
  declarations: [
      Rules,
      AddRule,
      ListRules,
      BlockForm,
      IconButtons,
      ResponsiveTable,
      SmartTables,
      addCondition

  ],
  entryComponents: [addCondition],
  providers: [
SmartTablesService,
ListRulesService
  ]
})
export class RulesModule {}
