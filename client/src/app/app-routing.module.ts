import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartHomeComponent} from './start/start-home/start-home.component';
import {RegRootComponent} from './reg/reg-root/reg-root.component';
import {RegHomeComponent} from './reg/reg-home/reg-home.component';
import {RegSheetComponent} from './reg/reg-sheet/reg-sheet.component';
import {RegImportComponent} from './reg/reg-import/reg-import.component';
import {RegAddEntityComponent} from './reg/reg-add-entity/reg-add-entity.component';
import {RegEntityComponent} from './reg/reg-entity/reg-entity.component';
import {RegViewEntityComponent} from './reg/reg-view-entity/reg-view-entity.component';
import {RegAddChildEntityComponent} from './reg/reg-add-child-entity/reg-add-child-entity.component';
import {RegViewEntityStatsComponent} from './reg/reg-view-entity-stats/reg-view-entity-stats.component';
import {WorkComponent} from './reg/work/work.component';

const routes: Routes = [
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'start', component: StartHomeComponent},
  {
    path: 'reg', component: RegRootComponent, children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: RegHomeComponent},
      {path: 'entity/add', component: RegAddEntityComponent},
      {path: 'entity/:id', component: RegViewEntityComponent},
      {path: 'entity/:id/add', component: RegAddChildEntityComponent},
      {path: 'entity/:id/stats', component: RegViewEntityStatsComponent},
      {path: 'entity', component: RegEntityComponent},
      {path: 'import', component: RegImportComponent},
      {path: 'work', component: WorkComponent},
      {path: 'sheet', component: RegSheetComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
