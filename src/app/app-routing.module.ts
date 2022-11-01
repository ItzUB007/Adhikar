import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from '../app/form/form.component';
import { AddExcelComponent } from '../app/add-excel/add-excel.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: "", component: FormComponent },
  { path: "xlsx", component: AddExcelComponent },
  { path: "results", component: ResultsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
