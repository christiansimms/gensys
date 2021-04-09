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
    RegAddChildEntityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
