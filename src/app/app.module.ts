import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent, DialogOverviewDialog } from './home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { fakeBackendProvider } from './services/fake-interceptor.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DialogOverviewDialog
  ],
  entryComponents: [DialogOverviewDialog],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FlexLayoutModule
  ],
  providers: [fakeBackendProvider,{provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'never'}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
