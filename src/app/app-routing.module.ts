import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataTableComponent } from './components/data-table/data-table.component';

@NgModule({
  imports: [RouterModule.forRoot(
    [
        { path: '', redirectTo: '/data-table', pathMatch: 'full' },
        {
            path: 'data-table',
            component: DataTableComponent
        },


        { path: '**',  redirectTo: '/data-table', pathMatch: 'full' }
    ],
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
