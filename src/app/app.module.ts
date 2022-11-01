import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { FormComponent } from './form/form.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { DbService } from './db.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultsComponent } from './results/results.component';
import { AddExcelComponent } from './add-excel/add-excel.component';
import { AngularFireStorageModule } from "@angular/fire/compat/storage";


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResultsComponent,
    AddExcelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularFireStorageModule
  ],
  exports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [ DbService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
