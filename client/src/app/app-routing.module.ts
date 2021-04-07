import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartHomeComponent} from './start/start-home/start-home.component';
import {RegRootComponent} from './reg/reg-root/reg-root.component';
import {RegHomeComponent} from './reg/reg-home/reg-home.component';
import {RegSheetComponent} from './reg/reg-sheet/reg-sheet.component';
import {RegImportComponent} from './reg/reg-import/reg-import.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'start', component: StartHomeComponent},
  {
    path: 'reg', component: RegRootComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: RegHomeComponent},
      {path: 'import', component: RegImportComponent},
      {path: 'sheet', component: RegSheetComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
