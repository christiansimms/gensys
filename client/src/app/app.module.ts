import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartHomeComponent } from './start/start-home/start-home.component';
import { RegHomeComponent } from './reg/reg-home/reg-home.component';
import { RegRootComponent } from './reg/reg-root/reg-root.component';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ExtractFieldComponent } from './reg/extract-field/extract-field.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RegSheetComponent } from './reg/reg-sheet/reg-sheet.component';
import { SheetComponent } from './sheet/sheet.component';
import {HttpClientModule} from '@angular/common/http';
import { RegImportComponent } from './reg/reg-import/reg-import.component';
import { RegAddEntityComponent } from './reg/reg-add-entity/reg-add-entity.component';
import { FlashComponent } from './reg/flash/flash.component';
import { RegEntityComponent } from './reg/reg-entity/reg-entity.component';
import { RegViewEntityComponent } from './reg/reg-view-entity/reg-view-entity.component';
import { RegAddChildEntityComponent } from './reg/reg-add-child-entity/reg-add-child-entity.component';
import { PreJsonComponent } from './comp/pre-json/pre-json.component';
import { SaveFilePopupComponent } from './comp/save-file-popup/save-file-popup.component';
import { DisplayDataComponent } from './comp/display-data/display-data.component';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { RegViewEntityStatsComponent } from './reg/reg-view-entity-stats/reg-view-entity-stats.component';
import { WorkComponent } from './reg/work/work.component';


@NgModule({
  declarations: [
    AppComponent,
    StartHomeComponent,
    RegHomeComponent,
    RegRootComponent,
    ExtractFieldComponent,
    RegSheetComponent,
    SheetComponent,
    RegImportComponent,
    RegAddEntityComponent,
    FlashComponent,
    RegEntityComponent,
    RegViewEntityComponent,
    RegAddChildEntityComponent,
    PreJsonComponent,
    SaveFilePopupComponent,
    DisplayDataComponent,
    RegViewEntityStatsComponent,
    WorkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
